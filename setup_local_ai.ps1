# Automated Setup Script for Ultra-Lightweight Local AI (Ollama + Qwen 2.5:1.5B)
# Target RAM Footprint: 1.5 GB - 2.0 GB RAM

Write-Host "Starting Local AI Setup (Target: 1.5 - 2.0 GB RAM)..."

$wingetPath = Get-Command winget -ErrorAction SilentlyContinue
if (-not $wingetPath) {
    Write-Host "winget is not installed. Please install Ollama manually from https://ollama.com"
    exit 1
}

$ollamaPath = Get-Command ollama -ErrorAction SilentlyContinue
if (-not $ollamaPath) {
    Write-Host "Installing Ollama via winget..."
    winget install Ollama.Ollama --accept-source-agreements --accept-package-agreements
} else {
    Write-Host "Ollama is already installed."
}

$ollamaRunning = Get-Process -Name "ollama" -ErrorAction SilentlyContinue
if (-not $ollamaRunning) {
    Write-Host "Starting Ollama..."
    Start-Process -FilePath "ollama" -ArgumentList "app" -WindowStyle Hidden
    Start-Sleep -Seconds 3
}

Write-Host "Pulling qwen2.5:1.5b model (Consumes ~1.4 GB - 1.8 GB RAM)..."
ollama pull qwen2.5:1.5b

Write-Host "Local AI Setup Complete! qwen2.5:1.5b ready."
