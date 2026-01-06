import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { apiService } from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // For demo purposes, use mock data if API fails
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await apiService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchPosts();
      return;
    }
    try {
      setLoading(true);
      const data = await apiService.searchPosts(searchTerm);
      setPosts(data);
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category_id === selectedCategory)
    : posts;

  return (
    <div className="container page-container">
      <div className="mb-4 fade-in">
        <h1 className="display-4 mb-4">Blog Posts</h1>
        <form className="d-flex mb-4" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
      </div>

      <section className="d-flex flex-column flex-md-row">
        <main className="main-blog">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <BlogCard key={post.post_id} post={post} />)
          ) : (
            <div className="alert alert-warning" role="alert">
              {searchTerm
                ? `No posts found for "${searchTerm}"`
                : 'No posts available yet. Check back soon!'}
            </div>
          )}
        </main>

        <aside className="aside-main">
          <div className="list-group category-aside">
            <button
              className={`list-group-item list-group-item-action ${
                selectedCategory === null ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`list-group-item list-group-item-action ${
                  selectedCategory === category.id ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.category}
              </button>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Blog;


