@echo off
echo ========================================
echo   APU Tigers Basketball Club Website
echo   Starting All Servers...
echo ========================================
echo.

:: Start Email Server in new window
echo [1/2] Starting Email Server (Port 3000)...
start "APU Tigers - Email Server" cmd /k "cd /d %~dp0 && npm start"
timeout /t 2 /nobreak > nul

:: Start Web Server in new window
echo [2/2] Starting Web Server (Port 8000)...
start "APU Tigers - Web Server" cmd /k "cd /d %~dp0 && python -m http.server 8000"
timeout /t 2 /nobreak > nul

echo.
echo ========================================
echo   Servers Started Successfully!
echo ========================================
echo.
echo   Email Server: http://localhost:3000
echo   Website:      http://localhost:8000
echo.
echo   Opening website in browser...
echo ========================================
timeout /t 2 /nobreak > nul

:: Open website in default browser
start http://localhost:8000

echo.
echo   Both servers are running!
echo   Do NOT close the server windows.
echo   Press any key to close this window...
pause > nul
