# Starts the FastAPI backend (port 5000) and Vite frontend in separate windows.
# The frontend already calls http://localhost:5000 — no app code changes required.
$ErrorActionPreference = "Stop"
$Root = $PSScriptRoot

$backendCmd = @"
Set-Location -LiteralPath '$Root\backend'
Write-Host 'Installing backend dependencies (if needed)...' -ForegroundColor Cyan
python -m pip install -r requirements.txt
Write-Host 'Starting FastAPI on http://localhost:5000' -ForegroundColor Green
python app.py
"@

$frontendCmd = @"
Set-Location -LiteralPath '$Root\frontend\Movie-recommend'
if (-not (Test-Path -LiteralPath 'node_modules')) {
  Write-Host 'Running npm install...' -ForegroundColor Cyan
  npm install
}
Write-Host 'Starting Vite dev server (see URL below, usually http://localhost:5173)' -ForegroundColor Green
npm run dev
"@

Start-Process powershell -ArgumentList @("-NoExit", "-Command", $backendCmd)
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList @("-NoExit", "-Command", $frontendCmd)

Write-Host ""
Write-Host "Opened two windows: backend (5000) and frontend (Vite)." -ForegroundColor Yellow
Write-Host "Open the Vite URL in your browser, then use GET RECOMMENDATIONS." -ForegroundColor Yellow
Write-Host ""
