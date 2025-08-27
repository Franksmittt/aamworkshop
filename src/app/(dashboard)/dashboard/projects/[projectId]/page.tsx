'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProjectById, updateProject, deleteProject } from '@/lib/data-service';
import { Project, Category, SubTask, TimelineUpdate } from '@/lib/types';
import ProjectHeader from '@/components/ProjectHeader';
import InteractiveProgressCategory from '@/components/dashboard/InteractiveProgressCategory';
import AddTimelineForm from '@/components/dashboard/AddTimelineForm';
import Timeline from '@/components/Timeline';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import EditProjectModal from '@/components/dashboard/EditProjectModal';
import Button from '@/components/ui/Button';
import ProjectStatusUpdater from '@/components/dashboard/ProjectStatusUpdater';

const calculateOverallProgress = (project: Project | null): number => {
  if (!project || !project.categories) return 0;
  
  const totalProgress = project.categories.reduce((acc, category) => {
    const completedTasks = category.subTasks.filter(t => t.completed).length;
    const categoryProgress = category.subTasks.length > 0 ? (completedTasks / category.subTasks.length) : 0;
    return acc + (categoryProgress * category.weight);
  }, 0);

  const totalWeight = project.categories.reduce((acc, category) => acc + category.weight, 0);
  return totalWeight > 0 ? totalProgress / totalWeight * 100 : 0;
};

export default function WorkshopProjectPage({ params }: { params: { projectId: string } }) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const foundProject = getProjectById(params.projectId);
    if (foundProject) {
      setProject(foundProject);
    }
    setIsLoading(false);
  }, [params.projectId]);

  useEffect(() => {
    if (project) {
        updateProject(project);
    }
  }, [project]);

  const handleTaskToggle = (taskId: string, categoryId: string) => {
    setProject(currentProject => {
      if (!currentProject) return null;
      const newProject = JSON.parse(JSON.stringify(currentProject));
      const category = newProject.categories.find((c: Category) => c.id === categoryId);
      if (category) {
        const task = category.subTasks.find((t: SubTask) => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
      return newProject;
    });
  };

  const handleTimelineAdd = (newUpdate: Omit<TimelineUpdate, 'id' | 'date'>) => {
    const newEntry: TimelineUpdate = {
      ...newUpdate,
      id: `t-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    
    setProject(currentProject => {
      if (!currentProject) return null;
      const newProject = JSON.parse(JSON.stringify(currentProject));
      newProject.timeline.unshift(newEntry);
      return newProject;
    });
  };

  const handleStatusChange = (newStatus: Project['status'], reason: string) => {
      const newEntry: TimelineUpdate = {
          id: `t-status-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          update: reason,
          category: 'Project Status'
      };

      setProject(currentProject => {
          if (!currentProject) return null;
          const newProject = JSON.parse(JSON.stringify(currentProject));
          newProject.status = newStatus;
          newProject.timeline.unshift(newEntry);
          return newProject;
      });
  };

  const handleSaveEdits = (updatedData: Partial<Project>) => {
     setProject(currentProject => {
        if (!currentProject) return null;
        return { ...currentProject, ...updatedData };
     });
  };

  const handleDelete = () => {
    if (project) {
        deleteProject(project.id);
        router.push('/dashboard/projects');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Loading Project...</p>
      </div>
    );
  }

  if (!project) {
    return (
       <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl font-bold text-red-500">Project Not Found</h1>
      </div>
    )
  }

  const overallProgress = calculateOverallProgress(project);

  return (
    <>
      <EditProjectModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSave={handleSaveEdits} 
        project={project} 
      />
      <ConfirmationModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDelete}
        title="Delete Project"
        message={`Are you sure you want to permanently delete the ${project.car.year} ${project.car.make} ${project.car.model} project? This action cannot be undone.`}
      />

      <div className="text-gray-900">
        <ProjectHeader 
          project={project} 
          overallProgress={overallProgress}
          onEdit={() => setIsEditModalOpen(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-white">Manage Progress</h2>
            <div className="space-y-6">
              {project.categories.map(category => (
                <InteractiveProgressCategory 
                  key={category.id} 
                  category={category} 
                  onTaskToggle={handleTaskToggle} 
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-soft space-y-6 divide-y">
                <div>
                    <h3 className="text-xl font-bold mb-4">Workshop Tools</h3>
                    <AddTimelineForm project={project} onAddUpdate={handleTimelineAdd} />
                </div>
                <div className="pt-6">
                    <h3 className="text-xl font-bold mb-4">Manage Status</h3>
                    <ProjectStatusUpdater currentStatus={project.status} onStatusChange={handleStatusChange} />
                </div>
                <div className="pt-6">
                   <Button onClick={() => setIsDeleteModalOpen(true)} variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-500">
                      Delete Project
                   </Button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft">
               <Timeline updates={project.timeline} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}