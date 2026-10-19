import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../lib/firebase.js';

export default function useOrders(enabled) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ key: 'createdAt', direction: 'desc' });

  useEffect(() => {
    if (!db || !enabled) return undefined;
    return onSnapshot(
      query(collection(db, 'orders'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        setOrders(snapshot.docs.map((orderDoc) => {
          const data = orderDoc.data();
          const createdAt = data.createdAt?.toDate?.().toISOString() ?? new Date().toISOString();
          const items = Array.isArray(data.items)
            ? data.items.map((item) => `${item.name} × ${item.quantity}`).join(', ')
            : String(data.items ?? '');
          return {
            id: orderDoc.id,
            items,
            createdAt,
            amount: Number(data.amount ?? data.total ?? 0),
            status: data.status ?? 'New',
            customerId: data.customerId ?? data.uid ?? '',
            name: data.name ?? data.customerName ?? '',
            email: data.email ?? '',
            phone: data.phone ?? '',
          };
        }));
        setError('');
      },
      (snapshotError) => {
        console.error('Unable to load Firestore orders.', snapshotError);
        setError(snapshotError.message || 'Unable to load orders.');
      },
    );
  }, [enabled]);

  function toggleSort(key) {
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  return { orders, setOrders, search, setSearch, sort, toggleSort, error, setError };
}
