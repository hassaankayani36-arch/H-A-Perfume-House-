import { X } from 'lucide-react';
import AppliedFilterGroup from './AppliedFilterGroup';

export default function AppliedFiltersSection({ filtering }) {
  if (filtering.filterGroups.length === 0) return null;

  return (
    <aside className="adminAppliedFilters" aria-label="Applied filters">
      <div className="adminAppliedFiltersHeading">
        <h2>Filters</h2>
        <button
          className="adminClearFilters"
          type="button"
          onClick={filtering.clearFilters}
          aria-label="Clear all filters"
        >
          <X size={15} aria-hidden="true" />
        </button>
      </div>
      {filtering.filterGroups.map((group) => (
        <AppliedFilterGroup key={group.key} group={group} filtering={filtering} />
      ))}
    </aside>
  );
}
