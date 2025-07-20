# Heroku Deployment Guide

This guide will help you deploy your React portfolio with dynamic maintenance mode to Heroku.

## Prerequisites

1. **Heroku Account**: Create a free account at [heroku.com](https://heroku.com)
2. **Heroku CLI**: Install from [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
3. **Git**: Ensure your project is a Git repository

## Project Structure

Your project now includes:
- `server.js` - Express.js server for dynamic functionality
- `Procfile` - Heroku process configuration
- `src/api.ts` - API service for client-server communication
- Updated React components to use server API

## Deployment Steps

### 1. Login to Heroku
```bash
heroku login
```

### 2. Create Heroku App
```bash
heroku create your-portfolio-name
```
Replace `your-portfolio-name` with your desired app name (must be unique).

### 3. Set Environment Variables (Optional)
```bash
heroku config:set NODE_ENV=production
```

### 4. Deploy to Heroku
```bash
git add .
git commit -m "Add Heroku deployment setup with dynamic maintenance mode"
git push heroku main
```

### 5. Open Your App
```bash
heroku open
```

## Features

### Global Maintenance Mode
- **Server-Side Control**: Maintenance mode is now controlled by the server
- **Real-Time Updates**: Changes apply to all users instantly
- **Fallback Support**: If server is unavailable, falls back to localStorage
- **Admin API**: `/api/maintenance` endpoint for status management

### API Endpoints

#### Get Maintenance Status
```
GET /api/maintenance
```
Returns current maintenance configuration.

#### Update Maintenance Status
```
POST /api/maintenance
Content-Type: application/json

{
  "isGloballyActive": true,
  "message": "Custom maintenance message",
  "estimatedTime": "2 hours"
}
```

### Content Management
```
GET /api/content/:section
POST /api/content/:section
```
For future content management features.

## Admin Panel Access

1. **Local Development**: `http://localhost:3001/web-admin`
2. **Production**: `https://your-app-name.herokuapp.com/web-admin`

## Environment Variables

You can set additional environment variables for:
- Database connections
- API keys
- Custom configurations

```bash
heroku config:set KEY=value
```

## Monitoring

### View Logs
```bash
heroku logs --tail
```

### App Status
```bash
heroku ps
```

### Resource Usage
```bash
heroku ps:type
```

## Scaling (if needed)

### Upgrade Dyno Type
```bash
heroku ps:scale web=1:standard-1x
```

### Auto-scaling
```bash
heroku ps:autoscale web:1:10 --min=1 --max=10 --p95=500
```

## Custom Domain (Optional)

1. **Add Domain**:
   ```bash
   heroku domains:add www.your-domain.com
   ```

2. **Configure DNS**: Point your domain to the Heroku app URL

3. **SSL Certificate**:
   ```bash
   heroku certs:auto:enable
   ```

## Database Integration (Future)

For persistent data storage, you can add:

### PostgreSQL
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

### MongoDB
```bash
heroku addons:create mongolab:sandbox
```

## Troubleshooting

### Build Failures
- Check `heroku logs` for detailed error messages
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Server Issues
- Check server.js syntax
- Verify PORT environment variable usage
- Ensure static file serving is configured

### Domain Issues
- Verify DNS configuration
- Check SSL certificate status
- Ensure domain is properly added to Heroku

## Maintenance Commands

### Restart App
```bash
heroku restart
```

### Scale Down (Maintenance)
```bash
heroku ps:scale web=0
```

### Scale Up (Resume)
```bash
heroku ps:scale web=1
```

## Cost Optimization

- **Free Tier**: 550-1000 dyno hours per month
- **Sleep Mode**: Apps sleep after 30 minutes of inactivity
- **Always On**: Upgrade to prevent sleeping

## Security Notes

1. **Environment Variables**: Store sensitive data in config vars
2. **HTTPS**: Automatically enabled on *.herokuapp.com
3. **Authentication**: Implement proper admin authentication
4. **API Security**: Add rate limiting and validation

## Support

- **Heroku Docs**: [devcenter.heroku.com](https://devcenter.heroku.com)
- **Community**: [stackoverflow.com/questions/tagged/heroku](https://stackoverflow.com/questions/tagged/heroku)
- **Support**: Available with paid plans

## Next Steps

1. **Database**: Add persistent storage for content
2. **Authentication**: Implement secure admin login
3. **Analytics**: Add usage tracking
4. **CDN**: Optimize static asset delivery
5. **Monitoring**: Set up error tracking and performance monitoring

Your portfolio is now ready for dynamic deployment on Heroku with global maintenance mode capabilities!
