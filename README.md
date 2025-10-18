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

### 🔒 Security Features
- ✅ **Environment Variables** - Sensitive data protected with `.env`
- ✅ **Gitignore Configuration** - Password and credentials never committed
- ✅ **Gmail App Passwords** - Secure authentication without exposing main password
- ✅ **Input Sanitization** - Protected against common vulnerabilities

---

## 🛠️ Built With

### Front-End Technologies
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) **HTML5** - Semantic markup
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) **CSS3** - Custom styles with CSS variables
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) **Vanilla JavaScript** - No frameworks, pure JS
- ![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=flat-square&logo=google&logoColor=white) **Inter & Montserrat** - Modern typography
- ![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=flat-square&logo=fontawesome&logoColor=white) **Font Awesome 6** - Icon library

### Back-End Technologies
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) **Node.js** - JavaScript runtime
- ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) **Express.js** - Web application framework
- ![Nodemailer](https://img.shields.io/badge/Nodemailer-0F9DCE?style=flat-square&logo=mail.ru&logoColor=white) **Nodemailer** - Email sending functionality
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
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
PORT=3000
```

⚠️ **Important:**
- Use your Gmail address for `EMAIL_USER`
- Use the App Password (NOT your regular password) for `EMAIL_PASS`
- Keep the spaces in the App Password
- Never commit `.env` to Git (already in `.gitignore`)

---

## 💻 Usage

### Running the Application

#### Start the Email Server

```bash
npm start
```

The server will run on `http://localhost:3000`

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

## 📁 Project Structure

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
- [ ] User authentication system
- [ ] Admin dashboard
- [ ] Event management system
- [ ] Online payment integration
- [ ] Member portal
- [ ] Live score updates
- [ ] Photo upload feature
- [ ] Newsletter subscription
- [ ] Social media integration
- [ ] PWA (Progressive Web App) support

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ for APU Tigers Basketball Club**

[⬆ Back to Top](#-apu-tigers-basketball-club-website)

</div>
