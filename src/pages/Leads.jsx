import React, { useState } from 'react';
import { LayoutGrid, List, Search, Plus } from 'lucide-react';
import { useUiStore } from '../store/uiStore';
import { useLeadStore } from '../store/leadStore';
import { KanbanBoard } from './KanbanBoard';
import { TableView } from './TableView';
import { LeadDrawer } from '../components/LeadDrawer';
import { LeadModal } from '../components/LeadModal';
import { useAuthStore } from '../store/authStore';

export function Leads() {
  const { leadViewMode, setLeadViewMode, leadFilter } = useUiStore();
  const { getLeads, getLeadsByAgent, getUnassignedLeads } = useLeadStore();
  const { currentUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Apply filters
  let displayedLeads = [];
  if (leadFilter === 'my' && currentUser) {
    displayedLeads = getLeadsByAgent(currentUser.id);
  } else if (leadFilter === 'unassigned') {
    displayedLeads = getUnassignedLeads();
  } else {
    displayedLeads = getLeads();
  }

  // Apply search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayedLeads = displayedLeads.filter(l => 
      l.name.toLowerCase().includes(q) || 
      l.phone.includes(q)
    );
  }

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Leads</h1>
          <p className="page-subtitle">Manage your sales pipeline</p>
        </div>
        
        <div className="page-actions">
          {/* Search Bar */}
          <div className="search-bar">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* View Toggle */}
            <div style={{ display: 'flex', background: 'var(--color-muted)', padding: '4px', borderRadius: 'var(--border-radius-md)' }}>
              <button 
                className={`btn btn-sm ${leadViewMode === 'kanban' ? 'btn-ghost' : 'btn-ghost'}`}
                style={leadViewMode === 'kanban' ? { background: 'var(--color-card)', boxShadow: 'var(--shadow-sm)' } : {}}
                onClick={() => setLeadViewMode('kanban')}
                title="Kanban View"
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                className={`btn btn-sm ${leadViewMode === 'table' ? 'btn-ghost' : 'btn-ghost'}`}
                style={leadViewMode === 'table' ? { background: 'var(--color-card)', boxShadow: 'var(--shadow-sm)' } : {}}
                onClick={() => setLeadViewMode('table')}
                title="Table View"
              >
                <List size={16} />
              </button>
            </div>
            
            <button 
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '8px', paddingRight: '12px' }}
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={18} /> Add Lead
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {leadViewMode === 'kanban' ? (
          <KanbanBoard leads={displayedLeads} onLeadClick={handleLeadClick} />
        ) : (
          <div className="h-full overflow-y-auto custom-scrollbar p-1">
            <TableView leads={displayedLeads} onLeadClick={handleLeadClick} />
          </div>
        )}
      </div>

      <LeadDrawer 
        lead={selectedLead} 
        isOpen={!!selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />

      <LeadModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
