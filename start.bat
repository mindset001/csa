@echo off
echo ========================================
echo  Cyber Safety Alliance - Starting Servers
echo ========================================
echo.

echo Starting Backend Server...
cd backend
start "Backend API" cmd /k "npm start"
cd ..

echo.
echo Waiting for backend to initialize...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend React App" cmd /k "npm run dev"

echo.
echo ========================================
echo  Servers Started!
echo ========================================
echo.
echo Backend API:  http://localhost:5000
echo Frontend App: http://localhost:3000
echo Admin Login:  http://localhost:3000/admin/login
echo.
echo Press any key to close this window...
pause > nul
