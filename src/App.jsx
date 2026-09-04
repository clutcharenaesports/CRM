import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Leads } from './pages/Leads';
import { Properties } from './pages/Properties';
import { Calendar } from './pages/Calendar';
import { Telephony } from './pages/Telephony';
import { useAuthStore } from './store/authStore';
import { useUiStore } from './store/uiStore';
import { LayoutDashboard, Users, Building2, CalendarDays, PhoneCall } from 'lucide-react';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuthStore();
  
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Main App Layout Shell
const AppLayout = () => {
  const { setActiveView } = useUiStore();
  const location = useLocation();
  
  // Sync router path with UI store
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path) setActiveView(path);
  }, [location, setActiveView]);

  return (
    <div className="app-shell">
      <Header />
      <Sidebar />
      <main className="app-main">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="properties" element={<Properties />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="telephony" element={<Telephony />} />
          <Route path="*" element={<Navigate to="leads" replace />} />
        </Routes>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="bottom-nav-items">
          <NavItem to="/app/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/app/leads" icon={Users} label="Leads" />
          <NavItem to="/app/properties" icon={Building2} label="Properties" />
          <NavItem to="/app/calendar" icon={CalendarDays} label="Visits" />
          <NavItem to="/app/telephony" icon={PhoneCall} label="Calls" />
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(to);
  
  return (
    <button 
      className={`bottom-nav-item ${isActive ? 'active' : ''}`}
      onClick={() => window.location.hash = `#${to}`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route 
        path="/app/*" 
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
