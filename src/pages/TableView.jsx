import React from 'react';
import { formatINR, formatDate, formatBudgetRange } from '../utils/formatters';
import { STAGES, PRIORITIES, SOURCES } from '../utils/constants';
import { AgentBadge } from '../components/AgentBadge';
import { useEmployeeStore } from '../store/employeeStore';

export function TableView({ leads, onLeadClick }) {
  const { getEmployee } = useEmployeeStore();

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Lead Details</th>
            <th>Stage & Priority</th>
            <th>Requirements</th>
            <th>Assigned To</th>
            <th>Added On</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: 'var(--color-muted-fg)' }}>No leads found matching criteria.</td>
            </tr>
          ) : (
            leads.map(lead => {
              const stage = STAGES.find(s => s.id === lead.stage);
              const priority = PRIORITIES.find(p => p.id === lead.priority);
              const source = SOURCES.find(s => s.id === lead.source);
              const agent = getEmployee(lead.assignedTo);
              
              return (
                <tr 
                  key={lead.id} 
                  onClick={() => onLeadClick(lead)}
                >
                  {/* Color bar indicator */}
                  <td className="stage-bar" style={{ backgroundColor: `var(--stage-${lead.stage})` }}></td>
                  
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-fg)' }}>{lead.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-muted-fg)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{lead.phone}</div>
                    <div style={{ fontSize: 10, color: 'var(--color-muted-fg)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                       <span style={{ color: source?.color }}>{source?.icon}</span> {source?.label}
                    </div>
                  </td>
                  <td>
                    <div className="badge" style={{ backgroundColor: `var(--stage-${lead.stage})`, color: '#fff', marginBottom: 8, border: 'none' }}>
                      {stage?.label}
                    </div>
                    <div>
                      <span className="badge" style={{ backgroundColor: priority?.bgColor, color: priority?.fgColor, border: 'none' }}>
                        {priority?.emoji} {priority?.label}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--color-fg)' }}>{lead.requirements.bhk || 'Any BHK'}</div>
                    <div style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', marginTop: 4, fontWeight: 600 }}>
                      {lead.requirements.budgetMinLakhs ? formatBudgetRange(lead.requirements.budgetMinLakhs, lead.requirements.budgetMaxLakhs) : 'Budget TBD'}
                    </div>
                    {lead.requirements.preferredLocalities && (
                      <div style={{ fontSize: 12, color: 'var(--color-muted-fg)', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
                        {lead.requirements.preferredLocalities.join(', ')}
                      </div>
                    )}
                  </td>
                  <td>
                    <AgentBadge employee={agent} size="sm" showName={true} />
                  </td>
                  <td style={{ fontSize: 14, color: 'var(--color-muted-fg)' }}>
                    {formatDate(lead.createdAt)}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
