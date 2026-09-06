# ==============================================================================
# AI-Based Smart Logistics & Accessibility Platform for NER (MDoNER)
# One-Click Launch Script for Windows (PowerShell)
# ==============================================================================

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " 🏔️  MDoNER SMART LOGISTICS & ACCESSIBILITY PLATFORM (NER)" -ForegroundColor Cyan
Write-Host " SIH Problem Statement 26002 | Full Prototype Launcher" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# 1. Check .env
if (-not (Test-Path ".env")) {
    Write-Host "[1/3] Creating default .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
}

# 2. Launch FastAPI Backend
Write-Host "[2/3] Starting High-Performance Python Backend (FastAPI)..." -ForegroundColor Green
$backendProcess = Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; .venv\Scripts\activate; uvicorn main:app --reload --host 127.0.0.1 --port 8000" -PassThru

Start-Sleep -Seconds 3

# 3. Launch React Vite Frontend
Write-Host "[3/3] Starting Modern Defense-Tech Frontend (Vite React)..." -ForegroundColor Green
$frontendProcess = Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev" -PassThru

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " 🎉 SYSTEM ONLINE!" -ForegroundColor Green
Write-Host " • Frontend Dashboard:  http://localhost:5173" -ForegroundColor White
Write-Host " • Backend API Docs:    http://127.0.0.1:8000/docs" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Cyan
