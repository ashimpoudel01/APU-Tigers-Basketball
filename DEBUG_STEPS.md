# STEP-BY-STEP: Test Contact Form

## Current Status:
✅ Email server is running (port 3000)
✅ Web server is running (port 8000)
✅ Debug logging added to script.js

---

## Follow These Steps EXACTLY:

### Step 1: Open Your Browser
Go to this URL (copy and paste it):
```
http://localhost:8000
```

### Step 2: Open Developer Console
Press **F12** on your keyboard
- OR Right-click → "Inspect" → Click "Console" tab

### Step 3: Go to Contact Page
Click "Contact" in the navigation menu

### Step 4: Check Console
In the Console tab, you should see:
```
🔧 Initializing form submissions...
✅ Contact form found!
```

If you DON'T see this, refresh the page (Ctrl+R or F5)

### Step 5: Fill Out the Form
- **Name:** Test User
- **Email:** test@example.com
- **Subject:** Testing Contact
- **Message:** This is a test message

### Step 6: Click "Send Message"

### Step 7: Watch the Console
You should see messages appearing like:
```
📧 Contact form submitted!
📝 Form data: {name: "Test User", email: "test@example.com", ...}
🌐 Sending to server...
📡 Server response status: 200
📬 Server result: {success: true, message: "Message sent successfully!"}
```

### Step 8: Check Alert
You should see a popup: "✅ Message sent successfully! We'll get back to you soon."

### Step 9: Check Your Email
- Go to Gmail: poudela2003@gmail.com
- Check **SPAM/Junk folder FIRST**
- Look for: "APU Tigers Contact Form: Testing Contact"

---

## What to Report Back:

Please tell me:

1. **What URL is shown in your browser?** (Should be http://localhost:8000/contact.html)

2. **What do you see in the Console?** (Copy the messages)

3. **Did you see the success alert?** (Yes/No)

4. **Any error messages?** (Copy them)

5. **What's in your email SPAM folder?** (Any messages from APU Tigers?)

---

## Common Issues:

### If Console shows nothing:
- Make sure you're at http://localhost:8000 (NOT file://)
- Refresh the page (F5)

### If you see "Contact form NOT found":
- You're on the wrong page
- Navigate to Contact from the menu

### If you see network errors:
- Email server might not be running
- Run in PowerShell: `npm start`

### If alert says "Failed to send":
- Check the Console for the exact error
- Make sure port 3000 is free

---

## Quick Checks:

Are you at: http://localhost:8000 ? ✓
Is F12 Console open? ✓
Did you click Contact in menu? ✓
Did you fill all form fields? ✓

Follow these steps and report back what you see!
