/**
 * useAnalytics
 *
 * Fires a GA4 `page_view` event on every React Router navigation.
 * Must be called once inside a component that lives below <BrowserRouter>
 * (e.g., App.jsx). The initial page load is also tracked here.
 *
 * Requires the gtag script in index.html with `send_page_view: false`
 * to avoid double-counting the first load.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Guard: gtag may not be available in test environments
    if (typeof window.gtag !== 'function') return;

    window.gtag('event', 'page_view', {
      page_title:    document.title,
      page_location: window.location.href,
      page_path:     location.pathname + location.search,
    });
  }, [location]);
}
