import { useState, useMemo } from 'react';

const DEFAULT_FILTERS = {
  medium: '',   // '' means "all"
  date: '',     // '' means "all"
};

/**
 * useFilter
 * Filters an array of art pieces by medium and date.
 * Designed to receive the output of useSearch so the two hooks compose cleanly:
 *
 *   const { results } = useSearch();
 *   const { filtered, filters, setFilters } = useFilter(results);
 *
 * New filter dimensions (e.g. "size", "availability") can be added by extending
 * DEFAULT_FILTERS and the predicate inside useMemo.
 *
 * @param {Array} pieces — array of art piece objects to filter
 * @returns {{ filters: Object, setFilters: Function, filtered: Array }}
 */
export default function useFilter(pieces) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    return pieces.filter((piece) => {
      const pieceYear = typeof piece.date === 'string' ? piece.date.split('-')[0] : piece.date;
      if (filters.medium && piece.medium !== filters.medium) return false;
      if (filters.date   && pieceYear !== filters.date)   return false;
      return true;
    });
  }, [pieces, filters]);

  /** Convenience: update a single filter key without clobbering others */
  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  /** Reset all filters to defaults */
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return { filters, setFilters, updateFilter, resetFilters, filtered };
}
