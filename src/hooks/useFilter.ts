import { useState, useMemo } from 'react';

export function useFilter<T>(
  items: T[],
  filterField: keyof T
) {
  const [filterValue, setFilterValue] = useState<string>('all');

  const filteredItems = useMemo(() => {
    if (filterValue === 'all') return items;
    return items.filter(item => String(item[filterField]) === filterValue);
  }, [items, filterField, filterValue]);

  return { filterValue, filteredItems, setFilterValue };
}