import { Navigate } from 'react-router-dom';
import Header from '../AdminDashboard/components/Header';
import OrderTableSection from '../AdminDashboard/components/OrderTableSection';
import useAdminDashboard from '../AdminDashboard/hooks/useAdminDashboard';
import './admin-dashboard.css';

export default function AdminDashboard() {
  const dashboard = useAdminDashboard();

  if (dashboard.isCheckingSession) return <main className="adminDashboard"><p>Checking administrator access…</p></main>;
  if (!dashboard.isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <main className="adminDashboard" data-theme={dashboard.isDarkMode ? 'dark' : 'light'}>
      <Header
        search={dashboard.search}
        onSearchChange={dashboard.setSearch}
        isDarkMode={dashboard.isDarkMode}
        onThemeToggle={dashboard.toggleTheme}
        currency={dashboard.currency}
        onCurrencyChange={dashboard.setCurrency}
        onLogout={dashboard.logout}
        filtering={dashboard.filtering}
      />
      <OrderTableSection
        visibleOrders={dashboard.visibleOrders}
        sort={dashboard.sort}
        onSort={dashboard.toggleSort}
        onStatusChange={dashboard.updateStatus}
        onReceiptSelect={dashboard.selectReceipt}
        selectedReceipt={dashboard.selectedReceipt}
        onReceiptClose={dashboard.closeReceipt}
        filters={dashboard.filtering}
        tableScroll={dashboard.tableScroll}
      />
      {dashboard.error && <p className="adminDashboardError" role="alert">{dashboard.error}</p>}
      {dashboard.isLoading && <p className="adminDashboardLoading">Loading live orders…</p>}
    </main>
  );
}
