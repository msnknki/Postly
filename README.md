# Postly - Blog Platform

A full-stack blog platform built with React.js (frontend) and Node.js/Express/MySQL (backend) for CSCI426.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

## 🎯 Project Overview

Postly is a modern blog platform that allows users to:
- Create and manage blog posts
- Browse posts by categories
- Comment on posts
- Search for content
- User authentication and authorization

This project was developed in two phases:
- **Phase 1**: React.js frontend (completed)
- **Phase 2**: Node.js/Express/MySQL backend (completed)

## ✨ Features

### Frontend Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ 5+ pages (Home, About, Blog, Blog Detail, Services, Contact)
- ✅ Dynamic routing with React Router
- ✅ Blog post listing with categories
- ✅ Search functionality
- ✅ Comment system
- ✅ Modern UI with Bootstrap

### Backend Features
- ✅ RESTful API design
- ✅ User authentication (JWT)
- ✅ Password hashing (bcrypt)
- ✅ Full CRUD operations for posts
- ✅ Comments system
- ✅ Categories management
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled for frontend communication
- ✅ Admin role support

## 🛠 Tech Stack

### Frontend
- React.js 18.2
- React Router DOM 7.9
- Bootstrap 5.3
- Axios 1.13
- Font Awesome Icons

### Backend
- Node.js 14+
- Express.js 4.18
- MySQL 8.0+
- mysql2 (database driver)
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- CORS (Cross-Origin Resource Sharing)
- dotenv (environment variables)

## 📁 Project Structure

```
Postly/
├── public/                 # Static files
├── src/                    # React frontend source
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── services/         # API service layer
│   └── App.js            # Main app component
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   │   ├── database.js   # Database connection
│   │   └── db-schema.sql # Database schema
│   ├── controllers/      # Request handlers
│   │   ├── authController.js
│   │   ├── postController.js
│   │   ├── commentController.js
│   │   └── categoryController.js
│   ├── models/           # Database models
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Comment.js
│   │   └── Category.js
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   ├── commentRoutes.js
│   │   └── categoryRoutes.js
│   ├── middleware/       # Custom middleware
│   │   ├── auth.js       # JWT authentication
│   │   └── validation.js # Input validation
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── env.example       # Environment variables template
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL (v8.0 or higher)
- Git

### Frontend Setup

1. **Navigate to project root**
   ```bash
   cd Postly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open browser**
   - Frontend will run on `http://localhost:3000`

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL database**
   - Create a MySQL database (or use existing)
   - Run the schema file:
     ```bash
     mysql -u root -p < config/db-schema.sql
     ```
   - Or import manually using MySQL Workbench/phpMyAdmin

4. **Configure environment variables**
   ```bash
   cp env.example .env
   ```
   - Edit `.env` file with your database credentials:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=postly_db
     JWT_SECRET=your_secret_key_here
     PORT=5000
     FRONTEND_URL=http://localhost:3000
     ```

5. **Start the backend server**
   ```bash
   npm start
   ```
   - For development with auto-reload:
     ```bash
     npm run dev
     ```

6. **Verify backend is running**
   - Check health endpoint: `http://localhost:5000/api/health`
   - You should see: `{"success":true,"message":"Postly API is running"}`

## 🗄 Database Schema

The database consists of 4 main tables with proper relationships:

### Tables

1. **users**
   - `user_id` (PK, AUTO_INCREMENT)
   - `username` (UNIQUE, NOT NULL)
   - `email` (UNIQUE, NOT NULL)
   - `password` (HASHED, NOT NULL)
   - `role` (ENUM: 'user', 'admin')
   - `created_at`, `updated_at`

2. **categories**
   - `category_id` (PK, AUTO_INCREMENT)
   - `category_name` (UNIQUE, NOT NULL)
   - `created_at`, `updated_at`

3. **posts**
   - `post_id` (PK, AUTO_INCREMENT)
   - `user_id` (FK → users.user_id)
   - `category_id` (FK → categories.category_id)
   - `post_title` (NOT NULL)
   - `post_text` (TEXT, NOT NULL)
   - `cover_url` (VARCHAR, NULLABLE)
   - `likes_count` (INT, DEFAULT 0)
   - `created_at`, `updated_at`

4. **comments**
   - `comment_id` (PK, AUTO_INCREMENT)
   - `post_id` (FK → posts.post_id)
   - `user_id` (FK → users.user_id)
   - `comment` (TEXT, NOT NULL)
   - `created_at`, `updated_at`

### Relationships
- **Users → Posts**: One-to-Many (one user can have many posts)
- **Posts → Comments**: One-to-Many (one post can have many comments)
- **Users → Comments**: One-to-Many (one user can have many comments)
- **Categories → Posts**: One-to-Many (one category can have many posts)

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "userId": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "token": "jwt_token_here",
    "user": { ... }
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Post Endpoints

#### Get All Posts
```http
GET /api/posts
GET /api/posts?search=react
GET /api/posts?category_id=1
GET /api/posts?limit=10&offset=0
```

#### Get Post by ID
```http
GET /api/posts/:id
```

#### Create Post (Protected)
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "post_title": "My First Post",
  "post_text": "This is the content...",
  "category_id": 1,
  "cover_url": "image.jpg"
}
```

#### Update Post (Protected)
```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "post_title": "Updated Title",
  "post_text": "Updated content..."
}
```

#### Delete Post (Protected)
```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

### Comment Endpoints

#### Get Comments for Post
```http
GET /api/comments/posts/:postId/comments
```

#### Create Comment (Protected)
```http
POST /api/comments/posts/:postId/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "comment": "Great post!"
}
```

#### Update Comment (Protected)
```http
PUT /api/comments/:id
Authorization: Bearer <token>
```

#### Delete Comment (Protected)
```http
DELETE /api/comments/:id
Authorization: Bearer <token>
```

### Category Endpoints

#### Get All Categories
```http
GET /api/categories
```

#### Get Category by ID
```http
GET /api/categories/:id
```

#### Create Category (Admin Only)
```http
POST /api/categories
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "category_name": "Technology"
}
```

## 🔐 Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=postly_db

# JWT Secret (generate a strong random string)
JWT_SECRET=your_secret_key_here
```

### Frontend
Update `src/services/api.js` to point to your backend URL:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

## 🚢 Deployment

### Backend Deployment (Render/Railway)

#### Option 1: Render

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**
3. **Configure build settings:**
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
4. **Add environment variables:**
   - Copy all variables from `.env`
   - Set `NODE_ENV=production`
   - Update `FRONTEND_URL` to your frontend URL
5. **Deploy!**

#### Option 2: Railway

1. **Create a new project** on Railway
2. **Connect your GitHub repository**
3. **Add MySQL service** (or use external MySQL)
4. **Configure environment variables**
5. **Deploy!**

### Frontend Deployment

1. **Build the React app:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel/Netlify:**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Add environment variable: `REACT_APP_API_URL=https://your-backend-url.com/api`

3. **Update CORS in backend:**
   - Set `FRONTEND_URL` to your deployed frontend URL

## 📸 Screenshots

_Add screenshots of your application here_

- Home Page
- Blog Listing Page
- Blog Detail Page
- Login/Register Pages
- Admin Dashboard (if implemented)

## 🎓 Design Decisions

### Why mysql2 instead of Sequelize?
- **Simplicity**: Direct SQL queries are easier to understand for a university project
- **Performance**: No ORM overhead for simple CRUD operations
- **Learning**: Better understanding of SQL and database relationships
- **Control**: More control over query optimization

### Why JWT for authentication?
- **Stateless**: No need for server-side session storage
- **Scalable**: Works well with multiple servers
- **Standard**: Industry-standard authentication method
- **Secure**: Token-based authentication with expiration

### Why bcrypt for password hashing?
- **Security**: Industry-standard password hashing algorithm
- **Built-in salt**: Automatically handles salt generation
- **Configurable**: Adjustable cost factor for security vs performance

## 📝 License

This project is developed for educational purposes (CSCI426).

## 👤 Author

[Your Name]

---

**Note**: This is a university project for CSCI426. Ensure all code follows academic integrity guidelines.
