import React from 'react';
import ArtCard from '@/components/ArtCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import useSearch from '@/hooks/useSearch';
import useFilter from '@/hooks/useFilter';
import './Gallery.css';

export default function Gallery() {
  const { query, setQuery, results } = useSearch();
  const { filters, updateFilter, resetFilters, filtered } = useFilter(results);

  return (
    <div className="gallery-page page-section">
      <div className="container">
        <h1 className="page-title">Gallery</h1>
        <p className="page-subtitle">Original works in oil, acrylic, and mixed media.</p>

        {/* Toolbar: search + filters */}
        <div className="gallery-page__toolbar">
          <SearchBar query={query} onQueryChange={setQuery} />
          <FilterBar filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} />
        </div>

        {/* Result count */}
        <p className="gallery-page__count">
          {filtered.length} {filtered.length === 1 ? 'work' : 'works'}
          {query && ` matching "${query}"`}
          {filters.medium && ` · ${filters.medium}`}
          {filters.date   && ` · ${filters.date}`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="art-grid">
            {filtered.map((p) => <ArtCard key={p.id} piece={p} />)}
          </div>
        ) : (
          <p className="gallery-page__empty">No works match your current search or filters.</p>
        )}
      </div>
    </div>
  );
}
