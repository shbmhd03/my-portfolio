#!/usr/bin/env powershell

# Dynamic Portfolio Deployment Script for Netlify
# This script handles the complete deployment of the dynamic portfolio system

Write-Host "=== Dynamic Portfolio Deployment Script ===" -ForegroundColor Cyan
Write-Host "Deploying dynamic portfolio with Netlify Functions..." -ForegroundColor Green

# Check if Netlify CLI is installed
try {
    $netlifyVersion = netlify --version
    Write-Host "Netlify CLI found: $netlifyVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Netlify CLI not found. Installing..." -ForegroundColor Red
    npm install -g netlify-cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install Netlify CLI. Please install manually: npm install -g netlify-cli" -ForegroundColor Red
        exit 1
    }
}

# Check if user is logged in to Netlify
Write-Host "Checking Netlify authentication..." -ForegroundColor Yellow
$authStatus = netlify status 2>&1
if ($authStatus -like "*Not logged in*") {
    Write-Host "Please log in to Netlify..." -ForegroundColor Yellow
    netlify login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to authenticate with Netlify" -ForegroundColor Red
        exit 1
    }
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "Building the project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed" -ForegroundColor Red
    exit 1
}

# Check if this is a new site or existing
$netlifyConfigExists = Test-Path ".netlify"

if (-not $netlifyConfigExists) {
    Write-Host "Initializing new Netlify site..." -ForegroundColor Yellow
    netlify init
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to initialize Netlify site" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Using existing Netlify site configuration..." -ForegroundColor Green
}

# Deploy to production
Write-Host "Deploying to production..." -ForegroundColor Yellow
netlify deploy --prod
if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment failed" -ForegroundColor Red
    exit 1
}

Write-Host "=== Deployment Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your dynamic portfolio is now live!" -ForegroundColor Green
Write-Host "Features deployed:" -ForegroundColor Yellow
Write-Host "  ✅ Dynamic content loading" -ForegroundColor Green
Write-Host "  ✅ Serverless functions for content management" -ForegroundColor Green
Write-Host "  ✅ Enhanced admin panel at /admin" -ForegroundColor Green
Write-Host "  ✅ Legacy admin panel at /web-admin" -ForegroundColor Green
Write-Host "  ✅ Global maintenance mode system" -ForegroundColor Green
Write-Host "  ✅ Real-time content updates" -ForegroundColor Green
Write-Host "  ✅ Responsive design" -ForegroundColor Green
Write-Host ""

# Get site URL
$siteInfo = netlify status --json | ConvertFrom-Json
if ($siteInfo.site_url) {
    Write-Host "Site URL: $($siteInfo.site_url)" -ForegroundColor Cyan
    Write-Host "Admin Panel: $($siteInfo.site_url)/admin" -ForegroundColor Cyan
    Write-Host "Legacy Admin: $($siteInfo.site_url)/web-admin" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Test your site functionality" -ForegroundColor White
Write-Host "  2. Access the admin panel to manage content" -ForegroundColor White
Write-Host "  3. Configure custom domain if needed" -ForegroundColor White
Write-Host "  4. Set up analytics and monitoring" -ForegroundColor White
Write-Host ""
Write-Host "For troubleshooting, check:" -ForegroundColor Yellow
Write-Host "  - Netlify function logs in your dashboard" -ForegroundColor White
Write-Host "  - Browser console for any errors" -ForegroundColor White
Write-Host "  - DYNAMIC_SYSTEM.md for complete documentation" -ForegroundColor White

Read-Host "Press Enter to exit..."
