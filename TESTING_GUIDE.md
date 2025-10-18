# How to Test Your Contact Form

## ✅ Good News!
Your email server is working perfectly! The API tests confirm emails are being sent.

## The Problem
You're likely opening `index.html` directly (file:// URL), which blocks API requests to localhost for security reasons.

## Solution: Use a Local Web Server

### TWO SERVERS MUST BE RUNNING:

#### 1. Email Server (Port 3000) - Already Running ✅
This handles sending emails.

#### 2. Web Server (Port 8000) - Now Running ✅
This serves your website files.

---

## How to Access Your Website:

### Open your browser and go to:
```
http://localhost:8000
```

**NOT:** `file:///C:/Users/...` ❌

---

## Step-by-Step Test:

1. **Open Browser**: Go to http://localhost:8000

2. **Navigate to Contact Page**: Click "Contact" in the menu

3. **Fill Out Form**:
   - Name: Your Name
   - Email: your@email.com
   - Subject: Test Message
   - Message: Testing the contact form

4. **Click "Send Message"**

5. **Look for Success Message**: You should see "✅ Message sent successfully!"

6. **Check Your Email**: 
   - Go to poudela2003@gmail.com
   - Look in SPAM folder if not in inbox
   - Subject will be: "APU Tigers Contact Form: [Your Subject]"

---

## Current Status:

✅ Email Server Running (Port 3000)
✅ Web Server Running (Port 8000)
✅ Email Configuration Working
✅ Contact Form API Working
✅ Test Email Sent Successfully

---

## Troubleshooting:

### If you see "Failed to send message":
1. Make sure BOTH servers are running:
   - Email server: `npm start` (port 3000)
   - Web server: `python -m http.server 8000` (port 8000)

2. Access website via: http://localhost:8000
   - NOT by double-clicking HTML files

### To Check Email Server:
Open new PowerShell window and run:
```powershell
node test-contact-form.js
```
Should say "Contact form is working!"

### Browser Console:
Press F12 in browser, go to Console tab
- Should see no errors
- If you see CORS errors, you're using file:// (wrong)
- If you see connection errors, email server isn't running

---

## Keep These Running:

### Terminal 1: Email Server
```powershell
npm start
```

### Terminal 2: Web Server
```powershell
python -m http.server 8000
```

Then open: http://localhost:8000

---

## You Should Have Received:

1. ✅ "APU Tigers - Email Server Test" (from test-email.js)
2. ✅ "APU Tigers Contact Form: Test Contact Form" (from test-contact-form.js)

Check your SPAM folder at poudela2003@gmail.com!

---

Now test by going to: **http://localhost:8000** and submitting the contact form!
