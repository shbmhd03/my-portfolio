@echo off
echo.
echo ==========================================
echo    REACT PORTFOLIO GITHUB UPLOAD
echo ==========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Download from: https://git-scm.com/download/win
    echo 2. Install with default settings
    echo 3. Restart this script
    echo.
    pause
    exit /b 1
)

echo [INFO] Git is installed. Proceeding...
echo.

REM Navigate to project directory
cd /d "d:\Downloads\Unison\react-portfolio-projects\my-portfolio"

echo [STEP 1] Initializing Git repository...
git init

echo [STEP 2] Adding all files...
git add .

echo [STEP 3] Creating initial commit...
git commit -m "Initial commit: Modern React Portfolio with Admin Panel

Features:
- Modern responsive design with glassmorphism effects
- Comprehensive admin panel with multi-user authentication  
- AI chatbot with professional SVG icons
- Theme toggle with custom sun/moon icons
- Skills visualization with professional icons (no emojis)
- Contact form with validation
- Blog management system
- Project showcase with live demos
- User management with password changes
- Content editing capabilities
- Professional footer and enhanced styling
- All emoji icons replaced with custom SVGs
- TypeScript and Vite for optimal performance"

echo [STEP 4] Setting main branch...
git branch -M main

echo.
echo ==========================================
echo           SETUP COMPLETE!
echo ==========================================
echo.
echo Next steps:
echo 1. Go to https://github.com
echo 2. Click 'New repository'
echo 3. Name it 'react-portfolio' (or your choice)
echo 4. DON'T initialize with README
echo 5. Click 'Create repository'
echo 6. Copy the repository URL
echo 7. Run these commands:
echo.
echo    git remote add origin YOUR_REPO_URL
echo    git push -u origin main
echo.
echo ==========================================
echo.
echo Your portfolio includes:
echo ✓ Modern React app with TypeScript
echo ✓ Admin panel with authentication
echo ✓ AI chatbot with professional icons
echo ✓ Theme toggle (SVG icons, no emojis)
echo ✓ Skills visualization (professional icons)
echo ✓ Contact form with validation
echo ✓ Blog management system
echo ✓ Responsive design
echo ✓ Professional styling and footer
echo.
pause
