import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
    if (activeTab === 'overview') {
      fetchStats();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'posts') {
      fetchPosts();
    } else if (activeTab === 'comments') {
      fetchComments();
    }
  }, [activeTab]);

  const checkAdminAccess = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.role || user.role !== 'admin') {
      navigate('/');
      return;
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAdminStats();
      setStats(data);
    } catch (err) {
      setError('Failed to load statistics. ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users. ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts. ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      // Get all posts first, then get comments for each
      const postsData = await apiService.getPosts();
      const allComments = [];
      
      for (const post of postsData) {
        try {
          const postComments = await apiService.getComments(post.post_id);
          // Add post info to each comment
          const commentsWithPost = postComments.map(comment => ({
            ...comment,
            post_title: post.post_title,
            post_id: post.post_id
          }));
          allComments.push(...commentsWithPost);
        } catch (err) {
          // Skip if error getting comments for a post
        }
      }
      
      setComments(allComments);
    } catch (err) {
      setError('Failed to load comments. ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await apiService.deleteUser(userId);
      setSuccess(`User "${username}" deleted successfully.`);
      fetchUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete user. ' + (err.message || ''));
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeletePost = async (postId, title) => {
    if (!window.confirm(`Are you sure you want to delete post "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await apiService.adminDeletePost(postId);
      setSuccess(`Post "${title}" deleted successfully.`);
      fetchPosts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete post. ' + (err.message || ''));
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteComment = async (commentId, commentText) => {
    const preview = commentText.length > 50 ? commentText.substring(0, 50) + '...' : commentText;
    if (!window.confirm(`Are you sure you want to delete this comment?\n\n"${preview}"\n\nThis action cannot be undone.`)) {
      return;
    }

    try {
      await apiService.adminDeleteComment(commentId);
      setSuccess('Comment deleted successfully.');
      fetchComments();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete comment. ' + (err.message || ''));
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await apiService.updateUser(userId, { role: newRole });
      setSuccess(`User role updated to ${newRole}.`);
      fetchUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update user role. ' + (err.message || ''));
      setTimeout(() => setError(''), 3000);
    }
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (user.role !== 'admin') {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="admin-header">
              <h1 className="admin-title">
                <i className="fas fa-shield-alt me-2"></i>
                Admin Dashboard
              </h1>
              <p className="admin-subtitle">Manage users, posts, and content moderation</p>
            </div>

            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" className="btn-close" onClick={() => setError('')}></button>
              </div>
            )}

            {success && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {success}
                <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
              </div>
            )}

            <ul className="nav nav-tabs admin-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <i className="fas fa-chart-bar me-2"></i>Overview
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                  onClick={() => setActiveTab('users')}
                >
                  <i className="fas fa-users me-2"></i>Users ({users.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('posts')}
                >
                  <i className="fas fa-file-alt me-2"></i>Posts ({posts.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'comments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('comments')}
                >
                  <i className="fas fa-comments me-2"></i>Comments ({comments.length})
                </button>
              </li>
            </ul>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {activeTab === 'overview' && stats && (
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="stat-card">
                        <div className="stat-icon users-icon">
                          <i className="fas fa-users"></i>
                        </div>
                        <div className="stat-content">
                          <h3>{stats.users?.total || 0}</h3>
                          <p>Total Users</p>
                          <small>{stats.users?.admins || 0} Admins, {stats.users?.users || 0} Regular Users</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="stat-card">
                        <div className="stat-icon posts-icon">
                          <i className="fas fa-file-alt"></i>
                        </div>
                        <div className="stat-content">
                          <h3>{stats.posts?.total || 0}</h3>
                          <p>Total Posts</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="stat-card">
                        <div className="stat-icon comments-icon">
                          <i className="fas fa-comments"></i>
                        </div>
                        <div className="stat-content">
                          <h3>{stats.comments?.total || 0}</h3>
                          <p>Total Comments</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'users' && (
                  <div className="admin-table-container">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Joined</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                              <select
                                className="form-select form-select-sm"
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.user_id, e.target.value)}
                                style={{ width: 'auto', display: 'inline-block' }}
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td>{new Date(user.created_at).toLocaleDateString()}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteUser(user.user_id, user.username)}
                                disabled={user.user_id === JSON.parse(localStorage.getItem('user') || '{}').userId}
                                title={user.user_id === JSON.parse(localStorage.getItem('user') || '{}').userId ? 'Cannot delete your own account' : 'Delete user'}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'posts' && (
                  <div className="admin-table-container">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Category</th>
                          <th>Created</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((post) => (
                          <tr key={post.post_id}>
                            <td>{post.post_id}</td>
                            <td>{post.post_title}</td>
                            <td>{post.username}</td>
                            <td>{post.category_name || 'Uncategorized'}</td>
                            <td>{new Date(post.created_at).toLocaleDateString()}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeletePost(post.post_id, post.post_title)}
                              >
                                <i className="fas fa-trash"></i> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div className="admin-table-container">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Comment</th>
                          <th>Author</th>
                          <th>Post</th>
                          <th>Created</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comments.length > 0 ? (
                          comments.map((comment) => (
                            <tr key={comment.comment_id}>
                              <td>{comment.comment_id}</td>
                              <td style={{ maxWidth: '400px' }}>
                                <div style={{ 
                                  overflow: 'hidden', 
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }} title={comment.comment}>
                                  {comment.comment}
                                </div>
                              </td>
                              <td>{comment.username}</td>
                              <td>{comment.post_title}</td>
                              <td>{new Date(comment.created_at).toLocaleDateString()}</td>
                              <td>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDeleteComment(comment.comment_id, comment.comment)}
                                  title="Delete comment"
                                >
                                  <i className="fas fa-trash"></i> Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center text-muted py-4">
                              No comments found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

