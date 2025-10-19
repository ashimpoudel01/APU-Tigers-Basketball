// Database Configuration and Connection
// Supports both PostgreSQL (production) and SQLite (development)

const { Pool } = require('pg');
const sqlite3 = require('sqlite3').verbose();

// Determine which database to use based on environment
const USE_POSTGRES = process.env.DATABASE_URL || process.env.USE_POSTGRES === 'true';

let db;

if (USE_POSTGRES) {
  // PostgreSQL Configuration
  console.log('🔷 Using PostgreSQL database');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  // Test connection
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('❌ PostgreSQL connection error:', err);
    } else {
      console.log('✅ PostgreSQL connected successfully');
    }
  });

  // Create users table if it doesn't exist
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(255),
      email_verified BOOLEAN DEFAULT FALSE,
      is_admin BOOLEAN DEFAULT FALSE,
      role VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS verification_tokens (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      token VARCHAR(255) UNIQUE NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      token VARCHAR(255) UNIQUE NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      used BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_verification_tokens_token ON verification_tokens(token);
    CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
  `;

  pool.query(createUsersTable, (err) => {
    if (err) {
      console.error('❌ Error creating users table:', err);
    } else {
      console.log('✅ Users table ready');
      
      // Migration: Update existing admins to have role='admin'
      pool.query(`UPDATE users SET role = 'admin' WHERE is_admin = TRUE AND role = 'user'`, (err) => {
        if (err) {
          console.error('Error migrating admin roles:', err);
        }
      });
    }
  });

  db = {
    // PostgreSQL query method
    query: (text, params, callback) => {
      return pool.query(text, params, callback);
    },
    
    // Get single row (compatible with SQLite API)
    get: (sql, params, callback) => {
      const pgSQL = convertSQLiteToPostgres(sql);
      pool.query(pgSQL, params, (err, result) => {
        if (err) return callback(err);
        callback(null, result.rows[0] || null);
      });
    },
    
    // Run SQL (compatible with SQLite API)
    run: (sql, params, callback) => {
      const pgSQL = convertSQLiteToPostgres(sql);
      pool.query(pgSQL, params, (err, result) => {
        if (err) return callback.call({ lastID: null }, err);
        const lastID = result.rows[0]?.id || null;
        callback.call({ lastID }, null);
      });
    },
    
    // Close connection
    close: () => {
      return pool.end();
    }
  };

} else {
  // SQLite Configuration (Development)
  console.log('🔶 Using SQLite database (development mode)');
  
  const sqliteDB = new sqlite3.Database('./users.sqlite', (err) => {
    if (err) {
      console.error('❌ SQLite connection error:', err);
    } else {
      console.log('✅ SQLite connected successfully');
    }
  });

  // Create users table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT,
      email_verified INTEGER DEFAULT 0,
      is_admin INTEGER DEFAULT 0,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    );
    
    CREATE TABLE IF NOT EXISTS verification_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at DATETIME NOT NULL,
      used INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  sqliteDB.run(createUsersTable, (err) => {
    if (err) {
      console.error('❌ Error creating users table:', err);
    } else {
      console.log('✅ Users table ready');
      
      // Add role column if it doesn't exist (migration)
      sqliteDB.run(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'`, (err) => {
        if (err && !err.message.includes('duplicate column')) {
          console.error('Note: role column migration:', err.message);
        } else if (!err) {
          console.log('✅ Added role column to users table');
        }
      });
      
      // Update admin status: Set role='admin' where is_admin=1
      sqliteDB.run(`UPDATE users SET role = 'admin' WHERE is_admin = 1`, (err) => {
        if (err) {
          console.error('Error updating admin roles:', err);
        }
      });
    }
  });

  db = {
    // SQLite methods (pass through)
    query: sqliteDB.all.bind(sqliteDB),
    get: sqliteDB.get.bind(sqliteDB),
    run: sqliteDB.run.bind(sqliteDB),
    close: sqliteDB.close.bind(sqliteDB)
  };
}

// Helper function to convert SQLite SQL to PostgreSQL
function convertSQLiteToPostgres(sql) {
  // Replace ? placeholders with $1, $2, etc. for PostgreSQL
  let index = 0;
  const converted = sql.replace(/\?/g, () => `$${++index}`);
  
  // Handle RETURNING clause for INSERT statements
  if (converted.toUpperCase().includes('INSERT INTO')) {
    return converted.includes('RETURNING') ? converted : converted + ' RETURNING id';
  }
  
  return converted;
}

// SQL Query Templates (work with both databases)
const queries = {
  // User queries
  createUser: `
    INSERT INTO users (email, password_hash, full_name) 
    VALUES (?, ?, ?)
  `,
  
  findUserByEmail: `
    SELECT id, email, password_hash, full_name, email_verified, is_admin, role, created_at, last_login 
    FROM users 
    WHERE email = ?
  `,
  
  findUserById: `
    SELECT id, email, full_name, email_verified, is_admin, role, created_at, last_login 
    FROM users 
    WHERE id = ?
  `,
  
  updateUser: `
    UPDATE users 
    SET full_name = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `,
  
  updateLastLogin: `
    UPDATE users 
    SET last_login = CURRENT_TIMESTAMP 
    WHERE id = ?
  `,
  
  verifyEmail: `
    UPDATE users 
    SET email_verified = TRUE, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `,
  
  updatePassword: `
    UPDATE users 
    SET password_hash = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `,
  
  deleteUser: `
    DELETE FROM users 
    WHERE id = ?
  `,
  
  getAllUsers: `
    SELECT id, email, full_name, email_verified, is_admin, created_at, last_login 
    FROM users 
    ORDER BY created_at DESC
  `,
  
  getUserStats: `
    SELECT 
      COUNT(*) as total_users,
      SUM(CASE WHEN email_verified = TRUE THEN 1 ELSE 0 END) as verified_users,
      SUM(CASE WHEN is_admin = TRUE THEN 1 ELSE 0 END) as admin_users
    FROM users
  `,
  
  // Verification token queries
  createVerificationToken: `
    INSERT INTO verification_tokens (user_id, token, expires_at) 
    VALUES (?, ?, ?)
  `,
  
  findVerificationToken: `
    SELECT id, user_id, token, expires_at 
    FROM verification_tokens 
    WHERE token = ? AND expires_at > CURRENT_TIMESTAMP
  `,
  
  deleteVerificationToken: `
    DELETE FROM verification_tokens 
    WHERE token = ?
  `,
  
  deleteExpiredVerificationTokens: `
    DELETE FROM verification_tokens 
    WHERE expires_at < CURRENT_TIMESTAMP
  `,
  
  // Password reset token queries
  createPasswordResetToken: `
    INSERT INTO password_reset_tokens (user_id, token, expires_at) 
    VALUES (?, ?, ?)
  `,
  
  findPasswordResetToken: `
    SELECT id, user_id, token, expires_at, used 
    FROM password_reset_tokens 
    WHERE token = ? AND expires_at > CURRENT_TIMESTAMP AND used = FALSE
  `,
  
  markTokenAsUsed: `
    UPDATE password_reset_tokens 
    SET used = TRUE 
    WHERE token = ?
  `,
  
  deleteExpiredResetTokens: `
    DELETE FROM password_reset_tokens 
    WHERE expires_at < CURRENT_TIMESTAMP OR used = TRUE
  `
};

module.exports = { db, queries, USE_POSTGRES };
