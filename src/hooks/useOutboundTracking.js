/**
 * useOutboundTracking
 *
 * Attaches a document-level click listener that fires a GA4 `outbound_click`
 * event whenever the user clicks a link to an external domain.
 *
 * This automatically captures clicks to Redbubble, Ko-Fi, LinkedIn, Upwork,
 * and any other external URLs added to the site in the future.
 *
 * Must be called once inside a component that persists across routes (App.jsx).
 */

import { useEffect } from 'react';

export default function useOutboundTracking() {
  useEffect(() => {
    function handleClick(event) {
      const link = event.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Only track links that point to external domains
      const isExternal =
        href.startsWith('http://') || href.startsWith('https://');
      const isSameDomain =
        isExternal && new URL(href).hostname === window.location.hostname;

      if (isExternal && !isSameDomain) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'outbound_click', {
            link_url:   href,
            link_text:  link.innerText?.trim() || link.getAttribute('aria-label') || '',
            link_domain: new URL(href).hostname,
          });
        }
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
