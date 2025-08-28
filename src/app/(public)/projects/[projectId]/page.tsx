'use client';

import { useState, useEffect } from 'react';
import { getProjectById } from '@/lib/data-service';
import { Project, Message } from '@/lib/types';
import ProjectHeader from '@/components/ProjectHeader';
import ProgressCategory from '@/components/ProgressCategory';
import Timeline from '@/components/Timeline';
import MediaGallery from '@/components/MediaGallery';
import { notFound } from 'next/navigation';
import { calculateOverallProgress } from '@/lib/utils';
import MessagingCenter from '@/components/dashboard/MessagingCenter';
// IMPORT THE NEW DECISIONS PANEL
import DecisionsNeededPanel from '@/components/DecisionsNeededPanel';

export default function CustomerProjectPage({ params }: { params: { projectId: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundProject = getProjectById(params.projectId);
    if (foundProject) {
      setProject(JSON.parse(JSON.stringify(foundProject)));
    } else {
      notFound();
    }
    setIsLoading(false);
  }, [params.projectId]);

  const handleSendMessage = (message: Omit<Message, 'id' | 'createdAt'>) => {
    setProject(currentProject => {
      if (!currentProject) return null;
      const newMessage: Message = { ...message, id: `msg-${Date.now()}`, createdAt: new Date().toISOString() };
      return { ...currentProject, messages: [...currentProject.messages, newMessage] };
    });
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
    <div className="pt-20 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProjectHeader project={project} overallProgress={overallProgress} />
        
        {/* DEPLOY THE NEW DECISIONS PANEL */}
        <DecisionsNeededPanel project={project} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8" id="progress">
            <h2 className="text-3xl font-bold text-white">Project Progress</h2>
             <div className="space-y-6">
                {project.categories.map(category => (
                  <ProgressCategory key={category.id} category={category} />
                ))}
             </div>
          </div>
          <div className="lg:col-span-1" id="timeline">
            <h2 className="text-3xl font-bold text-white mb-8">Project Timeline</h2>
            <Timeline updates={project.timeline} />
          </div>
        </div>

        <div className="my-12" id="messages">
            <MessagingCenter project={project} currentUserRole="Client" onSendMessage={handleSendMessage} />
        </div>

        {project.media.length > 0 && (
          <div className="mt-16" id="media">
            <MediaGallery media={project.media} categories={mediaCategories} />
          </div>
        )}
      </div>
    </div>
  );
}