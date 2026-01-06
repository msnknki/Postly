import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="main-banner">
        <div className="container">
          <h1 className="display-3 fw-bold mb-4">Welcome to Postly</h1>
          <p className="lead mb-4">
            Share your thoughts, ideas, and stories with the world
          </p>
          <Link to="/blog" className="btn btn-light btn-lg me-2">
            Explore Blog
          </Link>
          <Link to="/about" className="btn btn-outline-light btn-lg">
            Learn More
          </Link>
        </div>
      </div>

      <div className="container page-container">
        <section className="mb-5 fade-in">
          <h2 className="text-center mb-5">Why Choose Postly?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <i className="fa fa-pencil fa-3x text-primary mb-3"></i>
                  <h4 className="card-title">Easy to Write</h4>
                  <p className="card-text">
                    Our intuitive editor makes it simple to create and publish
                    your content. Focus on writing, we'll handle the rest.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <i className="fa fa-users fa-3x text-primary mb-3"></i>
                  <h4 className="card-title">Engage with Community</h4>
                  <p className="card-text">
                    Connect with readers through comments, likes, and shares.
                    Build your audience and grow your influence.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <i className="fa fa-mobile fa-3x text-primary mb-3"></i>
                  <h4 className="card-title">Responsive Design</h4>
                  <p className="card-text">
                    Access your blog from any device. Our responsive design
                    ensures a great experience on desktop, tablet, and mobile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 fade-in">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="mb-4">Start Your Blogging Journey Today</h2>
              <p className="lead">
                Whether you're a seasoned writer or just starting out, Postly
                provides the tools and platform you need to share your voice
                with the world.
              </p>
              <p>
                Join thousands of bloggers who are already sharing their stories,
                insights, and expertise on our platform.
              </p>
              <Link to="/blog" className="btn btn-primary btn-lg mt-3">
                View Latest Posts
              </Link>
            </div>
            <div className="col-md-6">
              <div className="card shadow">
                <div className="card-body p-5 text-center">
                  <i className="fa fa-rocket fa-5x text-primary mb-3"></i>
                  <h3>Ready to Get Started?</h3>
                  <p className="text-muted">
                    Create an account and start publishing your first post today!
                  </p>
                  <Link to="/contact" className="btn btn-outline-primary">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;


