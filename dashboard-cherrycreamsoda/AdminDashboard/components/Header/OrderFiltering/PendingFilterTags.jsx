import { X } from 'lucide-react';
import { getOrderStatusClassName } from '../../../utils';

export default function PendingFilterTags({ filtering, fieldLabel }) {
  if (filtering.selectedFilterValues.length === 0) return null;

  return (
    <div className="adminFilterTags" aria-label="Selected filter values">
      {filtering.selectedFilterValues.map((value) => (
        <span className="adminFilterTag adminFilterTagPending" key={`pending-${value}`}>
          <span className="adminFilterLabel">{fieldLabel ?? filtering.filterField}</span>
          <span className={`adminValueChip ${filtering.filterField === 'status' ? getOrderStatusClassName(value) : ''}`}>
            {value}
            <button
              type="button"
              onClick={() => filtering.removeSelectedValue(value)}
              aria-label={`Remove selected ${value}`}
            >
              <X size={12} aria-hidden="true" />
            </button>
          </span>
        </span>
      ))}
    </div>
  );
}
