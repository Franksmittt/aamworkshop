import { Car, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Project } from '@/lib/types';
import StatCard from './StatCard'; // Import the new reusable component

interface QuickStatsProps {
  projects: Project[];
}

const QuickStats = ({ projects }: QuickStatsProps) => {
  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const onHoldProjects = projects.filter(p => p.status === 'On Hold').length;
  
  // Dummy data for other stats
  const completedThisMonth = 1;
  const upcomingDeliveries = 2;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={Car} title="Active Projects" value={activeProjects} colorClass="bg-red-600" />
      <StatCard icon={CheckCircle} title="Completed This Month" value={completedThisMonth} colorClass="bg-green-600" />
      <StatCard icon={Clock} title="Upcoming Deliveries" value={upcomingDeliveries} colorClass="bg-blue-600" />
      <StatCard icon={AlertTriangle} title="Projects On Hold" value={onHoldProjects} colorClass="bg-yellow-600" />
    </div>
  );
};

export default QuickStats;