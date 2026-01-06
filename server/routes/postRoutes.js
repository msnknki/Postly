/**
 * Post Routes
 * 
 * Defines all blog post-related API endpoints.
 */

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticateToken } = require('../middleware/auth');
const { validatePost } = require('../middleware/validation');

// Public routes (no authentication required)
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// Protected routes (authentication required)
router.post('/', authenticateToken, validatePost, postController.createPost);
router.put('/:id', authenticateToken, validatePost, postController.updatePost);
router.delete('/:id', authenticateToken, postController.deletePost);

module.exports = router;

