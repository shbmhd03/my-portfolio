#!/usr/bin/env powershell

Write-Host "=== Netlify Configuration Fix & Redeploy ===" -ForegroundColor Cyan
Write-Host "Fixing SPA routing and redeploying your dynamic portfolio..." -ForegroundColor Green

# Build the project
Write-Host "Building the project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please check for errors." -ForegroundColor Red
    exit 1
}

Write-Host "Build successful!" -ForegroundColor Green

# Deploy to Netlify
Write-Host "Deploying to Netlify..." -ForegroundColor Yellow
netlify deploy --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment failed! Please check your Netlify configuration." -ForegroundColor Red
    exit 1
}

Write-Host "=== Deployment Complete! ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Fixed netlify.toml configuration" -ForegroundColor Green
Write-Host "✅ Removed invalid redirect conditions" -ForegroundColor Green
Write-Host "✅ Added proper SPA routing" -ForegroundColor Green
Write-Host "✅ Your React portfolio should now load correctly!" -ForegroundColor Green
Write-Host ""
Write-Host "Your website should now show your React portfolio instead of the content.js file." -ForegroundColor Yellow
Write-Host ""
Write-Host "Access your portfolio:" -ForegroundColor Cyan
Write-Host "  🌐 Main Site: Your Netlify URL" -ForegroundColor White
Write-Host "  ⚙️ Enhanced Admin: yoursite.com/admin" -ForegroundColor White
Write-Host "  🔧 Legacy Admin: yoursite.com/web-admin" -ForegroundColor White

Read-Host "Press Enter to exit"
