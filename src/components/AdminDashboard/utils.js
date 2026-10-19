export function getOrderItemNames(items) {
  return items
    .split(',')
    .map((item) => item.replace(/\s*[×x]\s*\d+\s*$/i, '').trim())
    .filter(Boolean);
}

export function getOrderStatusClassName(status) {
  const normalizedStatus = status.toLowerCase();
  const capitalizedStatus = normalizedStatus[0].toUpperCase() + normalizedStatus.slice(1);
  return `adminStatus${capitalizedStatus}`;
}

export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatOrderDate(value) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function formatDateTag(value) {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const monthLabel = new Intl.DateTimeFormat('en', { month: 'short' }).format(date).toLocaleUpperCase();
  return `${String(day).padStart(2, '0')} ${monthLabel} ${year}`;
}

export function parseDateInput(value) {
  const trimmed = value.trim();
  const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(trimmed);
  const localMatch = /^(\d{1,2})[/. -](\d{1,2})[/. -](\d{4})$/.exec(trimmed);
  const match = isoMatch ?? localMatch;
  if (!match) return '';

  const [, first, second, third] = match;
  const year = Number(isoMatch ? first : third);
  const month = Number(second);
  const day = Number(isoMatch ? third : first);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return '';

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function formatDateFilter(value) {
  if (value.throughToday) return `${formatDateTag(value.start)} – TODAY`;
  if (value.end) return `${formatDateTag(value.start)} – ${formatDateTag(value.end)}`;
  return formatDateTag(value.start);
}

export function formatAmountFilter(value) {
  const start = `$${Number(value.start).toFixed(2)}`;
  return value.end ? `${start} – $${Number(value.end).toFixed(2)}` : start;
}

function matchesOrderFilter(order, key, value) {
  if (key === 'createdAt') {
    const orderDate = order.createdAt.slice(0, 10);
    const endDate = value.throughToday ? getTodayDate() : value.end;
    return value.start && orderDate >= value.start && orderDate <= (endDate || value.start);
  }
  if (key === 'status') return order[key].toLocaleLowerCase() === value.toLocaleLowerCase();
  if (key === 'amount') {
    const start = Number(value.start);
    const end = value.end ? Number(value.end) : start;
    return order[key] >= start && order[key] <= end;
  }
  if (key === 'items') {
    return getOrderItemNames(order.items).some((item) =>
      item.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    );
  }
  return String(order[key]).toLocaleLowerCase().includes(value.toLocaleLowerCase());
}

export function filterAndSortOrders(orders, { filters, search, sort }) {
  const query = search.trim().toLocaleLowerCase();
  const filtersByField = filters.reduce((groups, filter) => {
    (groups[filter.key] ??= []).push(filter);
    return groups;
  }, {});

  return orders
    .filter((order) => {
      const matchesSearch = !query || Object.values(order).some((value) =>
        String(value).toLocaleLowerCase().includes(query),
      );
      const matchesFilters = Object.entries(filtersByField).every(([key, fieldFilters]) =>
        fieldFilters.some(({ value }) => matchesOrderFilter(order, key, value)),
      );
      return matchesSearch && matchesFilters;
    })
    .sort((first, second) => {
      const left = first[sort.key];
      const right = second[sort.key];
      const comparison = typeof left === 'number'
        ? left - right
        : String(left).localeCompare(String(right), undefined, { numeric: true });
      return sort.direction === 'asc' ? comparison : -comparison;
    });
}
