import { UserRound, X } from 'lucide-react';
import OrderStatusSelect from '../OrderStatusSelect';
import { formatOrderDate } from '../../utils';
import ReceiptDetail from './ReceiptDetail';

export default function ReceiptSection({ receipt, onClose, onStatusChange }) {
  if (!receipt) return null;

  return (
    <aside className="adminOrderReceipt" aria-label={`Order Receipt for ${receipt.id}`}>
      <div className="adminOrderReceiptHeader">
        <h2>Receipt</h2>
        <button
          className="adminOrderReceiptClose"
          type="button"
          onClick={onClose}
          aria-label="Close order receipt"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="adminOrderReceiptContent">
        <p className="adminOrderReceiptEyebrow">Order ID</p>
        <h3 className="adminOrderReceiptId">{receipt.id}</h3>
        <div className="adminOrderReceiptSeparator" />
        <div className="adminOrderReceiptDetails adminOrderReceiptPrimary">
          <ReceiptDetail label="Customer name">
            <strong className="adminOrderReceiptCustomer">
              <span className="adminCustomerAvatar" aria-hidden="true">
                <UserRound size={16} aria-hidden="true" />
              </span>
              {receipt.name}
            </strong>
          </ReceiptDetail>
          <ReceiptDetail label="Phone number"><strong>{receipt.phone}</strong></ReceiptDetail>
          <ReceiptDetail label="Order items"><strong>{receipt.items}</strong></ReceiptDetail>
          <ReceiptDetail label="Order status">
            <OrderStatusSelect
              orderId={receipt.id}
              status={receipt.status}
              onChange={(status) => onStatusChange(receipt.id, status)}
            />
          </ReceiptDetail>
          <ReceiptDetail className="adminOrderReceiptAmount" label="Amount">
            <strong>${receipt.amount.toFixed(2)}</strong>
          </ReceiptDetail>
        </div>
        <div className="adminOrderReceiptSeparator" />
        <div className="adminOrderReceiptDetails adminOrderReceiptSecondary">
          <ReceiptDetail label="Created date"><strong>{formatOrderDate(receipt.createdAt)}</strong></ReceiptDetail>
          <ReceiptDetail label="Customer email"><strong>{receipt.email}</strong></ReceiptDetail>
          <ReceiptDetail label="Customer ID"><strong>{receipt.customerId}</strong></ReceiptDetail>
        </div>
      </div>
    </aside>
  );
}
