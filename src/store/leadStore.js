import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Generating past dates for realistic seed data
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

const seedLeads = [
  {
    id: 'lead_1',
    name: 'Vikram Malhotra',
    phone: '+919812345678',
    email: 'vikram.m@example.com',
    source: '99acres',
    assignedTo: 'emp_rohan',
    stage: 'visit_scheduled',
    priority: 'hot',
    requirements: { propertyType: 'apartment', bhk: '3 BHK', budgetMinLakhs: 80, budgetMaxLakhs: 120, preferredLocalities: ['Whitefield', 'Marathahalli'], possessionStatus: 'Ready to Move' },
    notes: [{ text: 'Wants a corner flat with good sunlight. Wife is very particular about Vastu.', addedBy: 'emp_rohan', timestamp: yesterday.toISOString() }],
    nextFollowUp: today.toISOString(),
    createdAt: twoDaysAgo.toISOString(),
    updatedAt: yesterday.toISOString()
  },
  {
    id: 'lead_2',
    name: 'Ananya Reddy',
    phone: '+919712345678',
    email: 'ananya.r@example.com',
    source: 'magicbricks',
    assignedTo: 'emp_priya',
    stage: 'contacted',
    priority: 'warm',
    requirements: { propertyType: 'apartment', bhk: '2 BHK', budgetMinLakhs: 55, budgetMaxLakhs: 75, preferredLocalities: ['Sarjapur Road'], possessionStatus: 'Any' },
    notes: [],
    nextFollowUp: today.toISOString(),
    createdAt: yesterday.toISOString(),
    updatedAt: yesterday.toISOString()
  },
  {
    id: 'lead_3',
    name: 'Deepak Kumar',
    phone: '+919612345678',
    email: '',
    source: 'meta_ads',
    assignedTo: null,
    stage: 'new',
    priority: 'cold',
    requirements: { propertyType: 'plot', bhk: '', budgetMinLakhs: 150, budgetMaxLakhs: 250, preferredLocalities: ['HSR Layout', 'Koramangala'], possessionStatus: '' },
    notes: [],
    nextFollowUp: null,
    createdAt: today.toISOString(),
    updatedAt: today.toISOString()
  },
  {
    id: 'lead_4',
    name: 'Neha Sharma',
    phone: '+919512345678',
    email: 'neha.sharma@example.com',
    source: 'direct_call',
    assignedTo: 'emp_amit',
    stage: 'negotiation',
    priority: 'hot',
    requirements: { propertyType: 'villa', bhk: '4 BHK', budgetMinLakhs: 250, budgetMaxLakhs: 350, preferredLocalities: ['Indiranagar'], possessionStatus: 'Ready to Move' },
    notes: [{ text: 'Offered 2.8 Cr, builder is at 3 Cr. Need to close this gap.', addedBy: 'emp_amit', timestamp: yesterday.toISOString() }],
    nextFollowUp: today.toISOString(),
    createdAt: twoDaysAgo.toISOString(),
    updatedAt: today.toISOString()
  },
  {
    id: 'lead_5',
    name: 'Suresh Pillai',
    phone: '+919412345678',
    email: '',
    source: 'walk_in',
    assignedTo: 'emp_rohan',
    stage: 'won',
    priority: 'hot',
    requirements: { propertyType: 'apartment', bhk: '3 BHK', budgetMinLakhs: 100, budgetMaxLakhs: 150, preferredLocalities: ['Bellandur'], possessionStatus: 'Under Construction' },
    notes: [{ text: 'Token amount received (5 Lakhs). Processing loan.', addedBy: 'emp_rohan', timestamp: today.toISOString() }],
    nextFollowUp: null,
    createdAt: twoDaysAgo.toISOString(),
    updatedAt: today.toISOString()
  }
];

export const useLeadStore = create(
  persist(
    (set, get) => ({
      leads: seedLeads,

      getLeads: () => {
        return get().leads;
      },
      
      getLead: (id) => {
        return get().leads.find(l => l.id === id) || null;
      },
      
      getLeadsByAgent: (agentId) => {
        return get().leads.filter(l => l.assignedTo === agentId);
      },

      getLeadsByStage: (stageId) => {
        return get().leads.filter(l => l.stage === stageId);
      },

      getUnassignedLeads: () => {
        return get().leads.filter(l => l.assignedTo === null);
      },

      addLead: (leadData) => set((state) => {
        const newLead = {
          ...leadData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          notes: leadData.notes || []
        };
        return { leads: [...state.leads, newLead] };
      }),

      updateLead: (id, updates) => set((state) => ({
        leads: state.leads.map(lead => 
          lead.id === id 
            ? { ...lead, ...updates, updatedAt: new Date().toISOString() } 
            : lead
        )
      })),

      updateLeadStage: (id, newStage) => set((state) => ({
        leads: state.leads.map(lead => 
          lead.id === id 
            ? { ...lead, stage: newStage, updatedAt: new Date().toISOString() } 
            : lead
        )
      })),

      assignLead: (id, agentId) => set((state) => ({
        leads: state.leads.map(lead => 
          lead.id === id 
            ? { ...lead, assignedTo: agentId, updatedAt: new Date().toISOString() } 
            : lead
        )
      })),

      addNote: (id, noteText, agentId) => set((state) => ({
        leads: state.leads.map(lead => {
          if (lead.id === id) {
            const newNote = {
              id: `note_${Date.now()}`,
              text: noteText,
              addedBy: agentId,
              timestamp: new Date().toISOString()
            };
            return {
              ...lead,
              notes: [newNote, ...(lead.notes || [])],
              updatedAt: new Date().toISOString()
            };
          }
          return lead;
        })
      })),

      deleteLead: (id) => set((state) => ({
        leads: state.leads.filter(lead => lead.id !== id)
      }))
    }),
    {
      name: 'propdesk-leads',
    }
  )
);
