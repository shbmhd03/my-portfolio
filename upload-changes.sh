#!/bin/bash

echo "🚀 Uploading Portfolio Changes to GitHub..."
echo ""

# Navigate to project directory
cd "d:\Downloads\Unison\New folder (2)\react-portfolio-projects\my-portfolio"

echo "📁 Current directory: $(pwd)"

# Add all changes
echo "📄 Adding all files to git..."
git add .

# Check status
echo "📊 Git status:"
git status --short

# Create commit with message
echo "💾 Creating commit..."
git commit -m "feat: Implement dedicated login page and authentication system

✨ New Features:
- Created dedicated LoginPage component with beautiful glassmorphism design
- Implemented proper authentication flow with AppRouter
- Added proper routing: / for portfolio, /web-admin for admin access
- Removed embedded login form from AdminPanel for cleaner UX
- Added loading states and error handling for login process
- Maintenance mode functionality with full configuration options

🔧 Technical Changes:
- Updated AdminPanel to accept currentUser as prop instead of managing state
- Modified App.tsx to accept dynamic content props
- Fixed TypeScript compilation errors
- Improved code separation and maintainability
- Added proper logout functionality with navigation

🎨 UI/UX Improvements:
- Professional login page with admin icon and demo credentials
- Clean main portfolio without admin elements
- Smooth animations and hover effects
- Mobile responsive design
- Error feedback and loading indicators

🔐 Security:
- Proper authentication state management
- Session handling and logout functionality
- Demo credentials for testing (admin/admin123, editor/editor123)"

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Upload complete! Your portfolio changes are now live on GitHub."
echo "🌐 Check your GitHub repository and GitHub Pages for the updates."
