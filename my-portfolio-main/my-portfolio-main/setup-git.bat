@echo off
echo Setting up Git repository and pushing to GitHub...
echo.

REM Initialize git repository
git init

REM Add all files
git add .

REM Create initial commit
git commit -m "Initial commit: React Portfolio Website

- Modern responsive portfolio with React + TypeScript
- Dark/light mode toggle with theme switching
- Admin panel for content management
- AI chatbot integration
- Contact form with validation
- Skills visualization with progress bars
- Blog section with admin management
- Project showcase with detailed descriptions
- Glassmorphism UI effects and smooth animations
- Performance optimized with Vite build system"

echo.
echo Repository initialized and committed!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub
echo 2. Copy the repository URL
echo 3. Run: git remote add origin YOUR_REPOSITORY_URL
echo 4. Run: git branch -M main
echo 5. Run: git push -u origin main
echo.
pause
