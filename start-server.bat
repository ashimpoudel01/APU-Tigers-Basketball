@echo off
echo ========================================
echo APU Tigers Basketball Club - Email Server
echo ========================================
echo.
echo Starting email server...
echo.
echo IMPORTANT: Make sure you've configured your .env file!
echo - EMAIL_USER: Your Gmail address
echo - EMAIL_PASS: Your Gmail App Password (not regular password)
echo.
echo Server will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.
node server.js
