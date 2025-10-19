// Utility functions for authentication system
const crypto = require('crypto');

/**
 * Generate a secure random token
 * @param {number} length - Length of the token (default: 32)
 * @returns {string} Random hexadecimal token
 */
function generateToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Generate a token expiration timestamp
 * @param {number} hours - Hours until expiration (default: 24)
 * @returns {Date} Expiration date
 */
function getTokenExpiration(hours = 24) {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + hours);
  return expiration;
}

/**
 * Create verification email HTML
 * @param {string} fullName - User's full name
 * @param {string} verificationUrl - Verification URL with token
 * @returns {string} HTML email content
 */
function createVerificationEmail(fullName, verificationUrl) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
        .header { text-align: center; color: #1a237e; margin-bottom: 30px; }
        .button { display: inline-block; padding: 15px 30px; background-color: #ff8800; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏀 Welcome to APU Tigers!</h1>
        </div>
        <p>Hi ${fullName || 'there'},</p>
        <p>Thank you for signing up for APU Tigers Basketball Club! Please verify your email address to complete your registration.</p>
        <div style="text-align: center;">
          <a href="${verificationUrl}" class="button">Verify Email Address</a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p><strong>This link will expire in 24 hours.</strong></p>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <div class="footer">
          <p>&copy; 2025 APU Tigers Basketball Club</p>
          <p>Building champions on and off the court since 2010</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Create password reset email HTML
 * @param {string} fullName - User's full name
 * @param {string} resetUrl - Password reset URL with token
 * @returns {string} HTML email content
 */
function createPasswordResetEmail(fullName, resetUrl) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
        .header { text-align: center; color: #1a237e; margin-bottom: 30px; }
        .button { display: inline-block; padding: 15px 30px; background-color: #ff8800; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
        .warning { background-color: #fff3cd; border-left: 4px solid: #ff8800; padding: 15px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset Request</h1>
        </div>
        <p>Hi ${fullName || 'there'},</p>
        <p>We received a request to reset your password for your APU Tigers account.</p>
        <div style="text-align: center;">
          <a href="${resetUrl}" class="button">Reset Password</a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <div class="warning">
          <p><strong>⚠️ This link will expire in 1 hour.</strong></p>
        </div>
        <p><strong>If you didn't request a password reset, please ignore this email.</strong> Your password will remain unchanged.</p>
        <div class="footer">
          <p>&copy; 2025 APU Tigers Basketball Club</p>
          <p>Building champions on and off the court since 2010</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Create admin notification email HTML
 * @param {string} action - Action performed (e.g., "New User Registration")
 * @param {object} details - Details object with user info
 * @returns {string} HTML email content
 */
function createAdminNotificationEmail(action, details) {
  const detailsHtml = Object.entries(details)
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
    .join('');
    
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
        .header { text-align: center; color: #1a237e; margin-bottom: 30px; }
        ul { list-style: none; padding: 0; }
        li { padding: 8px 0; border-bottom: 1px solid #eee; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏀 APU Tigers Admin Alert</h1>
        </div>
        <h2>${action}</h2>
        <ul>${detailsHtml}</ul>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">
          This is an automated notification from the APU Tigers authentication system.
        </p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send email using configured transporter
 * @param {object} transporter - Nodemailer transporter
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - HTML content
 * @returns {Promise} Send result
 */
async function sendEmail(transporter, to, subject, html) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  };
  
  return await transporter.sendMail(mailOptions);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} { valid: boolean, message: string }
 */
function validatePassword(password) {
  if (!password || password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  if (password.length < 8) {
    return { valid: true, message: 'Password is weak. Consider using 8+ characters' };
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const strength = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;
  
  if (strength >= 3) {
    return { valid: true, message: 'Password is strong' };
  } else if (strength >= 2) {
    return { valid: true, message: 'Password is moderate' };
  } else {
    return { valid: true, message: 'Password is weak. Consider adding uppercase, numbers, and special characters' };
  }
}

/**
 * Sanitize user input
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
}

module.exports = {
  generateToken,
  getTokenExpiration,
  createVerificationEmail,
  createPasswordResetEmail,
  createAdminNotificationEmail,
  sendEmail,
  isValidEmail,
  validatePassword,
  sanitizeInput
};
