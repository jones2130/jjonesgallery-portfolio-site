import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import portfolioData from '@/data/portfolioData.json';
import PurchaseLinks from '@/components/PurchaseLinks';
import StructuredData from '@/components/StructuredData';
import usePageMeta from '@/hooks/usePageMeta';
import './ArtDetail.css';

export default function ArtDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const piece = portfolioData.find((p) => p.slug === slug);

  // ── Meta for "not found" state ───────────────────────────────────────────
  usePageMeta(
    piece
      ? {
          title:       piece.title,
          description: piece.description
            ? piece.description.slice(0, 155)
            : `${piece.title} — ${piece.medium}, ${piece.date}. Original work by James J Jones.`,
          image:       piece.imageUrl?.startsWith('http')
            ? piece.imageUrl
            : piece.imageUrl
              ? `https://www.jamesjjonesgallery.com${piece.imageUrl}`
              : undefined,
          url:         `/art/${slug}`,
          type:        'article',
        }
      : {
          title:       'Work Not Found',
          description: 'This artwork could not be found. Browse the James J Jones Gallery for available works.',
        }
  );

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

  const artworkSchema = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: title,
    description: description || `${title} — ${medium}, ${date}.`,
    image: imageUrl?.startsWith('http')
      ? imageUrl
      : `https://www.jamesjjonesgallery.com${imageUrl}`,
    url: `https://www.jamesjjonesgallery.com/art/${slug}`,
    dateCreated: date,
    artMedium: medium,
    ...(height && width
      ? { width: `${width} inches`, height: `${height} inches` }
      : {}),
    creator: {
      '@type': 'Person',
      name: 'James J Jones',
      url: 'https://www.jamesjjonesgallery.com/',
    },
    artworkSurface: medium,
    keywords: tags ? tags.join(', ') : '',
  };

  return (
    <article className="art-detail page-section fade-up">
      <StructuredData schema={artworkSchema} />
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
