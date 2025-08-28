'use client';

import { Project } from '@/lib/types';
import { HelpCircle, ThumbsUp } from 'lucide-react';
import { useMemo } from 'react';
import Button from './ui/Button';

interface DecisionsNeededPanelProps {
  project: Project;
}

const DecisionsNeededPanel = ({ project }: DecisionsNeededPanelProps) => {
  const tasksNeedingApproval = useMemo(() => {
    return project.categories.flatMap(category => 
      category.subTasks.filter(task => task.requiresClientApproval && !task.completed)
    );
  }, [project]);

  if (tasksNeedingApproval.length === 0) {
    return null; // Don't render anything if no decisions are needed
  }

  return (
    <div className="bg-blue-900/50 border-2 border-blue-500/50 p-6 rounded-lg shadow-large my-12">
      <div className="flex items-center mb-4">
        <HelpCircle className="h-8 w-8 text-blue-300 mr-4" />
        <div>
            <h2 className="text-2xl font-bold text-white">Decisions Needed</h2>
            <p className="text-blue-200">Your input is required on the following items to keep the project moving.</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {tasksNeedingApproval.map(task => (
          <div key={task.id} className="bg-gray-800/50 p-3 rounded-md flex items-center justify-between">
            <p className="font-medium text-gray-200">{task.name}</p>
            {/* In a real app, this button would trigger a backend mutation */}
            <Button size="sm" variant="secondary" onClick={() => alert('Approval action would be handled here.')}>
                <ThumbsUp className="w-4 h-4 mr-2"/>
                Review & Approve
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionsNeededPanel;