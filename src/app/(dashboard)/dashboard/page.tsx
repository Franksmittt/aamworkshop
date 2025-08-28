import { getProjects } from '@/lib/data-service';
import ProjectSummaryCard from '@/components/dashboard/ProjectSummaryCard';
import QuickStats from '@/components/dashboard/QuickStats';
import { calculateOverallProgress } from '@/lib/utils';
// IMPORT OUR NEW COMPONENT
import ActionRequiredFeed from '@/components/dashboard/ActionRequiredFeed';

export default function DashboardPage() {
  const projects = getProjects();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome back, Boss!</h1>
        <p className="text-gray-400">Here’s what needs your attention.</p>
      </div>

      <div className="mb-8">
        <QuickStats projects={projects} />
      </div>

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
        
        {/* THE OLD COMPONENTS ARE REMOVED AND REPLACED WITH OUR NEW FEED */}
        <div className="xl:col-span-1 space-y-8">
            <ActionRequiredFeed projects={projects} />
        </div>
      </div>
    </div>
   );
}