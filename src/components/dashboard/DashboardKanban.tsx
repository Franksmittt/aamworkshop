// [path]: components/dashboard/DashboardKanban.tsx

'use client';

import { useMemo } from 'react';
import { Project, SubTask } from '@/lib/types';
import Link from 'next/link';
import { mockTechnicians } from '@/lib/mock-data';

interface KanbanTask extends SubTask {
  projectName: string;
  projectId: string;
  categoryName: string;
}

interface DashboardKanbanProps {
  projects: Project[];
}

const DashboardKanban = ({ projects }: DashboardKanbanProps) => {
  const columns = useMemo(() => {
    // Define the primary stages of work for the dashboard
    const stages = ['Body & Paint', 'Engine & Drivetrain', 'Chassis & Suspension', 'Interior', 'Electrical & Wiring', 'Final Assembly'];
    
    // Find all tasks that are currently 'In Progress' from active projects
    const inProgressTasks: KanbanTask[] = projects
      .filter(p => p.status === 'Active')
      .flatMap(project =>
        project.categories.flatMap(category =>
          category.subTasks
            .filter(task => task.status === 'In Progress')
            .map(task => ({
              ...task,
              projectName: `${project.car.year} ${project.car.make} ${project.car.model}`,
              projectId: project.id,
              categoryName: category.name,
            }))
        )
      );

    // Group the tasks by their category name (stage)
    const tasksByStage = inProgressTasks.reduce((acc, task) => {
      const stage = task.categoryName;
      if (!acc[stage]) {
        acc[stage] = [];
      }
      acc[stage].push(task);
      return acc;
    }, {} as Record<string, KanbanTask[]>);

    return stages.map(stage => ({
      title: stage,
      tasks: tasksByStage[stage] || []
    }));

  }, [projects]);
  
  const getTechnicianName = (techId: string | undefined) => {
    if (!techId) return 'Unassigned';
    return mockTechnicians.find(t => t.id === techId)?.name || 'Unknown';
  };

  return (
    <div className="bg-gray-800 border border-white/10 p-6 rounded-lg shadow-soft">
      <h3 className="text-xl font-bold text-white mb-4">Active Projects Kanban (In Progress)</h3>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <div key={column.title} className="w-72 flex-shrink-0 bg-gray-900/50 rounded-lg">
            <div className="p-3 border-b border-white/10">
              <h4 className="font-bold text-white text-sm">{column.title} <span className="text-xs font-normal text-gray-500">{column.tasks.length}</span></h4>
            </div>
            <div className="p-2 space-y-2 min-h-[200px]">
              {column.tasks.length > 0 ? column.tasks.map(task => (
                <div key={task.id} className="bg-gray-800 p-3 rounded-md border border-gray-700">
                  <p className="text-sm font-medium text-gray-200 mb-1">{task.name}</p>
                  <Link href={`/dashboard/projects/${task.projectId}`} className="text-xs text-red-500 hover:underline">
                    {task.projectName}
                  </Link>
                  <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-700">
                    Assigned to: <span className="font-semibold text-gray-300">{getTechnicianName(task.assignedTo)}</span>
                  </p>
                </div>
              )) : (
                 <div className="flex items-center justify-center h-full p-4">
                    <p className="text-xs text-gray-600">No tasks in progress.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardKanban;