// APU Tigers Basketball Club - Email Server with SQL Database
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
require('dotenv').config();

// Import database configuration and utilities
const { db, queries, USE_POSTGRES } = require('./db');
const {
  generateToken,
  getTokenExpiration,
  createVerificationEmail,
  createPasswordResetEmail,
  createAdminNotificationEmail,
  sendEmail,
  isValidEmail,
  validatePassword,
  sanitizeInput
} = require('./utils');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Session store configuration (PostgreSQL or SQLite)
let sessionStore;
if (USE_POSTGRES) {
    const pgSession = require('connect-pg-simple')(session);
    const { Pool } = require('pg');
    const sessionPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
    sessionStore = new pgSession({
        pool: sessionPool,
        tableName: 'session'
    });
} else {
    const SQLiteStore = require('connect-sqlite3')(session);
    sessionStore = new SQLiteStore({ db: 'sessions.sqlite', dir: __dirname });
}

// Session middleware
app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || 'change_this_secret_in_production',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days (1 week)
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        httpOnly: true,
        sameSite: 'lax' // Allow cookies to be sent with navigation
    },
    rolling: true // Reset expiration on every request
}));

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to other services like 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your app password (not regular password)
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to your email
        replyTo: email, // User's email for easy reply
        subject: `APU Tigers Contact Form: ${subject}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>This message was sent from the APU Tigers Basketball Club website contact form.</em></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message. Please try again later.' 
        });
    }
});

// Registration form endpoint
app.post('/api/register', async (req, res) => {
    const { 
        fullName, 
        studentId, 
        email, 
        phone, 
        experience, 
        position, 
        availability, 
        emergencyContact, 
        emergencyPhone,
        medicalInfo 
    } = req.body;

    // Validate required fields
    if (!fullName || !studentId || !email || !phone) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please fill in all required fields' 
        });
    }

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Registration: ${fullName}`,
        html: `
            <h2>New APU Tigers Registration</h2>
            <h3>Personal Information</h3>
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Student ID:</strong> ${studentId}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            
            <h3>Basketball Information</h3>
            <p><strong>Experience Level:</strong> ${experience || 'Not specified'}</p>
            <p><strong>Preferred Position:</strong> ${position || 'Not specified'}</p>
            <p><strong>Availability:</strong> ${availability || 'Not specified'}</p>
            
            <h3>Emergency Contact</h3>
            <p><strong>Emergency Contact Name:</strong> ${emergencyContact || 'Not provided'}</p>
            <p><strong>Emergency Contact Phone:</strong> ${emergencyPhone || 'Not provided'}</p>
            
            <h3>Medical Information</h3>
            <p>${medicalInfo || 'None provided'}</p>
            
            <hr>
            <p><em>This registration was submitted from the APU Tigers Basketball Club website.</em></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ 
            success: true, 
            message: 'Registration submitted successfully!' 
        });
    } catch (error) {
        console.error('Error sending registration email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to submit registration. Please try again later.' 
        });
    }
});

// --- Authentication Endpoints with SQL ---

/**
 * POST /api/signup
 * Create a new user account
 * Body: { email, password, fullName }
 */
app.post('/api/signup', async (req, res) => {
    const { email, password, fullName } = req.body;
    
    // Validation
    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Email and password are required' 
        });
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid email format' 
        });
    }
    
    // Password strength validation
    if (password.length < 6) {
        return res.status(400).json({ 
            success: false, 
            message: 'Password must be at least 6 characters' 
        });
    }
    
    try {
        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        
        // Insert user using SQL query
        db.run(queries.createUser, [email, passwordHash, fullName || null], async function(err) {
            if (err) {
                // Handle duplicate email error
                if (err.code === 'SQLITE_CONSTRAINT' || err.code === '23505') {
                    return res.status(409).json({ 
                        success: false, 
                        message: 'Email already registered' 
                    });
                }
                console.error('❌ Database insert error:', err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Internal server error' 
                });
            }
            
            const userId = this.lastID;
            
            // Create session
            req.session.userId = userId;
            
            // Generate verification token
            const token = generateToken();
            const expiresAt = getTokenExpiration(24); // 24 hours
            
            // Save verification token
            db.run(queries.createVerificationToken, [userId, token, expiresAt], async (tokenErr) => {
                if (tokenErr) {
                    console.error('❌ Error creating verification token:', tokenErr);
                }
                
                // Send verification email (non-blocking)
                try {
                    const verificationUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/verify-email.html?token=${token}`;
                    const emailHtml = createVerificationEmail(fullName, verificationUrl);
                    
                    await sendEmail(transporter, email, 'Verify Your APU Tigers Account', emailHtml);
                    console.log('✅ Verification email sent to:', email);
                } catch (emailErr) {
                    console.error('❌ Error sending verification email:', emailErr);
                    // Don't fail signup if email fails
                }
            });
            
            res.status(201).json({ 
                success: true, 
                message: 'Account created successfully! Please check your email to verify your account.', 
                user: { 
                    id: userId, 
                    email, 
                    fullName 
                } 
            });
        });
    } catch (e) {
        console.error('❌ Signup error:', e);
        res.status(500).json({ success: false, message: 'Failed to sign up' });
    }
});

/**
 * POST /api/login
 * Authenticate user and create session
 * Body: { email, password }
 */
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Email and password are required' 
        });
    }
    
    // Find user by email using SQL query
    db.get(queries.findUserByEmail, [email], async (err, user) => {
        if (err) {
            console.error('❌ Database query error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
        
        // Check if user exists
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }
        
        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }
        
        // Update last login time
        db.run(
            'UPDATE users SET last_login = datetime("now") WHERE id = ?',
            [user.id],
            (updateErr) => {
                if (updateErr) {
                    console.error('❌ Error updating last_login:', updateErr);
                }
            }
        );
        
        // Create persistent session
        req.session.userId = user.id;
        req.session.userEmail = user.email;
        req.session.userName = user.full_name;
        
        // Save session before sending response
        req.session.save((err) => {
            if (err) {
                console.error('❌ Session save error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to create session'
                });
            }
            
            res.json({ 
                success: true, 
                message: 'Logged in successfully', 
                user: { 
                    id: user.id, 
                    email: user.email, 
                    fullName: user.full_name 
                } 
            });
        });
    });
});

/**
 * POST /api/logout
 * Destroy user session
 */
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('❌ Session destroy error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to logout' 
            });
        }
        res.clearCookie('connect.sid');
        res.json({ 
            success: true, 
            message: 'Logged out successfully' 
        });
    });
});

/**
 * GET /api/me
 * Get current authenticated user
 */
app.get('/api/me', (req, res) => {
    // Check if user is authenticated
    if (!req.session.userId) {
        console.log('❌ /api/me - No session userId');
        return res.status(401).json({ authenticated: false });
    }
    
    console.log('✅ /api/me - Session userId:', req.session.userId);
    
    // Fetch user data using SQL query
    db.get(queries.findUserById, [req.session.userId], (err, user) => {
        if (err) {
            console.error('❌ Database query error:', err);
            return res.status(500).json({ authenticated: false });
        }
        
        // Check if user exists
        if (!user) {
            console.log('❌ User not found in database for userId:', req.session.userId);
            return res.status(401).json({ authenticated: false });
        }
        
        console.log('📊 User from DB:', {
            id: user.id,
            email: user.email,
            role: user.role,
            is_admin: user.is_admin
        });
        
        const responseData = { 
            authenticated: true, 
            user: { 
                id: user.id, 
                email: user.email, 
                fullName: user.full_name,
                role: user.role || (user.is_admin ? 'admin' : 'user'),
                isAdmin: user.is_admin || (user.role === 'admin' ? 1 : 0)
            } 
        };
        
        console.log('📤 Sending response:', JSON.stringify(responseData, null, 2));
        
        res.json(responseData);
    });
});

// --- Email Verification Endpoints ---

/**
 * GET /api/verify-email/:token
 * Verify user's email address with token
 */
app.get('/api/verify-email/:token', (req, res) => {
    const { token } = req.params;
    
    if (!token) {
        return res.status(400).json({ 
            success: false, 
            message: 'Verification token is required' 
        });
    }
    
    // Find valid token
    db.get(queries.findVerificationToken, [token], (err, tokenData) => {
        if (err) {
            console.error('❌ Database error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
        
        if (!tokenData) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid or expired verification token' 
            });
        }
        
        // Mark email as verified
        db.run(queries.verifyEmail, [tokenData.user_id], (verifyErr) => {
            if (verifyErr) {
                console.error('❌ Error verifying email:', verifyErr);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to verify email' 
                });
            }
            
            // Delete used token
            db.run(queries.deleteVerificationToken, [token], (deleteErr) => {
                if (deleteErr) {
                    console.error('❌ Error deleting token:', deleteErr);
                }
            });
            
            console.log('✅ Email verified for user ID:', tokenData.user_id);
            
            res.json({ 
                success: true, 
                message: 'Email verified successfully!' 
            });
        });
    });
});

/**
 * POST /api/resend-verification
 * Resend verification email
 */
app.post('/api/resend-verification', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ 
            success: false, 
            message: 'Email is required' 
        });
    }
    
    // Find user
    db.get(queries.findUserByEmail, [email], async (err, user) => {
        if (err) {
            console.error('❌ Database error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
        
        if (!user) {
            // Don't reveal if email exists
            return res.json({ 
                success: true, 
                message: 'If the email exists, a verification link has been sent' 
            });
        }
        
        if (user.email_verified) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email is already verified' 
            });
        }
        
        // Generate new token
        const token = generateToken();
        const expiresAt = getTokenExpiration(24);
        
        // Save token
        db.run(queries.createVerificationToken, [user.id, token, expiresAt], async (tokenErr) => {
            if (tokenErr) {
                console.error('❌ Error creating token:', tokenErr);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to generate verification token' 
                });
            }
            
            // Send email
            try {
                const verificationUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/verify-email.html?token=${token}`;
                const emailHtml = createVerificationEmail(user.full_name, verificationUrl);
                
                await sendEmail(transporter, email, 'Verify Your APU Tigers Account', emailHtml);
                console.log('✅ Verification email resent to:', email);
                
                res.json({ 
                    success: true, 
                    message: 'Verification email sent successfully' 
                });
            } catch (emailErr) {
                console.error('❌ Error sending email:', emailErr);
                res.status(500).json({ 
                    success: false, 
                    message: 'Failed to send verification email' 
                });
            }
        });
    });
});

// --- Password Reset Endpoints ---

/**
 * POST /api/forgot-password
 * Request password reset
 */
app.post('/api/forgot-password', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ 
            success: false, 
            message: 'Email is required' 
        });
    }
    
    // Find user
    db.get(queries.findUserByEmail, [email], async (err, user) => {
        if (err) {
            console.error('❌ Database error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
        
        // Don't reveal if email exists (security)
        if (!user) {
            return res.json({ 
                success: true, 
                message: 'If the email exists, a password reset link has been sent' 
            });
        }
        
        // Generate reset token
        const token = generateToken();
        const expiresAt = getTokenExpiration(1); // 1 hour
        
        // Save token
        db.run(queries.createPasswordResetToken, [user.id, token, expiresAt], async (tokenErr) => {
            if (tokenErr) {
                console.error('❌ Error creating reset token:', tokenErr);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to generate reset token' 
                });
            }
            
            // Send email
            try {
                const resetUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/reset-password.html?token=${token}`;
                const emailHtml = createPasswordResetEmail(user.full_name, resetUrl);
                
                await sendEmail(transporter, email, 'Reset Your APU Tigers Password', emailHtml);
                console.log('✅ Password reset email sent to:', email);
                
                res.json({ 
                    success: true, 
                    message: 'Password reset instructions sent to your email' 
                });
            } catch (emailErr) {
                console.error('❌ Error sending email:', emailErr);
                res.status(500).json({ 
                    success: false, 
                    message: 'Failed to send reset email' 
                });
            }
        });
    });
});

/**
 * POST /api/reset-password
 * Reset password with token
 */
app.post('/api/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
        return res.status(400).json({ 
            success: false, 
            message: 'Token and new password are required' 
        });
    }
    
    // Validate password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
        return res.status(400).json({ 
            success: false, 
            message: passwordValidation.message 
        });
    }
    
    // Find valid token
    db.get(queries.findPasswordResetToken, [token], async (err, tokenData) => {
        if (err) {
            console.error('❌ Database error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
        
        if (!tokenData) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid or expired reset token' 
            });
        }
        
        try {
            // Hash new password
            const passwordHash = await bcrypt.hash(newPassword, 10);
            
            // Update password
            db.run(queries.updatePassword, [passwordHash, tokenData.user_id], (updateErr) => {
                if (updateErr) {
                    console.error('❌ Error updating password:', updateErr);
                    return res.status(500).json({ 
                        success: false, 
                        message: 'Failed to update password' 
                    });
                }
                
                // Mark token as used
                db.run(queries.markTokenAsUsed, [token], (markErr) => {
                    if (markErr) {
                        console.error('❌ Error marking token as used:', markErr);
                    }
                });
                
                console.log('✅ Password reset for user ID:', tokenData.user_id);
                
                res.json({ 
                    success: true, 
                    message: 'Password reset successfully! You can now log in.' 
                });
            });
        } catch (hashErr) {
            console.error('❌ Error hashing password:', hashErr);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to reset password' 
            });
        }
    });
});

// --- Admin Endpoints ---

/**
 * Middleware: Check if user is admin
 */
function requireAdmin(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ 
            success: false, 
            message: 'Authentication required' 
        });
    }
    
    db.get(queries.findUserById, [req.session.userId], (err, user) => {
        if (err || !user || !user.is_admin) {
            return res.status(403).json({ 
                success: false, 
                message: 'Admin access required' 
            });
        }
        next();
    });
}

/**
 * GET /api/admin/users
 * Get all users (admin only)
 */
app.get('/api/admin/users', requireAdmin, (req, res) => {
    db.query(queries.getAllUsers, [], (err, users) => {
        if (err) {
            console.error('❌ Database error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch users' 
            });
        }
        
        // For SQLite, db.query returns rows in a callback
        // For PostgreSQL with pool.query, results are in result.rows
        const userList = Array.isArray(users) ? users : (users.rows || []);
        
        res.json({ 
            success: true, 
            users: userList 
        });
    });
});

/**
 * GET /api/admin/stats
 * Get user statistics (admin only)
 */
app.get('/api/admin/stats', requireAdmin, (req, res) => {
    db.get(queries.getUserStats, [], (err, stats) => {
        if (err) {
            console.error('❌ Database error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch stats' 
            });
        }
        
        res.json({ 
            success: true, 
            stats 
        });
    });
});

// Debug endpoint - Check current session data
app.get('/api/debug/session', (req, res) => {
    if (!req.session.userId) {
        return res.json({
            authenticated: false,
            message: 'No active session'
        });
    }
    
    db.get(queries.findUserById, [req.session.userId], (err, user) => {
        if (err || !user) {
            return res.json({
                authenticated: false,
                sessionUserId: req.session.userId,
                error: err ? err.message : 'User not found'
            });
        }
        
        res.json({
            authenticated: true,
            session: {
                userId: req.session.userId,
                cookie: req.session.cookie
            },
            database: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                is_admin: user.is_admin,
                email_verified: user.email_verified
            },
            computed: {
                isAdmin: user.role === 'admin' || user.is_admin === 1,
                hasAdminAccess: user.role === 'admin' || user.is_admin === 1
            }
        });
    });
});

/**
 * DELETE /api/admin/users/:id
 * Delete user (admin only)
 */
app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
    const userId = parseInt(req.params.id);
    
    if (!userId || userId === req.session.userId) {
        return res.status(400).json({ 
            success: false, 
            message: 'Cannot delete your own account' 
        });
    }
    
    db.run(queries.deleteUser, [userId], function(err) {
        if (err) {
            console.error('❌ Database error:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to delete user' 
            });
        }
        
        console.log('✅ User deleted by admin. User ID:', userId);
        
        res.json({ 
            success: true, 
            message: 'User deleted successfully' 
        });
    });
});

// ========================================
// ADMIN API ENDPOINTS - Extended
// ========================================

// Middleware to check if user is admin
function isAdmin(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    db.get(queries.getUserById, [req.session.userId], (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }
        
        next();
    });
}

// Get all users (admin only)
app.get('/api/admin/users', isAdmin, (req, res) => {
    const query = `
        SELECT id, email, full_name, role, email_verified, created_at, last_login 
        FROM users 
        ORDER BY created_at DESC
    `;
    
    db.all(query, [], (err, users) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch users' 
            });
        }
        
        res.json({ 
            success: true, 
            users: users 
        });
    });
});

// Get single user details (admin only)
app.get('/api/admin/users/:id', isAdmin, (req, res) => {
    const userId = req.params.id;
    
    db.get(queries.getUserById, [userId], (err, user) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch user' 
            });
        }
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        
        // Don't send password hash
        delete user.password_hash;
        
        res.json({ 
            success: true, 
            user: user 
        });
    });
});

// Update user (admin only)
app.put('/api/admin/users/:id', isAdmin, (req, res) => {
    const userId = req.params.id;
    const { full_name, email, role, email_verified } = req.body;
    
    // Validate inputs
    if (!full_name || !email) {
        return res.status(400).json({ 
            success: false, 
            message: 'Full name and email are required' 
        });
    }
    
    if (!isValidEmail(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid email format' 
        });
    }
    
    const validRoles = ['user', 'admin', 'moderator'];
    if (role && !validRoles.includes(role)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid role' 
        });
    }
    
    const query = `
        UPDATE users 
        SET full_name = ?, 
            email = ?, 
            role = ?, 
            email_verified = ?
        WHERE id = ?
    `;
    
    db.run(query, [
        sanitizeInput(full_name),
        email.toLowerCase(),
        role || 'user',
        email_verified ? 1 : 0,
        userId
    ], function(err) {
        if (err) {
            console.error('Error updating user:', err);
            if (err.message.includes('UNIQUE')) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Email already exists' 
                });
            }
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to update user' 
            });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        
        console.log('✅ User updated by admin. User ID:', userId);
        
        res.json({ 
            success: true, 
            message: 'User updated successfully' 
        });
    });
});

// Verify user email (admin only)
app.post('/api/admin/users/:id/verify', isAdmin, (req, res) => {
    const userId = req.params.id;
    
    const query = 'UPDATE users SET email_verified = 1 WHERE id = ?';
    
    db.run(query, [userId], function(err) {
        if (err) {
            console.error('Error verifying user:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to verify user' 
            });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        
        console.log('✅ User email verified by admin. User ID:', userId);
        
        res.json({ 
            success: true, 
            message: 'User email verified successfully' 
        });
    });
});

// Get analytics data (admin only)
app.get('/api/admin/analytics', isAdmin, (req, res) => {
    const queries = {
        totalUsers: 'SELECT COUNT(*) as count FROM users',
        verifiedUsers: 'SELECT COUNT(*) as count FROM users WHERE email_verified = 1',
        usersToday: `SELECT COUNT(*) as count FROM users WHERE DATE(created_at) = DATE('now')`,
        usersThisMonth: `SELECT COUNT(*) as count FROM users WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')`
    };
    
    const results = {};
    let completed = 0;
    const total = Object.keys(queries).length;
    
    Object.entries(queries).forEach(([key, query]) => {
        db.get(query, [], (err, row) => {
            if (!err && row) {
                results[key] = row.count;
            } else {
                results[key] = 0;
            }
            
            completed++;
            if (completed === total) {
                res.json({ 
                    success: true, 
                    analytics: results 
                });
            }
        });
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', database: USE_POSTGRES ? 'PostgreSQL' : 'SQLite' });
});

// Start server - Bind to 0.0.0.0 to allow access from mobile devices
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`📱 Mobile access: http://192.168.100.233:${PORT}`);
    console.log(`🌐 Network access: Available on local network`);
    console.log(`Make sure to configure your .env file with EMAIL_USER and EMAIL_PASS`);
});
