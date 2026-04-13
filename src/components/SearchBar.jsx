import React from 'react';
import './SearchBar.css';

/**
 * SearchBar
 * Controlled input bound to the query state from useSearch.
 *
 * @param {{ query: string, onQueryChange: Function, placeholder?: string }} props
 */
export default function SearchBar({ query, onQueryChange, placeholder = 'Search works…' }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        {/* Simple SVG magnifier */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <input
        id="gallery-search"
        type="search"
        className="input search-bar__input"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search artworks"
      />
      {query && (
        <button
          className="search-bar__clear"
          onClick={() => onQueryChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
