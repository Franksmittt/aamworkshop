import React from 'react';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: number | string;
  colorClass: string;
}

const StatCard = ({ icon: Icon, title, value, colorClass }: StatCardProps) => (
  <div className="bg-gray-800 border border-white/10 p-6 rounded-lg shadow-soft flex items-center">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${colorClass}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

export default StatCard;