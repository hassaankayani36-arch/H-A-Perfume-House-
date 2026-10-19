export const statusOptions = ['New', 'Pending', 'Completed', 'Failed'];

export const columns = [
  { key: 'id', label: 'Order ID' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Order status' },
  { key: 'phone', label: 'Phone number' },
  { key: 'name', label: 'Customer name' },
  { key: 'createdAt', label: 'Created date' },
  { key: 'email', label: 'Customer email' },
  { key: 'customerId', label: 'Customer ID' },
  { key: 'items', label: 'Order items' },
];

export const filterOptions = [
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Created Date' },
  { key: 'id', label: 'Order ID' },
  { key: 'name', label: 'Customer Name' },
  { key: 'phone', label: 'Customer Contact Number' },
  { key: 'email', label: 'Customer Email' },
  { key: 'customerId', label: 'Customer ID' },
  { key: 'items', label: 'Order Items' },
];

export const columnWidths = [52, 110, 100, 130, 170, 160, 180, 230, 110, 220];
export const totalColumnWidth = columnWidths.reduce((total, width) => total + width, 0);
