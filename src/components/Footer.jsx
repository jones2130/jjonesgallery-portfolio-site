import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {year} James J Jones Gallery. All rights reserved.
        </p>
        <nav className="footer__links" aria-label="Footer navigation">
          <a
            href="https://www.redbubble.com/people/jamesjjonesart/shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Redbubble
          </a>
          <a
            href="https://ko-fi.com/jamesjjonesart"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Ko-Fi
          </a>
          <Link to="/contact" className="footer__link">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
