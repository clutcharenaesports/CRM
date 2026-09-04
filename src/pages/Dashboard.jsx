import React from 'react';
import { EmptyState } from '../components/EmptyState';
import { LayoutDashboard } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="page h-full">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your real estate pipeline</p>
        </div>
      </div>
      
      <div className="card h-[calc(100%-80px)]">
        <EmptyState 
          icon={LayoutDashboard}
          title="Dashboard Analytics"
          description="KPIs, charts, and team performance metrics will be built in Phase 5."
        />
      </div>
    </div>
  );
}
