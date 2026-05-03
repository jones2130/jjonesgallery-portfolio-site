import React, { useState } from 'react';
import { User, Mail, MessageSquare, Briefcase } from 'lucide-react';
import RedbubbleIcon from '@/components/icons/RedbubbleIcon';
import KofiIcon from '@/components/icons/KofiIcon';
import LinkedInIcon from '@/components/icons/Linkedin';
import usePageMeta from '@/hooks/usePageMeta';
import './Contact.css';

export default function Contact() {
  usePageMeta({
    title: 'Contact',
    description:
      'Commission a painting or get in touch with artist James J Jones. Available for commissions, inquiries, and collaborations.',
    url: '/contact',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id.replace('contact-', '')]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');

      // GA4: track successful form submission
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'contact_form_submit', {
          event_category: 'engagement',
          event_label:    'contact_success',
        });
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to send message. Please try again later.');

      // GA4: track form submission error
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'contact_form_error', {
          event_category: 'engagement',
          event_label:    err.message || 'unknown_error',
        });
      }
    }
  };

  return (
    <div className="contact-page page-section">
      <div className="container contact-page__layout">
        <div className="fade-up">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            For commissions, inquiries, or just to say hello.
          </p>

          {status === 'success' ? (
            <div className="contact-page__success">
              <p>Thanks for reaching out — I'll get back to you soon.</p>
            </div>
          ) : (
            <form className="contact-page__form" onSubmit={handleSubmit} noValidate>
              <div className="contact-page__field">
                <label htmlFor="contact-name" className="contact-page__label">
                  <User size={16} /> Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="input"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                />
              </div>
              <div className="contact-page__field">
                <label htmlFor="contact-email" className="contact-page__label">
                  <Mail size={16} /> Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="input"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                />
              </div>
              <div className="contact-page__field">
                <label htmlFor="contact-message" className="contact-page__label">
                  <MessageSquare size={16} /> Message
                </label>
                <textarea
                  id="contact-message"
                  className="input contact-page__textarea"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                />
              </div>
              {status === 'error' && (
                <div className="contact-page__error" style={{ color: '#ef4444', marginBottom: '1rem' }}>
                  <p>{errorMessage}</p>
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        {/* Side links */}
        <aside className="contact-page__aside fade-up">
          <h2 className="contact-page__aside-title">Professional Links</h2>
          <div className="contact-page__links-container">
            <a href="https://www.redbubble.com/people/jamesjjonesart/shop" target="_blank" rel="noopener noreferrer" className="contact-page__aside-link">
              <RedbubbleIcon size={18} className="link-icon" />
              <span className="link-text">Redbubble Store</span>
              <span className="link-arrow">→</span>
            </a>
            <a href="https://ko-fi.com/jamesjjonesart" target="_blank" rel="noopener noreferrer" className="contact-page__aside-link">
              <KofiIcon size={18} className="link-icon" />
              <span className="link-text">Support on Ko-Fi</span>
              <span className="link-arrow">→</span>
            </a>
            <a href="https://www.linkedin.com/in/james-jones-a3472826" target="_blank" rel="noopener noreferrer" className="contact-page__aside-link">
              <LinkedInIcon size={18} className="link-icon" />
              <span className="link-text">LinkedIn Profile</span>
              <span className="link-arrow">→</span>
            </a>
            <a href="https://www.upwork.com/freelancers/~013efc563a3ed1c1a5" target="_blank" rel="noopener noreferrer" className="contact-page__aside-link">
              <Briefcase size={18} className="link-icon" />
              <span className="link-text">Hire on Upwork</span>
              <span className="link-arrow">→</span>
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
