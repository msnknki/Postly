# API Reference

Quick reference guide for all API endpoints in the Postly backend.

## Base URL
```
http://localhost:5000/api
```

## Authentication

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

## Posts

### Get All Posts
```http
GET /api/posts
GET /api/posts?search=react
GET /api/posts?category_id=1
GET /api/posts?limit=10&offset=0
```

### Get Post by ID
```http
GET /api/posts/:id
```

### Create Post (Protected)
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

### Update Post (Protected)
```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "post_title": "Updated Title",
  "post_text": "Updated content..."
}
```

### Delete Post (Protected)
```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

## Comments

### Get Comments for Post
```http
GET /api/comments/posts/:postId/comments
```

### Create Comment (Protected)
```http
POST /api/comments/posts/:postId/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "comment": "Great post!"
}
```

### Update Comment (Protected)
```http
PUT /api/comments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "comment": "Updated comment text"
}
```

### Delete Comment (Protected)
```http
DELETE /api/comments/:id
Authorization: Bearer <token>
```

## Categories

### Get All Categories
```http
GET /api/categories
```

### Get Category by ID
```http
GET /api/categories/:id
```

### Create Category (Admin Only)
```http
POST /api/categories
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "category_name": "Technology"
}
```

### Update Category (Admin Only)
```http
PUT /api/categories/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "category_name": "Updated Category"
}
```

### Delete Category (Admin Only)
```http
DELETE /api/categories/:id
Authorization: Bearer <admin_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (no token or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Tokens are returned on successful login/registration and expire after 7 days.

