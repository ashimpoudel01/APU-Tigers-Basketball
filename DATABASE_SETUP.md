# 🗄️ SQL Database Setup Guide

## Overview

The APU Tigers authentication system now supports **two SQL database options**:

1. **SQLite** (Default for development) - File-based, zero-configuration
2. **PostgreSQL** (Recommended for production) - Robust, scalable, production-ready

The system automatically detects which database to use based on environment variables.

---

## 🔧 Database Architecture

### Database Module (`db.js`)

The `db.js` module provides:
- **Unified API** - Same interface for both SQLite and PostgreSQL
- **Auto-detection** - Automatically chooses database based on `DATABASE_URL`
- **SQL Query Templates** - Reusable parameterized queries
- **Connection Management** - Handles connection pooling and errors

### SQL Queries (`queries` object in `db.js`)

All SQL queries use **parameterized statements** to prevent SQL injection:

```javascript
const queries = {
  createUser: `INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)`,
  findUserByEmail: `SELECT id, email, password_hash, full_name, created_at FROM users WHERE email = ?`,
  findUserById: `SELECT id, email, full_name, created_at FROM users WHERE id = ?`,
  updateUser: `UPDATE users SET full_name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
  deleteUser: `DELETE FROM users WHERE id = ?`,
  getAllUsers: `SELECT id, email, full_name, created_at FROM users ORDER BY created_at DESC`
};
```

---

## 🛠️ Setup Instructions

### Option 1: SQLite (Development)

**No setup required!** The system uses SQLite by default.

```bash
# Just start the server
npm start
```

**Files created automatically:**
- `users.sqlite` - User accounts
- `sessions.sqlite` - Session data

### Option 2: PostgreSQL (Production)

#### Step 1: Install PostgreSQL

**Windows:**
```powershell
# Download from https://www.postgresql.org/download/windows/
# Or use Chocolatey
choco install postgresql
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE apu_tigers;

# Create user (optional)
CREATE USER apu_admin WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE apu_tigers TO apu_admin;

# Exit
\q
```

#### Step 3: Configure Environment

Create or update `.env` file:

```env
# PostgreSQL Connection String
DATABASE_URL=postgresql://apu_admin:your_secure_password@localhost:5432/apu_tigers

# Or for localhost with default user
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/apu_tigers

# Session secret
SESSION_SECRET=your_random_secret_string_here

# Other settings
NODE_ENV=production
PORT=3000
```

#### Step 4: Start Server

```bash
npm start
```

You should see:
```
🔷 Using PostgreSQL database
✅ PostgreSQL connected successfully
✅ Users table ready
Server is running on http://localhost:3000
```

---

## 📊 Database Schema

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL / INTEGER | PRIMARY KEY | Auto-incrementing user ID |
| `email` | VARCHAR(255) | UNIQUE NOT NULL | User's email address |
| `password_hash` | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| `full_name` | VARCHAR(255) | NULL | User's full name (optional) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Account creation time |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update time |

**Indexes:**
- `idx_users_email` - Fast email lookups

### Session Table (PostgreSQL only)

Automatically created by `connect-pg-simple`:

| Column | Type | Description |
|--------|------|-------------|
| `sid` | VARCHAR | Session ID (Primary Key) |
| `sess` | JSON | Session data |
| `expire` | TIMESTAMP | Expiration time |

---

## 🔍 Running SQL Queries

### SQLite

```bash
# Open SQLite database
sqlite3 users.sqlite

# Run queries
SELECT * FROM users;
.schema users
.exit
```

### PostgreSQL

```bash
# Connect to database
psql -U postgres -d apu_tigers

# Run queries
SELECT * FROM users;
\dt  # List tables
\d users  # Describe users table
\q  # Exit
```

---

## 🧪 Testing the Database

### Test User Creation (Manual)

**SQLite:**
```bash
sqlite3 users.sqlite
INSERT INTO users (email, password_hash, full_name) 
VALUES ('test@example.com', '$2b$10$abcd...', 'Test User');
SELECT * FROM users;
```

**PostgreSQL:**
```bash
psql -U postgres -d apu_tigers
INSERT INTO users (email, password_hash, full_name) 
VALUES ('test@example.com', '$2b$10$abcd...', 'Test User');
SELECT * FROM users;
```

### Test via API

```bash
# Sign up
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","fullName":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

---

## 🚀 Production Deployment

### Heroku (PostgreSQL)

```bash
# Add Heroku PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# DATABASE_URL is set automatically
# Just deploy
git push heroku master
```

### Railway (PostgreSQL)

```bash
# Add PostgreSQL plugin in Railway dashboard
# Copy DATABASE_URL to environment variables
# Deploy
```

### DigitalOcean App Platform

```bash
# Create PostgreSQL database
# Set DATABASE_URL in environment variables
# Deploy
```

---

## 🔐 Security Best Practices

### ✅ Implemented

- **Parameterized Queries** - Prevents SQL injection
- **Password Hashing** - Bcrypt with 10 salt rounds
- **Session Security** - HTTP-only cookies
- **Input Validation** - Email format and password strength
- **Error Handling** - No sensitive data in error messages

### 🎯 Recommended Additions

```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// CORS configuration
app.use(cors({ origin: 'https://yourdomain.com', credentials: true }));

// Helmet for security headers
const helmet = require('helmet');
app.use(helmet());
```

---

## 📈 Performance Tips

### PostgreSQL Optimization

```sql
-- Add indexes for common queries
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_email_partial ON users(email) WHERE email IS NOT NULL;

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

### Connection Pooling

Already configured in `db.js`:

```javascript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,  // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

---

## 🐛 Troubleshooting

### SQLite Issues

**Problem:** `SQLITE_CONSTRAINT` error
```
Solution: Email already exists. Use unique email or delete existing user.
```

**Problem:** Database is locked
```
Solution: Close all connections to users.sqlite and restart server.
```

### PostgreSQL Issues

**Problem:** Connection refused
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list  # macOS
```

**Problem:** Authentication failed
```
Solution: Check DATABASE_URL credentials and pg_hba.conf settings
```

**Problem:** Database doesn't exist
```bash
createdb apu_tigers
```

---

## 📝 Migration from SQLite to PostgreSQL

### Export SQLite Data

```bash
# Dump SQLite data
sqlite3 users.sqlite .dump > users_backup.sql
```

### Import to PostgreSQL

```bash
# Clean up SQL file (remove SQLite-specific syntax)
# Then import
psql -U postgres -d apu_tigers -f users_backup.sql
```

---

## 🔄 Switching Between Databases

### Force SQLite (even if DATABASE_URL exists)

```env
# .env file
USE_POSTGRES=false
# DATABASE_URL=postgresql://...  # Commented out
```

### Use PostgreSQL

```env
# .env file
DATABASE_URL=postgresql://user:pass@localhost:5432/apu_tigers
# USE_POSTGRES=true  # Optional, auto-detected
```

---

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Node.js pg Module](https://node-postgres.com/)
- [Bcrypt Best Practices](https://github.com/kelektiv/node.bcrypt.js#readme)
- [SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)

---

## 📞 Support

For issues or questions:
- Check server logs: `npm start`
- Review `db.js` for database connection details
- Test queries in `schema.sql`
- Verify `.env` configuration

