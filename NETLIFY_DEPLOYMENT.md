# Netlify Deployment Guide

This guide will help you deploy your React portfolio with dynamic maintenance mode to Netlify using serverless functions.

## 🚀 **Why Netlify?**

✅ **Static Site Hosting**: Perfect for React apps  
✅ **Serverless Functions**: Dynamic functionality without servers  
✅ **Global CDN**: Fast worldwide delivery  
✅ **Automatic HTTPS**: Built-in SSL certificates  
✅ **Branch Previews**: Test deployments  
✅ **Free Tier**: Generous limits for personal projects  

## 📁 **Project Structure**

```
my-portfolio/
├── netlify/
│   └── functions/
│       ├── maintenance.js    # Global maintenance API
│       └── content.js        # Content management API
├── netlify.toml             # Netlify configuration
├── src/
│   ├── api.ts              # Updated for Netlify Functions
│   ├── App.tsx             # Main app with global maintenance
│   └── AdminPanel.tsx      # Admin with global controls
└── dist/                   # Build output
```

## 🛠 **Setup Steps**

### 1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Login to Netlify
```bash
netlify login
```

### 4. Initialize Netlify Site
```bash
netlify init
```
Follow the prompts to create a new site or link to existing one.

## 🌐 **Deployment Methods**

### **Method 1: Netlify CLI (Recommended)**

#### Build and Deploy
```bash
npm run build
netlify deploy --prod
```

#### Or use the npm script
```bash
npm run deploy:netlify
```

### **Method 2: Git-based Deployment**

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Netlify deployment setup"
   git push origin main
   ```

2. **Connect in Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

### **Method 3: Drag & Drop**

1. Build locally: `npm run build`
2. Drag the `dist` folder to [netlify.com/drop](https://netlify.com/drop)

## ⚙️ **Configuration**

### **Environment Variables**

Set these in Netlify Dashboard → Site Settings → Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `MAINTENANCE_ACTIVE` | `false` | Global maintenance status |
| `MAINTENANCE_MESSAGE` | `"Updating portfolio..."` | Maintenance message |
| `MAINTENANCE_TIME` | `"2 hours"` | Estimated downtime |

### **Custom Domain** (Optional)

1. **Add Domain**: Site Settings → Domain Management → Add custom domain
2. **DNS Configuration**: Point your domain to Netlify
3. **SSL**: Automatically enabled

## 🔧 **Local Development**

### **Start Development Server**
```bash
npm run dev
```

### **Test with Netlify Functions**
```bash
npm run netlify
```
This starts Vite + Netlify Dev at `http://localhost:8888`

## 🌍 **API Endpoints**

### **Maintenance API**
- **GET** `/.netlify/functions/maintenance` - Get status
- **POST** `/.netlify/functions/maintenance` - Update status

### **Content API** (Future use)
- **GET** `/.netlify/functions/content?section=home` - Get content
- **POST** `/.netlify/functions/content?section=home` - Update content

## 🔐 **Admin Panel Access**

- **Local**: `http://localhost:8888/web-admin`
- **Production**: `https://your-site.netlify.app/web-admin`

## 📊 **Features**

### **Global Maintenance Mode**
- ✅ Real-time updates via serverless functions
- ✅ Environment variable control
- ✅ Fallback to localStorage
- ✅ Works across all devices globally

### **Performance**
- ✅ Global CDN delivery
- ✅ Automatic asset optimization
- ✅ Gzip compression
- ✅ Cache headers configured

### **Security**
- ✅ HTTPS by default
- ✅ Security headers
- ✅ XSS protection
- ✅ CORS configured

## 🎯 **Maintenance Mode Control**

### **Via Admin Panel**
1. Go to `/web-admin`
2. Navigate to "Maintenance Mode" section
3. Toggle maintenance on/off
4. Changes apply globally instantly

### **Via Environment Variables**
1. Netlify Dashboard → Site Settings → Environment Variables
2. Set `MAINTENANCE_ACTIVE=true`
3. Redeploy site or trigger build hook

### **Via API** (Advanced)
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/maintenance \
  -H "Content-Type: application/json" \
  -d '{"isGloballyActive": true, "message": "Maintenance in progress"}'
```

## 📈 **Monitoring & Analytics**

### **Netlify Analytics**
- Enable in Site Settings → Analytics
- Track page views, unique visitors, bandwidth

### **Function Logs**
```bash
netlify functions:log
```

### **Build Logs**
- View in Netlify Dashboard → Deploys

## 🔄 **Continuous Deployment**

### **Automatic Builds**
- Pushes to `main` branch trigger automatic builds
- Preview deployments for pull requests
- Branch-specific deployments

### **Build Hooks**
- Create webhooks for external triggers
- Schedule builds via cron jobs
- API-triggered deployments

## 💰 **Pricing & Limits**

### **Free Tier**
- 300 build minutes/month
- 100GB bandwidth/month
- 125,000 serverless function requests/month
- 1 concurrent build

### **Pro Tier** ($19/month)
- 1,000 build minutes/month
- 400GB bandwidth/month
- 2 million function requests/month
- 3 concurrent builds

## 🐛 **Troubleshooting**

### **Build Failures**
```bash
# Check build logs
netlify open:site
# Go to Deploys → View build log
```

### **Function Issues**
```bash
# Test functions locally
netlify dev
# Check function logs
netlify functions:log
```

### **DNS Issues**
```bash
# Check DNS propagation
netlify open:site
# Go to Domain settings
```

## 🚀 **Deployment Script**

Create `deploy-netlify.ps1`:

```powershell
# Quick Netlify deployment
Write-Host "🚀 Building project..." -ForegroundColor Yellow
npm run build

Write-Host "📦 Deploying to Netlify..." -ForegroundColor Yellow
netlify deploy --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green
netlify open:site
```

## 📚 **Resources**

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Functions Guide**: [docs.netlify.com/functions](https://docs.netlify.com/functions)
- **Deploy Guide**: [docs.netlify.com/site-deploys](https://docs.netlify.com/site-deploys)

## 🎉 **Next Steps**

1. **Database Integration**: Add Fauna or Supabase for persistent data
2. **Authentication**: Implement Netlify Identity
3. **Forms**: Use Netlify Forms for contact submissions
4. **Edge Functions**: Add server-side rendering capabilities

Your React portfolio is now ready for professional deployment on Netlify with global maintenance mode capabilities! 🌟
