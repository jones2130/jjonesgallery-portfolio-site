import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNsfw } from '@/contexts/NsfwContext';
import './ArtCard.css';

/**
 * ArtCard
 * Gallery grid card linking to /art/:slug.
 *
 * @param {{ piece: Object }} props
 */
export default function ArtCard({ piece }) {
  const { slug, title, medium, date, imageUrl, nsfw } = piece;
  const { nsfwFilterEnabled } = useNsfw();
  const [isRevealed, setIsRevealed] = useState(false);

  const shouldBlur = nsfw && nsfwFilterEnabled && !isRevealed;

  const handleReveal = (e) => {
    if (shouldBlur) {
      e.preventDefault();
      setIsRevealed(true);
    }
  };

  return (
    <Link to={`/art/${slug}`} className="art-card" aria-label={`View ${title}`} onClick={handleReveal}>
      <div className="art-card__image-wrap">
        <img
          src={imageUrl}
          alt={title}
          className={`art-card__image ${shouldBlur ? 'art-card__image--blurred' : ''}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.svg';
          }}
        />
        {shouldBlur && (
          <div className="art-card__nsfw-overlay">
            <span className="art-card__nsfw-text">NSFW<br/>Click to Reveal</span>
          </div>
        )}
        {!shouldBlur && (
          <div className="art-card__overlay">
            <span className="art-card__view">View Work →</span>
          </div>
        )}
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
