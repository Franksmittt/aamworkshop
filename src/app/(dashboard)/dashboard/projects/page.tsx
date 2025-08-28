'use client';

import { useState, useEffect } from 'react';
import { getProjects } from '@/lib/data-service';
import { Project } from '@/lib/types';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Plus, AlertTriangle, Clock } from 'lucide-react';
import { calculateOverallProgress } from '@/lib/utils';

// UPGRADED: This component now displays the hold reason
const StatusDisplay = ({ status, holdReason }: { status: Project['status'], holdReason: Project['holdReason'] }) => {
  const statusClasses = {
    Active: 'bg-green-900/50 text-green-300 border border-green-500/30',
    'On Hold': 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30',
    Completed: 'bg-red-900/50 text-red-300 border border-red-500/30',
  };
  
  const holdReasonIcons = {
    'Awaiting Parts': <Clock className="h-3 w-3 mr-1.5" />,
    'Awaiting Payment': <span className="mr-1.5 font-bold text-lg leading-none">$</span>,
    'Awaiting Client Decision': <AlertTriangle className="h-3 w-3 mr-1.5" />,
  };

  return (
    <div className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
      {status === 'On Hold' && holdReason && holdReasonIcons[holdReason]}
      {status === 'On Hold' && holdReason ? holdReason : status}
    </div>
  );
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    setProjects(getProjects());
  }, []);
  
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-white">All Projects</h1>
            <p className="text-gray-400">A complete list of all workshop projects.</p>
        </div>
        <Button href="/dashboard/projects/new" variant="primary">
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Project
        </Button>
      </div>

      <div className="bg-gray-800 border border-white/10 rounded-lg shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Car</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Progress</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {projects.map(project => {
                 const progress = calculateOverallProgress(project);
                 return (
                  <tr key={project.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{project.car.year} {project.car.make} {project.car.model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{project.customerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       {/* USE THE NEW COMPONENT */}
                      <StatusDisplay status={project.status} holdReason={project.holdReason} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-700 rounded-full h-1.5 mr-2">
                          <div className="bg-red-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/dashboard/projects/${project.id}`} className="text-red-500 hover:text-red-400">
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}