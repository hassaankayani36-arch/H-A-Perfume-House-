import { Navigate } from 'react-router-dom';
import Header from './components/Header';
import OrderTableSection from './components/OrderTableSection';
import useAdminDashboard from './hooks/useAdminDashboard';
import '../../pages/admin.css';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminDashboard() {
  const dashboard = useAdminDashboard();
  const { loading } = useAuth();

  if (loading) return <main className="adminPage"><p>Checking administrator access…</p></main>;
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
        onLogout={dashboard.logout}
        filtering={dashboard.filtering}
      />
      {dashboard.orderError && <p role="alert" className="adminError" style={{ padding: '12px 16px' }}>{dashboard.orderError}</p>}
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
    </main>
  );
}
