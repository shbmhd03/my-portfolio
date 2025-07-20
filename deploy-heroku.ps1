# Heroku Deployment Script for React Portfolio
# This script automates the deployment process to Heroku

param(
    [string]$AppName = "",
    [string]$Message = "Deploy portfolio to Heroku",
    [switch]$CreateApp,
    [switch]$ViewLogs,
    [switch]$Open
)

Write-Host "🚀 Heroku Deployment Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Check if Heroku CLI is installed
try {
    $herokuVersion = heroku --version
    Write-Host "✅ Heroku CLI found: $herokuVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Heroku CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "   https://devcenter.heroku.com/articles/heroku-cli" -ForegroundColor Yellow
    exit 1
}

# Check if user is logged in to Heroku
try {
    $herokuAuth = heroku auth:whoami 2>$null
    if ($herokuAuth) {
        Write-Host "✅ Logged in to Heroku as: $herokuAuth" -ForegroundColor Green
    } else {
        Write-Host "❌ Not logged in to Heroku. Logging in..." -ForegroundColor Yellow
        heroku login
    }
} catch {
    Write-Host "❌ Error checking Heroku authentication" -ForegroundColor Red
    exit 1
}

# Create new Heroku app if requested
if ($CreateApp) {
    if (-not $AppName) {
        $AppName = Read-Host "Enter app name for Heroku"
    }
    
    Write-Host "🔧 Creating Heroku app: $AppName" -ForegroundColor Yellow
    try {
        heroku create $AppName
        Write-Host "✅ Heroku app created successfully" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to create Heroku app. It might already exist." -ForegroundColor Red
    }
}

# Build the project
Write-Host "🔨 Building React project..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "✅ Build completed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Build failed. Please check for errors." -ForegroundColor Red
    exit 1
}

# Add all changes to git
Write-Host "📦 Adding changes to git..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $Message

# Deploy to Heroku
Write-Host "🚀 Deploying to Heroku..." -ForegroundColor Yellow
try {
    git push heroku main
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Deployment failed. Check the logs for details." -ForegroundColor Red
    $ViewLogs = $true
}

# View logs if requested or if deployment failed
if ($ViewLogs) {
    Write-Host "📋 Viewing deployment logs..." -ForegroundColor Yellow
    heroku logs --tail
}

# Open the app if requested
if ($Open) {
    Write-Host "🌐 Opening app in browser..." -ForegroundColor Yellow
    heroku open
}

Write-Host ""
Write-Host "🎉 Deployment script completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Useful commands:" -ForegroundColor Cyan
Write-Host "   heroku logs --tail    (View live logs)" -ForegroundColor White
Write-Host "   heroku open          (Open app in browser)" -ForegroundColor White
Write-Host "   heroku ps            (Check dyno status)" -ForegroundColor White
Write-Host "   heroku restart       (Restart app)" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Admin Panel: https://your-app.herokuapp.com/web-admin" -ForegroundColor Yellow
Write-Host "📖 Full Guide: See HEROKU_DEPLOYMENT.md" -ForegroundColor Yellow
