'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getProjectById, updateProject, deleteProject } from '@/lib/data-service';
import { mockTechnicians } from '@/lib/mock-data';
import { Project, Category, SubTask, TimelineUpdate, Technician, Message } from '@/lib/types';
import ProjectHeader from '@/components/ProjectHeader';
import InteractiveProgressCategory from '@/components/dashboard/InteractiveProgressCategory';
import AddTimelineForm from '@/components/dashboard/AddTimelineForm';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import EditProjectModal from '@/components/dashboard/EditProjectModal';
import Button from '@/components/ui/Button';
import ProjectStatusUpdater from '@/components/dashboard/ProjectStatusUpdater';
import Timeline from '@/components/Timeline';
import { calculateOverallProgress } from '@/lib/utils';
import MessagingCenter from '@/components/dashboard/MessagingCenter';
import FinancialsPanel from '@/components/dashboard/FinancialsPanel';

export default function WorkshopProjectPage({ params }: { params: { projectId: string } }) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  
  useEffect(() => {
    const foundProject = getProjectById(params.projectId);
    setProject(foundProject || null);
    setTechnicians(mockTechnicians);
    setIsLoading(false);
  }, [params.projectId]);

  const saveProject = useCallback((updatedProject: Project) => {
    setProject(updatedProject);
    updateProject(updatedProject.id, updatedProject);
  }, []);

  const handleTaskToggle = (taskId: string, categoryId: string) => {
    if (!project) return;
    const newProject = JSON.parse(JSON.stringify(project)) as Project;
    const category = newProject.categories.find(c => c.id === categoryId);
    if (category) {
      const task = category.subTasks.find(t => t.id === taskId);
      if (task) task.completed = !task.completed;
    }
    saveProject(newProject);
  };

  const handleToggleApproval = (taskId: string, categoryId: string) => {
    if (!project) return;
    const newProject = JSON.parse(JSON.stringify(project)) as Project;
    const category = newProject.categories.find(c => c.id === categoryId);
    if (category) {
      const task = category.subTasks.find(t => t.id === taskId);
      if (task) task.requiresClientApproval = !task.requiresClientApproval;
    }
    saveProject(newProject);
  };

  const handleTaskAssign = (taskId: string, categoryId: string, techId: string) => {
    if (!project) return;
    const newProject = JSON.parse(JSON.stringify(project)) as Project;
    const category = newProject.categories.find(c => c.id === categoryId);
    if (category) {
      const task = category.subTasks.find(t => t.id === taskId);
      if (task) task.assignedTo = techId || undefined;
    }
    saveProject(newProject);
  };

  const handleSendMessage = (message: Omit<Message, 'id' | 'createdAt'>) => {
    if (!project) return;
    const newMessage: Message = { ...message, id: `msg-${Date.now()}`, createdAt: new Date().toISOString() };
    const newProject = { ...project, messages: [...project.messages, newMessage] };
    saveProject(newProject);
  };

  const handleTimelineAdd = (newUpdate: Omit<TimelineUpdate, 'id' | 'date'>) => {
    if (!project) return;
    const newEntry: TimelineUpdate = { ...newUpdate, id: `t-${Date.now()}`, date: new Date().toISOString().split('T')[0] };
    const newProject = { ...project, timeline: [newEntry, ...project.timeline] };
    saveProject(newProject);
  };

  const handleStatusChange = (newStatus: Project['status'], holdReason: Project['holdReason']) => {
    if (!project) return;
    const reasonText = newStatus === 'On Hold' ? `Project on hold. Reason: ${holdReason}.` : `Project status changed to ${newStatus}.`;
    const newEntry: TimelineUpdate = { id: `t-status-${Date.now()}`, date: new Date().toISOString().split('T')[0], update: reasonText, category: 'Project Status' };
    const newProject = { ...project, status: newStatus, holdReason: holdReason, timeline: [newEntry, ...project.timeline] };
    saveProject(newProject);
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    if (!project) return;
    const newProject = JSON.parse(JSON.stringify(project)) as Project;
    const invoice = newProject.financials.invoices.find(inv => inv.id === invoiceId);
    if (invoice && invoice.status !== 'Paid') {
        invoice.status = 'Paid';
        newProject.financials.totalPaid += invoice.amount;
        if (newProject.status === 'On Hold' && newProject.holdReason === 'Awaiting Payment') {
            newProject.status = 'Active';
            newProject.holdReason = '';
            const timelineUpdate: TimelineUpdate = { id: `t-payment-${Date.now()}`, date: new Date().toISOString().split('T')[0], update: `Payment for '${invoice.description}' received. Work is resuming.`, category: 'Financial' };
            newProject.timeline.unshift(timelineUpdate);
        }
    }
    saveProject(newProject);
  };

  const handleSaveEdits = (updatedData: Partial<Project>) => {
    if (!project) return;
    const newProject = { ...project, ...updatedData };
    saveProject(newProject);
  };

  const handleDelete = () => {
    if (project) {
        deleteProject(project.id);
        router.push('/dashboard/projects');
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-full"><p className="text-gray-400">Loading Project...</p></div>;
  if (!project) return <div className="flex items-center justify-center h-full"><h1 className="text-2xl font-bold text-red-500">Project Not Found</h1></div>;

  const overallProgress = calculateOverallProgress(project);
  
  return (
    <>
      <EditProjectModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveEdits} project={project} />
      <ConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} title="Delete Project" message={`Are you sure you want to permanently delete the ${project.car.year} ${project.car.make} ${project.car.model} project? This action cannot be undone.`} />

      <div>
        <ProjectHeader project={project} overallProgress={overallProgress} onEdit={() => setIsEditModalOpen(true)} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div id="financials" className="scroll-mt-24"><FinancialsPanel project={project} onMarkAsPaid={handleMarkAsPaid} /></div>
            <div id="messages" className="scroll-mt-24"><MessagingCenter project={project} currentUserRole="Boss" onSendMessage={handleSendMessage} /></div>
            <div id="progress" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-white">Manage Progress</h2>
              <div className="space-y-6">
                {project.categories.map(category => (
                   <InteractiveProgressCategory 
                    key={category.id} 
                    category={category}
                    technicians={technicians}
                    onTaskToggle={handleTaskToggle} 
                    onTaskAssign={handleTaskAssign}
                    onToggleApproval={handleToggleApproval}
                   />
                ))}
              </div>
            </div>
           </div>
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-800 border border-white/10 p-6 rounded-lg shadow-soft space-y-6 divide-y divide-gray-700">
              <div><h3 className="text-xl font-bold mb-4 text-white">Workshop Tools</h3><AddTimelineForm project={project} onAddUpdate={handleTimelineAdd} /></div>
              <div className="pt-6"><h3 className="text-xl font-bold mb-4 text-white">Manage Status</h3><ProjectStatusUpdater currentStatus={project.status} onStatusChange={handleStatusChange} /></div>
              <div className="pt-6"><Button onClick={() => setIsDeleteModalOpen(true)} variant="outline" className="w-full">Delete Project</Button></div>
            </div>
            <div className="bg-gray-800 border border-white/10 p-6 rounded-lg shadow-soft">
               <h2 className="text-xl font-bold text-white mb-4">Project Timeline</h2>
               <Timeline updates={project.timeline} />
            </div>
          </div>
         </div>
      </div>
    </>
  );
}