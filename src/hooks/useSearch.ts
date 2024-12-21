import { useState, useCallback } from 'react';
import { debounce } from '../utils/function';

export function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  delay: number = 300
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const filtered = items.filter(item =>
        searchFields.some(field => {
          const value = String(item[field]).toLowerCase();
          return value.includes(term.toLowerCase());
        })
      );
      setFilteredItems(filtered);
    }, delay),
    [items, searchFields]
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return { searchTerm, filteredItems, handleSearch };
}