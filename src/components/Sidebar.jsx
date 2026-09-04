import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, CalendarDays, PhoneCall, IndianRupee, X, Shield, Settings } from 'lucide-react';
import { useUiStore } from '../store/uiStore';
import { useLeadStore } from '../store/leadStore';
import { useAuthStore } from '../store/authStore';
import { formatINR } from '../utils/formatters';
import './Sidebar.css';

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, leadFilter, setLeadFilter } = useUiStore();
  const { currentUser } = useAuthStore();
  const { getLeads } = useLeadStore();
  
  // Dummy stats for Phase 1 (we'll connect to stores in Phase 2)
  const stats = {
    totalLeads: 247,
    freshToday: 8,
    followUpsDue: 12
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={toggleSidebar}
        />
      )}
      
      <aside className={`app-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header mobile-only">
          <span className="font-semibold text-fg">Menu</span>
          <button className="btn btn-icon btn-ghost btn-sm" onClick={toggleSidebar}>
            <X size={18} />
          </button>
        </div>

        {/* Mobile Navigation (Desktop uses header) */}
        <nav className="sidebar-nav mobile-only" style={{ marginBottom: 24 }}>
          <NavLink to="/app/dashboard" className="sidebar-nav-item" onClick={toggleSidebar}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/app/leads" className="sidebar-nav-item" onClick={toggleSidebar}>
            <Users size={18} /> Leads
          </NavLink>
          <NavLink to="/app/properties" className="sidebar-nav-item" onClick={toggleSidebar}>
            <Building2 size={18} /> Properties
          </NavLink>
          <NavLink to="/app/deals" className="sidebar-nav-item" onClick={toggleSidebar}>
            <IndianRupee size={18} /> Deals
          </NavLink>
          <NavLink to="/app/calendar" className="sidebar-nav-item" onClick={toggleSidebar}>
            <CalendarDays size={18} /> Visits
          </NavLink>
          <NavLink to="/app/telephony" className="sidebar-nav-item" onClick={toggleSidebar}>
            <PhoneCall size={18} /> Calls
          </NavLink>
          
          {currentUser?.role === 'admin' && (
            <div style={{ marginTop: 24, padding: '0 12px', fontSize: 12, fontWeight: 600, color: 'var(--color-muted-fg)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Admin</div>
          )}
          {currentUser?.role === 'admin' && (
            <NavLink to="/app/team" className="sidebar-nav-item" onClick={toggleSidebar}>
              <Shield size={18} /> Team
            </NavLink>
          )}
          {currentUser?.role === 'admin' && (
            <NavLink to="/app/settings" className="sidebar-nav-item" onClick={toggleSidebar}>
              <Settings size={18} /> Settings
            </NavLink>
          )}
        </nav>

        {/* Filters Section */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">Quick Filters</h3>
          <div className="sidebar-filters">
            <button 
              className={`filter-btn ${leadFilter === 'my' ? 'active' : ''}`}
              onClick={() => setLeadFilter('my')}
            >
              <span className="filter-dot" style={{ backgroundColor: 'var(--color-primary)' }}></span>
              My Leads
            </button>
            <button 
              className={`filter-btn ${leadFilter === 'all' ? 'active' : ''}`}
              onClick={() => setLeadFilter('all')}
            >
              <span className="filter-dot" style={{ backgroundColor: 'var(--color-muted-fg)' }}></span>
              All Leads
            </button>
            <button 
              className={`filter-btn ${leadFilter === 'unassigned' ? 'active' : ''}`}
              onClick={() => setLeadFilter('unassigned')}
            >
              <span className="filter-dot" style={{ backgroundColor: 'var(--color-warning)' }}></span>
              Unassigned
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="sidebar-section" style={{ marginTop: 24 }}>
          <h3 className="sidebar-title">Pipeline Summary</h3>
          <div className="sidebar-stats">
            <div className="stat-item">
              <span className="stat-label">Total Leads</span>
              <span className="stat-value text-primary">{stats.totalLeads}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Fresh Today</span>
              <span className="stat-value text-success">{stats.freshToday}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Follow-ups Due</span>
              <span className="stat-value text-warning">{stats.followUpsDue}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
