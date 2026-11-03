import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
