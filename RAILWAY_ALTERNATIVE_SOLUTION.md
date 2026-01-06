# 🔧 Railway Root Directory - Alternative Solutions

Since Root Directory isn't visible in the Build section, here are alternative solutions:

## Solution 1: Use Custom Build Command

In the **Build** section you're currently viewing:

1. **Click "+ Build Command"**
2. **Add this command:**
   ```bash
   cd server && npm install
   ```
3. **Save**

Then in the **Deploy** section (check next):
- Set **Start Command** to: `cd server && npm start`

---

## Solution 2: Check "Deploy" Section

1. **Click "Deploy"** in the right sidebar
2. Look for **"Start Command"**
3. Change it from `npm start` to:
   ```bash
   cd server && npm start
   ```

---

## Solution 3: Use railway.json (Already Created)

The `railway.json` file we created should work, but Railway might need:
- The file to be in the root (✅ already done)
- A redeploy to pick it up

**Try this:**
1. Go to **"Deployments"** tab
2. Click **"Redeploy"**
3. Railway should read `railway.json` and use `server/` as root

---

## Solution 4: Move railway.json to Root (Verify)

Make sure `railway.json` is in the project root (not in `server/`).

The file should be at: `/railway.json` (root level)

---

## Recommended: Try Solution 2 First

**Check "Deploy" section:**
- Right sidebar → **"Deploy"**
- Find **"Start Command"**
- Change to: `cd server && npm start`
- Save and Redeploy

This is the quickest fix!

