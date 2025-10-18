@echo off
echo ========================================
echo   Stopping APU Tigers Servers...
echo ========================================
echo.

:: Stop Node.js (Email Server)
echo Stopping Email Server...
taskkill /F /IM node.exe /T 2>nul
if %errorlevel% == 0 (
    echo   Email Server stopped!
) else (
    echo   Email Server was not running.
)

:: Stop Python (Web Server)
echo Stopping Web Server...
taskkill /F /IM python.exe /T 2>nul
if %errorlevel% == 0 (
    echo   Web Server stopped!
) else (
    echo   Web Server was not running.
)

echo.
echo ========================================
echo   All servers stopped!
echo ========================================
echo.
pause
