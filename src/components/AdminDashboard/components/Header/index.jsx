import OrderFiltering from './OrderFiltering';
import OrderSearch from './OrderSearch';
import ThemeToggle from './ThemeToggle';

export default function Header({
  search,
  onSearchChange,
  isDarkMode,
  onThemeToggle,
  onLogout,
  filtering,
}) {
  return (
    <header className="adminDashboardHeader">
      <div className="adminDashboardBrand">
        <p className="adminEyebrow">H&A Perfume House</p>
        <h1>Orders</h1>
      </div>
      <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
      <OrderSearch value={search} onChange={onSearchChange} />
      <button className="adminLogout" type="button" onClick={onLogout}>
        Sign out
      </button>
      <OrderFiltering filtering={filtering} />
    </header>
  );
}
