import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import portfolioData from '@/data/portfolioData.json';
import PurchaseLinks from '@/components/PurchaseLinks';
import './ArtDetail.css';

export default function ArtDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const piece = portfolioData.find((p) => p.slug === slug);

  if (!piece) {
    return (
      <div className="art-detail art-detail--not-found page-section">
        <div className="container">
          <h1>Work Not Found</h1>
          <p>We couldn't find a piece at this URL.</p>
          <Link to="/gallery" className="btn btn-outline" style={{ marginTop: 'var(--space-lg)' }}>
            ← Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const { title, medium, date, height, width, tags, description, imageUrl, purchaseLinks } = piece;

  return (
    <article className="art-detail page-section fade-up">
      <div className="container">
        {/* Back nav */}
        <button className="art-detail__back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="art-detail__layout">
          {/* Image */}
          <div className="art-detail__image-wrap">
            <img
              src={imageUrl}
              alt={title}
              className="art-detail__image"
              onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }}
            />
          </div>

          {/* Info */}
          <div className="art-detail__info">
            <p className="art-detail__medium">
              {medium} &middot; {date}
              {height && width && ` · ${height}" x ${width}"`}
            </p>
            <h1 className="art-detail__title">{title}</h1>
            <p className="art-detail__description">{description}</p>

            {/* Tags */}
            {tags?.length > 0 && (
              <div className="art-detail__tags">
                {tags.map((tag) => (
                  <span key={tag} className="art-detail__tag">{tag}</span>
                ))}
              </div>
            )}

            {/* Purchase links */}
            <PurchaseLinks links={purchaseLinks} />
          </div>
        </div>
      </div>
    </article>
  );
}
