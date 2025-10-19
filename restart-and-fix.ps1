# Ultimate Admin Access Fix Script
# This will restart the server to clear all sessions

Write-Host "`n🔧 Admin Access Fix - Session Reset`n" -ForegroundColor Cyan

Write-Host "This script will:" -ForegroundColor Yellow
Write-Host "  1. Stop the Node.js server (clears all sessions)"
Write-Host "  2. Restart the server"
Write-Host "  3. You'll need to login again with fresh session`n"

$confirm = Read-Host "Continue? (yes/no)"

if ($confirm -ne "yes" -and $confirm -ne "y") {
    Write-Host "Cancelled." -ForegroundColor Red
    exit
}

Write-Host "`n📍 Step 1: Stopping all Node.js processes..." -ForegroundColor Cyan
try {
    Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
    Write-Host "✅ Server stopped" -ForegroundColor Green
    Start-Sleep -Seconds 2
} catch {
    Write-Host "⚠️  No running Node.js processes found" -ForegroundColor Yellow
}

Write-Host "`n📍 Step 2: Starting server..." -ForegroundColor Cyan
$serverPath = Join-Path $PSScriptRoot "server.js"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; Write-Host 'Starting APU Tigers Server...' -ForegroundColor Green; node server.js"

Write-Host "✅ Server starting in new window" -ForegroundColor Green
Start-Sleep -Seconds 3

Write-Host "`n📍 Step 3: Testing server..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Server is running!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Server might still be starting..." -ForegroundColor Yellow
}

Write-Host "`n✅ DONE! Next steps:" -ForegroundColor Green
Write-Host "  1. Go to: http://localhost:3000/login.html" -ForegroundColor White
Write-Host "  2. Login with: poudela2003@gmail.com" -ForegroundColor White
Write-Host "  3. Access: http://localhost:3000/admin.html" -ForegroundColor White
Write-Host "`n🚀 Your admin access should work now!`n" -ForegroundColor Cyan
