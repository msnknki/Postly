import React from 'react';

const Services = () => {
  const features = [
    {
      icon: 'fa-pencil',
      title: 'Rich Text Editor',
      description:
        'Create beautiful blog posts with our powerful rich text editor. Format text, add images, and style your content exactly as you want.',
    },
    {
      icon: 'fa-folder',
      title: 'Category Management',
      description:
        'Organize your posts into categories for better navigation and discoverability. Readers can easily find content they love.',
    },
    {
      icon: 'fa-thumbs-up',
      title: 'Like & Comment System',
      description:
        'Engage with your audience through likes and comments. Build a community around your content and interact with readers.',
    },
    {
      icon: 'fa-search',
      title: 'Advanced Search',
      description:
        'Find exactly what you\'re looking for with our powerful search functionality. Search by keywords, categories, or authors.',
    },
    {
      icon: 'fa-user',
      title: 'User Profiles',
      description:
        'Create and manage your profile. Showcase your posts, build your following, and establish your online presence.',
    },
    {
      icon: 'fa-mobile',
      title: 'Responsive Design',
      description:
        'Access your blog from any device. Our responsive design ensures a perfect experience on desktop, tablet, and mobile devices.',
    },
    {
      icon: 'fa-image',
      title: 'Image Upload',
      description:
        'Easily upload and manage images for your blog posts. Support for multiple image formats with automatic optimization.',
    },
    {
      icon: 'fa-shield',
      title: 'Secure Platform',
      description:
        'Your data and content are protected with industry-standard security measures. Focus on writing, we handle the security.',
    },
  ];

  return (
    <div className="container page-container">
      <div className="text-center mb-5 fade-in">
        <h1 className="display-4 mb-4">Our Services & Features</h1>
        <p className="lead text-muted">
          Everything you need to create, manage, and grow your blog
        </p>
      </div>

      <div className="row g-4 mb-5">
        {features.map((feature, index) => (
          <div key={index} className="col-md-6 col-lg-4 fade-in">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <i
                  className={`fa ${feature.icon} fa-3x text-primary mb-3`}
                ></i>
                <h4 className="card-title mb-3">{feature.title}</h4>
                <p className="card-text text-muted">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="mb-5 fade-in">
        <div className="card bg-primary text-white">
          <div className="card-body p-5 text-center">
            <h2 className="mb-4">Ready to Start Blogging?</h2>
            <p className="lead mb-4">
              Join our community of writers and start sharing your stories today.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a href="/blog" className="btn btn-light btn-lg">
                Explore Blog
              </a>
              <a href="/contact" className="btn btn-outline-light btn-lg">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5 fade-in">
        <h2 className="text-center mb-5">How It Works</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="text-center">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <span className="fs-2 fw-bold">1</span>
              </div>
              <h4>Sign Up</h4>
              <p className="text-muted">
                Create your account in minutes. No credit card required.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <span className="fs-2 fw-bold">2</span>
              </div>
              <h4>Create Content</h4>
              <p className="text-muted">
                Use our intuitive editor to write and publish your first post.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <span className="fs-2 fw-bold">3</span>
              </div>
              <h4>Engage & Grow</h4>
              <p className="text-muted">
                Connect with readers, build your audience, and grow your blog.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;


