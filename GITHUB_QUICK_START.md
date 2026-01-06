# 🚀 Quick Start: Add Project to GitHub

**Fast guide to push your Postly project to GitHub.**

---

## Step 1: Initialize Git

```bash
cd C:\xampp\htdocs\Postly
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Make First Commit

```bash
git commit -m "Initial commit: Postly blog platform - Full stack application"
```

## Step 4: Create GitHub Repository

1. Go to https://github.com
2. Click **"+"** → **"New repository"**
3. Name: `Postly`
4. Description: `Full-stack blog platform with React, Node.js, Express, and MySQL`
5. Choose **Public** or **Private**
6. **Don't** check "Initialize with README"
7. Click **"Create repository"**

## Step 5: Connect and Push

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/Postly.git
git branch -M main
git push -u origin main
```

**If asked for credentials:**
- Use GitHub Personal Access Token (not password)
- Or use GitHub Desktop app

## Step 6: Verify

1. Refresh your GitHub repository page
2. You should see all your files!

---

## ✅ Done!

Your project is now on GitHub. See `GITHUB_AND_RAILWAY_DEPLOYMENT.md` for Railway deployment steps.

