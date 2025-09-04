
// [path]: components/dashboard/PendingApprovals.tsx

'use client';

import { Project, SubTask } from '@/lib/types';
import { CheckSquare } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

interface PendingApprovalsProps {
  projects: Project[];
}

interface ApprovalItem extends SubTask {
  projectId: string;
  projectName: string;
}

const PendingApprovals = ({ projects }: PendingApprovalsProps) => {
  const itemsNeedingApproval = useMemo(() => {
    const items: ApprovalItem[] = [];
    projects.forEach(project => {
      project.categories.forEach(category => {
        category.subTasks.forEach(task => {
          if (task.status === 'Awaiting Approval') {
            items.push({
              ...task,
              projectId: project.id,
              projectName: `${project.car.year} ${project.car.make} ${project.car.model}`,
            });
          }
        });
      });
    });
    return items;
  }, [projects]);

  return (
    <div className="bg-gray-800 border border-white/10 p-6 rounded-lg shadow-soft h-full">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <CheckSquare className="h-5 w-5 mr-3 text-blue-400" />
        Pending Approvals
      </h3>
      {itemsNeedingApproval.length > 0 ? (
        <ul className="space-y-4">
          {itemsNeedingApproval.map(item => (
            <li key={item.id}>
              <Link href={`/dashboard/projects/${item.projectId}`} className="block p-3 rounded-md hover:bg-gray-700/50 transition-colors">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-gray-400">{item.projectName}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">No items are awaiting approval.</p>
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;