// APU Tigers Basketball Club - Email Server
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Make sure to configure your .env file with EMAIL_USER and EMAIL_PASS`);
});
