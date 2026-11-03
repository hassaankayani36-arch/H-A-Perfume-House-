import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api';
import { filterAndSortOrders } from '../utils';
import useOrderFiltering from './useOrderFiltering';
import useOrderTableScroll from './useOrderTableScroll';
import useOrders from './useOrders';

export default function useAdminDashboard() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState('PKR');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [authError, setAuthError] = useState('');
  const [selectedReceiptId, setSelectedReceiptId] = useState('');
  const orders = useOrders();
  const displayOrders = useMemo(() => orders.orders.map((order) => ({
    ...order,
    amount: currency === 'PKR' ? order.amountPkr : order.amountUsd,
    displayCurrency: currency,
  })), [currency, orders.orders]);
  const filtering = useOrderFiltering(displayOrders, currency);
  const tableScroll = useOrderTableScroll();
  const visibleOrders = useMemo(
    () => filterAndSortOrders(displayOrders, {
      filters: filtering.filters,
      search: orders.search,
      sort: orders.sort,
    }),
    [displayOrders, filtering.filters, orders.search, orders.sort],
  );
  const selectedReceipt = useMemo(
    () => displayOrders.find((order) => order.id === selectedReceiptId),
    [displayOrders, selectedReceiptId],
  );

  useEffect(() => {
    let active = true;
    apiRequest('/api/admin/session')
      .then(() => {
        if (active) setIsAuthenticated(true);
      })
      .catch((error) => {
        if (active && error.message !== 'Admin sign-in is required.') setAuthError(error.message);
      })
      .finally(() => {
        if (active) setIsCheckingSession(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function logout() {
    setAuthError('');
    try {
      await apiRequest('/api/admin/session', { method: 'DELETE' });
      setIsAuthenticated(false);
      navigate('/admin', { replace: true });
    } catch (error) {
      setAuthError(error.message || 'Sign out failed.');
    }
  }

  function changeCurrency(nextCurrency) {
    if (nextCurrency !== currency) filtering.removeFilterGroup('amount');
    setCurrency(nextCurrency);
  }

  return {
    isAuthenticated,
    isCheckingSession,
    error: authError || orders.error,
    isDarkMode,
    toggleTheme: () => setIsDarkMode((current) => !current),
    currency,
    setCurrency: changeCurrency,
    logout,
    search: orders.search,
    setSearch: orders.setSearch,
    visibleOrders,
    sort: orders.sort,
    toggleSort: orders.toggleSort,
    updateStatus: orders.updateStatus,
    isLoading: orders.isLoading,
    selectedReceipt,
    selectReceipt: setSelectedReceiptId,
    closeReceipt: () => setSelectedReceiptId(''),
    filtering,
    tableScroll,
  };
}
