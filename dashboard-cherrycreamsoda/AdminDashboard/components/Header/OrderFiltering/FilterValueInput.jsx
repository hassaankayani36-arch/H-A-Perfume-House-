import { getOrderStatusClassName } from '../../../utils';

export default function FilterValueInput({ filtering, fieldLabel }) {
  return (
    <div
      className="adminFilterInputWrap adminFilterEnter"
      ref={filtering.filterSuggestionsRef}
    >
      <span className="adminVisuallyHidden">
        Filter values for {fieldLabel}
      </span>
      <div className="adminFilterValue">
        <input
          ref={filtering.filterInputRef}
          type="search"
          placeholder={filtering.getFilterPlaceholder()}
          value={filtering.filterValue}
          onFocus={() => filtering.setShowSuggestions(true)}
          onChange={(event) => {
            filtering.setFilterValue(event.target.value);
            filtering.setShowSuggestions(true);
          }}
          aria-label={`Filter values for ${fieldLabel}`}
        />
      </div>
      {filtering.showSuggestions && filtering.suggestions.length > 0 && (
        <div className="adminFilterSuggestions" role="listbox" aria-label="Suggestions">
          {filtering.suggestions.map((value) => (
            <button
              className={`adminValueChip ${filtering.filterField === 'status' ? getOrderStatusClassName(value) : ''}`}
              type="button"
              role="option"
              aria-selected="false"
              key={value}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => filtering.addSelectedValue(value)}
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
