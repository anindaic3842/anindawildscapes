# 🚀 Deployment Guide - Aninda Wildscapes Photography Portfolio

This guide will help you deploy your photography portfolio website to make it publicly accessible.

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Railway account (free)

## 🎯 Deployment Strategy

We'll deploy using a modern, scalable approach:
- **Frontend**: Vercel (React app with CDN)
- **Backend**: Railway (Node.js API with database)

## 🔧 Step 1: Deploy Backend to Railway

### 1.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Connect your GitHub repository

### 1.2 Deploy Backend
1. Click "New Project" → "Deploy from GitHub repo"
2. Select your `anindawildscapes` repository
3. Choose "Deploy from a folder" → select `backend`
4. Railway will automatically detect it's a Node.js app

### 1.3 Configure Environment Variables
In Railway dashboard, go to Variables tab and add:
```
NODE_ENV=production
PORT=8080
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-email@gmail.com
```

### 1.4 Get Your Backend URL
After deployment, Railway will provide a URL like:
`https://your-app-name.up.railway.app`

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account

### 2.2 Deploy Frontend
1. Click "New Project"
2. Import your `anindawildscapes` repository
3. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.3 Configure Environment Variables
In Vercel dashboard, go to Settings → Environment Variables:
```
VITE_API_URL=https://your-railway-app.up.railway.app
```

### 2.4 Update Backend CORS
Update your Railway backend environment variables to include your Vercel URL:
```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

## 🔄 Step 3: Update Configuration

### 3.1 Update vercel.json
The `vercel.json` file is already configured to:
- Proxy API requests to your Railway backend
- Serve the React app from the correct directory

### 3.2 Update Backend CORS
The backend is already configured to accept requests from Vercel domains.

## ✅ Step 4: Test Deployment

1. Visit your Vercel URL (e.g., `https://anindawildscapes.vercel.app`)
2. Test all features:
   - Photo gallery and filtering
   - Navigation between pages
   - Contact form submission
3. Check browser console for any errors

## 🔧 Alternative: One-Click Deployment

### Deploy to Vercel (Frontend + Backend)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anindaic3842/anindawildscapes&project-name=anindawildscapes&repository-name=anindawildscapes)

### Deploy Backend to Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template-id)

## 🌍 Custom Domain (Optional)

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Railway:
1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## 📊 Monitoring & Analytics

### Vercel Analytics
- Automatically enabled for performance monitoring
- View in Vercel dashboard

### Railway Metrics
- Monitor API performance in Railway dashboard
- Set up alerts for downtime

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **CORS**: Properly configured for your domains
3. **Rate Limiting**: Consider adding rate limiting for production
4. **HTTPS**: Both platforms provide SSL certificates automatically

## 🚨 Troubleshooting

### Common Issues:

1. **API Not Working**
   - Check Railway logs for backend errors
   - Verify environment variables are set
   - Ensure CORS allows your frontend domain

2. **Build Failures**
   - Check build logs in Vercel
   - Verify all dependencies are in package.json
   - Ensure build command is correct

3. **Images Not Loading**
   - Check image paths are correct
   - Verify images are in the public directory

## 📞 Support

If you encounter issues:
1. Check the deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors

## 🎉 Success!

Once deployed, your photography portfolio will be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-app.up.railway.app`

Share your beautiful photography with the world! 📸✨