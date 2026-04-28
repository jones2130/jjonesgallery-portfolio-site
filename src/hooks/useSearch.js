import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import portfolioData from '@/data/portfolioData.json';

const fuseOptions = {
  keys: ['title', 'tags', 'description', 'medium'],
  threshold: 0.35,        // 0 = exact, 1 = match anything
  includeScore: true,
  minMatchCharLength: 2
};

const fuse = new Fuse(portfolioData, fuseOptions);

/**
 * useSearch
 * Fuzzy-searches portfolioData via Fuse.js.
 *
 * @returns {{ query: string, setQuery: Function, results: Array }}
 *   results — full piece objects (unfiltered by medium/date — compose with useFilter)
 */
export default function useSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return portfolioData;
    return fuse.search(query).map((r) => r.item);
  }, [query]);

  return { query, setQuery, results };
}
