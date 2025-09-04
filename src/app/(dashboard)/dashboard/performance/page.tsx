// [path]: app/(dashboard)/dashboard/performance/page.tsx

'use client';

import { useState, useMemo } from 'react';
import { getProjects, getShifts } from '@/lib/data-service';
import { mockUsers, mockTechnicians } from '@/lib/mock-data';
import { Project, Shift } from '@/lib/types';
import { startOfWeek, startOfMonth, parseISO, differenceInMilliseconds } from 'date-fns';
import PerformanceBarChart from '@/components/dashboard/PerformanceBarChart';
import TechnicianPerformanceCard from '@/components/dashboard/TechnicianPerformanceCard';
import TechnicianDetailModal from '@/components/dashboard/TechnicianDetailModal';

type TimeRange = 'This Week' | 'This Month' | 'All Time';

interface PerformanceStats {
  technicianId: string;
  name: string;
  tasksCompleted: number;
  taskHours: number;
  shiftHours: number;
  utilization: number;
}

const calculateShiftDuration = (shift: Shift): number => {
    if (!shift.clockOutTime) return 0;
    const duration = differenceInMilliseconds(parseISO(shift.clockOutTime), parseISO(shift.clockInTime));
    const breakDuration = shift.breaks.reduce((acc, br) => {
        if (br.endTime) {
            return acc + differenceInMilliseconds(parseISO(br.endTime), parseISO(br.startTime));
        }
        return acc;
    }, 0);
    return (duration - breakDuration) / (1000 * 60 * 60); // convert to hours
};

export default function PerformancePage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('This Week');
  const allProjects: Project[] = useMemo(() => getProjects(), []);
  const allShifts: Shift[] = useMemo(() => getShifts(), []);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState<{id: string; name: string} | null>(null);

  const performanceData: PerformanceStats[] = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    if (timeRange === 'This Week') startDate = startOfWeek(now, { weekStartsOn: 1 });
    else if (timeRange === 'This Month') startDate = startOfMonth(now);
    else startDate = new Date(0);

    const technicianData: Record<string, { tasksCompleted: number; taskHours: number; shiftHours: number; }> = {};
    
    mockTechnicians.forEach(tech => {
        technicianData[tech.userId] = { tasksCompleted: 0, taskHours: 0, shiftHours: 0 };
    });

    allProjects.forEach(project => {
      project.categories.forEach(category => {
        category.subTasks.forEach(task => {
          if (task.status === 'Completed' && task.completedAt && task.assignedTo) {
            const tech = mockTechnicians.find(t => t.id === task.assignedTo);
            if(tech && technicianData[tech.userId] && parseISO(task.completedAt) >= startDate){
                technicianData[tech.userId].tasksCompleted += 1;
                technicianData[tech.userId].taskHours += task.actualHours || 0;
            }
          }
        });
      });
    });
    
    allShifts.forEach(shift => {
        if(technicianData[shift.userId] && parseISO(shift.clockInTime) >= startDate){
            technicianData[shift.userId].shiftHours += calculateShiftDuration(shift);
        }
    });

    return mockTechnicians.map(tech => {
        const data = technicianData[tech.userId];
        const user = mockUsers.find(u => u.id === tech.userId);
        const utilization = data.shiftHours > 0 ? (data.taskHours / data.shiftHours) * 100 : 0;
        return {
            technicianId: tech.userId,
            name: user?.name || tech.name,
            tasksCompleted: data.tasksCompleted,
            taskHours: data.taskHours,
            shiftHours: data.shiftHours,
            utilization: Math.min(utilization, 100),
        };
    });
  }, [allProjects, allShifts, timeRange]);

  const chartData = performanceData.map(tech => ({
      name: tech.name,
      taskHours: parseFloat(tech.taskHours.toFixed(2)),
      shiftHours: parseFloat(tech.shiftHours.toFixed(2)),
  }));

  const timeRangeFilters: TimeRange[] = ['This Week', 'This Month', 'All Time'];

  const handleCardClick = (technician: PerformanceStats) => {
    setSelectedTechnician({ id: technician.technicianId, name: technician.name });
    setIsModalOpen(true);
  };

  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Technician Performance</h1>
            <p className="text-gray-400">Productivity overview for the workshop team. Click a card for details.</p>
          </div>
          <div className="flex items-center space-x-2 bg-gray-800 border border-white/10 rounded-lg p-1 mt-4 sm:mt-0">
            {timeRangeFilters.map(filter => (
              <button
                key={filter}
                onClick={() => setTimeRange(filter)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  timeRange === filter ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {performanceData.map(techStats => (
            <TechnicianPerformanceCard 
              key={techStats.technicianId}
              technicianStats={techStats}
              onClick={() => handleCardClick(techStats)}
            />
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Shift Hours vs. Task Hours</h2>
          <PerformanceBarChart data={chartData} />
        </div>
      </div>

      <TechnicianDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        technician={selectedTechnician}
        projects={allProjects}
        timeRange={timeRange}
      />
    </>
  );
}