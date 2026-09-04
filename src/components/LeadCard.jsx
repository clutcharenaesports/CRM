import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Phone, MapPin, Building, GripVertical } from 'lucide-react';
import { formatINR, formatBudgetRange, formatPhone } from '../utils/formatters';
import { AgentBadge } from './AgentBadge';
import { PriorityBadge } from './PriorityBadge';
import { SourceBadge } from './SourceBadge';
import { useEmployeeStore } from '../store/employeeStore';

export function LeadCard({ lead, onClick }) {
  const { getEmployee } = useEmployeeStore();
  const assignedAgent = getEmployee(lead.assignedTo);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id, data: lead });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`lead-card ${isDragging ? 'is-dragging' : ''}`}
      onClick={() => onClick && onClick(lead)}
    >
      {/* Drag Handle & Header */}
      <div className="lead-card-header">
        <div className="lead-card-actions">
          <div {...attributes} {...listeners} className="drag-handle" onClick={(e) => e.stopPropagation()}>
            <GripVertical size={16} />
          </div>
          <PriorityBadge priorityId={lead.priority} className="text-[10px] py-0.5 px-1.5" />
        </div>
        <SourceBadge sourceId={lead.source} className="text-[10px] py-0.5 px-1.5" />
      </div>

      {/* Main Info */}
      <div className="lead-card-body">
        <h4 className="lead-name">{lead.name}</h4>
        <div className="lead-phone">
          <Phone size={12} />
          <span>{formatPhone(lead.phone)}</span>
        </div>
      </div>

      {/* Requirements Summary */}
      <div className="lead-requirements">
        <div className="lead-req-item">
          <Building size={12} className="text-muted-fg" />
          {lead.requirements.bhk || 'Any'}
        </div>
        <div className="lead-req-budget">
          {lead.requirements.budgetMinLakhs ? formatBudgetRange(lead.requirements.budgetMinLakhs, lead.requirements.budgetMaxLakhs) : 'Budget TBD'}
        </div>
      </div>

      {/* Localities (Optional) */}
      {lead.requirements.preferredLocalities && lead.requirements.preferredLocalities.length > 0 && (
        <div className="lead-localities">
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">{lead.requirements.preferredLocalities.join(', ')}</span>
        </div>
      )}

      {/* Footer */}
      <div className="lead-card-footer">
        <AgentBadge employee={assignedAgent} size="sm" />
        
        {/* Next Follow-up (Placeholder logic for phase 1) */}
        {lead.nextFollowUp ? (
          <div className="due-badge">Due Today</div>
        ) : (
          <div className="no-due">No Follow-up</div>
        )}
      </div>
    </div>
  );
}
