# 🏀 APU Tigers Basketball Club Website

<div align="center">
  
  ![Basketball](https://img.shields.io/badge/Sport-Basketball-orange?style=for-the-badge)
  ![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
  ![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
  
  **A modern, responsive website for the APU Tigers Basketball Club with integrated email functionality**
  
  [View Demo](#) • [Report Bug](https://github.com/ashimpoudel01/APU-Tigers-Basketball/issues) • [Request Feature](https://github.com/ashimpoudel01/APU-Tigers-Basketball/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Email Server Setup](#email-server-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About The Project

The **APU Tigers Basketball Club Website** is a comprehensive web platform designed to showcase the club's achievements, facilitate member registration, and enable easy communication between prospective members and the organization. Built with modern web technologies, it features a fully functional email server for contact forms and registration submissions.

### Why This Project?

- 🏆 **Showcase Excellence**: Highlight the club's achievements, team members, and success stories
- 📧 **Streamlined Communication**: Integrated email system for instant contact and registration
- 📱 **Mobile-First Design**: Fully responsive layout that works on all devices
- 🎨 **Professional Aesthetics**: Clean, modern design with smooth animations and transitions
- ⚡ **Performance Optimized**: Fast loading times and efficient code structure

---

## ✨ Features

### 🎨 Front-End Features
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Dynamic Navigation** - Active page highlighting and smooth menu transitions
- ✅ **Hero Carousel** - Auto-rotating image slider on the homepage
- ✅ **Smooth Animations** - Reveal-on-scroll effects and hover interactions
- ✅ **Interactive Components** - Cards, buttons, and forms with micro-interactions
- ✅ **Statistics Counter** - Animated counting numbers for club achievements
- ✅ **Image Gallery** - Showcase team photos and events
- ✅ **News Section** - Latest updates and announcements
- ✅ **Events Calendar** - Upcoming matches and training sessions
- ✅ **Team Profiles** - Dedicated pages for players and coaches

### 📧 Back-End Features
- ✅ **Email Server** - Node.js + Express + Nodemailer integration
- ✅ **Contact Form** - Instant email notifications for inquiries
- ✅ **Registration System** - Complete member registration with email confirmations
- ✅ **Form Validation** - Client and server-side validation
- ✅ **CORS Enabled** - Secure cross-origin requests
- ✅ **Environment Variables** - Secure credential management
- ✅ **Error Handling** - Comprehensive error messages and logging

### 🔐 Authentication & User Management
- ✅ **User Registration** - Sign up with email, password, and full name
- ✅ **Email Verification** - Verify email address via secure token link (24-hour expiry)
- ✅ **User Login** - Session-based authentication with secure cookies
- ✅ **Password Reset** - Forgot password flow with email-based reset (1-hour expiry)
- ✅ **User Dashboard** - Personalized dashboard for logged-in members
- ✅ **Session Management** - 7-day persistent sessions with HTTP-only cookies
- ✅ **Profile Dropdown** - Dynamic navigation with user initials and name
- ✅ **Dual Database Support** - SQLite (development) + PostgreSQL (production)

### 🛡️ Admin Panel Features
- ✅ **Role-Based Access Control** - Admin, Moderator, and User roles
- ✅ **User Management Dashboard** - View, edit, delete, and verify users
- ✅ **Search & Filter** - Instant search across all user fields
- ✅ **User Analytics** - Total users, verified users, active today, new this month
- ✅ **Bulk Operations** - Manage multiple users efficiently
- ✅ **Role Assignment** - Promote users to admin or moderator
- ✅ **Email Verification** - Manually verify user emails
- ✅ **User Editing** - Update name, email, role, and verification status
- ✅ **Admin API Routes** - RESTful endpoints for all admin operations
- ✅ **Responsive Admin UI** - Works on desktop, tablet, and mobile
- ✅ **Color-Coded Badges** - Visual role and status indicators
- ✅ **Real-Time Stats** - Live analytics dashboard

### 🔒 Security Features
- ✅ **Bcrypt Password Hashing** - Passwords never stored in plain text (10 salt rounds)
- ✅ **Parameterized SQL Queries** - Protection against SQL injection attacks
- ✅ **Email Verification** - Ensures valid email addresses for all accounts
- ✅ **Token-Based Reset** - Secure password reset with single-use tokens
- ✅ **Session Security** - HTTP-only cookies, secure session management
- ✅ **Environment Variables** - Sensitive data protected with `.env`
- ✅ **Gitignore Configuration** - Credentials and database files never committed
- ✅ **Gmail App Passwords** - Secure authentication without exposing main password
- ✅ **Input Validation** - Client and server-side validation and sanitization

---

## 🛠️ Built With

### Front-End Technologies
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) **HTML5** - Semantic markup
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) **CSS3** - Custom styles with CSS variables
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) **Vanilla JavaScript** - No frameworks, pure JS
- ![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=flat-square&logo=google&logoColor=white) **Inter & Montserrat** - Modern typography
- ![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=flat-square&logo=fontawesome&logoColor=white) **Font Awesome 6** - Icon library

### Back-End Technologies
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) **Node.js v18+** - JavaScript runtime
- ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) **Express.js v4.18** - Web application framework
- ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white) **SQLite3** - Development database
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) **PostgreSQL** - Production database
- ![Nodemailer](https://img.shields.io/badge/Nodemailer-0F9DCE?style=flat-square&logo=mail.ru&logoColor=white) **Nodemailer** - Email sending functionality
- **bcrypt** - Password hashing (10 salt rounds)
- **express-session** - Session management
- **dotenv** - Environment variable management
- **body-parser** - Request body parsing
- **cors** - Cross-origin resource sharing

### Development Tools
- ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) **Git** - Version control
- ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) **GitHub** - Code hosting
- ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white) **VS Code** - Code editor

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
  ```bash
  node --version
  ```

- **npm** (comes with Node.js)
  ```bash
  npm --version
  ```

- **Git**
  ```bash
  git --version
  ```

- **A Gmail Account** (for email functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashimpoudel01/APU-Tigers-Basketball.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd APU-Tigers-Basketball
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env
   ```

5. **Configure your email credentials** (see [Email Server Setup](#email-server-setup))

### Email Server Setup

#### Step 1: Enable 2-Step Verification on Gmail

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Follow the setup wizard

#### Step 2: Generate App Password

1. After enabling 2-Step Verification, go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select:
   - **App:** Mail
   - **Device:** Windows Computer (or Other)
3. Click **Generate**
4. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)

#### Step 3: Update `.env` File

Open `.env` and add your credentials:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx

# Base URL (for email links)
BASE_URL=http://localhost:3000

# Session Secret (generate a random string)
SESSION_SECRET=your_random_secret_key_min_32_chars

# Server Port
PORT=3000
NODE_ENV=development

# Database (SQLite auto-configured for development)
# For production PostgreSQL, add:
# DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

⚠️ **Important:**
- Use your Gmail address for `EMAIL_USER`
- Use the App Password (NOT your regular password) for `EMAIL_PASS`
- Keep the spaces in the App Password
- Generate a secure `SESSION_SECRET` (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- Never commit `.env` to Git (already in `.gitignore`)

---

## 💻 Usage

### Running the Application

#### Start the Server

```bash
npm start
```

The server will run on `http://localhost:3000`

### 🔐 Authentication Features

#### User Registration & Login
1. Navigate to the **Join Now** button in the navigation
2. Fill out the signup form with:
   - Email address
   - Password (minimum 6 characters)
   - Full name
3. Check your email for verification link
4. Click the verification link (valid for 24 hours)
5. Login with your credentials at `/login.html`
6. Access your personalized dashboard at `/dashboard.html`

#### Password Reset Flow
1. Click **Forgot Password?** on the login page
2. Enter your email address
3. Check your email for reset link (valid for 1 hour)
4. Click the link and enter new password
5. Login with your new password

### 🛡️ Admin Panel Setup & Usage

#### Creating Your First Admin User

After setting up the application:

**Option 1: Using the CLI Tool** (Recommended)
```bash
# Promote an existing user to admin
node make-admin.js your-email@example.com
```

**Option 2: Manual Database Update**
```bash
# For SQLite
sqlite3 users.sqlite
UPDATE users SET role = 'admin', is_admin = 1, email_verified = 1 WHERE email = 'your@email.com';
.exit

# For PostgreSQL
psql -d apu_tigers
UPDATE users SET role = 'admin', is_admin = TRUE, email_verified = TRUE WHERE email = 'your@email.com';
\q
```

**Option 3: Verify Setup**
```bash
# Check admin status
node test-admin-setup.js
```

#### Accessing the Admin Panel

1. **Login** to your account at `/login.html`
2. After login, your profile dropdown will show **🛡️ Admin Panel** link
3. Click it to access: `/admin.html`

**Important:** You MUST logout and login again after being promoted to admin for the session to refresh with admin privileges.

#### Admin Panel Features

**📊 User Management Tab:**
- View all registered users in a sortable table
- **Search:** Instant search by name or email
- **Edit User:** Update name, email, role, verification status
- **Delete User:** Remove accounts with confirmation
- **Verify Email:** Manually verify user emails
- **Assign Roles:** Promote to admin or moderator

**📈 Analytics Tab:**
- **Total Users:** Count of all registered users
- **Verified Users:** Users with verified emails
- **Active Today:** Users who logged in today
- **New This Month:** Recent registrations

**📰 Content Management Tab:** (Coming Soon)
- Photo gallery upload
- News article editor
- Event calendar management
- Achievement tracking

**⚙️ Settings Tab:** (Coming Soon)
- Site configuration
- Email template editor
- Registration controls
- Maintenance mode

#### Admin API Endpoints

All admin endpoints require authentication and admin role:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | List all users |
| GET | `/api/admin/users/:id` | Get single user details |
| PUT | `/api/admin/users/:id` | Update user info |
| DELETE | `/api/admin/users/:id` | Delete user account |
| POST | `/api/admin/users/:id/verify` | Verify user email |
| GET | `/api/admin/analytics` | Get dashboard statistics |

**Example API Usage:**
```javascript
// Get all users (requires admin session)
fetch('/api/admin/users')
  .then(res => res.json())
  .then(users => console.log(users));

// Update user role
fetch('/api/admin/users/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    role: 'moderator',
    email_verified: 1
  })
});
```

#### Troubleshooting Admin Access

**Problem: "Access denied. Admin privileges required."**

**Solution:**
1. Verify you're promoted in database: `node test-admin-setup.js`
2. **Logout** completely from the website
3. **Clear browser cookies** (or use incognito/private window)
4. **Login again** with your admin account
5. Now access `/admin.html`

**Why:** Your browser session was created before you became admin. Logging in again creates a fresh session with admin privileges.

**Debug Tools:**
```bash
# Check database status
node test-admin-setup.js

# Fix admin access issues
node fix-admin-access.js

# View session data
# Open http://localhost:3000/debug-session.html in browser
```

### 📊 Database Management

#### SQLite (Development - Default)
- Automatically creates `users.sqlite` and `sessions.sqlite`
- No configuration needed
- View data with: [DB Browser for SQLite](https://sqlitebrowser.org/)

#### PostgreSQL (Production)
```bash
# Install PostgreSQL client
npm install pg connect-pg-simple

# Set DATABASE_URL in .env
DATABASE_URL=postgresql://username:password@localhost:5432/apu_tigers

# Run schema setup
psql -U username -d apu_tigers -f schema.sql
```

See [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed PostgreSQL setup instructions.

#### Start the Web Server

In a new terminal:

```bash
# Using Python 3
python -m http.server 8000

# OR using Python 2
python -m SimpleHTTPServer 8000
```

The website will be available at `http://localhost:8000`

#### Access the Website

Open your browser and navigate to:
```
http://localhost:8000
```

### Testing Email Functionality

#### Test Contact Form
```bash
node test-contact-form.js
```

#### Test Email Configuration
```bash
node test-email.js
```

### Available Pages

- **Home** (`index.html`) - Main landing page with hero carousel
- **About** (`about.html`) - Club history and mission
- **Team** (`team.html`) - Player and coach profiles
- **Achievements** (`achievements.html`) - Trophies and awards
- **Events** (`events.html`) - Upcoming matches and activities
- **Schedule** (`schedule.html`) - Training and match schedule
- **Training** (`training.html`) - Training programs information
- **News** (`news.html`) - Latest club news
- **Gallery** (`gallery.html`) - Photo gallery
- **Resources** (`resources.html`) - Documents and materials
- **Contact** (`contact.html`) - Contact form
- **FAQ** (`faq.html`) - Frequently asked questions
- **Register** (`register.html`) - Member registration form

---

## 🔐 User Authentication System

The APU Tigers website now includes a complete **user authentication system** with SQL database support, session-based authentication, password hashing, and a fully styled user interface that matches the website's design.

### 🎨 Features

- ✅ **SQL Database Support** - PostgreSQL (production) or SQLite (development)
- ✅ **Secure Authentication** - bcrypt password hashing with 10 salt rounds
- ✅ **Parameterized Queries** - SQL injection protection
- ✅ **Session Management** - Express sessions with persistent storage
- ✅ **Responsive Design** - Mobile-first UI matching the website's brand
- ✅ **User Dashboard** - Personalized member dashboard
- ✅ **Production Ready** - Environment-based configuration

### 📄 Authentication Pages

- **Sign Up** (`signup.html`) - Create a new account with email, password, and full name
- **Log In** (`login.html`) - Authenticate existing users
- **Dashboard** (`dashboard.html`) - Protected member area with user info and quick links

### 🔌 API Endpoints

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/api/signup` | `{ email, password, fullName }` | Create new user account |
| POST | `/api/login` | `{ email, password }` | Authenticate and create session |
| POST | `/api/logout` | - | Destroy current session |
| GET | `/api/me` | - | Get current authenticated user |

### 🚀 Usage

1. **Start the server** (if not already running):
   ```bash
   npm start
   ```

2. **Access the authentication pages**:
   - Sign Up: `http://localhost:3000/signup.html`
   - Log In: `http://localhost:3000/login.html`
   - Dashboard: `http://localhost:3000/dashboard.html`

3. **Create a test account**:
   - Navigate to the Sign Up page
   - Enter your details (email, password, full name)
   - Click "Create Account"
   - You'll be redirected to your dashboard

### 🗄️ Database Schema

**Users Table**:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,                -- PostgreSQL: SERIAL, SQLite: INTEGER AUTOINCREMENT
  email VARCHAR(255) UNIQUE NOT NULL,   -- User email (unique)
  password_hash VARCHAR(255) NOT NULL,  -- Bcrypt hashed password
  full_name VARCHAR(255),               -- User's full name (optional)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

**Database Options:**
- **SQLite** (Development) - Stored in `users.sqlite` (auto-created)
- **PostgreSQL** (Production) - Connection via `DATABASE_URL` environment variable
- **Role Column** - Added `role` field for admin/moderator/user distinction

See [`DATABASE_SETUP.md`](DATABASE_SETUP.md) for complete SQL setup instructions.

### 🔒 Security Features

- ✅ **Password Hashing** - Bcrypt with 10 salt rounds (passwords never stored in plain text)
- ✅ **SQL Injection Protection** - All queries use parameterized statements
- ✅ **Session Security** - HTTP-only cookies, 7-day expiration with rolling refresh
- ✅ **Input Validation** - Email format and password strength checks
- ✅ **Error Handling** - No sensitive data exposed in error messages
- ✅ **Role-Based Access** - Middleware protection for admin routes
- ✅ **CORS Protection** - Controlled cross-origin requests

**Production Configuration** (`.env`):
```env
# Required
SESSION_SECRET=your-long-random-secret-here
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Recommended
NODE_ENV=production
```

**Additional Security Recommendations:**
- Enable HTTPS and set `cookie.secure = true`
- Add rate limiting on authentication endpoints
- Implement CSRF protection for forms
- Use strong `SESSION_SECRET` (generate with `openssl rand -base64 32`)
- Regular security audits with `npm audit`

### 🎯 Integration with Navigation

The authentication pages include:
- **Full navigation bar** (loaded from `nav.html`)
- **Consistent styling** (uses `styles.css` design tokens)
- **Responsive footer** matching other pages
- **Brand colors** (Deep Blue primary, Orange secondary)
- **Typography** (Poppins + Open Sans fonts)


---

## �📁 Project Structure

```
APU-Tigers-Basketball/
├── assets/                          # Images and media files
│   ├── logo.jpeg
│   ├── hero-basketball-1.jpg
│   ├── hero-basketball-2.jpg
│   ├── hero-basketball-3.jpg
│   ├── facility.jpg
│   ├── team-spirit.jpg
│   └── trophy.jpg
├── *.html                           # HTML pages
├── styles.css                       # Main stylesheet
├── script.js                        # Main JavaScript file
├── nav.html                         # Shared navigation component
├── server.js                        # Express email server
├── package.json                     # Node.js dependencies
├── .env                            # Environment variables (not in repo)
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
├── start-server.bat                # Quick start script for Windows
├── test-email.js                   # Email test script
├── test-contact-form.js            # Contact form test script
├── README.md                       # This file
├── EMAIL_SETUP_GUIDE.md           # Detailed email setup
├── EMAIL_SERVER_README.md         # Email server quick start
├── GITHUB_PUSH_GUIDE.md           # GitHub deployment guide
├── TESTING_GUIDE.md               # Testing instructions
├── DEBUG_STEPS.md                 # Debugging help
└── ACTIVE_NAV_FEATURE.md          # Navigation feature docs
```

---

## 🌐 Deployment

### Deploy to GitHub Pages (Static Site Only)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Enable GitHub Pages**
   - Go to repository settings
   - Navigate to "Pages"
   - Select "master" branch
   - Click "Save"

3. **Access your site**
   ```
   https://ashimpoudel01.github.io/APU-Tigers-Basketball/
   ```

⚠️ **Note:** GitHub Pages only serves static files. Email functionality requires a backend server.

### Deploy Email Server (Backend)

For full functionality including email forms, deploy the backend to:

- **Heroku** ([Guide](https://devcenter.heroku.com/articles/deploying-nodejs))
- **Vercel** ([Guide](https://vercel.com/docs/frameworks/nodejs))
- **Railway** ([Guide](https://docs.railway.app/deploy/deployments))
- **DigitalOcean App Platform** ([Guide](https://docs.digitalocean.com/products/app-platform/))

After deployment, update the fetch URLs in `script.js`:

```javascript
// Change from:
const response = await fetch('http://localhost:3000/api/contact', {

// To:
const response = await fetch('https://your-backend-url.com/api/contact', {
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Ideas

- 🎨 Improve UI/UX design
- 📱 Enhance mobile responsiveness
- ⚡ Optimize performance
- 🐛 Fix bugs
- 📝 Improve documentation
- 🌐 Add internationalization (i18n)
- ♿ Improve accessibility
- 🔒 Enhance security

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

```
MIT License

Copyright (c) 2025 APU Tigers Basketball Club

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact

**APU Tigers Basketball Club**
- 📧 Email: tigers@apu.edu.my
- 🌐 Website: [APU Tigers Basketball](https://github.com/ashimpoudel01/APU-Tigers-Basketball)
- 📱 Phone: +60 3-8996 1000
- 📍 Location: Asia Pacific University, Technology Park Malaysia

**Project Maintainer**
- GitHub: [@ashimpoudel01](https://github.com/ashimpoudel01)
- Repository: [APU-Tigers-Basketball](https://github.com/ashimpoudel01/APU-Tigers-Basketball)

---

## 🙏 Acknowledgments

### Resources & Inspiration
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Typography
- [Nodemailer](https://nodemailer.com/) - Email functionality
- [Express.js](https://expressjs.com/) - Web framework
- [MDN Web Docs](https://developer.mozilla.org/) - Documentation

### Special Thanks
- Asia Pacific University for supporting student organizations
- All club members and contributors
- The basketball community for inspiration

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/ashimpoudel01/APU-Tigers-Basketball?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/ashimpoudel01/APU-Tigers-Basketball?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/ashimpoudel01/APU-Tigers-Basketball?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ashimpoudel01/APU-Tigers-Basketball?style=flat-square)

---

## 🗺️ Roadmap

- [x] Initial website design
- [x] Responsive layout
- [x] Email server integration
- [x] Contact form functionality
- [x] Registration system
- [x] Active navigation highlighting
- [x] User authentication system ✅
- [x] Email verification system ✅
- [x] Password reset functionality ✅
- [x] User dashboard ✅
- [x] Admin control panel ✅
- [x] Role-based access control ✅
- [x] User management (CRUD) ✅
- [x] Database migration system ✅
- [ ] Event management system
- [ ] Online payment integration
- [ ] Member portal enhancements
- [ ] Live score updates
- [ ] Photo upload feature
- [ ] Newsletter subscription
- [ ] Social media integration
- [ ] PWA (Progressive Web App) support
- [ ] Content management system (CMS)
- [ ] Analytics dashboard enhancements

---

## 📊 Admin Panel Quick Reference

### 🚀 Setup Commands

```bash
# Create first admin user
node make-admin.js your@email.com

# Verify admin setup
node test-admin-setup.js

# Troubleshoot access issues
node fix-admin-access.js
```

### 🔗 Admin URLs

- **Admin Panel:** `http://localhost:3000/admin.html`
- **Debug Session:** `http://localhost:3000/debug-session.html`
- **Login:** `http://localhost:3000/login.html`

### 🎯 Admin Features Checklist

- ✅ User management table (view, search, sort)
- ✅ Edit user details (name, email, role)
- ✅ Delete users with confirmation
- ✅ Manual email verification
- ✅ Role assignment (user/admin/moderator)
- ✅ Real-time analytics (4 stat cards)
- ✅ Responsive design (desktop/tablet/mobile)
- ✅ Secure API routes with middleware
- ✅ Color-coded status badges
- ✅ Session-based authentication

### 📚 Related Documentation

- **Full Admin Guide:** [ADMIN_SETUP_COMPLETE.md](ADMIN_SETUP_COMPLETE.md)
- **Admin Panel Manual:** [ADMIN_PANEL_GUIDE.md](ADMIN_PANEL_GUIDE.md)
- **Authentication Docs:** [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md)
- **Database Setup:** [DATABASE_SETUP.md](DATABASE_SETUP.md)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ for APU Tigers Basketball Club**

[⬆ Back to Top](#-apu-tigers-basketball-club-website)

</div>
