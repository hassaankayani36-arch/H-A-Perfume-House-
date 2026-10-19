import { Search } from 'lucide-react';

export default function OrderSearch({ value, onChange }) {
  return (
    <label className="adminSearch">
      <Search size={16} aria-hidden="true" />
      <span className="adminVisuallyHidden">Search all orders</span>
      <input
        type="search"
        placeholder="Search all orders..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
