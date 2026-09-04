import React from 'react';
import { NavLink } from 'react-router-dom';
import { Building2, LayoutDashboard, Users, CalendarDays, PhoneCall, Copy, Moon, Sun, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { HELPLINE_NUMBER } from '../utils/constants';
import { AgentBadge } from './AgentBadge';
import './Header.css';

export function Header() {
  const { currentUser, logout } = useAuthStore();
  const { theme, toggleTheme, toggleSidebar } = useUiStore();

  const handleCopyHelpline = () => {
    navigator.clipboard.writeText(HELPLINE_NUMBER);
    // In a real app we'd trigger a toast here
    alert('Helpline number copied to clipboard');
  };

  return (
    <header className="app-header glass-surface">
      <div className="header-container">
        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-btn btn btn-icon btn-ghost" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>

        {/* Logo */}
        <div className="header-logo">
          <div className="logo-icon">P</div>
          <span className="logo-text">PropDesk</span>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="header-nav">
          <NavLink to="/app/dashboard" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
            Dashboard
          </NavLink>
          <NavLink to="/app/leads" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
            Leads
          </NavLink>
          <NavLink to="/app/properties" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
            Properties
          </NavLink>
          <NavLink to="/app/calendar" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
            Visits
          </NavLink>
          <NavLink to="/app/telephony" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
            Calls
          </NavLink>
        </nav>

        <div className="header-actions">
          {/* Helpline Badge */}
          <div className="helpline-badge" onClick={handleCopyHelpline} title="Copy Helpline Number">
            <span className="helpline-icon">☎️</span>
            <span className="helpline-number">{HELPLINE_NUMBER}</span>
            <Copy size={12} className="copy-icon" />
          </div>

          {/* Theme Toggle */}
          <button className="btn btn-icon btn-ghost theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Agent Switcher / Profile */}
          {currentUser && (
            <div className="profile-dropdown">
              <AgentBadge employee={currentUser} size="md" />
              <div className="profile-info">
                <span className="profile-name">{currentUser.name}</span>
                <span className="profile-role">{currentUser.role === 'admin' ? 'Admin' : 'Agent'}</span>
              </div>
              <button className="btn btn-ghost btn-sm ml-2" onClick={logout}>Exit</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
