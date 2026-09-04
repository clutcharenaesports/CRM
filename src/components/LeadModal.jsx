import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useLeadStore } from '../store/leadStore';
import { useAuthStore } from '../store/authStore';
import { useEmployeeStore } from '../store/employeeStore';
import { useActivityStore } from '../store/activityStore';
import { SOURCES, PRIORITIES } from '../utils/constants';

export function LeadModal({ isOpen, onClose }) {
  const { addLead } = useLeadStore();
  const { currentUser } = useAuthStore();
  const { getActiveAgents } = useEmployeeStore();
  const { logActivity } = useActivityStore();
  const agents = getActiveAgents();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    source: 'direct_call',
    priority: 'warm',
    assignedTo: currentUser?.id || '',
    requirements: {
      propertyType: 'apartment',
      bhk: '',
      budgetMinLakhs: '',
      budgetMaxLakhs: '',
      preferredLocalities: '',
      possessionStatus: 'Any'
    }
  });

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Parse localities from comma separated string
    const localities = formData.requirements.preferredLocalities
      .split(',')
      .map(loc => loc.trim())
      .filter(loc => loc.length > 0);

    const newLeadData = {
      ...formData,
      stage: 'new', // Default starting stage
      requirements: {
        ...formData.requirements,
        preferredLocalities: localities,
        budgetMinLakhs: Number(formData.requirements.budgetMinLakhs) || 0,
        budgetMaxLakhs: Number(formData.requirements.budgetMaxLakhs) || 0,
      }
    };

    addLead(newLeadData);
    
    // In a real app we'd get the returned ID, but since our store doesn't return it yet, 
    // we'll just log generic activity if needed, or update the store to return the ID.
    // For MVP, we will add the ID generation to the store later.
    
    onClose();
    // Reset form
    setFormData({
      name: '', phone: '', email: '', source: 'direct_call', priority: 'warm',
      assignedTo: currentUser?.id || '',
      requirements: { propertyType: 'apartment', bhk: '', budgetMinLakhs: '', budgetMaxLakhs: '', preferredLocalities: '', possessionStatus: 'Any' }
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-backdrop" />
        <Dialog.Content className="modal-content outline-none">
          
          <div className="modal-header">
            <Dialog.Title className="modal-title">
              Add New Lead
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="btn btn-ghost btn-icon">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Contact Info */}
            <div className="form-section">
              <h3 className="form-section-title">Contact Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="e.g. Rahul Sharma" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="+91" />
                </div>
              </div>

              <div className="form-row cols-3">
                <div className="form-group">
                  <label className="form-label">Source</label>
                  <select name="source" value={formData.source} onChange={handleChange} className="form-select">
                    {SOURCES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select name="priority" value={formData.priority} onChange={handleChange} className="form-select">
                    {PRIORITIES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Assign To</label>
                  <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="form-select">
                    <option value="">Unassigned</option>
                    {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="form-section">
              <h3 className="form-section-title">Requirements</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Property Type</label>
                  <select name="propertyType" value={formData.requirements.propertyType} onChange={(e) => handleChange(e, 'requirements')} className="form-select">
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="plot">Plot / Land</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">BHK</label>
                  <select name="bhk" value={formData.requirements.bhk} onChange={(e) => handleChange(e, 'requirements')} className="form-select">
                    <option value="">Any</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4+ BHK">4+ BHK</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Min Budget (Lakhs)</label>
                  <input type="number" name="budgetMinLakhs" value={formData.requirements.budgetMinLakhs} onChange={(e) => handleChange(e, 'requirements')} className="form-input" placeholder="e.g. 50" />
                </div>
                <div className="form-group">
                  <label className="form-label">Max Budget (Lakhs)</label>
                  <input type="number" name="budgetMaxLakhs" value={formData.requirements.budgetMaxLakhs} onChange={(e) => handleChange(e, 'requirements')} className="form-input" placeholder="e.g. 80" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Localities (comma separated)</label>
                <input type="text" name="preferredLocalities" value={formData.requirements.preferredLocalities} onChange={(e) => handleChange(e, 'requirements')} className="form-input" placeholder="e.g. Whitefield, Indiranagar" />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
              <button type="submit" className="btn btn-primary">Create Lead</button>
            </div>
          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
