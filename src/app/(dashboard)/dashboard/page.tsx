// [path]: app/(dashboard)/dashboard/page.tsx

'use client';

import { getProjects } from '@/lib/data-service';
import ProjectSummaryCard from '@/components/dashboard/ProjectSummaryCard';
import QuickStats from '@/components/dashboard/QuickStats';
import { calculateOverallProgress } from '@/lib/utils';
import ActionRequiredFeed from '@/components/dashboard/ActionRequiredFeed';
import ExceptionTiles from '@/components/dashboard/ExceptionTiles';
// --- NEW: Import useState and the new modal component ---
import { useState } from 'react';
import StatDetailModal from '@/components/dashboard/StatDetailModal';
import { Project } from '@/lib/types';

export default function DashboardPage() {
  const projects = getProjects();

  // --- NEW: State to control the modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalProjects, setModalProjects] = useState<Project[]>([]);

  // --- NEW: Handler to open the modal with the correct data ---
  const handleStatCardClick = (title: string, filteredProjects: Project[]) => {
    setModalTitle(title);
    setModalProjects(filteredProjects);
    setIsModalOpen(true);
  };

  return (
    <>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome back, Boss!</h1>
          <p className="text-gray-400">Here’s what needs your attention.</p>
        </div>

        <div className="mb-8">
          {/* --- NEW: Pass the handler to QuickStats --- */}
          <QuickStats projects={projects} onCardClick={handleStatCardClick} />
        </div>
        
        {/* Pass the handler to ExceptionTiles as well to make them clickable */}
        <ExceptionTiles projects={projects} onTileClick={handleStatCardClick} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Active Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.filter(p => p.status === 'Active' || p.status === 'On Hold').map(project => {
                const progress = calculateOverallProgress(project);
                return <ProjectSummaryCard key={project.id} project={project} progress={progress} />;
              })}
            </div>
          </div>
          
          <div className="xl:col-span-1 space-y-8">
              <ActionRequiredFeed projects={projects} />
          </div>
        </div>
      </div>

      {/* --- NEW: Render the modal component --- */}
      <StatDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        projects={modalProjects}
      />
    </>
   );
}