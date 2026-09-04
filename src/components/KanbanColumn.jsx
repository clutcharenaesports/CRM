import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { LeadCard } from './LeadCard';
import { STAGES } from '../utils/constants';

export function KanbanColumn({ stageId, leads, onLeadClick }) {
  const stage = STAGES.find(s => s.id === stageId);
  
  const { setNodeRef, isOver } = useDroppable({
    id: stageId,
  });

  return (
    <div className="kanban-col">
      <div 
        className="kanban-col-header"
        style={{ borderTop: `3px solid var(--stage-${stageId})` }}
      >
        <div className="kanban-col-title">
          <h3>{stage.label}</h3>
          <span className="badge">{leads.length}</span>
        </div>
      </div>

      <div 
        ref={setNodeRef} 
        className={`kanban-col-body ${isOver ? 'is-over' : ''}`}
      >
        <SortableContext 
          items={leads.map(l => l.id)} 
          strategy={verticalListSortingStrategy}
        >
          {leads.map(lead => (
            <LeadCard key={lead.id} lead={lead} onClick={onLeadClick} />
          ))}
        </SortableContext>
        
        {leads.length === 0 && (
          <div className="kanban-empty">Drop leads here</div>
        )}
      </div>
    </div>
  );
}
