import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: 'var(--space-2xl) var(--space-lg)' }}>
      <p style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 'var(--space-md)' }}>
        404
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: 'var(--space-lg)' }}>
        Page Not Found
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
        This page doesn't exist, or the work has moved.
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">Go Home</Link>
        <Link to="/gallery" className="btn btn-outline">Browse Gallery</Link>
      </div>
    </div>
  );
}
