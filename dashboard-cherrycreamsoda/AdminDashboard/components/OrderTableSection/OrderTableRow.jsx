import { UserRound } from 'lucide-react';
import OrderStatusSelect from '../OrderStatusSelect';
import { formatOrderDate } from '../../utils';

function formatAmount(order) {
  if (order.amount === null || order.amount === undefined) return 'Unavailable (no saved rate)';
  return new Intl.NumberFormat(order.displayCurrency === 'PKR' ? 'en-PK' : 'en-US', {
    style: 'currency',
    currency: order.displayCurrency,
    maximumFractionDigits: order.displayCurrency === 'PKR' ? 0 : 2,
  }).format(order.amount);
}

export default function OrderTableRow({ order, onStatusChange, onReceiptSelect }) {
  return (
    <tr>
      <td className="adminAvatarCell">
        <span className="adminCustomerAvatar" aria-label={`${order.name} customer`}>
          <UserRound size={16} aria-hidden="true" />
        </span>
      </td>
      <td>
        <button
          className="adminValueChip adminOrderId"
          type="button"
          onClick={() => onReceiptSelect(order.id)}
          aria-label={`Open receipt for ${order.id}`}
        >
          {order.id}
        </button>
      </td>
      <td>{formatAmount(order)}</td>
      <td className="adminStatusCell">
        <OrderStatusSelect
          orderId={order.id}
          status={order.status}
          onChange={(status) => onStatusChange(order.recordId, status)}
        />
      </td>
      <td>{order.phone}</td>
      <td>{order.name}</td>
      <td>{formatOrderDate(order.createdAt)}</td>
      <td>{order.email}</td>
      <td>{order.customerId}</td>
      <td className="adminItemsCell">{order.items}</td>
    </tr>
  );
}
