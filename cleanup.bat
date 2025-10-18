@echo off
echo ========================================
echo   Cleaning Up Unnecessary Files
echo ========================================
echo.

echo Removing test files...
if exist "test-contact-form.js" del "test-contact-form.js"
if exist "test-email.js" del "test-email.js"

echo Removing duplicate and old files...
if exist "gitignore.txt" del "gitignore.txt"
if exist "start-server.bat" del "start-server.bat"

echo Removing extra documentation...
if exist "README-HTML-VERSION.md" del "README-HTML-VERSION.md"
if exist "DEBUG_STEPS.md" del "DEBUG_STEPS.md"
if exist "TESTING_GUIDE.md" del "TESTING_GUIDE.md"
if exist "GITHUB_PUSH_GUIDE.md" del "GITHUB_PUSH_GUIDE.md"
if exist "ACTIVE_NAV_FEATURE.md" del "ACTIVE_NAV_FEATURE.md"
if exist "EMAIL_SERVER_README.md" del "EMAIL_SERVER_README.md"
if exist "EMAIL_SETUP_GUIDE.md" del "EMAIL_SETUP_GUIDE.md"

echo.
echo ========================================
echo   Cleanup Complete!
echo ========================================
echo.
echo Files Removed:
echo   - Test scripts (test-*.js)
echo   - Duplicate files (gitignore.txt)
echo   - Old scripts (start-server.bat)
echo   - Extra documentation (7 .md files)
echo.
echo Files Kept:
echo   - Essential HTML, CSS, JS files
echo   - Email server (server.js)
echo   - README.md and QUICK_START.md
echo   - LICENSE
echo   - Start/Stop scripts
echo   - Configuration files
echo.
pause
