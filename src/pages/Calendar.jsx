import React from 'react';
import { EmptyState } from '../components/EmptyState';
import { CalendarDays, MapPin, User } from 'lucide-react';
import { useVisitStore } from '../store/visitStore';
import { usePropertyStore } from '../store/propertyStore';
import { useLeadStore } from '../store/leadStore';
import { useEmployeeStore } from '../store/employeeStore';

export function Calendar() {
  const { visits } = useVisitStore();
  const { getProperty } = usePropertyStore();
  const { getLead } = useLeadStore();
  const { getEmployee } = useEmployeeStore();

  const sortedVisits = [...visits].sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));

  return (
    <div className="page h-full">
      <div className="page-header">
        <div>
          <h1 className="page-title">Site Visits</h1>
          <p className="page-subtitle">Schedule and track property tours</p>
        </div>
      </div>
      
      {sortedVisits.length === 0 ? (
        <div className="card h-[calc(100%-80px)]">
          <EmptyState 
            icon={CalendarDays}
            title="No Scheduled Visits"
            description="When you schedule a site visit from a Lead's drawer, it will appear here."
          />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', padding: '0 4px 16px' }}>
          {sortedVisits.map(visit => {
            const property = getProperty(visit.propertyId);
            const lead = getLead(visit.leadId);
            const agent = getEmployee(visit.agentId);
            const date = new Date(visit.scheduledDate);
            
            return (
              <div key={visit.id} className="card" style={{ padding: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ minWidth: 80, textAlign: 'center', borderRight: '1px solid var(--color-border)', paddingRight: 16 }}>
                  <div style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>
                    {date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}
                  </div>
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 className="text-h3" style={{ margin: '0 0 4px 0' }}>{lead?.name}</h3>
                  <div style={{ display: 'flex', gap: 12, color: 'var(--color-muted-fg)', fontSize: 13 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={14} /> {property?.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <User size={14} /> {agent?.name}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="badge" style={{ backgroundColor: visit.status === 'completed' ? 'var(--color-success)' : 'var(--color-warning)', color: '#fff', border: 'none' }}>
                    {visit.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
