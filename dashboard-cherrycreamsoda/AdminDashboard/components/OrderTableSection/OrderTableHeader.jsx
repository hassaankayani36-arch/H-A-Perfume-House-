import { ArrowDown, ArrowUp } from 'lucide-react';
import { columns, columnWidths, totalColumnWidth } from '../../constants';

export default function OrderTableHeader({ sort, onSort }) {
  return (
    <table className="adminOrdersTable">
      <colgroup>
        {columnWidths.map((width, index) => (
          <col key={index} style={{ width: `${(width / totalColumnWidth) * 100}%` }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th className="adminAvatarColumn" scope="col">
            <span className="adminVisuallyHidden">Customer icon</span>
          </th>
          {columns.map(({ key, label }) => (
            <th key={key} scope="col">
              <button
                className="adminSortButton"
                type="button"
                onClick={() => onSort(key)}
                aria-label={`Sort by ${label}`}
              >
                {label}
                {sort.key === key && (
                  sort.direction === 'asc'
                    ? <ArrowUp size={13} aria-hidden="true" />
                    : <ArrowDown size={13} aria-hidden="true" />
                )}
              </button>
            </th>
          ))}
        </tr>
      </thead>
    </table>
  );
}
