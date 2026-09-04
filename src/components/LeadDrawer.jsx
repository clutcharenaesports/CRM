import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Phone, MessageCircle, MapPin, Building, Calendar, Edit2, Copy } from 'lucide-react';
import { AgentBadge } from './AgentBadge';
import { PriorityBadge } from './PriorityBadge';
import { useEmployeeStore } from '../store/employeeStore';
import { STAGES } from '../utils/constants';
import { useActivityStore } from '../store/activityStore';
import { useAuthStore } from '../store/authStore';
import { useLeadStore } from '../store/leadStore';
import { CallModal } from './CallModal';
import { SiteVisitModal } from './SiteVisitModal';
import { usePropertyStore } from '../store/propertyStore';
import { formatINR, formatRelativeDate } from '../utils/formatters';
import { WhatsAppButton } from './WhatsAppButton';

export function LeadDrawer({ lead, isOpen, onClose }) {
  const { getEmployee } = useEmployeeStore();
  const { getActivitiesForLead } = useActivityStore();
  const { addNote } = useLeadStore();
  const { currentUser } = useAuthStore();
  const { properties } = usePropertyStore();
  
  const [noteText, setNoteText] = React.useState('');
  const [isAddingNote, setIsAddingNote] = React.useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = React.useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = React.useState(false);
  
  if (!lead) return null;

  const matchingProperties = properties.filter(p => !lead.requirements.bhk || p.bhk === lead.requirements.bhk);

  const agent = getEmployee(lead.assignedTo);
  const stage = STAGES.find(s => s.id === lead.stage);
  const activities = getActivitiesForLead(lead.id);

  const handleAddNote = () => {
    if (!noteText.trim() || !currentUser) return;
    addNote(lead.id, noteText, currentUser.id);
    setNoteText('');
    setIsAddingNote(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="drawer-backdrop" />
        <Dialog.Content className="drawer-content outline-none">
          
          {/* Header */}
          <div className="drawer-header glass-surface">
            <div className="drawer-header-top">
              <div className="drawer-title-group">
                <Dialog.Title className="drawer-title">
                  {lead.name}
                </Dialog.Title>
                <div className="drawer-subtitle">
                  {lead.phone}
                  <button className="btn-icon" style={{ padding: 4 }} aria-label="Copy phone">
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              <Dialog.Close asChild>
                <button className="btn btn-ghost btn-icon" aria-label="Close">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>

            <div className="drawer-badges">
              <PriorityBadge priorityId={lead.priority} />
              <div 
                className="badge"
                style={{ backgroundColor: `var(--stage-${lead.stage})`, color: '#fff', border: 'none' }}
              >
                {stage?.label}
              </div>
              <AgentBadge employee={agent} size="sm" showName={true} />
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="drawer-actions">
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setIsCallModalOpen(true)}>
              <Phone size={16} /> Call
            </button>
            <WhatsAppButton lead={lead} />
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setIsVisitModalOpen(true)}>
              <Calendar size={16} /> Visit
            </button>
          </div>

          {/* Body */}
          <div className="drawer-body custom-scrollbar">
            <h3 className="section-title">Requirements</h3>
            <div className="drawer-cards-grid">
              <div className="drawer-card">
                <div className="drawer-card-label">Property Type</div>
                <div className="drawer-card-value capitalize">
                  <Building size={14} className="text-muted-fg" />
                  {lead.requirements.propertyType}
                </div>
              </div>
              <div className="drawer-card">
                <div className="drawer-card-label">BHK</div>
                <div className="drawer-card-value">{lead.requirements.bhk || 'Any'}</div>
              </div>
              <div className="drawer-card">
                <div className="drawer-card-label">Budget</div>
                <div className="drawer-card-value" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>
                  {lead.requirements.budgetMinLakhs ? `₹${lead.requirements.budgetMinLakhs}L - ₹${lead.requirements.budgetMaxLakhs}L` : 'TBD'}
                </div>
              </div>
              <div className="drawer-card">
                <div className="drawer-card-label">Status</div>
                <div className="drawer-card-value">{lead.requirements.possessionStatus || 'Any'}</div>
              </div>
              {lead.requirements.preferredLocalities && lead.requirements.preferredLocalities.length > 0 && (
                <div className="drawer-card full-width">
                  <div className="drawer-card-label">Preferred Localities</div>
                  <div className="drawer-card-value">
                    <MapPin size={14} className="text-muted-fg shrink-0" />
                    {lead.requirements.preferredLocalities.join(', ')}
                  </div>
                </div>
              )}
            </div>
            
            {/* Matching Properties */}
            {matchingProperties.length > 0 && (
              <div style={{ marginTop: 24, marginBottom: 24 }}>
                <h3 className="section-title">Matching Properties</h3>
                <div style={{ display: 'flex', overflowX: 'auto', gap: 12, paddingBottom: 8 }} className="custom-scrollbar">
                  {matchingProperties.map(prop => (
                    <div key={prop.id} className="drawer-card" style={{ minWidth: 200, padding: 12, cursor: 'pointer' }} onClick={() => setIsVisitModalOpen(true)}>
                      <div style={{ height: 100, background: 'var(--color-muted)', borderRadius: 'var(--border-radius-sm)', backgroundImage: `url(${prop.imageUrl || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=60'})`, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: 8 }} />
                      <div style={{ fontWeight: 600, fontSize: 13, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{prop.name}</div>
                      <div style={{ color: 'var(--color-primary)', fontSize: 13, fontWeight: 'bold' }}>{formatINR(prop.priceLakhs)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            <div className="timeline-header" style={{ marginTop: 24 }}>
              <h3 className="section-title" style={{ marginBottom: 0 }}>Documents (KYC)</h3>
              <button 
                className="btn btn-ghost"
                style={{ color: 'var(--color-primary)', padding: '4px 8px', height: 'auto', fontSize: 13 }}
                onClick={() => alert("File upload simulation: MVP only stores reference data.")}
              >
                + Upload
              </button>
            </div>
            <div className="drawer-cards-grid" style={{ marginBottom: 24, gridTemplateColumns: '1fr 1fr' }}>
              <div className="drawer-card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ background: 'var(--color-success)', color: '#fff', padding: 8, borderRadius: '50%' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Aadhar Card</div>
                  <div style={{ fontSize: 11, color: 'var(--color-muted-fg)' }}>Verified • {lead.name}</div>
                </div>
              </div>
              <div className="drawer-card" style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: 0.5 }}>
                <div style={{ background: 'var(--color-muted)', color: 'var(--color-muted-fg)', padding: 8, borderRadius: '50%' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>PAN Card</div>
                  <div style={{ fontSize: 11, color: 'var(--color-muted-fg)' }}>Pending</div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="timeline-header">
              <h3 className="section-title" style={{ marginBottom: 0 }}>Activity Timeline</h3>
              <button 
                className="btn btn-ghost"
                style={{ color: 'var(--color-primary)', padding: '4px 8px', height: 'auto', fontSize: 13 }}
                onClick={() => setIsAddingNote(!isAddingNote)}
              >
                <Edit2 size={12} /> {isAddingNote ? 'Cancel' : 'Add Note'}
              </button>
            </div>

            {isAddingNote && (
              <div className="drawer-card" style={{ marginBottom: '24px', background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                <textarea
                  className="form-input"
                  style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: 0, marginBottom: 12, resize: 'none' }}
                  placeholder="Type your note here..."
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  autoFocus
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    className="btn btn-primary"
                    style={{ padding: '6px 12px', height: 'auto', fontSize: 12 }}
                    onClick={handleAddNote}
                    disabled={!noteText.trim()}
                  >
                    Save Note
                  </button>
                </div>
              </div>
            )}
            
            <div className="timeline">
              {activities.length === 0 ? (
                <div style={{ fontSize: 14, color: 'var(--color-muted-fg)', fontStyle: 'italic' }}>No activity recorded yet.</div>
              ) : (
                activities.map(activity => {
                  const actor = getEmployee(activity.performedBy);
                  let dotClass = 'default';
                  if (activity.action === 'STAGE_CHANGED') dotClass = 'stage';
                  if (activity.action === 'NOTE_ADDED') dotClass = 'note';
                  if (activity.action === 'LEAD_CREATED') dotClass = 'create';

                  return (
                    <div key={activity.id} className="timeline-item">
                      <div className={`timeline-dot ${dotClass}`}></div>
                      <div className="timeline-content">{activity.details}</div>
                      <div className="timeline-meta">
                        {formatRelativeDate(activity.timestamp)} • by {actor?.name || 'System'}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
      
      <CallModal 
        lead={lead} 
        isOpen={isCallModalOpen} 
        onClose={() => setIsCallModalOpen(false)} 
      />
      <SiteVisitModal 
        lead={lead} 
        isOpen={isVisitModalOpen} 
        onClose={() => setIsVisitModalOpen(false)} 
      />
    </Dialog.Root>
  );
}
