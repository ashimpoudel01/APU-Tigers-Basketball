# Email Server Setup Guide for APU Tigers Website

## Prerequisites
- Node.js installed on your computer
- A Gmail account (or other email service)

## Step 1: Install Dependencies

Open PowerShell in your project folder and run:

```powershell
npm install
```

This will install:
- express (web server)
- nodemailer (email sending)
- body-parser (form data handling)
- cors (cross-origin requests)
- dotenv (environment variables)

## Step 2: Configure Gmail App Password

### For Gmail users:

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left menu
3. Enable "2-Step Verification" if not already enabled
4. After enabling 2-Step Verification, go back to Security
5. Click on "App passwords" (search for it if you can't find it)
6. Select "Mail" as the app and "Windows Computer" as the device
7. Click "Generate"
8. Copy the 16-character password (it will look like: xxxx xxxx xxxx xxxx)

## Step 3: Update .env File

Open the `.env` file and update it with your information:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
PORT=3000
```

**Important:** 
- Replace `your-email@gmail.com` with your actual Gmail address
- Replace `xxxx xxxx xxxx xxxx` with the App Password you generated
- Keep the spaces in the app password

## Step 4: Start the Server

In PowerShell, run:

```powershell
npm start
```

You should see:
```
Server is running on http://localhost:3000
Make sure to configure your .env file with EMAIL_USER and EMAIL_PASS
```

## Step 5: Test the Forms

1. Open your website in a browser
2. Go to the Contact page
3. Fill out the form and submit
4. Check your email inbox for the message

## How It Works

### Contact Form
- When someone submits the contact form, it sends a POST request to `http://localhost:3000/api/contact`
- The server receives the data and sends it to your email
- You'll receive an email with the person's name, email, subject, and message

### Registration Form
- When someone submits the registration form, it sends a POST request to `http://localhost:3000/api/register`
- The server sends you an email with all the registration details
- You can reply directly to the applicant using the "Reply" button in your email

## Troubleshooting

### Error: "Failed to send message"
- Make sure the server is running (`npm start`)
- Check that your .env file has the correct email and app password
- Verify your Gmail App Password is correct

### Error: "Invalid login"
- You must use an App Password, not your regular Gmail password
- Make sure 2-Step Verification is enabled on your Google account

### Server won't start
- Make sure port 3000 is not being used by another application
- Run `npm install` again to ensure all dependencies are installed

### Emails not arriving
- Check your spam folder
- Verify the EMAIL_USER in .env is correct
- Try sending a test email from Gmail to verify your account works

## Using Other Email Services

### Outlook/Hotmail
Change in server.js:
```javascript
service: 'outlook'
```

### Yahoo
Change in server.js:
```javascript
service: 'yahoo'
```

### Custom SMTP
Replace the transporter configuration:
```javascript
const transporter = nodemailer.createTransport({
    host: 'smtp.yourdomain.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

## Deployment Notes

When deploying to a live server (not localhost):

1. Update the fetch URLs in `script.js` from `http://localhost:3000` to your server URL
2. Set up environment variables on your hosting platform
3. Never commit the `.env` file to git (it's already in `.gitignore`)
4. Use the `.env.example` file as a template for others

## Security Tips

- ✅ Never share your .env file
- ✅ Never commit .env to GitHub
- ✅ Use App Passwords, not regular passwords
- ✅ Regenerate App Password if compromised
- ✅ Keep dependencies updated with `npm update`

## Support

If you encounter issues:
1. Check the browser console for errors (F12)
2. Check the server terminal for error messages
3. Verify all files are saved
4. Restart the server after making changes to server.js or .env

---
Created for APU Tigers Basketball Club
Last updated: October 2025
