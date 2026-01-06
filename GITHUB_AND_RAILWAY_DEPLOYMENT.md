# 🚀 GitHub & Railway Deployment Guide

Complete step-by-step guide to push your project to GitHub and deploy to Railway.

---

## Part 1: Add Project to GitHub

### Step 1: Initialize Git Repository

1. **Open terminal in your project root:**
   ```bash
   cd C:\xampp\htdocs\Postly
   ```

2. **Initialize Git (if not already done):**
   ```bash
   git init
   ```

3. **Check Git status:**
   ```bash
   git status
   ```

### Step 2: Create .gitignore (if needed)

Check if `.gitignore` exists and includes:
- `node_modules/`
- `.env` files
- `build/` (optional - can regenerate)

### Step 3: Stage All Files

```bash
git add .
```

### Step 4: Make Initial Commit

```bash
git commit -m "Initial commit: Postly blog platform - Full stack application with React frontend and Node.js/Express/MySQL backend"
```

### Step 5: Create GitHub Repository

1. **Go to GitHub:**
   - Visit https://github.com
   - Login to your account

2. **Create new repository:**
   - Click **"+"** → **"New repository"**
   - Repository name: `Postly` (or your choice)
   - Description: `Full-stack blog platform with React, Node.js, Express, and MySQL`
   - Choose: **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (you already have files)
   - Click **"Create repository"**

### Step 6: Connect Local Repository to GitHub

GitHub will show you commands. Use these:

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Postly.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**If you get authentication error:**
- Use GitHub Personal Access Token instead of password
- Or use GitHub Desktop app

### Step 7: Verify on GitHub

1. Refresh your GitHub repository page
2. You should see all your files
3. Check commit history shows your commits

### Step 8: Make More Commits (Good Practice)

Create meaningful commits as you work:

```bash
git add .
git commit -m "Add admin dashboard with user and content management"
git push

git add .
git commit -m "Add authentication system with JWT"
git push

git add .
git commit -m "Add CRUD operations for posts and comments"
git push
```

---

## Part 2: Deploy to Railway

### Prerequisites

- ✅ GitHub repository created and pushed
- ✅ Railway account (free tier available)

### Step 1: Sign Up for Railway

1. **Go to Railway:**
   - Visit https://railway.app
   - Click **"Start a New Project"**

2. **Sign up:**
   - Click **"Login with GitHub"** (recommended)
   - Authorize Railway to access your GitHub

### Step 2: Create New Project

1. **In Railway dashboard:**
   - Click **"New Project"**

2. **Deploy from GitHub:**
   - Select **"Deploy from GitHub repo"**
   - Find and select your `Postly` repository
   - Click **"Deploy Now"**

### Step 3: Configure Service

Railway will detect your project. You need to configure it:

1. **Click on your service** (the deployed app)

2. **Set Root Directory:**
   - Go to **Settings** tab
   - Find **"Root Directory"**
   - Set to: `server`
   - This tells Railway where your backend code is

3. **Set Start Command:**
   - In **Settings** → **Deploy**
   - Start Command: `npm start`
   - (Railway should auto-detect this)

### Step 4: Add MySQL Database

1. **In your Railway project:**
   - Click **"+ New"** button
   - Select **"Database"** → **"Add MySQL"**

2. **Wait for database to provision:**
   - Railway will create a MySQL database
   - Note the connection details (you'll need them)

3. **Get database credentials:**
   - Click on the MySQL service
   - Go to **"Variables"** tab
   - You'll see:
     - `MYSQLHOST`
     - `MYSQLPORT`
     - `MYSQLDATABASE`
     - `MYSQLUSER`
     - `MYSQLPASSWORD`

### Step 5: Set Environment Variables

1. **Go to your backend service** (not the database)

2. **Click "Variables" tab**

3. **Add these environment variables:**

   ```
   NODE_ENV=production
   PORT=5000
   
   DB_HOST=[Copy MYSQLHOST from database variables]
   DB_USER=[Copy MYSQLUSER from database variables]
   DB_PASSWORD=[Copy MYSQLPASSWORD from database variables]
   DB_NAME=[Copy MYSQLDATABASE from database variables]
   
   JWT_SECRET=[Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
   
   FRONTEND_URL=[Your frontend URL - set this after deploying frontend]
   ```

4. **How to add variables:**
   - Click **"+ New Variable"**
   - Enter variable name and value
   - Click **"Add"**

### Step 6: Import Database Schema

1. **Get database connection string:**
   - In Railway MySQL service
   - Go to **"Connect"** tab
   - Copy the connection string or use the variables

2. **Option A: Using Railway CLI (Recommended)**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Link to your project
   railway link
   
   # Import schema
   railway run mysql -h [MYSQLHOST] -u [MYSQLUSER] -p[MYSQLPASSWORD] [MYSQLDATABASE] < server/config/db-schema.sql
   ```

3. **Option B: Using MySQL Workbench**
   - Use the connection details from Railway
   - Connect to the database
   - Import `server/config/db-schema.sql`

4. **Option C: Using phpMyAdmin (if available)**
   - Some Railway plans include phpMyAdmin
   - Access it and import the schema file

### Step 7: Deploy and Verify

1. **Railway will auto-deploy** when you push to GitHub
   - Or click **"Redeploy"** manually

2. **Check deployment logs:**
   - Go to **"Deployments"** tab
   - Click on latest deployment
   - Check for errors

3. **Get your backend URL:**
   - In service settings
   - Find **"Domains"** section
   - Railway provides a URL like: `https://your-app.up.railway.app`
   - Copy this URL

4. **Test your backend:**
   - Visit: `https://your-app.up.railway.app/api/health`
   - Should see: `{"success":true,"message":"Postly API is running"}`

### Step 8: Update Frontend API URL

1. **Update frontend to use Railway backend:**

   **Option A: Environment variable (Recommended)**
   - Create `.env` file in project root:
     ```env
     REACT_APP_API_URL=https://your-app.up.railway.app/api
     ```
   - Restart frontend: `npm start`

   **Option B: Direct update**
   - Edit `src/services/api.js`:
     ```javascript
     const API_BASE_URL = 'https://your-app.up.railway.app/api';
     ```

### Step 9: Deploy Frontend (Optional)

**Option A: Vercel (Recommended for React)**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Set:
   - Framework Preset: **Create React App**
   - Root Directory: `/` (project root)
   - Build Command: `npm run build`
   - Output Directory: `build`
5. Add environment variable:
   - `REACT_APP_API_URL` = `https://your-app.up.railway.app/api`
6. Deploy!

**Option B: Netlify**
1. Go to https://netlify.com
2. Sign up with GitHub
3. Import repository
4. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Add environment variable for API URL
6. Deploy!

**Option C: GitHub Pages**
1. In your GitHub repo
2. Go to Settings → Pages
3. Set source to `main` branch and `/build` folder
4. Deploy!

---

## Troubleshooting Railway

### ❌ "Build failed"

**Solution:**
- Check deployment logs
- Make sure `server/package.json` has correct scripts
- Verify Node.js version compatibility

### ❌ "Database connection failed"

**Solution:**
- Double-check environment variables match database credentials
- Verify database is provisioned and running
- Check database host/port are correct

### ❌ "Port already in use"

**Solution:**
- Railway assigns port automatically
- Use `process.env.PORT` in your code (already done ✅)
- Don't hardcode port 5000

### ❌ "Module not found"

**Solution:**
- Make sure `npm install` runs during build
- Check `package.json` has all dependencies
- Verify root directory is set to `server/`

---

## Quick Reference

### Git Commands
```bash
git init                          # Initialize repository
git add .                         # Stage all files
git commit -m "Your message"      # Commit changes
git remote add origin [URL]       # Add GitHub remote
git push -u origin main          # Push to GitHub
```

### Railway Setup Checklist
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Railway account created
- [ ] Project created from GitHub
- [ ] Root directory set to `server/`
- [ ] MySQL database added
- [ ] Environment variables set
- [ ] Database schema imported
- [ ] Backend deployed and tested
- [ ] Frontend API URL updated
- [ ] Frontend deployed (optional)

---

## Important Notes

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Use Railway's environment variables** - Don't hardcode secrets
3. **Database credentials** - Railway provides these automatically
4. **Free tier limits** - Railway free tier has usage limits
5. **Custom domain** - You can add your own domain later

---

## Your Railway URLs

After deployment, you'll have:
- **Backend API:** `https://your-app.up.railway.app`
- **Health Check:** `https://your-app.up.railway.app/api/health`
- **Frontend:** `https://your-frontend.vercel.app` (if deployed)

---

**🎉 You're all set! Your project is now on GitHub and Railway!**

