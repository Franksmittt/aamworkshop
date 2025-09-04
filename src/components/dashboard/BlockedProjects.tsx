// [path]: components/dashboard/BlockedProjects.tsx

'use client';

import { Project } from '@/lib/types';
import { AlertTriangle, Wrench, DollarSign, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface BlockedProjectsProps {
  projects: Project[];
}

const holdReasonIcons: { [key: string]: React.ElementType } = {
    'Awaiting Parts': Wrench,
    'Awaiting Payment': DollarSign,
    'Awaiting Client Decision': HelpCircle,
};

const BlockedProjects = ({ projects }: BlockedProjectsProps) => {
  const blockedProjects = projects.filter(p => p.status === 'On Hold');

  return (
    <div className="bg-gray-800 border border-white/10 p-6 rounded-lg shadow-soft h-full">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <AlertTriangle className="h-5 w-5 mr-3 text-red-500" />
        Blocked Projects
      </h3>
      {blockedProjects.length > 0 ? (
        <ul className="space-y-4">
          {blockedProjects.map(project => {
            const Icon = project.holdReason ? holdReasonIcons[project.holdReason] || AlertTriangle : AlertTriangle;
            return (
              <li key={project.id}>
                <Link href={`/dashboard/projects/${project.id}`} className="block p-3 rounded-md hover:bg-gray-700/50 transition-colors">
                  <p className="font-semibold text-white">{project.car.year} {project.car.make} {project.car.model}</p>
                  <div className="flex items-center text-sm text-yellow-300 mt-1">
                    <Icon className="h-4 w-4 mr-2" />
                    <span>{project.holdReason}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">No projects are currently blocked.</p>
        </div>
      )}
    </div>
  );
};

export default BlockedProjects;