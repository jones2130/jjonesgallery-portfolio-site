import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Palette, Info, Mail } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/gallery', label: 'Gallery', icon: <Palette /> },
  { to: '/about', label: 'About', icon: <Info /> },
  { to: '/contact', label: 'Contact', icon: <Mail /> },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          James J Jones Gallery
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Primary navigation">
          {NAV_LINKS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="navbar__mobile" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
