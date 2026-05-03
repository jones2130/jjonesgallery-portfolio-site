import React from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta';

export default function NotFound() {
  usePageMeta({
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found. Return to the James J Jones Gallery.',
  });

  return (
    <div className="page-section" style={{ textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '6rem', margin: 0, opacity: 0.2 }}>404</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)' }}>
          Page not found.
        </p>
        <Link to="/" className="btn btn-outline">← Back to Gallery</Link>
      </div>
    </div>
  );
}
