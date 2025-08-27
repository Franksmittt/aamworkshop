'use client';

import { Project } from '@/lib/types';
import { useState } from 'react';

interface ProjectStatusUpdaterProps {
  currentStatus: Project['status'];
  onStatusChange: (newStatus: Project['status'], reason: string) => void;
}

const statusOptions: Project['status'][] = ['Active', 'On Hold', 'Completed'];

const ProjectStatusUpdater = ({ currentStatus, onStatusChange }: ProjectStatusUpdaterProps) => {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [reason, setReason] = useState('');

  const handleUpdate = () => {
    if (newStatus !== currentStatus) {
      const defaultReason = `Project status changed to ${newStatus}.`;
      onStatusChange(newStatus, reason || defaultReason);
      setReason('');
    }
  };
  
  return (
    <div className="space-y-4">
        <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Project Status
            </label>
            <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Project['status'])}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
                {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
         <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                Reason for Change (Optional)
            </label>
            <input
                type="text"
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
                placeholder="e.g., Parts have arrived."
            />
        </div>
        <button
            onClick={handleUpdate}
            disabled={newStatus === currentStatus}
            className="w-full px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            Update Status
        </button>
    </div>
  );
};

export default ProjectStatusUpdater;