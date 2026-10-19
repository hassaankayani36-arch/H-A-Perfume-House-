import { UserRound } from 'lucide-react';
import OrderStatusSelect from '../OrderStatusSelect';
import { formatOrderDate } from '../../utils';

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
      <td>${order.amount.toFixed(2)}</td>
      <td className="adminStatusCell">
        <OrderStatusSelect
          orderId={order.id}
          status={order.status}
          onChange={(status) => onStatusChange(order.id, status)}
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
