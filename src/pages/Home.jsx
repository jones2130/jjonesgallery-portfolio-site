import React from 'react';
import { Link } from 'react-router-dom';
import ArtCard from '@/components/ArtCard';
import SearchBar from '@/components/SearchBar';
import useSearch from '@/hooks/useSearch';
import portfolioData from '@/data/portfolioData';
import './Home.css';

export default function Home() {
  const { query, setQuery, results } = useSearch();
  const featured = portfolioData.slice(0, 3);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="container hero__content fade-up">
          <p className="hero__eyebrow">Original Works</p>
          <h1 className="hero__title">James J Jones<br />Gallery</h1>
          <p className="hero__tagline">
            Oil, acrylic &amp; mixed media — available as prints and originals.
          </p>
          <div className="hero__actions">
            <Link to="/gallery" className="btn btn-primary">Explore Gallery</Link>
            <a href="https://ko-fi.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Buy Originals on Ko-Fi
            </a>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="page-section">
        <div className="container">
          <div className="home__section-header">
            <h2 className="home__section-title">Search Works</h2>
          </div>
          <div className="home__search-wrap">
            <SearchBar query={query} onQueryChange={setQuery} placeholder="Search by title, medium, tag…" />
          </div>
          {query && (
            <div className="art-grid" style={{ marginTop: 'var(--space-xl)' }}>
              {results.length > 0
                ? results.map((p) => <ArtCard key={p.id} piece={p} />)
                : <p className="home__no-results">No works found for "{query}".</p>
              }
            </div>
          )}
        </div>
      </section>

      {/* Featured Works */}
      {!query && (
        <section className="page-section">
          <div className="container">
            <div className="home__section-header">
              <h2 className="home__section-title">Featured Works</h2>
              <Link to="/gallery" className="home__see-all">See all →</Link>
            </div>
            <div className="art-grid">
              {featured.map((p) => <ArtCard key={p.id} piece={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
