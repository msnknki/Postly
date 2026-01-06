/**
 * Comment Routes
 * 
 * Defines all comment-related API endpoints.
 */

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authenticateToken } = require('../middleware/auth');
const { validateComment } = require('../middleware/validation');

// Public route
router.get('/posts/:postId/comments', commentController.getCommentsByPost);

// Protected routes (authentication required)
router.post('/posts/:postId/comments', authenticateToken, validateComment, commentController.createComment);
router.put('/:id', authenticateToken, validateComment, commentController.updateComment);
router.delete('/:id', authenticateToken, commentController.deleteComment);

module.exports = router;

