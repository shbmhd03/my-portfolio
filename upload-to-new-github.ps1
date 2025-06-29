# Portfolio Upload Script for New GitHub Account
Write-Host "🚀 Portfolio Upload Script for New GitHub Account" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray

# Get user input
Write-Host "`n📝 Please provide the following information:" -ForegroundColor Yellow
$newUsername = Read-Host "New GitHub Username"
$newEmail = Read-Host "New GitHub Email"
$repoName = Read-Host "Repository Name (default: my-portfolio)"
$customDomain = Read-Host "Custom Domain (optional, press Enter to skip)"

# Set defaults
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "my-portfolio"
}

Write-Host "`n🔧 Configuring Git for new account..." -ForegroundColor Yellow

# Configure Git
git config user.name $newUsername
git config user.email $newEmail

Write-Host "✅ Git configured for: $newUsername <$newEmail>" -ForegroundColor Green

# Show current remote
Write-Host "`n📡 Current remote:" -ForegroundColor Yellow
git remote -v

# Remove old remote
Write-Host "`n🗑️ Removing old remote..." -ForegroundColor Yellow
try {
    git remote remove origin
    Write-Host "✅ Old remote removed" -ForegroundColor Green
} catch {
    Write-Host "⚠️ No remote to remove (this is ok)" -ForegroundColor Yellow
}

# Add new remote
$newRemoteUrl = "https://github.com/$newUsername/$repoName.git"
Write-Host "`n🔗 Adding new remote: $newRemoteUrl" -ForegroundColor Yellow
git remote add origin $newRemoteUrl

# Verify new remote
Write-Host "`n📡 New remote configuration:" -ForegroundColor Yellow
git remote -v

# Update custom domain if provided
if (-not [string]::IsNullOrWhiteSpace($customDomain)) {
    Write-Host "`n🌐 Updating custom domain configuration..." -ForegroundColor Yellow
    $customDomain | Out-File -FilePath "public/CNAME" -Encoding ascii -NoNewline
    Write-Host "✅ CNAME updated with: $customDomain" -ForegroundColor Green
    
    # Commit the domain change
    git add public/CNAME
    git commit -m "Update custom domain to $customDomain"
}

# Show repository status
Write-Host "`n📊 Repository status:" -ForegroundColor Yellow
git status --short

# Prepare for push
Write-Host "`n🚀 Ready to push to new repository!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Make sure you've created the repository on GitHub:" -ForegroundColor White
Write-Host "   https://github.com/$newUsername/$repoName" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Run the following command to push:" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor Blue
Write-Host ""
Write-Host "3. If you get authentication errors:" -ForegroundColor White
Write-Host "   - Create a Personal Access Token at:" -ForegroundColor White
Write-Host "   - https://github.com/settings/tokens" -ForegroundColor Blue
Write-Host "   - Use token as password when prompted" -ForegroundColor White
Write-Host ""
Write-Host "4. Configure GitHub Pages:" -ForegroundColor White
Write-Host "   - Go to repository Settings > Pages" -ForegroundColor White
Write-Host "   - Set Source to 'GitHub Actions'" -ForegroundColor White
Write-Host ""

if (-not [string]::IsNullOrWhiteSpace($customDomain)) {
    Write-Host "5. Your portfolio will be available at:" -ForegroundColor White
    Write-Host "   https://$customDomain" -ForegroundColor Blue
} else {
    Write-Host "5. Your portfolio will be available at:" -ForegroundColor White
    Write-Host "   https://$newUsername.github.io/$repoName" -ForegroundColor Blue
}

Write-Host ""
Write-Host "🎉 Configuration complete! Ready to upload to new GitHub account." -ForegroundColor Green

# Ask if user wants to push now
Write-Host ""
$pushNow = Read-Host "Do you want to push to the new repository now? (y/N)"
if ($pushNow -eq "y" -or $pushNow -eq "Y") {
    Write-Host "`n🚀 Pushing to new repository..." -ForegroundColor Yellow
    
    try {
        git push -u origin main
        Write-Host "✅ Successfully pushed to new repository!" -ForegroundColor Green
        Write-Host "🔗 Repository URL: https://github.com/$newUsername/$repoName" -ForegroundColor Blue
        
        Write-Host "`n⚠️ Remember to configure GitHub Pages:" -ForegroundColor Yellow
        Write-Host "1. Go to: https://github.com/$newUsername/$repoName/settings/pages" -ForegroundColor White
        Write-Host "2. Set Source to 'GitHub Actions'" -ForegroundColor White
        Write-Host "3. Save settings" -ForegroundColor White
        
    } catch {
        Write-Host "❌ Push failed. This might be due to:" -ForegroundColor Red
        Write-Host "- Repository doesn't exist on GitHub" -ForegroundColor Red
        Write-Host "- Authentication issues (need Personal Access Token)" -ForegroundColor Red
        Write-Host "- Network connectivity issues" -ForegroundColor Red
        Write-Host ""
        Write-Host "💡 Try running: git push -u origin main" -ForegroundColor Yellow
    }
} else {
    Write-Host "`n💡 When ready, run: git push -u origin main" -ForegroundColor Yellow
}
