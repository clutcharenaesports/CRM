import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const seedProperties = [
  {
    id: 'prop_1',
    name: 'Prestige Lake View',
    builder: 'Prestige Group',
    type: 'apartment',
    bhk: '3 BHK',
    areaSqFt: 1450,
    priceLakhs: 95,
    locality: 'Whitefield',
    city: 'Bengaluru',
    status: 'ready_to_move',
    reraNumber: 'PRM/KA/RERA/1251/446/PR/190809/002772',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'prop_2',
    name: 'Brigade Utopia',
    builder: 'Brigade Group',
    type: 'apartment',
    bhk: '2 BHK',
    areaSqFt: 1100,
    priceLakhs: 65,
    locality: 'Varthur',
    city: 'Bengaluru',
    status: 'under_construction',
    reraNumber: 'PRM/KA/RERA/1251/446/PR/181210/002206',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'prop_3',
    name: 'DLF Capital Greens',
    builder: 'DLF',
    type: 'apartment',
    bhk: '3 BHK',
    areaSqFt: 1650,
    priceLakhs: 180,
    locality: 'Shivaji Marg',
    city: 'Delhi NCR',
    status: 'ready_to_move',
    reraNumber: 'DLRERA2019P0005',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'prop_4',
    name: 'Sobha City',
    builder: 'Sobha Ltd',
    type: 'villa',
    bhk: '4 BHK',
    areaSqFt: 3200,
    priceLakhs: 450,
    locality: 'Thanisandra',
    city: 'Bengaluru',
    status: 'ready_to_move',
    reraNumber: 'PRM/KA/RERA/1251/309/PR/170916/000155',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60'
  }
];

export const usePropertyStore = create(
  persist(
    (set, get) => ({
      properties: seedProperties,

      getProperties: () => {
        return get().properties;
      },
      
      getProperty: (id) => {
        return get().properties.find(p => p.id === id) || null;
      },
      
      addProperty: (prop) => set(state => ({ 
        properties: [{ ...prop, id: `prop_${Date.now()}` }, ...state.properties] 
      })),
      
      updateProperty: (id, updates) => set(state => ({ 
        properties: state.properties.map(p => p.id === id ? { ...p, ...updates } : p) 
      })),
      
      deleteProperty: (id) => set(state => ({ 
        properties: state.properties.filter(p => p.id !== id) 
      }))
    }),
    {
      name: 'propdesk-properties',
    }
  )
);
