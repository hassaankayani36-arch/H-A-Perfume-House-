import { useEffect, useMemo, useRef, useState } from 'react';
import { statusOptions } from '../constants';
import { getOrderItemNames } from '../utils';

export default function useFilterSuggestions({
  orders,
  filterField,
  filterValue,
  selectedFilterValues,
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filterSuggestionsRef = useRef(null);

  useEffect(() => {
    if (!showSuggestions) return undefined;

    function handlePointerDown(event) {
      if (!filterSuggestionsRef.current?.contains(event.target)) setShowSuggestions(false);
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') setShowSuggestions(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSuggestions]);

  const suggestions = useMemo(() => {
    if (!filterField || filterField === 'createdAt' || filterField === 'amount') return [];
    const query = filterValue.trim().toLocaleLowerCase();
    const values = filterField === 'status'
      ? statusOptions
      : filterField === 'items'
        ? [...new Set(orders.flatMap((order) => getOrderItemNames(order.items)))]
        : [...new Set(orders.map((order) => String(order[filterField])))];
    return values.filter((value) =>
      !selectedFilterValues.includes(value)
      && (!query || value.toLocaleLowerCase().includes(query)),
    );
  }, [filterField, filterValue, orders, selectedFilterValues]);

  return { showSuggestions, setShowSuggestions, suggestions, filterSuggestionsRef };
}
