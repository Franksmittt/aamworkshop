// [path]: components/ApprovalCenter.tsx

'use client';

import { Project } from '@/lib/types';
import { HelpCircle, ThumbsUp, ThumbsDown, DollarSign, Clock } from 'lucide-react';
import { useMemo } from 'react';
import Button from './ui/Button';

interface ApprovalCenterProps {
  project: Project;
  onApproveTask: (taskId: string, categoryId: string) => void;
  // --- NEW: Add a prop to handle the decline action ---
  onDeclineTask: (taskId: string, categoryId: string) => void;
}

const ApprovalCenter = ({ project, onApproveTask, onDeclineTask }: ApprovalCenterProps) => {
  const tasksNeedingApproval = useMemo(() => {
    return project.categories.flatMap(category =>
      category.subTasks
        .filter(task => task.requiresClientApproval && task.status === 'Awaiting Approval')
        .map(task => ({ ...task, categoryId: category.id }))
    );
  }, [project]);

  const invoicesNeedingPayment = useMemo(() => {
    return project.financials.invoices.filter(invoice => invoice.status === 'Pending' || invoice.status === 'Overdue');
  }, [project]);

  const hasActions = tasksNeedingApproval.length > 0 || invoicesNeedingPayment.length > 0;

  if (!hasActions) {
    return null;
  }

  return (
    <div className="bg-blue-900/50 border-2 border-blue-500/50 p-6 rounded-lg shadow-large my-12">
      <div className="flex items-center mb-6">
        <HelpCircle className="h-8 w-8 text-blue-300 mr-4 flex-shrink-0" />
        <div>
          <h2 className="text-2xl font-bold text-white">Approval & Payment Center</h2>
          <p className="text-blue-200">Your input is required to keep the project moving forward.</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Pending Approvals */}
        {tasksNeedingApproval.map(task => (
          <div key={task.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white">{task.name}</h4>
            <div className="flex items-center text-xs text-gray-400 mt-2 space-x-4">
               <span className="flex items-center"><DollarSign className="w-3 h-3 mr-1.5 text-green-400"/>Est. Cost: R5,500</span>
               <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5 text-yellow-400"/>Est. Delay: 2 Days</span>
            </div>
            <div className="mt-4 flex space-x-2 justify-end">
                {/* --- NEW: The Decline button now calls the handler prop --- */}
                <Button size="sm" variant="outline" onClick={() => onDeclineTask(task.id, task.categoryId)}>
                    <ThumbsDown className="w-4 h-4 mr-2"/>
                    Decline
                </Button>
                <Button size="sm" variant="secondary" onClick={() => onApproveTask(task.id, task.categoryId)}>
                    <ThumbsUp className="w-4 h-4 mr-2"/>
                    Approve
                </Button>
            </div>
          </div>
        ))}

        {/* Pending Payments */}
        {invoicesNeedingPayment.map(invoice => (
            <div key={invoice.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                 <h4 className="font-semibold text-white">{invoice.description}</h4>
                 <div className="flex items-center text-xs text-gray-400 mt-2">
                    <span>Due: {invoice.dueDate}</span>
                    {invoice.status === 'Overdue' && <span className="ml-2 text-red-400 font-bold">(Overdue)</span>}
                 </div>
                 <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-green-400">R{invoice.amount.toLocaleString()}</p>
                    <Button size="sm" variant="primary" onClick={() => alert('Payment action would be handled here.')}>
                        <DollarSign className="w-4 h-4 mr-2"/>
                        Pay Now
                    </Button>
                 </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalCenter;