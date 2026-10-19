import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../lib/firebase.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import { filterAndSortOrders } from '../utils';
import useOrderFiltering from './useOrderFiltering';
import useOrderTableScroll from './useOrderTableScroll';
import useOrders from './useOrders';

export default function useAdminDashboard() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState('');
  const { isAdmin } = useAuth();
  const orders = useOrders(isAdmin);
  const filtering = useOrderFiltering(orders.orders);
  const tableScroll = useOrderTableScroll();
  const visibleOrders = useMemo(
    () => filterAndSortOrders(orders.orders, {
      filters: filtering.filters,
      search: orders.search,
      sort: orders.sort,
    }),
    [filtering.filters, orders.orders, orders.search, orders.sort],
  );
  const selectedReceipt = useMemo(
    () => orders.orders.find((order) => order.id === selectedReceiptId),
    [orders.orders, selectedReceiptId],
  );

  async function logout() {
    await signOut(auth);
    navigate('/admin', { replace: true });
  }

  async function updateStatus(orderId, status) {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
      orders.setError('');
    } catch (error) {
      console.error('Unable to update order status.', error);
      orders.setError(error.message || 'Unable to update order status.');
    }
  }

  return {
    isAuthenticated: isAdmin,
    isDarkMode,
    toggleTheme: () => setIsDarkMode((current) => !current),
    logout,
    search: orders.search,
    setSearch: orders.setSearch,
    visibleOrders,
    sort: orders.sort,
    toggleSort: orders.toggleSort,
    updateStatus,
    selectedReceipt,
    selectReceipt: setSelectedReceiptId,
    closeReceipt: () => setSelectedReceiptId(''),
    filtering,
    tableScroll,
    orderError: orders.error,
  };
}
