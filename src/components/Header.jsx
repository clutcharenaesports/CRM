import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Building2, LayoutDashboard, Users, CalendarDays, PhoneCall, Copy, Moon, Sun, Menu, Search } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { HELPLINE_NUMBER } from '../utils/constants';
import { AgentBadge } from './AgentBadge';
import './Header.css';

export function Header() {
  const { currentUser, logout } = useAuthStore();
  const { theme, toggleTheme, toggleSidebar } = useUiStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopyHelpline = () => {
    navigator.clipboard.writeText(HELPLINE_NUMBER);
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

        {/* Search Bar */}
        <div className="header-search">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text"
              className="form-input" 
              placeholder="Search leads, properties..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div style={{ position: 'absolute', top: 40, left: 0, right: 0, background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-md)', padding: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100 }}>
                <div style={{ fontSize: 13, color: 'var(--color-muted-fg)', fontStyle: 'italic' }}>Search simulation for MVP...</div>
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 500 }}>No exact matches for "{searchQuery}"</div>
              </div>
            )}
          </div>
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
          <NavLink to="/app/deals" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
            Deals
          </NavLink>
          {currentUser?.role === 'admin' && (
            <>
              <NavLink to="/app/team" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
                Team
              </NavLink>
              <NavLink to="/app/settings" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
                Settings
              </NavLink>
            </>
          )}
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
