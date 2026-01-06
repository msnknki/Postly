# 🔧 How to Set Root Directory in Railway

## Step-by-Step Instructions

### Step 1: Click "Add Root Directory"
- In the Railway Settings tab, you'll see a link that says **"Add Root Directory"**
- Click on it

### Step 2: Enter the Directory
- A text input field will appear
- Type: `server`
- Press Enter or click outside the field

### Step 3: Save
- Railway will automatically save the setting

### Step 4: Redeploy
- Go to the "Deployments" tab
- Click "Redeploy" or wait for auto-deploy
- Railway will now build from the `server/` directory

---

## What This Does

Setting Root Directory to `server` tells Railway:
- ✅ Build from `server/package.json` (not root `package.json`)
- ✅ Run `npm start` from the `server/` directory
- ✅ Deploy your Node.js backend (not React frontend)

---

## Visual Guide

1. **Settings Tab** → Find "Add Root Directory" link
2. **Click it** → Text field appears
3. **Type:** `server`
4. **Save** → Setting is saved automatically
5. **Redeploy** → Build should now succeed!

---

## After Setting Root Directory

Once you set it to `server`, Railway will:
- Stop trying to build the React frontend
- Build and deploy your Node.js backend
- The build should succeed! ✅

