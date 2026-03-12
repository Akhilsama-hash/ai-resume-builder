@echo off
echo ========================================
echo AI Resume Builder - Backend Server
echo ========================================
echo.
echo Starting backend server...
echo This window will stay open so you can see any errors.
echo.

cd /d "%~dp0backend"

echo Current directory: %CD%
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo ERROR: Node.js is NOT installed!
    echo ========================================
    echo.
    echo Please install Node.js:
    echo 1. Go to: https://nodejs.org/
    echo 2. Download the LTS version
    echo 3. Install it
    echo 4. Restart your computer
    echo 5. Try again
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

echo Node.js version:
node --version
echo.

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo Dependencies not found. Installing now...
    echo This may take 1-2 minutes...
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo.
        echo ========================================
        echo ERROR: Failed to install dependencies!
        echo ========================================
        echo.
        echo Press any key to exit...
        pause >nul
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully!
    echo.
)

echo Checking if server.js exists...
if not exist "src\server.js" (
    echo.
    echo ========================================
    echo ERROR: server.js not found!
    echo ========================================
    echo.
    echo Expected location: %CD%\src\server.js
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

echo.
echo ========================================
echo Starting Backend Server...
echo ========================================
echo.
echo Backend URL: http://localhost:5000
echo.
echo IMPORTANT: Keep this window open!
echo Press Ctrl+C to stop the server
echo.

node src/server.js

echo.
echo ========================================
echo Server has stopped!
echo ========================================
echo.
echo Press any key to exit...
pause >nul
