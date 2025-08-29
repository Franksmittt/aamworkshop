// [path]: app/(dashboard)/dashboard/my-tasks/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { getProjects, logTaskTime } from '@/lib/data-service';
import { mockTechnicians } from '@/lib/mock-data';
import { AssignedTask, SubTask } from '@/lib/types'; 
import Link from 'next/link';
import { CheckCircle2, Circle, Clock, AlertOctagon, Flame } from 'lucide-react';
import { useAuth } from '@/app/AuthContext';
import JobCardModal from '@/components/dashboard/JobCardModal';

export default function TechnicianTasksPage() {
  const { user, isLoading } = useAuth();
  const [myTasks, setMyTasks] = useState<AssignedTask[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<AssignedTask | null>(null);

  const [activeTimerTaskId, setActiveTimerTaskId] = useState<string | null>(null);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);

  const fetchTasks = () => {
    if (!isLoading && user && user.role === 'Technician') {
        const allProjects = getProjects();
        const assignedTasks: AssignedTask[] = [];
        const currentTechnician = mockTechnicians.find(tech => tech.name === user.name);
        if (!currentTechnician) return;

        allProjects.forEach(project => {
            if (project.status === 'Active' || project.status === 'On Hold') {
                project.categories.forEach(category => {
                    category.subTasks.forEach(task => {
                        if (task.assignedTo === currentTechnician.id) {
                            assignedTasks.push({ ...task, projectId: project.id, projectName: `${project.car.year} ${project.car.make} ${project.car.model}`, categoryName: category.name });
                        }
                    });
                });
            }
        });

        const priorityOrder: Record<SubTask['priority'], number> = { 'Urgent': 1, 'High': 2, 'Normal': 3, 'Low': 4 };
        const statusOrder = { 'In Progress': 1, 'Pending': 2, 'Awaiting Approval': 3, 'Completed': 4 };
        assignedTasks.sort((a, b) => {
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) { return priorityOrder[a.priority] - priorityOrder[b.priority]; }
            return statusOrder[a.status] - statusOrder[b.status];
        });
        setMyTasks(assignedTasks);
    }
  };

  useEffect(fetchTasks, [user, isLoading]);

  const handleStartTimer = (task: AssignedTask) => {
    if (activeTimerTaskId) {
        alert("Another timer is already running. Please stop it before starting a new one.");
        return;
    }
    setActiveTimerTaskId(task.id);
    setTimerStartTime(Date.now());
  };

  const handleStopTimer = () => {
    if (!activeTimerTaskId || !timerStartTime) return;
    const endTime = Date.now();
    const elapsedMilliseconds = endTime - timerStartTime;
    const elapsedHours = elapsedMilliseconds / (1000 * 60 * 60);
    const taskToUpdate = myTasks.find(t => t.id === activeTimerTaskId);
    if (taskToUpdate) {
        logTaskTime(taskToUpdate.projectId, taskToUpdate.categoryName, taskToUpdate.id, elapsedHours);
        fetchTasks();
    }
    setActiveTimerTaskId(null);
    setTimerStartTime(null);
  };

  const handleTaskClick = (task: AssignedTask) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const getStatusIndicator = (status: SubTask['status']) => {
    switch(status) {
        case 'Completed': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
        case 'Awaiting Approval': return <Clock className="h-5 w-5 text-yellow-500" />;
        default: return <Circle className="h-5 w-5 text-gray-600" />;
    }
  }

  const getPriorityStyles = (priority: SubTask['priority']): { indicator: string; tag: string; icon: React.ReactNode } => {
    switch(priority) {
        case 'Urgent': return { indicator: 'border-l-4 border-red-500', tag: 'bg-red-900/80 text-red-300', icon: <Flame className="h-3 w-3 mr-1.5" /> };
        case 'High': return { indicator: 'border-l-4 border-yellow-500', tag: 'bg-yellow-900/80 text-yellow-300', icon: <AlertOctagon className="h-3 w-3 mr-1.5" /> };
        default: return { indicator: 'border-l-4 border-transparent', tag: '', icon: null };
    }
  };

  if (isLoading) return <p className="text-gray-400">Loading tasks...</p>
  if (!user) return <p className="text-red-500">Error: Not logged in.</p>

  return (
    <>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">My Prioritized Tasks</h1>
          <p className="text-gray-400">Viewing tasks for {user.name}, most urgent first. Click a task for details.</p>
        </div>

        <div className="space-y-4">
          {myTasks.length > 0 ? myTasks.map(task => {
              const priorityStyles = getPriorityStyles(task.priority);
              return (
                  <div key={task.id} onClick={() => handleTaskClick(task)} className={`bg-gray-800 border border-white/10 p-4 rounded-lg flex items-center justify-between transition-all hover:border-red-500/50 hover:bg-gray-700/50 cursor-pointer ${priorityStyles.indicator}`}>
                      <div className="flex items-center">
                          <div className="mr-4">{getStatusIndicator(task.status)}</div>
                          <div>
                              <p className={`font-semibold text-lg ${task.status === 'Completed' ? 'text-gray-500 line-through' : 'text-white'}`}>{task.name}</p>
                              {/* --- CORRECTED: Link now points to the correct manager dashboard URL --- */}
                              <Link href={`/dashboard/projects/${task.projectId}`} onClick={(e) => e.stopPropagation()} className="text-sm text-red-500 hover:underline">
                                  {task.projectName} ({task.categoryName})
                              </Link>
                          </div>
                      </div>
                      <div className="text-right flex items-center space-x-4">
                          {task.priority !== 'Normal' && task.priority !== 'Low' && (
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center ${priorityStyles.tag}`}>
                                {priorityStyles.icon} {task.priority}
                            </span>
                          )}
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${task.status === 'Completed' ? 'bg-gray-700 text-gray-400' : task.status === 'Awaiting Approval' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-blue-900/50 text-blue-300'}`}>
                              {task.status}
                          </span>
                      </div>
                  </div>
              );
          }) : (
              <div className="text-center py-16 bg-gray-800 rounded-lg"><p className="text-gray-500">You have no tasks assigned.</p></div>
          )}
        </div>
      </div>
      <JobCardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        task={selectedTask}
        activeTimerTaskId={activeTimerTaskId}
        timerStartTime={timerStartTime}
        onStartTimer={handleStartTimer}
        onStopTimer={handleStopTimer}
      />
    </>
  );
}