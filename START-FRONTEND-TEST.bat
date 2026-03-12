@echo off
echo ========================================
echo Testing Frontend Server
echo ========================================
echo.

cd /d "%~dp0frontend"

echo Checking Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed
echo.

echo Checking npm installation...
npm --version
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed!
    pause
    exit /b 1
)
echo ✓ npm is installed
echo.

echo Checking if node_modules exists...
if not exist "node_modules\" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
)
echo ✓ Dependencies are installed
echo.

echo ========================================
echo Starting Frontend Server...
echo ========================================
echo.
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause
