import { Car, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Project } from '@/lib/types';
import React from 'react';

interface QuickStatsProps {
  projects: Project[];
}

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: number | string;
  colorClass: string;
}

const StatCard = ({ icon: Icon, title, value, colorClass }: StatCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-soft flex items-center">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${colorClass}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const QuickStats = ({ projects }: QuickStatsProps) => {
  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const onHoldProjects = projects.filter(p => p.status === 'On Hold').length;
  
  // Dummy data for other stats
  const completedThisMonth = 1;
  const upcomingDeliveries = 2;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={Car} title="Active Projects" value={activeProjects} colorClass="bg-blue-500" />
      <StatCard icon={CheckCircle} title="Completed This Month" value={completedThisMonth} colorClass="bg-green-500" />
      <StatCard icon={Clock} title="Upcoming Deliveries" value={upcomingDeliveries} colorClass="bg-purple-500" />
      <StatCard icon={AlertTriangle} title="Projects On Hold" value={onHoldProjects} colorClass="bg-yellow-500" />
    </div>
  );
};

export default QuickStats;