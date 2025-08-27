'use client';

import { useState, useEffect, useMemo } from 'react';
import { getProjects } from '@/lib/data-service';
import { Project } from '@/lib/types';
import QuickStats from '@/components/dashboard/QuickStats';
import ProjectSummaryCard from '@/components/dashboard/ProjectSummaryCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import PhotoHighlights from '@/components/dashboard/PhotoHighlights';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const calculateOverallProgress = (project: Project): number => {
  if (!project.categories || project.categories.length === 0) return 0;
  const totalProgress = project.categories.reduce((acc, category) => {
    const completedTasks = category.subTasks.filter(t => t.completed).length;
    const categoryProgress = category.subTasks.length > 0 ? (completedTasks / category.subTasks.length) : 0;
    return acc + (categoryProgress * category.weight);
  }, 0);
  const totalWeight = project.categories.reduce((acc, category) => acc + category.weight, 0);
  return totalWeight > 0 ? totalProgress / totalWeight * 100 : 0;
};

// The page now accepts the onMenuClick prop from the layout
export default function DashboardPage({ onMenuClick }: { onMenuClick: () => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [timeFilter, setTimeFilter] = useState('All Time');

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const filteredProjects = useMemo(() => {
    const now = new Date('2025-08-27T12:00:00Z');
    
    if (timeFilter === 'All Time') return projects;

    return projects.filter(project => {
      const projectDate = new Date(project.createdAt);
      if (timeFilter === 'Today') {
        return projectDate.toDateString() === now.toDateString();
      }
      if (timeFilter === 'This Week') {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return projectDate >= oneWeekAgo;
      }
      if (timeFilter === 'This Month') {
        return projectDate.getMonth() === now.getMonth() && projectDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  }, [projects, timeFilter]);

  if (projects.length === 0) {
    return (
      <>
        <DashboardHeader onMenuClick={onMenuClick} />
        <div className="p-8">Loading...</div>
      </>
    )
  }

  return (
    <>
      <DashboardHeader onMenuClick={onMenuClick} activeFilter={timeFilter} onFilterChange={setTimeFilter} />
      <div className="p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome back, Boss!</h1>
          <p className="text-gray-400">Here&apos;s a snapshot of your workshop.</p>
        </div>

        <div className="mb-8">
          <QuickStats projects={filteredProjects} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Active Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.filter(p => p.status === 'Active' || p.status === 'On Hold').map(project => {
                const progress = calculateOverallProgress(project);
                return <ProjectSummaryCard key={project.id} project={project} progress={progress} />;
              })}
            </div>
          </div>
          <div className="xl:col-span-1 space-y-8">
            <AlertsPanel />
            <PhotoHighlights />
            <ActivityFeed projects={filteredProjects} />
          </div>
        </div>
      </div>
    </>
  );
}