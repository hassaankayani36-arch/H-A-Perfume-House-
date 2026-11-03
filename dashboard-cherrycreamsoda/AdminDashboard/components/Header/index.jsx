import OrderFiltering from './OrderFiltering';
import OrderSearch from './OrderSearch';
import ThemeToggle from './ThemeToggle';

export default function Header({
  search,
  onSearchChange,
  isDarkMode,
  onThemeToggle,
  currency,
  onCurrencyChange,
  onLogout,
  filtering,
}) {
  return (
    <header className="adminDashboardHeader">
      <div className="adminDashboardHeading">
        <h1>Orders</h1>
      </div>
      <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
      <label className="adminCurrencyControl">
        <span>Currency</span>
        <select value={currency} onChange={(event) => onCurrencyChange(event.target.value)} aria-label="Order display currency">
          <option value="PKR">PKR</option>
          <option value="USD">USD</option>
        </select>
      </label>
      <OrderSearch value={search} onChange={onSearchChange} />
      <button className="adminLogout" type="button" onClick={onLogout}>
        Sign out
      </button>
      <OrderFiltering filtering={filtering} currency={currency} />
    </header>
  );
}
