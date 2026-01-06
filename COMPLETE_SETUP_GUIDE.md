# 🚀 Complete Setup Guide - Postly Blog Platform

**Step-by-step guide to set up and run the Postly project from zero.**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Database Setup](#step-1-database-setup)
3. [Step 2: Backend Setup](#step-2-backend-setup)
4. [Step 3: Frontend Setup](#step-3-frontend-setup)
5. [Step 4: Create Admin Account](#step-4-create-admin-account)
6. [Step 5: Create Demo Data (Optional)](#step-5-create-demo-data-optional)
7. [Step 6: Verify Everything Works](#step-6-verify-everything-works)
8. [Troubleshooting](#troubleshooting)
9. [Quick Reference Commands](#quick-reference-commands)

---

## Prerequisites

Before starting, make sure you have installed:

- ✅ **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- ✅ **npm** (comes with Node.js)
- ✅ **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- ✅ **XAMPP** (for Windows) - [Download](https://www.apachefriends.org/) - *Optional but recommended*

---

## Step 1: Database Setup

### 1.1 Start MySQL

**If using XAMPP:**
1. Open XAMPP Control Panel
2. Click **Start** next to MySQL
3. Wait until it shows "Running" (green)

**If using standalone MySQL:**
- Make sure MySQL service is running on your system

### 1.2 Create Database

You have **3 options**:

#### Option A: Using Command Line (Recommended)
```bash
# Navigate to project directory
cd C:\xampp\htdocs\Postly

# Run the schema file
mysql -u root -p < server/config/db-schema.sql
```
Enter your MySQL password when prompted.

#### Option B: Using phpMyAdmin (Easiest)
1. Open browser: `http://localhost/phpmyadmin`
2. Click **"New"** in left sidebar
3. Database name: `postly_db`
4. Click **"Create"**
5. Select `postly_db` database
6. Click **"Import"** tab
7. Choose file: `server/config/db-schema.sql`
8. Click **"Go"**

#### Option C: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. File → Open SQL Script
4. Select: `server/config/db-schema.sql`
5. Click **Execute** (⚡ icon)

### 1.3 Verify Database

Check that tables were created:
```sql
USE postly_db;
SHOW TABLES;
```

You should see: `users`, `posts`, `comments`, `categories`

---

## Step 2: Backend Setup

### 2.1 Navigate to Server Directory

```bash
cd server
```

### 2.2 Install Dependencies

```bash
npm install
```

This installs: express, mysql2, jsonwebtoken, bcrypt, cors, dotenv

### 2.3 Configure Environment Variables

1. **Check if `.env` file exists:**
   ```bash
   dir .env
   ```

2. **If it doesn't exist, create it:**
   ```bash
   # Windows
   copy env.example .env
   
   # Mac/Linux
   cp env.example .env
   ```

3. **Edit `.env` file** with your database credentials:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000

   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password_here
   DB_NAME=postly_db

   # JWT Secret Key
   # Generate one with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

   **Important:**
   - Replace `your_mysql_password_here` with your actual MySQL root password
   - For `JWT_SECRET`, generate a random string:
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
     Copy the output and paste it as your `JWT_SECRET`

### 2.4 Start Backend Server

```bash
npm start
```

**Expected output:**
```
✅ Database connected successfully
╔════════════════════════════════════════╗
║   Postly Backend Server                ║
║   Server running on port 5000          ║
║   Environment: development             ║
╚════════════════════════════════════════╝
📡 API available at: http://localhost:5000/api
🏥 Health check: http://localhost:5000/api/health
```

**Keep this terminal open!** The backend must stay running.

---

## Step 3: Frontend Setup

### 3.1 Open a NEW Terminal Window

**Important:** Keep the backend terminal running, open a new terminal for frontend.

### 3.2 Navigate to Project Root

```bash
cd C:\xampp\htdocs\Postly
```

### 3.3 Install Dependencies

```bash
npm install
```

This installs: react, react-router-dom, bootstrap, axios, etc.

### 3.4 Start Frontend Server

```bash
npm start
```

**Expected output:**
- Browser should open automatically at `http://localhost:3000`
- If not, manually open: `http://localhost:3000`

**Keep this terminal open too!**

---

## Step 4: Create Admin Account

### 4.1 Reset Admin Password

In the **backend terminal** (where server is running), press `Ctrl+C` to stop it, then:

```bash
npm run reset-admin
```

**Expected output:**
```
✅ Admin password reset successfully!

📋 Admin Credentials:
   Email: admin@postly.com
   Username: Administrator
   Password: admin123
   Role: admin
```

### 4.2 Restart Backend

```bash
npm start
```

---

## Step 5: Create Demo Data (Optional)

These commands add sample data for demonstration:

### 5.1 Create Demo Users

```bash
npm run create-demo-users
```

Creates:
- John Doe (`john.doe@example.com` / `user123`)
- Jane Smith (`jane.smith@example.com` / `user123`)

### 5.2 Add Politics Category

```bash
npm run add-politics
```

### 5.3 Add Political Posts

```bash
npm run add-politics-posts
```

Adds 2 political posts to the Politics category.

### 5.4 Add Comments to Posts

```bash
npm run add-comments
```

Adds comments to all posts from different users.

---

## Step 6: Verify Everything Works

### 6.1 Test Backend

Open in browser: `http://localhost:5000/api/health`

**Should see:**
```json
{
  "success": true,
  "message": "Postly API is running",
  "timestamp": "..."
}
```

### 6.2 Test Frontend

1. Open: `http://localhost:3000`
2. You should see the Postly homepage
3. Navigate to Blog page
4. You should see posts (if you added demo data)

### 6.3 Test Login

1. Go to: `http://localhost:3000/login`
2. Login with admin:
   - Email: `admin@postly.com`
   - Password: `admin123`
3. After login, you should see:
   - "Welcome, Administrator" in navbar
   - "Admin" link (golden color) in navbar
   - "Logout" button

### 6.4 Test Admin Dashboard

1. Click "Admin" link in navbar
2. You should see:
   - Overview tab with statistics
   - Users tab (shows all users)
   - Posts tab (shows all posts)
   - Comments tab (shows all comments)

---

## Troubleshooting

### ❌ "Database connection failed"

**Solutions:**
1. Make sure MySQL is running (check XAMPP)
2. Verify database `postly_db` exists
3. Check `.env` file has correct MySQL password
4. Test connection:
   ```sql
   mysql -u root -p
   SHOW DATABASES; -- Should see postly_db
   ```

### ❌ "Port 5000 already in use"

**Solution:**
1. Find what's using port 5000:
   ```bash
   netstat -ano | findstr :5000
   ```
2. Kill the process:
   ```bash
   taskkill /PID [PID_NUMBER] /F
   ```
3. Or change port in `server/.env`:
   ```env
   PORT=5001
   ```

### ❌ "Network error" in frontend

**Solutions:**
1. Make sure backend is running (check terminal)
2. Verify backend URL: `http://localhost:5000/api/health`
3. Check `FRONTEND_URL` in `server/.env` matches frontend URL
4. Restart both servers

### ❌ "Cannot find module"

**Solution:**
```bash
# In project root
npm install

# In server directory
cd server
npm install
```

### ❌ "CORS error"

**Solution:**
- Check `FRONTEND_URL` in `server/.env`:
  ```env
  FRONTEND_URL=http://localhost:3000
  ```
- Make sure it matches your frontend URL exactly

### ❌ Admin account password doesn't work

**Solution:**
```bash
cd server
npm run reset-admin
```

This resets the password to `admin123`.

---

## Quick Reference Commands

### Backend Commands (in `server/` folder)

```bash
# Install dependencies
npm install

# Start server
npm start

# Start with auto-reload (development)
npm run dev

# Create admin account
npm run create-admin

# Reset admin password
npm run reset-admin

# Add Politics category
npm run add-politics

# Add political posts
npm run add-politics-posts

# Create demo users
npm run create-demo-users

# Add comments to posts
npm run add-comments
```

### Frontend Commands (in project root)

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

---

## Project Structure

```
Postly/
├── server/                 # Backend (Node.js/Express)
│   ├── config/            # Database configuration
│   │   ├── database.js
│   │   └── db-schema.sql  # Database schema
│   ├── controllers/       # Request handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & validation
│   ├── scripts/           # Utility scripts
│   ├── .env              # Environment variables (create this!)
│   └── server.js          # Main server file
│
├── src/                   # Frontend (React)
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── services/         # API service
│   └── styles/           # CSS files
│
└── public/               # Static files
```

---

## Default Accounts

### Admin Account
- **Email:** `admin@postly.com`
- **Password:** `admin123`
- **Role:** Administrator
- **Access:** Full admin privileges

### Demo Users (if created)
- **John Doe:** `john.doe@example.com` / `user123`
- **Jane Smith:** `jane.smith@example.com` / `user123`
- **Role:** Regular User

---

## URLs

- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000/api`
- **Health Check:** `http://localhost:5000/api/health`
- **Admin Dashboard:** `http://localhost:3000/admin` (after login as admin)

---

## Complete Setup Checklist

- [ ] MySQL installed and running
- [ ] Database `postly_db` created
- [ ] Tables created (users, posts, comments, categories)
- [ ] Backend dependencies installed (`npm install` in `server/`)
- [ ] `.env` file created and configured
- [ ] Backend server running on port 5000
- [ ] Frontend dependencies installed (`npm install` in root)
- [ ] Frontend server running on port 3000
- [ ] Admin account password reset
- [ ] Can login as admin
- [ ] Admin dashboard accessible
- [ ] Demo data created (optional)

---

## Next Steps After Setup

1. ✅ Login as admin
2. ✅ Explore admin dashboard
3. ✅ Create test posts
4. ✅ Add comments
5. ✅ Test user management
6. ✅ Test content moderation
7. ✅ Customize for your needs

---

## Need Help?

- Check `QUICK_START.md` for quick reference
- Check `README.md` for full documentation
- Check `ADMIN_SYSTEM.md` for admin features
- Review error messages in terminal
- Check browser console (F12) for frontend errors

---

## Important Notes

1. **Keep both terminals open** while working (backend + frontend)
2. **MySQL must be running** for the backend to work
3. **Change admin password** after first login for security
4. **Backend must be running** before frontend can connect
5. **Port conflicts:** If ports 3000 or 5000 are in use, change them in `.env` files

---

**🎉 You're all set! Happy coding!**

