import { useMemo, useState } from 'react';
import { filterOptions } from '../constants';
import { formatAmountFilter, formatDateFilter } from '../utils';

export default function useAppliedOrderFilters(draft) {
  const [filters, setFilters] = useState([]);
  const filterGroups = useMemo(
    () => filterOptions
      .map(({ key, label }) => ({
        key,
        label,
        filters: filters.filter((filter) => filter.key === key),
      }))
      .filter((group) => group.filters.length > 0),
    [filters],
  );

  const canAddFilter = !draft.filterField || (draft.filterField === 'createdAt'
    ? !draft.dateStart || (draft.dateRangeMode === 'end'
      && (!draft.dateEnd || draft.dateEnd < draft.dateStart))
    : draft.filterField === 'amount'
      ? !draft.amountStart || !draft.amountEnd
        || !Number.isFinite(Number(draft.amountStart)) || Number(draft.amountStart) < 0
        || !Number.isFinite(Number(draft.amountEnd))
        || Number(draft.amountEnd) < Number(draft.amountStart)
      : !draft.selectedFilterValues.length && !draft.filterValue.trim());

  function addFilter(event) {
    event.preventDefault();
    if (canAddFilter) return;

    if (draft.filterField === 'createdAt') {
      setFilters((current) => [
        ...current,
        {
          id: `${Date.now()}-${Math.random()}`,
          key: draft.filterField,
          value: {
            start: draft.dateStart,
            end: draft.dateRangeMode === 'end' ? draft.dateEnd : '',
            throughToday: draft.dateRangeMode === 'today',
          },
        },
      ]);
      draft.selectFilterField('');
      return;
    }

    if (draft.filterField === 'amount') {
      setFilters((current) => [
        ...current,
        {
          id: `${Date.now()}-${Math.random()}`,
          key: draft.filterField,
          value: { start: draft.amountStart, end: draft.amountEnd },
        },
      ]);
      draft.selectFilterField('');
      return;
    }

    const values = [...new Set([
      ...draft.selectedFilterValues,
      ...(draft.filterValue.trim() ? [draft.filterValue.trim()] : []),
    ])];
    setFilters((current) => [
      ...current,
      ...values.map((value) => ({
        id: `${Date.now()}-${Math.random()}`,
        key: draft.filterField,
        value,
      })),
    ]);
    draft.selectFilterField('');
  }

  function removeFilter(filterId) {
    setFilters((current) => current.filter(({ id }) => id !== filterId));
  }

  function removeFilterGroup(key) {
    setFilters((current) => current.filter((filter) => filter.key !== key));
  }

  return {
    filters,
    filterGroups,
    canAddFilter,
    addFilter,
    removeFilter,
    removeFilterGroup,
    clearFilters: () => setFilters([]),
    getFilterPlaceholder() {
      const label = filterOptions.find(({ key }) => key === draft.filterField)?.label ?? 'value';
      return `Choose or enter ${label.toLowerCase()}...`;
    },
    formatAppliedFilter(filter) {
      if (filter.key === 'createdAt') return formatDateFilter(filter.value);
      if (filter.key === 'amount') return formatAmountFilter(filter.value);
      return filter.value;
    },
  };
}
