import React, { useState } from 'react';
import { EmptyState } from '../components/EmptyState';
import { Building2, MapPin } from 'lucide-react';
import { usePropertyStore } from '../store/propertyStore';
import { formatINR } from '../utils/formatters';
import { PropertyModal } from '../components/PropertyModal';

export function Properties() {
  const { properties } = usePropertyStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const openAdd = () => { setEditingProperty(null); setIsModalOpen(true); };

  return (
    <div className="page h-full">
      <div className="page-header">
        <div>
          <h1 className="page-title">Property Inventory</h1>
          <p className="page-subtitle">Manage listings and match with leads</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Property</button>
      </div>
      
      {properties.length === 0 ? (
        <div className="card h-[calc(100%-80px)]">
          <EmptyState 
            icon={Building2}
            title="No Properties"
            description="Add your first property to start matching with leads."
            action={{ label: "Add Property", onClick: openAdd }}
          />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)', padding: 'var(--space-4)', flex: 1, overflowY: 'auto' }}>
          {properties.map(prop => (
            <div key={prop.id} className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => { setEditingProperty(prop); setIsModalOpen(true); }}>
              <div style={{ height: 160, background: 'var(--color-muted)', backgroundImage: `url(${prop.imageUrl || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=60'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <h3 className="text-h3" style={{ margin: 0 }}>{prop.name}</h3>
                  <div style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{formatINR(prop.priceLakhs)}</div>
                </div>
                <div style={{ color: 'var(--color-muted-fg)', fontSize: 13, marginBottom: 12 }}>{prop.builder}</div>
                <div style={{ display: 'flex', gap: 12, fontSize: 13, color: 'var(--color-fg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Building2 size={14} className="text-muted-fg" /> {prop.bhk}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} className="text-muted-fg" /> {prop.locality}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <PropertyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingProperty={editingProperty} />
    </div>
  );
}
