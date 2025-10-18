# Quick Start: Email Server

## ✅ What's Been Set Up

Your website now has a complete email server using Nodemailer that will send contact form and registration submissions directly to your email!

## 🚀 How to Use

### 1. Configure Your Email (IMPORTANT - Do this first!)

Open the `.env` file and replace with your information:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=3000
```

**How to get Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Search for "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Paste it in the .env file

### 2. Start the Server

**Option A:** Double-click `start-server.bat`

**Option B:** In PowerShell, run:
```powershell
npm start
```

You should see: "Server is running on http://localhost:3000"

### 3. Keep Server Running

**IMPORTANT:** The server must be running for forms to work!
- Keep the terminal/command window open
- Don't close it while using the website
- Press Ctrl+C to stop the server

### 4. Test Your Forms

1. Open `index.html` in your browser
2. Go to the Contact page
3. Fill out and submit the form
4. Check your email!

## 📧 What Happens When Forms Are Submitted

### Contact Form
- Sends you an email with the person's:
  - Name
  - Email address
  - Subject
  - Message
- You can reply directly from your email

### Registration Form
- Sends you an email with all registration details:
  - Personal info (name, student ID, email, phone)
  - Basketball info (experience, position, availability)
  - Emergency contact information
  - Medical information

## 🔧 Files Created

- `server.js` - Email server backend
- `package.json` - Node.js dependencies
- `.env` - Your email configuration (keep this private!)
- `.env.example` - Template for .env
- `EMAIL_SETUP_GUIDE.md` - Detailed setup instructions
- `start-server.bat` - Quick start script

## ⚠️ Common Issues

**"Failed to send message"**
- Make sure the server is running
- Check your .env file has correct email/password

**"Invalid login"**
- Use App Password, NOT your regular Gmail password
- Enable 2-Step Verification first

**Forms not submitting**
- Server must be running on port 3000
- Check browser console (F12) for errors

## 📝 For Production/Deployment

When you deploy this to a real server:
1. Update fetch URLs in `script.js` (change localhost to your domain)
2. Set environment variables on your hosting platform
3. Never commit .env to GitHub (it's already in .gitignore)

## Need Help?

Read the detailed guide: `EMAIL_SETUP_GUIDE.md`

---
✨ Your email server is ready to use!
