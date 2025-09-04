// [path]: app/(public)/projects/[projectId]/page.tsx

'use client';

import { useState, useEffect, use, useMemo } from 'react';
import { getProjectById, updateTaskStatus, declineTaskApproval } from '@/lib/data-service';
import { Project, Message, SubTask } from '@/lib/types';
import ProjectHeader from '@/components/ProjectHeader';
import ProgressCategory from '@/components/ProgressCategory';
import Timeline from '@/components/Timeline';
import MediaGallery from '@/components/MediaGallery';
import { notFound } from 'next/navigation';
import { calculateOverallProgress } from '@/lib/utils';
import MessagingCenter from '@/components/dashboard/MessagingCenter';
import ApprovalCenter from '@/components/ApprovalCenter';
import ClientFinancialsSummary from '@/components/ClientFinancialsSummary';
import ClientTaskDetailModal from '@/components/ClientTaskDetailModal';
import HighlightReel from '@/components/HighlightReel';

export default function CustomerProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SubTask | null>(null);

  useEffect(() => {
    const foundProject = getProjectById(resolvedParams.projectId);
    if (foundProject) {
      setProject(foundProject);
    } else {
      notFound();
    }
    setIsLoading(false);
  }, [resolvedParams.projectId]);
  
  const featuredMedia = useMemo(() => {
    if (!project) return null;
    return project.media.find(m => m.isFeatured) || null;
  }, [project]);

  const handleSendMessage = (message: Omit<Message, 'id' | 'createdAt' | 'authorRole'>) => {
    setProject(currentProject => {
      if (!currentProject) return null;
      const newMessage: Message = { 
        ...message, 
        id: `msg-${Date.now()}`, 
        createdAt: new Date().toISOString(),
        authorRole: 'Client'
      };
      return { ...currentProject, messages: [...currentProject.messages, newMessage] };
    });
  };

  const handleApproveTask = (taskId: string, categoryId: string) => {
    if (!project) return;
    const updatedProject = updateTaskStatus(project.id, categoryId, taskId, 'Completed');
    if (updatedProject) {
      setProject(JSON.parse(JSON.stringify(updatedProject)));
    }
  };

  const handleDeclineTask = (taskId: string, categoryId: string) => {
    if (!project) return;
    const updatedProject = declineTaskApproval(project.id, categoryId, taskId);
    if (updatedProject) {
      setProject(JSON.parse(JSON.stringify(updatedProject)));
    }
  };
  
  const handleTaskClick = (task: SubTask) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-gray-400">Loading Project Details...</p>
      </div>
    );
  }

  if (!project) return notFound();

  const overallProgress = calculateOverallProgress(project);
  const mediaCategories = [...new Set(project.media.map(item => item.category))];

  return (
    <>
      <ClientTaskDetailModal 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        task={selectedTask}
      />
      <div className="pt-20 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ProjectHeader project={project} overallProgress={overallProgress} />
          
          <HighlightReel featuredMedia={featuredMedia} />

          <div id="financials" className="scroll-mt-24">
            <ClientFinancialsSummary project={project} />
          </div>
          
          <ApprovalCenter 
            project={project} 
            onApproveTask={handleApproveTask} 
            onDeclineTask={handleDeclineTask}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            <div className="lg:col-span-2 space-y-8 scroll-mt-24" id="progress">
              <h2 className="text-3xl font-bold text-white">Project Progress</h2>
               <div className="space-y-6">
                  {project.categories.map(category => (
                   <ProgressCategory key={category.id} category={category} onTaskClick={handleTaskClick} />
                  ))}
               </div>
            </div>
            <div className="lg:col-span-1 scroll-mt-24" id="timeline">
               <h2 className="text-3xl font-bold text-white mb-8">Project Timeline</h2>
               <Timeline updates={project.timeline} />
            </div>
           </div>

          <div className="my-12 scroll-mt-24" id="messages">
              <MessagingCenter project={project} currentUserRole="Client" onSendMessage={handleSendMessage} />
          </div>

          {project.media.length > 0 && (
            <div className="mt-16 scroll-mt-24" id="media">
              <MediaGallery media={project.media} categories={mediaCategories} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}