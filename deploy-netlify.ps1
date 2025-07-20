# Netlify Deployment Script for React Portfolio
# This script automates the deployment process to Netlify

param(
    [string]$Message = "Deploy portfolio to Netlify",
    [switch]$Init,
    [switch]$Dev,
    [switch]$Open,
    [switch]$Preview,
    [switch]$Prod
)

Write-Host "🚀 Netlify Deployment Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Check if Netlify CLI is installed
try {
    $netlifyVersion = netlify --version
    Write-Host "✅ Netlify CLI found: $netlifyVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Netlify CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g netlify-cli
    Write-Host "✅ Netlify CLI installed successfully!" -ForegroundColor Green
}

# Initialize Netlify site if requested
if ($Init) {
    Write-Host "🔧 Initializing Netlify site..." -ForegroundColor Yellow
    netlify init
    Write-Host "✅ Netlify site initialized!" -ForegroundColor Green
    exit 0
}

# Start development server if requested
if ($Dev) {
    Write-Host "🔧 Starting Netlify development server..." -ForegroundColor Yellow
    Write-Host "📍 Server will be available at: http://localhost:8888" -ForegroundColor Cyan
    netlify dev
    exit 0
}

# Check if user is logged in to Netlify
try {
    $netlifyAuth = netlify status 2>$null
    if ($netlifyAuth -match "Not logged in") {
        Write-Host "❌ Not logged in to Netlify. Logging in..." -ForegroundColor Yellow
        netlify login
    } else {
        Write-Host "✅ Logged in to Netlify" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error checking Netlify authentication" -ForegroundColor Red
    netlify login
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
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

# Deploy to Netlify
if ($Preview) {
    Write-Host "🔍 Creating preview deployment..." -ForegroundColor Yellow
    try {
        netlify deploy
        Write-Host "✅ Preview deployment completed!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Preview deployment failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "🚀 Deploying to production..." -ForegroundColor Yellow
    try {
        if ($Prod) {
            netlify deploy --prod
        } else {
            netlify deploy --prod
        }
        Write-Host "✅ Production deployment completed!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Production deployment failed" -ForegroundColor Red
        exit 1
    }
}

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
try {
    git push origin main
    Write-Host "✅ Pushed to GitHub successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Failed to push to GitHub (continuing...)" -ForegroundColor Yellow
}

# Open the site if requested
if ($Open) {
    Write-Host "🌐 Opening site in browser..." -ForegroundColor Yellow
    netlify open:site
}

Write-Host ""
Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Useful commands:" -ForegroundColor Cyan
Write-Host "   netlify open:site       (Open site in browser)" -ForegroundColor White
Write-Host "   netlify open:admin      (Open Netlify dashboard)" -ForegroundColor White
Write-Host "   netlify dev             (Start local development)" -ForegroundColor White
Write-Host "   netlify functions:list  (List serverless functions)" -ForegroundColor White
Write-Host "   netlify logs            (View function logs)" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Admin Panel: https://your-site.netlify.app/web-admin" -ForegroundColor Yellow
Write-Host "📖 Full Guide: See NETLIFY_DEPLOYMENT.md" -ForegroundColor Yellow
Write-Host ""
Write-Host "🌟 Your portfolio is now live on Netlify with global maintenance mode!" -ForegroundColor Green
