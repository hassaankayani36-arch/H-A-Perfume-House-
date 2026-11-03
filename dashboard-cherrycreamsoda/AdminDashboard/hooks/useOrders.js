import { useEffect, useState } from 'react';
import { apiRequest } from '../../api';

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ key: 'createdAt', direction: 'desc' });

  useEffect(() => {
    let active = true;
    apiRequest('/api/admin/orders')
      .then((rows) => {
        if (active) setOrders(rows);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || 'Orders could not be loaded.');
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function toggleSort(key) {
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  async function updateStatus(recordId, status) {
    setError('');
    try {
      const updated = await apiRequest(`/api/admin/orders/${encodeURIComponent(recordId)}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      setOrders((current) => current.map((entry) => (
        entry.recordId === updated.recordId ? updated : entry
      )));
    } catch (requestError) {
      setError(requestError.message || 'Order status could not be saved.');
    }
  }

  return {
    orders,
    search,
    setSearch,
    sort,
    toggleSort,
    updateStatus,
    isLoading,
    error,
  };
}
