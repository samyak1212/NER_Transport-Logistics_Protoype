@echo off
title MDoNER Logistics & Accessibility Platform Launcher
echo ============================================================
echo   MDoNER SMART LOGISTICS & ACCESSIBILITY PLATFORM (NER)
echo   SIH Problem Statement 26002 - Full Prototype Launcher
echo ============================================================

set ROOT=%~dp0

if not exist "%ROOT%.env" (
    echo [1/3] Copying .env.example to .env...
    copy "%ROOT%.env.example" "%ROOT%.env"
)

echo [2/3] Launching FastAPI Backend on http://127.0.0.1:8000 ...
start "MDoNER Backend (FastAPI)" cmd /k "cd /d "%ROOT%backend" && call .venv\Scripts\activate && uvicorn main:app --reload --host 127.0.0.1 --port 8000"

timeout /t 3 /nobreak >nul

echo [3/3] Launching Vite React Frontend on http://localhost:5173 ...
start "MDoNER Frontend (Vite)" cmd /k "cd /d "%ROOT%frontend" && node ./node_modules/vite/bin/vite.js"

echo ============================================================
echo   SYSTEM LAUNCHED!
echo   Frontend: http://localhost:5173
echo   Swagger:  http://127.0.0.1:8000/docs
echo ============================================================
