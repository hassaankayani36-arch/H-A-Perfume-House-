import useAppliedOrderFilters from './useAppliedOrderFilters';
import useFilterDraft from './useFilterDraft';
import useFilterSuggestions from './useFilterSuggestions';

export default function useOrderFiltering(orders) {
  const draft = useFilterDraft();
  const suggestions = useFilterSuggestions({
    orders,
    filterField: draft.filterField,
    filterValue: draft.filterValue,
    selectedFilterValues: draft.selectedFilterValues,
  });
  const appliedFilters = useAppliedOrderFilters(draft);

  function selectFilterField(key) {
    draft.selectFilterField(key);
    suggestions.setShowSuggestions(false);
  }

  function addSelectedValue(value) {
    draft.addSelectedValue(value);
    suggestions.setShowSuggestions(true);
  }

  return {
    ...draft,
    ...suggestions,
    ...appliedFilters,
    selectFilterField,
    addSelectedValue,
  };
}
