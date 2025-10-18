# 🚀 Quick Start Guide - APU Tigers Website

## ✨ Easy Way (Recommended)

### To Start Everything:
1. **Double-click:** `start-all-servers.bat`
2. **Wait:** Two terminal windows will open
3. **Automatic:** Website opens in your browser at http://localhost:8000
4. **Done!** ✅

### To Stop Everything:
1. **Double-click:** `stop-all-servers.bat`
2. **Done!** All servers stopped ✅

---

## 📝 Manual Way

If you prefer to start servers manually:

### Terminal 1: Email Server
```powershell
npm start
```
Keep this window open!

### Terminal 2: Web Server
```powershell
python -m http.server 8000
```
Keep this window open!

### Open Website
Go to: **http://localhost:8000**

---

## ⚠️ Important Notes

### ✅ DO:
- Use `start-all-servers.bat` for easy startup
- Keep server windows open while using the website
- Access website at `http://localhost:8000`
- Check SPAM folder for emails first time

### ❌ DON'T:
- Don't double-click `index.html` (forms won't work)
- Don't close server terminal windows
- Don't forget to start both servers
- Don't use `file://` URLs

---

## 🔍 Troubleshooting

### Forms Not Working?
1. Check both servers are running
2. Make sure you're at `http://localhost:8000`
3. Check browser console (F12) for errors
4. Refresh page (Ctrl + F5)

### "Port Already in Use" Error?
1. Run `stop-all-servers.bat`
2. Wait 5 seconds
3. Run `start-all-servers.bat` again

### Not Getting Emails?
1. ✅ Server shows "Message sent successfully"
2. ✅ Check your SPAM/Junk folder
3. ✅ Look for "APU Tigers" emails
4. ✅ Mark as "Not Spam" for future emails

---

## 📧 Email Configuration

Your `.env` file must have:
```
EMAIL_USER=poudela2003@gmail.com
EMAIL_PASS=ertg vcjd rehb gqyv
PORT=3000
```

⚠️ Never share this file or commit it to Git!

---

## 🌐 When to Start Servers

### Development/Testing:
**Always** start both servers before using the website

### Production (Live Server):
- Email server runs on hosting platform (Heroku, Railway, etc.)
- No need to start manually
- Just deploy and it runs automatically

---

## 📂 Server Files

- `start-all-servers.bat` - Starts both servers + opens browser
- `stop-all-servers.bat` - Stops all servers
- `start-server.bat` - Starts email server only (old)
- `server.js` - Email server code
- `package.json` - Dependencies

---

## 🎯 Workflow

### Every Time You Work on the Site:

1. **Start:** Double-click `start-all-servers.bat`
2. **Work:** Make changes to HTML/CSS/JS
3. **Test:** Refresh browser to see changes
4. **Stop:** Double-click `stop-all-servers.bat` when done

### Email Testing:

Run in PowerShell:
```powershell
node test-email.js          # Test email config
node test-contact-form.js   # Test contact form API
```

---

## 🔗 URLs to Remember

- **Website:** http://localhost:8000
- **Email API:** http://localhost:3000/api/contact
- **Registration API:** http://localhost:3000/api/register
- **Health Check:** http://localhost:3000/api/health

---

## ✅ Success Checklist

Before deploying, verify:
- [ ] Both servers start without errors
- [ ] Website loads at http://localhost:8000
- [ ] Contact form works (check SPAM)
- [ ] Registration form works (check SPAM)
- [ ] Navigation highlighting works
- [ ] All pages load correctly
- [ ] Mobile menu works
- [ ] Forms validate input

---

**Made Easy! Just double-click `start-all-servers.bat` and you're ready to go!** 🚀
