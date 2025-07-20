#!/usr/bin/env powershell

Write-Host "=== GitHub Upload Script ===" -ForegroundColor Cyan
Write-Host "Uploading changes to GitHub repository..." -ForegroundColor Green

try {
    # Add all files
    Write-Host "Adding files to git..." -ForegroundColor Yellow
    git add .
    
    # Check if there are changes to commit
    $status = git status --porcelain
    if ($status) {
        Write-Host "Found changes to commit:" -ForegroundColor Green
        git status --short
        
        # Commit changes
        Write-Host "Committing changes..." -ForegroundColor Yellow
        git commit -m "Update .gitignore, add upload script, and other dynamic portfolio changes"
        
        # Push to GitHub
        Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
        git push origin main
        
        Write-Host "Successfully uploaded to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "No changes to commit. Repository is up to date." -ForegroundColor Yellow
    }
    
    # Show current status
    Write-Host "Current repository status:" -ForegroundColor Cyan
    git status
    
} catch {
    Write-Host "Error occurred: $_" -ForegroundColor Red
    Write-Host "Please check your git configuration and try again." -ForegroundColor Yellow
}

Write-Host "Upload process completed!" -ForegroundColor Cyan
Read-Host "Press Enter to exit"
