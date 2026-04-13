import React from 'react';
import { ALL_MEDIUMS, ALL_DATES } from '@/data/portfolioData';
import './FilterBar.css';

/**
 * FilterBar
 * Renders medium + date filter selects bound to useFilter state.
 *
 * @param {{ filters: Object, updateFilter: Function, resetFilters: Function }} props
 */
export default function FilterBar({ filters, updateFilter, resetFilters }) {
  const hasActive = filters.medium || filters.date;

  return (
    <div className="filter-bar">
      <select
        id="filter-medium"
        className="input filter-bar__select"
        value={filters.medium}
        onChange={(e) => updateFilter('medium', e.target.value)}
        aria-label="Filter by medium"
      >
        <option value="">All Mediums</option>
        {ALL_MEDIUMS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select
        id="filter-date"
        className="input filter-bar__select"
        value={filters.date}
        onChange={(e) => updateFilter('date', e.target.value)}
        aria-label="Filter by year"
      >
        <option value="">All Years</option>
        {ALL_DATES.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {hasActive && (
        <button className="filter-bar__reset btn btn-outline" onClick={resetFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
}
