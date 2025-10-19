-- APU Tigers Basketball Club - Database Schema
-- Supports both PostgreSQL and SQLite

-- Users Table
-- Stores user authentication and profile information
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,                    -- PostgreSQL: SERIAL, SQLite: INTEGER PRIMARY KEY AUTOINCREMENT
  email VARCHAR(255) UNIQUE NOT NULL,       -- User's email address (unique identifier)
  password_hash VARCHAR(255) NOT NULL,      -- Bcrypt hashed password
  full_name VARCHAR(255),                   -- User's full name (optional)
  email_verified BOOLEAN DEFAULT FALSE,     -- Email verification status
  is_admin BOOLEAN DEFAULT FALSE,           -- Admin role flag
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Account creation timestamp
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Last update timestamp
  last_login TIMESTAMP                      -- Last login timestamp
);

-- Index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Email Verification Tokens Table
CREATE TABLE IF NOT EXISTS verification_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,       -- Verification token (UUID or random string)
  expires_at TIMESTAMP NOT NULL,            -- Token expiration time
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_verification_tokens_token ON verification_tokens(token);
CREATE INDEX IF NOT EXISTS idx_verification_tokens_user_id ON verification_tokens(user_id);

-- Password Reset Tokens Table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,       -- Reset token (UUID or random string)
  expires_at TIMESTAMP NOT NULL,            -- Token expiration time (typically 1 hour)
  used BOOLEAN DEFAULT FALSE,               -- Whether token has been used
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);

-- Session Table (for PostgreSQL with connect-pg-simple)
-- Note: This table is automatically created by connect-pg-simple
-- Included here for reference
CREATE TABLE IF NOT EXISTS session (
  sid VARCHAR PRIMARY KEY,
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
);

CREATE INDEX IF NOT EXISTS IDX_session_expire ON session(expire);

-- Sample Queries

-- Insert new user
-- INSERT INTO users (email, password_hash, full_name) 
-- VALUES ('user@example.com', '$2b$10$...', 'John Doe');

-- Find user by email
-- SELECT id, email, password_hash, full_name, created_at 
-- FROM users 
-- WHERE email = 'user@example.com';

-- Find user by ID
-- SELECT id, email, full_name, created_at 
-- FROM users 
-- WHERE id = 1;

-- Update user profile
-- UPDATE users 
-- SET full_name = 'Jane Doe', updated_at = CURRENT_TIMESTAMP 
-- WHERE id = 1;

-- Delete user
-- DELETE FROM users 
-- WHERE id = 1;

-- Get all users (admin only)
-- SELECT id, email, full_name, created_at 
-- FROM users 
-- ORDER BY created_at DESC;

-- Count total users
-- SELECT COUNT(*) as total_users FROM users;

-- Find users created in last 30 days
-- SELECT id, email, full_name, created_at 
-- FROM users 
-- WHERE created_at >= NOW() - INTERVAL '30 days'  -- PostgreSQL
-- -- WHERE created_at >= datetime('now', '-30 days')  -- SQLite
-- ORDER BY created_at DESC;
