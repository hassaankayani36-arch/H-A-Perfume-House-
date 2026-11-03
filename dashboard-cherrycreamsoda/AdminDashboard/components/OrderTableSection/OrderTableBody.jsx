import { columnWidths, totalColumnWidth } from '../../constants';
import OrderTableRow from './OrderTableRow';

export default function OrderTableBody({ orders, onStatusChange, onReceiptSelect }) {
  return (
    <table className="adminOrdersTable">
      <colgroup>
        {columnWidths.map((width, index) => (
          <col key={index} style={{ width: `${(width / totalColumnWidth) * 100}%` }} />
        ))}
      </colgroup>
      <tbody>
        {orders.map((order) => (
          <OrderTableRow
            key={order.id}
            order={order}
            onStatusChange={onStatusChange}
            onReceiptSelect={onReceiptSelect}
          />
        ))}
        {orders.length === 0 && (
          <tr>
            <td className="adminEmptyState" colSpan={10}>No orders match your filters.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
