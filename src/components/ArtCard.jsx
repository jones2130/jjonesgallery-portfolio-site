import React from 'react';
import { Link } from 'react-router-dom';
import './ArtCard.css';

/**
 * ArtCard
 * Gallery grid card linking to /art/:slug.
 *
 * @param {{ piece: Object }} props
 */
export default function ArtCard({ piece }) {
  const { slug, title, medium, date, imageUrl } = piece;

  return (
    <Link to={`/art/${slug}`} className="art-card" aria-label={`View ${title}`}>
      <div className="art-card__image-wrap">
        <img
          src={imageUrl}
          alt={title}
          className="art-card__image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.svg';
          }}
        />
        <div className="art-card__overlay">
          <span className="art-card__view">View Work →</span>
        </div>
      </div>
      <div className="art-card__info">
        <h3 className="art-card__title">{title}</h3>
        <p className="art-card__meta">
          {medium} &middot; {date}
        </p>
      </div>
    </Link>
  );
}
