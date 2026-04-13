import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to email service / API in v2
    setSubmitted(true);
  };

  return (
    <div className="contact-page page-section">
      <div className="container contact-page__layout">
        <div className="fade-up">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            For commissions, inquiries, or just to say hello.
          </p>

          {submitted ? (
            <div className="contact-page__success">
              <p>Thanks for reaching out — I'll get back to you soon.</p>
            </div>
          ) : (
            <form className="contact-page__form" onSubmit={handleSubmit} noValidate>
              <div className="contact-page__field">
                <label htmlFor="contact-name" className="contact-page__label">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  className="input"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="contact-page__field">
                <label htmlFor="contact-email" className="contact-page__label">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="input"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="contact-page__field">
                <label htmlFor="contact-message" className="contact-page__label">Message</label>
                <textarea
                  id="contact-message"
                  className="input contact-page__textarea"
                  rows={6}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          )}
        </div>

        {/* Side links */}
        <aside className="contact-page__aside fade-up">
          <h2 className="contact-page__aside-title">Other Ways to Connect</h2>
          <a href="https://www.redbubble.com/" target="_blank" rel="noopener noreferrer" className="contact-page__aside-link">
            Redbubble — Prints &amp; Merch
          </a>
          <a href="https://ko-fi.com/" target="_blank" rel="noopener noreferrer" className="contact-page__aside-link">
            Ko-Fi — Buy Originals
          </a>
        </aside>
      </div>
    </div>
  );
}
