#!/bin/bash
# Netlify deployment script

echo "🚀 Starting Netlify deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
npx netlify-cli deploy --prod --dir=dist

echo "✅ Deployment complete!"
echo "🌍 Your site should be live at: https://your-site-name.netlify.app"
