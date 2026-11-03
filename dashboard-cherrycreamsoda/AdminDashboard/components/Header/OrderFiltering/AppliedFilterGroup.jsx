import { X } from 'lucide-react';
import { getOrderStatusClassName } from '../../../utils';

export default function AppliedFilterGroup({ group, filtering }) {
  return (
    <section className="adminFilterGroup" aria-label={`${group.label} filters`}>
      <div className="adminFilterGroupHeading">
        <h3>{group.label}</h3>
        <button
          className="adminClearFilterGroup"
          type="button"
          onClick={() => filtering.removeFilterGroup(group.key)}
          aria-label={`Clear ${group.label} filters`}
        >
          <X size={13} aria-hidden="true" />
        </button>
      </div>
      <div className="adminFilterGroupTags">
        {group.filters.map((filter) => {
          const displayValue = filtering.formatAppliedFilter(filter);
          return (
            <span
              className={`adminValueChip adminAppliedFilterChip ${group.key === 'status' ? getOrderStatusClassName(filter.value) : ''}`}
              key={filter.id}
            >
              <span>{displayValue}</span>
              <button
                type="button"
                onClick={() => filtering.removeFilter(filter.id)}
                aria-label={`Remove ${group.label} filter for ${displayValue}`}
              >
                <X size={12} aria-hidden="true" />
              </button>
            </span>
          );
        })}
      </div>
    </section>
  );
}
