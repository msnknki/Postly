import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send data to a backend API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="container page-container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-5 fade-in">
            <h1 className="display-4 mb-4">Contact Us</h1>
            <p className="lead text-muted">
              Have a question or feedback? We'd love to hear from you!
            </p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-4 fade-in">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <i className="fa fa-map-marker fa-3x text-primary mb-3"></i>
                  <h5>Address</h5>
                  <p className="text-muted mb-0">
                    Hamra Street<br />
                    Beirut, Lebanon
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 fade-in">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <i className="fa fa-phone fa-3x text-primary mb-3"></i>
                  <h5>Phone</h5>
                  <p className="text-muted mb-0">
                    +(961) 70707070
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 fade-in">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <i className="fa fa-envelope fa-3x text-primary mb-3"></i>
                  <h5>Email</h5>
                  <p className="text-muted mb-0">
                    admin@postly.com<br />
                    

                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow fade-in">
            <div className="card-body p-4">
              <h3 className="mb-4">Send us a Message</h3>
              {submitted && (
                <div className="alert alert-success" role="alert">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="mt-5 fade-in">
            <h3 className="mb-4">Follow Us</h3>
            <div className="d-flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary"
              >
                <i className="fa fa-facebook me-2"></i>Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-info"
              >
                <i className="fa fa-twitter me-2"></i>Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-danger"
              >
                <i className="fa fa-instagram me-2"></i>Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


