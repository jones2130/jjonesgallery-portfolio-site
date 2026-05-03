/**
 * usePageMeta
 *
 * Sets per-page <title>, <meta name="description">, canonical <link>,
 * and Open Graph / Twitter Card meta tags. Called inside each page
 * component so metadata is always in sync with the current route.
 *
 * @param {Object} opts
 * @param {string} opts.title        - Full page title (shown in browser tab & search)
 * @param {string} opts.description  - Meta description (up to ~160 chars for best SEO)
 * @param {string} [opts.image]      - Absolute URL of the OG image (optional)
 * @param {string} [opts.url]        - Canonical URL for this page (optional)
 * @param {string} [opts.type]       - OG type, e.g. "website" or "article" (default: "website")
 */

import { useEffect } from 'react';

const SITE_NAME = 'James J Jones Gallery';
const BASE_URL  = 'https://www.jamesjjonesgallery.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

// Helper: find-or-create a <meta> tag by attribute selector
function getOrCreateMeta(attr, value) {
  let el = document.querySelector(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  return el;
}

// Helper: find-or-create the <link rel="canonical"> tag
function getOrCreateCanonical() {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  return el;
}

export default function usePageMeta({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${SITE_NAME}`
      : SITE_NAME;
    const canonicalUrl = url
      ? `${BASE_URL}${url}`
      : `${BASE_URL}${window.location.pathname}`;

    // <title>
    document.title = fullTitle;

    // <meta name="description">
    getOrCreateMeta('name', 'description').setAttribute('content', description || '');

    // <link rel="canonical">
    getOrCreateCanonical().setAttribute('href', canonicalUrl);

    // Open Graph
    getOrCreateMeta('property', 'og:title').setAttribute('content', fullTitle);
    getOrCreateMeta('property', 'og:description').setAttribute('content', description || '');
    getOrCreateMeta('property', 'og:url').setAttribute('content', canonicalUrl);
    getOrCreateMeta('property', 'og:image').setAttribute('content', image);
    getOrCreateMeta('property', 'og:type').setAttribute('content', type);

    // Twitter / X Card
    getOrCreateMeta('name', 'twitter:title').setAttribute('content', fullTitle);
    getOrCreateMeta('name', 'twitter:description').setAttribute('content', description || '');
    getOrCreateMeta('name', 'twitter:image').setAttribute('content', image);
  }, [title, description, image, url, type]);
}
