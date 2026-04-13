import React from 'react';
import './PurchaseLinks.css';

/**
 * PurchaseLinks
 * Renders Redbubble (prints/merch) and Ko-Fi (original) purchase buttons.
 * Only renders if at least one link is provided.
 *
 * @param {{ links: { redbubble?: string, kofi?: string } }} props
 */
export default function PurchaseLinks({ links }) {
  if (!links || (!links.redbubble && !links.kofi)) return null;

  return (
    <div className="purchase-links">
      <h3 className="purchase-links__heading">Purchase This Work</h3>
      <div className="purchase-links__buttons">
        {links.redbubble && (
          <a
            href={links.redbubble}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline purchase-links__btn"
          >
            {/* Redbubble icon placeholder */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="8" cy="8" r="3" fill="currentColor"/>
            </svg>
            Prints &amp; Merch — Redbubble
          </a>
        )}
        {links.kofi && (
          <a
            href={links.kofi}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary purchase-links__btn"
          >
            {/* Ko-Fi cup icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 4h9a3 3 0 0 1 0 6H2V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M3 10v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 10v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Buy Original — Ko-Fi
          </a>
        )}
      </div>
    </div>
  );
}
