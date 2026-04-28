import React from 'react';
import RedbubbleIcon from './icons/RedbubbleIcon';
import KofiIcon from './icons/KofiIcon';
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
            <RedbubbleIcon size={16} />
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
            <KofiIcon size={16} />
            Buy Original — Ko-Fi
          </a>
        )}
      </div>
    </div>
  );
}
