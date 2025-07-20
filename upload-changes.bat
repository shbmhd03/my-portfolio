@echo off
echo Starting git upload process...

echo Adding all files...
git add .

echo Committing changes...
git commit -m "Update .gitignore and other changes"

echo Pushing to GitHub...
git push origin main

echo Upload complete!
pause
