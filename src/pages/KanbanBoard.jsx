import React, { useState } from 'react';
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { KanbanColumn } from '../components/KanbanColumn';
import { LeadCard } from '../components/LeadCard';
import { STAGES } from '../utils/constants';
import { useLeadStore } from '../store/leadStore';
import { useAuthStore } from '../store/authStore';
import { useActivityStore } from '../store/activityStore';

export function KanbanBoard({ leads, onLeadClick }) {
  const { updateLeadStage, updateLead } = useLeadStore();
  const { currentUser } = useAuthStore();
  const { logActivity } = useActivityStore();
  const [activeLead, setActiveLead] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires 5px movement before dragging starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const draggedLead = leads.find(l => l.id === active.id);
    setActiveLead(draggedLead);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveLead(null);
    
    if (!over) return;

    const leadId = active.id;
    const activeLeadData = leads.find(l => l.id === leadId);
    if (!activeLeadData) return;

    const oldStage = activeLeadData.stage;
    
    // Find what stage the lead was dropped into
    // It could be dropped on another card (over.id is a leadId) or an empty column (over.id is a stageId)
    let newStage = over.id;
    const overLead = leads.find(l => l.id === over.id);
    if (overLead) {
      newStage = overLead.stage;
    }

    if (oldStage !== newStage) {
      updateLeadStage(leadId, newStage);
      const stageName = STAGES.find(s => s.id === newStage)?.label || newStage;
      logActivity(
        leadId, 
        currentUser?.id, 
        'STAGE_CHANGED', 
        `Moved to ${stageName}`
      );
    }
  };

  return (
    <div className="kanban-board custom-scrollbar">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {STAGES.map((stage) => (
          <KanbanColumn 
            key={stage.id} 
            stageId={stage.id} 
            leads={leads.filter(l => l.stage === stage.id)}
            onLeadClick={onLeadClick}
          />
        ))}
        
        <DragOverlay>
          {activeLead ? <LeadCard lead={activeLead} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
