/* Enums and constants for PropDesk CRM */

export const STAGES = [
  { id: 'new', label: 'New / Fresh', color: '#3B82F6' },
  { id: 'contacted', label: 'Contacted', color: '#8B5CF6' },
  { id: 'requirement', label: 'Requirement Gathered', color: '#6366F1' },
  { id: 'shared', label: 'Property Shared', color: '#0EA5E9' },
  { id: 'visit_scheduled', label: 'Site Visit Scheduled', color: '#F59E0B' },
  { id: 'visit_done', label: 'Site Visit Done', color: '#F97316' },
  { id: 'negotiation', label: 'Negotiation', color: '#EC4899' },
  { id: 'won', label: 'Booked / Won', color: '#10B981' },
  { id: 'lost', label: 'Lost / Cold', color: '#EF4444' },
];

export const SOURCES = [
  { id: '99acres', label: '99acres', color: '#E11D48', icon: '🏠' },
  { id: 'magicbricks', label: 'Magicbricks', color: '#7C3AED', icon: '🧱' },
  { id: 'housing', label: 'Housing.com', color: '#0891B2', icon: '🏡' },
  { id: 'meta_ads', label: 'Meta Ads', color: '#2563EB', icon: '📱' },
  { id: 'direct_call', label: 'Direct Call', color: '#059669', icon: '📞' },
  { id: 'helpline_call', label: 'Central Helpline', color: '#F59E0B', icon: '☎️' },
  { id: 'walk_in', label: 'Walk-in', color: '#64748B', icon: '🚶' },
  { id: 'whatsapp', label: 'WhatsApp', color: '#22C55E', icon: '💬' },
  { id: 'referral', label: 'Referral', color: '#EC4899', icon: '🤝' },
];

export const PRIORITIES = [
  { id: 'hot', label: 'Hot', emoji: '🔥', bgColor: 'var(--priority-hot-bg)', fgColor: 'var(--priority-hot-fg)' },
  { id: 'warm', label: 'Warm', emoji: '🟡', bgColor: 'var(--priority-warm-bg)', fgColor: 'var(--priority-warm-fg)' },
  { id: 'cold', label: 'Cold', emoji: '🔵', bgColor: 'var(--priority-cold-bg)', fgColor: 'var(--priority-cold-fg)' },
];

export const BHK_OPTIONS = ['1 RK', '1 BHK', '1.5 BHK', '2 BHK', '2.5 BHK', '3 BHK', '3.5 BHK', '4 BHK', '4+ BHK', '5+ BHK'];

export const PROPERTY_TYPES = [
  { id: 'apartment', label: 'Apartment' },
  { id: 'villa', label: 'Villa' },
  { id: 'plot', label: 'Plot' },
  { id: 'builder_floor', label: 'Builder Floor' },
  { id: 'penthouse', label: 'Penthouse' },
  { id: 'office', label: 'Office Space' },
  { id: 'shop', label: 'Shop / Showroom' },
  { id: 'commercial_land', label: 'Commercial Land' },
  { id: 'warehouse', label: 'Warehouse / Godown' },
];

export const PROPERTY_STATUSES = [
  { id: 'ready_to_move', label: 'Ready to Move' },
  { id: 'under_construction', label: 'Under Construction' },
  { id: 'resale', label: 'Resale' },
  { id: 'new_launch', label: 'New Launch' },
  { id: 'pre_launch', label: 'Pre-Launch' },
];

export const POSSESSION_OPTIONS = [
  'Ready to Move',
  'Within 6 Months',
  'Within 1 Year',
  'Within 2 Years',
  '2+ Years',
  'Any',
];

export const CITIES = [
  'Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune', 'Hyderabad',
  'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Noida', 'Gurgaon', 'Goa', 'Kochi',
];

export const HELPLINE_NUMBER = '+91 80 6900 1234';

export const COMPANY_NAME = 'PropDesk Realty';

export const WHATSAPP_TEMPLATES = [
  {
    id: 'introduction',
    label: 'Introduction',
    template: 'Hi {name}, this is {agent} from {company}. I saw your enquiry for {bhk} in {locality}. When can we discuss your requirements?',
  },
  {
    id: 'property_share',
    label: 'Property Share',
    template: 'Hi {name}, here are some {bhk} options in {locality} within your budget of ₹{budget}. Would you like to schedule a visit?',
  },
  {
    id: 'visit_confirm',
    label: 'Site Visit Confirmation',
    template: 'Hi {name}, your site visit is confirmed for {date} at {time}. Location: {property}. I\'ll meet you there. – {agent}',
  },
  {
    id: 'follow_up',
    label: 'Follow-Up',
    template: 'Hi {name}, hope you liked the property at {property}. Would you like to discuss pricing or see more options?',
  },
];
