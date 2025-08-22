# 🔧 Vercel Deployment Troubleshooting

## 🚨 Error: `cd: frontend: No such file or directory`

### Step 1: Clear All Custom Settings
1. Go to your Vercel project
2. Click **Settings** → **General**
3. Scroll to **Build & Output Settings**
4. **OVERRIDE** all settings with these exact values:

```
Root Directory: frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Step 2: Save and Redeploy
1. Click **Save**
2. Go to **Deployments** tab
3. Click **Redeploy** on the latest deployment
4. Select **Use existing Build Cache: No**

---

## 🎯 Alternative Solution: Deploy Frontend Folder Only

If the above doesn't work, try this approach:

### Option A: Create New Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. **Import** your GitHub repo: `anindaic3842/anindawildscapes`
4. **CRITICAL**: Set **Root Directory** to `frontend` during setup
5. Let all other settings auto-detect
6. Deploy

### Option B: Use Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend folder
cd frontend

# Deploy from frontend folder directly
vercel --prod
```

---

## 🔍 Debug Steps

### Check Your Settings
1. In Vercel dashboard, go to **Settings** → **General**
2. Verify **Root Directory** is set to `frontend`
3. Verify **Build Command** is `npm run build` (not `cd frontend && npm run build`)

### Check Build Logs
1. Go to **Deployments** tab
2. Click on the failed deployment
3. Look for the exact error message
4. The error should show what directory Vercel is trying to access

---

## ✅ Expected Success

When configured correctly, you should see:
```
✅ Installing dependencies...
✅ Running "npm run build"
✅ Build completed successfully
✅ Deployment ready
```

Your site will be live at: `https://your-project-name.vercel.app`

---

## 📞 Still Not Working?

Try these nuclear options:

### Nuclear Option 1: Delete and Recreate
1. Delete the Vercel project
2. Create a new one
3. Set Root Directory to `frontend` from the start

### Nuclear Option 2: Deploy Frontend Separately
1. Create a new GitHub repo
2. Copy only the `frontend` folder contents to the new repo
3. Deploy the new repo to Vercel (no Root Directory needed)

**The key is that Vercel needs to work inside the frontend folder, not try to navigate to it!**