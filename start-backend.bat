@echo off
echo ========================================
echo   Halal Stocks - Quick Start Script
echo ========================================
echo.

REM Check if backend/.env exists
if not exist "backend\.env" (
    echo [ERROR] backend\.env file not found!
    echo.
    echo Please create backend\.env file:
    echo   1. Copy backend\.env.example to backend\.env
    echo   2. Add your Finnhub API key
    echo   3. Add your MongoDB connection string
    echo.
    pause
    exit /b 1
)

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js is installed

echo.
echo [2/4] Installing backend dependencies...
cd backend
if not exist "node_modules" (
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo [SKIP] Dependencies already installed
)

echo.
echo [3/4] Starting MongoDB (if local)...
echo If using MongoDB Atlas, you can skip this step.
echo.

echo.
echo [4/4] Starting backend server...
echo.
echo ========================================
echo   Backend running on http://localhost:5000
echo   Press Ctrl+C to stop
echo ========================================
echo.

call npm start

cd ..
