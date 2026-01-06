import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { apiService } from '../services/api';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiService.getPostById(id);
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      const data = await apiService.getComments(id);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [id]);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await apiService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchPost();
    fetchComments();
    fetchCategories();
  }, [fetchPost, fetchComments, fetchCategories]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setSubmitting(true);
      await apiService.addComment(id, commentText);
      setCommentText('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Please login to add comments');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container page-container">
        <div className="spinner-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container page-container">
        <div className="alert alert-warning" role="alert">
          Post not found. <Link to="/blog">Go back to blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <section className="d-flex flex-column flex-md-row">
        <main className="main-blog">
          <div className="card main-blog-card mb-5 fade-in">
            {post.cover_url && (
              <img
                src={
                  typeof post.cover_url === 'string' && post.cover_url.startsWith('http')
                    ? post.cover_url
                    : `http://localhost/upload/blog/${post.cover_url}`
                }
                className="card-img-top"
                alt={post.post_title}
                style={{ height: '400px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Blog+Post';
                }}
              />
            )}
            <div className="card-body">
              <h1 className="card-title mb-4">{post.post_title}</h1>
              <div
                className="card-text mb-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.post_text || ''),
                }}
              />
              <hr />
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="react-btns">
                  <i className="fa fa-thumbs-up me-2" aria-hidden="true"></i>
                  <span className="me-3">{post.likes_count || 0} Likes</span>
                  <i className="fa fa-comment me-2" aria-hidden="true"></i>
                  <span>{comments.length} Comments</span>
                </div>
                <small className="text-body-secondary">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </small>
              </div>

              <form onSubmit={handleCommentSubmit} id="comments">
                <h5 className="mt-4 text-secondary">Add Comment</h5>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your comment here..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Comment'}
                </button>
              </form>

              <hr className="my-4" />

              <div className="comments">
                <h5 className="mb-4">Comments ({comments.length})</h5>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.comment_id} className="comment d-flex mb-4">
                      <div className="me-3">
                        <img
                          src="https://via.placeholder.com/40?text=U"
                          alt="User"
                          width="40"
                          height="40"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-bold">@{comment.username}</span>
                        <p className="mb-1">{comment.comment}</p>
                        <small className="text-body-secondary">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </div>
          </div>
        </main>

        <aside className="aside-main">
          <div className="list-group category-aside">
            <Link
              to="/blog"
              className="list-group-item list-group-item-action active"
            >
              Categories
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/blog?category=${category.id}`}
                className="list-group-item list-group-item-action"
              >
                {category.category}
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default BlogDetail;


