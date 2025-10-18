// Test email configuration
const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('Testing email configuration...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '****' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test email
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'APU Tigers - Email Server Test',
    html: `
        <h2>Email Server Test</h2>
        <p>If you're reading this, your email server is working correctly!</p>
        <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><em>This is a test email from your APU Tigers Basketball Club website.</em></p>
    `
};

console.log('\nAttempting to send test email...');

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.error('\n❌ ERROR sending email:');
        console.error(error);
        
        if (error.code === 'EAUTH') {
            console.log('\n⚠️  Authentication failed! Common issues:');
            console.log('1. App Password is incorrect');
            console.log('2. 2-Step Verification is not enabled');
            console.log('3. App Password was not generated correctly');
            console.log('\nPlease generate a new App Password at:');
            console.log('https://myaccount.google.com/apppasswords');
        }
    } else {
        console.log('\n✅ SUCCESS! Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('\nCheck your inbox at:', process.env.EMAIL_USER);
        console.log('If not in inbox, check SPAM folder!');
    }
    
    process.exit(0);
});
