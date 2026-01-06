import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [location.pathname]); // Re-check when route changes

  const handleLogout = () => {
    apiService.logout();
    setIsLoggedIn(false);
    setUser(null);
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: '#1877F2' }}>
      <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="/logo.png" 
            alt="Postly" 
            style={{ height: '160px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/')}`}
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/blog')}`}
                to="/blog"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/about')}`}
                to="/about"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/services')}`}
                to="/services"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/contact')}`}
                to="/contact"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            {isLoggedIn && user?.role === 'admin' && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/admin')}`}
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  style={{ color: '#ffd700', fontWeight: '600' }}
                >
                  <i className="fas fa-shield-alt me-1"></i>
                  Admin
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex gap-2 align-items-center">
            {isLoggedIn ? (
              <>
                <span className="text-light me-2 d-none d-md-inline" style={{ fontSize: '0.9rem' }}>
                  Welcome, {user?.username || 'User'}
                </span>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                  style={{ 
                    padding: '0.5rem 1.5rem',
                    fontWeight: '500',
                    borderRadius: '0.5rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-outline-light"
                onClick={() => setIsOpen(false)}
                style={{ 
                  padding: '0.5rem 1.5rem',
                  fontWeight: '500',
                  borderRadius: '0.5rem',
                  whiteSpace: 'nowrap'
                }}
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


