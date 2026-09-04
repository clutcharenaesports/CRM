import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { usePropertyStore } from '../store/propertyStore';

export function PropertyModal({ isOpen, onClose, editingProperty }) {
  const { addProperty, updateProperty } = usePropertyStore();
  const [formData, setFormData] = useState({
    name: '', builder: '', type: 'apartment', bhk: '2 BHK',
    areaSqFt: '', priceLakhs: '', locality: '', city: 'Bengaluru',
    status: 'ready_to_move', reraNumber: '', imageUrl: ''
  });

  useEffect(() => {
    if (editingProperty) setFormData(editingProperty);
    else setFormData({ name: '', builder: '', type: 'apartment', bhk: '2 BHK', areaSqFt: '', priceLakhs: '', locality: '', city: 'Bengaluru', status: 'ready_to_move', reraNumber: '', imageUrl: '' });
  }, [editingProperty, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProperty) {
      updateProperty(editingProperty.id, formData);
    } else {
      addProperty({ ...formData, areaSqFt: Number(formData.areaSqFt), priceLakhs: Number(formData.priceLakhs) });
    }
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-backdrop" />
        <Dialog.Content className="modal-content">
          <div className="modal-header">
            <Dialog.Title className="text-h2">{editingProperty ? 'Edit Property' : 'Add New Property'}</Dialog.Title>
            <Dialog.Close asChild>
              <button className="btn btn-ghost btn-icon" aria-label="Close"><X size={20} /></button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="modal-body">
            <div className="form-group">
              <label className="form-label">Property Name / Project</label>
              <input required className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Prestige Lake View" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-select" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">BHK</label>
                <select className="form-select" value={formData.bhk} onChange={e => setFormData({...formData, bhk: e.target.value})}>
                  <option value="1 RK">1 RK</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Price (₹ Lakhs)</label>
                <input required type="number" className="form-input" value={formData.priceLakhs} onChange={e => setFormData({...formData, priceLakhs: e.target.value})} placeholder="e.g. 85" />
              </div>
              <div className="form-group">
                <label className="form-label">Locality</label>
                <input required className="form-input" value={formData.locality} onChange={e => setFormData({...formData, locality: e.target.value})} placeholder="e.g. Whitefield" />
              </div>
            </div>

            <div className="modal-footer" style={{ marginTop: 24 }}>
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editingProperty ? 'Save Changes' : 'Add Property'}</button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
