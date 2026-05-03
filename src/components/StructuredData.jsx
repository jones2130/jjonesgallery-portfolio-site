/**
 * StructuredData
 *
 * Injects a <script type="application/ld+json"> tag into <head> with the
 * provided JSON-LD schema. Helps Google understand your content and can
 * unlock rich search results (e.g., artwork cards, breadcrumbs).
 *
 * Usage:
 *   <StructuredData schema={{ "@context": "https://schema.org", ... }} />
 */

import { useEffect } from 'react';

export default function StructuredData({ schema }) {
  useEffect(() => {
    const id = 'structured-data-ld-json';
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement('script');
      script.id   = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      // Clean up when unmounting so stale schemas don't bleed into other pages
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [schema]);

  return null;
}
