# How to Push to GitHub

## ⚠️ IMPORTANT - Before Pushing!

Your `.env` file contains your **email password**. We MUST NOT push this to GitHub!

The `.gitignore` file is already set up to protect it, but let's verify.

---

## Step-by-Step Guide to Push to GitHub

### Step 1: Verify .gitignore
The `.gitignore` file should already protect your sensitive files.

### Step 2: Check Git Status
Open PowerShell and run:
```powershell
git status
```

This shows which files will be committed.

### Step 3: Add All Files
```powershell
git add .
```

### Step 4: Verify .env is NOT Added
Run this to make sure .env is ignored:
```powershell
git status
```

**IMPORTANT:** You should NOT see `.env` in the list!
- If you see `.env`, STOP and tell me!

### Step 5: Commit Your Changes
```powershell
git commit -m "Add email server with Nodemailer for contact and registration forms"
```

### Step 6: Push to GitHub
```powershell
git push origin master
```

Or if your branch is named 'main':
```powershell
git push origin main
```

---

## Quick Commands (Copy-Paste All):

```powershell
# Check what will be committed
git status

# Add all files
git add .

# Verify .env is NOT in the list
git status

# Commit with a message
git commit -m "Add email server with Nodemailer for contact and registration forms"

# Push to GitHub
git push origin master
```

---

## What Gets Pushed:

✅ server.js (email server)
✅ package.json (dependencies)
✅ .gitignore (protection file)
✅ .env.example (template)
✅ contact.html (updated form)
✅ script.js (form handlers)
✅ test-email.js (test script)
✅ test-contact-form.js (test script)
✅ All documentation files (*.md)
✅ All HTML, CSS, JS files
✅ All assets

❌ .env (YOUR PASSWORD - PROTECTED!)
❌ node_modules/ (too large, protected)
❌ package-lock.json (optional)

---

## After Pushing to GitHub:

### On Another Computer/Server:
1. Clone the repository:
   ```bash
   git clone https://github.com/ashimpoudel01/my_website.git
   cd my_website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` with your email credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3000
   ```

5. Start the server:
   ```bash
   npm start
   ```

---

## Troubleshooting:

### If git says "not a git repository":
```powershell
git init
git remote add origin https://github.com/ashimpoudel01/my_website.git
```

### If push is rejected:
```powershell
git pull origin master --rebase
git push origin master
```

### If .env accidentally gets added:
```powershell
git rm --cached .env
git commit -m "Remove .env from tracking"
git push origin master
```

---

## Security Checklist Before Pushing:

- [ ] `.gitignore` exists and includes `.env`
- [ ] `.env` is NOT shown in `git status`
- [ ] `node_modules/` is NOT shown in `git status`
- [ ] `.env.example` has placeholder values (not real password)

---

## Ready to Push?

Run these commands one by one and tell me if you see any errors:

```powershell
git status
git add .
git status
git commit -m "Add email server with Nodemailer for contact and registration forms"
git push origin master
```

Let me know if you encounter any issues!
