/**
 * Authentication Middleware
 * 
 * This middleware verifies JWT tokens for protected routes.
 * It extracts the token from the Authorization header and
 * verifies it using the JWT_SECRET from environment variables.
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token
 * Expects token in Authorization header as: "Bearer <token>"
 */
const authenticateToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
};

/**
 * Middleware to check if user is admin
 * Must be used after authenticateToken middleware
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
};

module.exports = { authenticateToken, isAdmin };

