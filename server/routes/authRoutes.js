/**
 * Authentication Routes
 * 
 * Defines all authentication-related API endpoints.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validation');

// Public routes
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);

// Protected route (requires authentication)
router.get('/me', authenticateToken, authController.getMe);

module.exports = router;

