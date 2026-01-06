import React from 'react';

const About = () => {
  return (
    <div className="container page-container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-5 fade-in">
            <h1 className="display-4 mb-4">About Postly</h1>
            <p className="lead text-muted">
              A modern blogging platform designed for writers, thinkers, and
              creators
            </p>
          </div>

          <section className="mb-5 fade-in">
            <h2 className="mb-4">Our Mission</h2>
            <p className="mb-3">
              At Postly, we believe that everyone has a story to tell. Our
              mission is to provide a platform where writers can express
              themselves freely, share their knowledge, and connect with a
              community of like-minded individuals.
            </p>
            <p>
              We're committed to creating an environment that fosters creativity,
              encourages engagement, and makes blogging accessible to everyone,
              regardless of their technical expertise.
            </p>
          </section>

          <section className="mb-5 fade-in">
            <h2 className="mb-4">What We Offer</h2>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <i className="fa fa-check-circle fa-2x text-primary"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5>User-Friendly Interface</h5>
                    <p className="text-muted">
                      Intuitive design that makes blogging simple and enjoyable.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <i className="fa fa-check-circle fa-2x text-primary"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5>Rich Content Editor</h5>
                    <p className="text-muted">
                      Create beautiful posts with our powerful content editor.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <i className="fa fa-check-circle fa-2x text-primary"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5>Category Organization</h5>
                    <p className="text-muted">
                      Organize your content with customizable categories.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <i className="fa fa-check-circle fa-2x text-primary"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5>Community Features</h5>
                    <p className="text-muted">
                      Engage with readers through comments and likes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-5 fade-in">
            <h2 className="mb-4">Our Story</h2>
            <p className="mb-3">
              Postly was born from a simple idea: everyone deserves a beautiful
              and intuitive platform to share their voice. We recognized that
              many existing blogging platforms were either too complex for
              beginners or too limited for experienced writers. That's when we
              set out to create something different.
            </p>
            <p className="mb-3">
              Our journey began with a vision to build a platform that
              seamlessly blends cutting-edge technology with user-friendly
              design. We've carefully crafted every feature with our community
              in mind, ensuring that whether you're writing your first post or
              your hundredth, the experience remains smooth and inspiring.
            </p>
            <p>
              Today, Postly stands as a testament to our commitment to
              empowering writers and creators worldwide. We continue to evolve
              and improve, always listening to our community and staying at the
              forefront of web technology to deliver the best blogging experience
              possible.
            </p>
          </section>

          <section className="mb-5 fade-in">
            <h2 className="mb-4">Technology Stack</h2>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <i className="fa fa-code fa-3x text-primary mb-2"></i>
                    <h5>React.js</h5>
                    <p className="text-muted small mb-0">Frontend Framework</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <i className="fa fa-server fa-3x text-primary mb-2"></i>
                    <h5>PHP</h5>
                    <p className="text-muted small mb-0">Backend Language</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <i className="fa fa-database fa-3x text-primary mb-2"></i>
                    <h5>MySQL</h5>
                    <p className="text-muted small mb-0">Database</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;


