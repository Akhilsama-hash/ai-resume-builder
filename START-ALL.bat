@echo off
echo ========================================
echo AI Resume Builder - Starting Application
echo ========================================
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul
echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"
echo.
echo ========================================
echo Servers are starting!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Wait 10 seconds, then open: http://localhost:5173
echo.
echo Press any key to exit this window...
pause >nul
