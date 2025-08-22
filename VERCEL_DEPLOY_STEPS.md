# 📱 Vercel Deployment - Step by Step

## 🚨 **IMPORTANT: This fixes the npm install error!**

Follow these exact steps to deploy your photography portfolio:

---

## Step 1: Go to Vercel
🌐 Visit: [vercel.com](https://vercel.com)
- Sign in with your GitHub account

---

## Step 2: Import Your Project
1. Click **"New Project"**
2. Find and select: `anindaic3842/anindawildscapes`
3. Click **"Import"**

---

## Step 3: Configure Project Settings ⭐ **CRITICAL STEP**

**In the "Configure Project" screen, you MUST set:**

```
Root Directory: frontend
```

**DO NOT leave this blank!** This is what fixes the npm install error.

The other settings will auto-detect:
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

---

## Step 4: Add Environment Variables (Optional)

If you have a backend deployed, add:
- **Name**: `VITE_API_URL`
- **Value**: `https://your-backend-url.up.railway.app`

---

## Step 5: Deploy!
Click **"Deploy"** and wait for the build to complete.

---

## ✅ **Expected Result**

Your site will be live at:
```
https://anindawildscapes.vercel.app
```

---

## 🔧 **If You Still Get Errors**

1. **Check Root Directory**: Make sure it's set to `frontend`
2. **Redeploy**: Go to Deployments tab and click "Redeploy"
3. **Check Logs**: Look at the build logs for specific errors

---

## 🎯 **Why Root Directory = frontend Works**

- Vercel will only see the `frontend/package.json`
- It will run `npm install` inside the frontend folder
- No more "Missing script" errors!
- Clean, simple deployment

---

## 📞 **Need Help?**

If you're still having issues:
1. Double-check the Root Directory is set to `frontend`
2. Make sure your GitHub repo is up to date
3. Try redeploying from the Vercel dashboard

**Your photography portfolio will be live in minutes!** 🎉