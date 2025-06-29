# Clean Repository for New Account
Write-Host "🧹 Cleaning repository for new GitHub account upload..." -ForegroundColor Cyan

# Remove account-specific files that shouldn't be transferred
$filesToRemove = @(
    "check-website.ps1",
    "monitor-deployment.ps1", 
    "post-jekyll-fix-monitor.ps1",
    "final-diagnosis.ps1",
    "test-deployment.html",
    ".github/workflows/test-deploy.yml"
)

Write-Host "`n🗑️ Removing temporary/diagnostic files..." -ForegroundColor Yellow
foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "✅ Removed: $file" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Not found: $file" -ForegroundColor Yellow
    }
}

# Clean up any local development artifacts
Write-Host "`n🧹 Cleaning development artifacts..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item "dist" -Recurse -Force
    Write-Host "✅ Removed: dist folder" -ForegroundColor Green
}

if (Test-Path "node_modules") {
    Write-Host "📁 node_modules folder found (will not remove - too large)" -ForegroundColor Blue
    Write-Host "   The new repository clone will run 'npm install' to recreate it" -ForegroundColor Gray
}

# Add changes to git
Write-Host "`n📝 Staging cleanup changes..." -ForegroundColor Yellow
git add -A

# Check if there are changes to commit
$changes = git status --porcelain
if ($changes) {
    git commit -m "Clean repository for new GitHub account upload

- Remove temporary diagnostic scripts
- Remove test deployment files  
- Clean development artifacts
- Prepare for fresh deployment"
    
    Write-Host "✅ Cleanup changes committed" -ForegroundColor Green
} else {
    Write-Host "✅ No cleanup needed - repository already clean" -ForegroundColor Green
}

# Show final repository state
Write-Host "`n📊 Final repository state:" -ForegroundColor Yellow
Write-Host "Files ready for new GitHub account:" -ForegroundColor White

$coreFiles = @(
    "src/",
    "public/", 
    ".github/workflows/deploy.yml",
    "package.json",
    "vite.config.ts",
    "tsconfig.json",
    ".nojekyll",
    "README.md",
    "GITHUB_UPLOAD_GUIDE.md"
)

foreach ($file in $coreFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file (missing)" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Repository cleaned and ready for new GitHub account!" -ForegroundColor Green
Write-Host "📁 Total size:" -ForegroundColor Yellow
$size = (Get-ChildItem -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "   $([math]::Round($size, 2)) MB" -ForegroundColor White

Write-Host "`n💡 Next step: Run the upload script" -ForegroundColor Cyan
Write-Host "   PowerShell -ExecutionPolicy Bypass -File 'upload-to-new-github.ps1'" -ForegroundColor Blue
