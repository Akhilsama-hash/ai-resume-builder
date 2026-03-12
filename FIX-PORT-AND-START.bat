@echo off
echo ========================================
echo Fixing Port 5000 Issue
echo ========================================
echo.

echo Checking what's using port 5000...
netstat -ano | findstr :5000

echo.
echo Killing the process using port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
    echo Killing process ID: %%a
    taskkill /PID %%a /F >nul 2>&1
)

echo.
echo Port 5000 should now be free!
echo.
echo Starting backend server...
echo.

cd /d "%~dp0backend"

node src/server.js

echo.
echo Press any key to exit...
pause >nul
