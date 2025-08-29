// [path]: components/dashboard/InteractiveProgressCategory.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Circle, HelpCircle, Clock, Construction, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Category, Technician, SubTask } from '@/lib/types';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';

interface InteractiveProgressCategoryProps {
  category: Category;
  technicians: Technician[];
  onTaskToggle: (taskId: string, categoryId: string) => void;
  onTaskAssign: (taskId:string, categoryId: string, techId: string) => void;
  onToggleApproval: (taskId: string, categoryId: string) => void;
  onQaStatusChange: (categoryId: string, qaPassed: boolean) => void;
}

const InteractiveProgressCategory = ({ category, technicians, onTaskToggle, onTaskAssign, onToggleApproval, onQaStatusChange }: InteractiveProgressCategoryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const completedTasks = category.subTasks.filter(task => task.status === 'Completed').length;
  const totalTasks = category.subTasks.length;
  const categoryProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const isReadyForQa = category.requiresQa && completedTasks === totalTasks;

  const getStatusIcon = (status: SubTask['status']) => {
    switch(status) {
        case 'Completed': return <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />;
        case 'Awaiting Approval': return <Clock className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />;
        case 'In Progress': return <Construction className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />;
        default: return <Circle className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />;
    }
  };

  return (
    <div className="bg-gray-800 border border-white/10 shadow-soft overflow-hidden rounded-lg">
      <header
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/50"
      >
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white flex items-center">
              {category.name}
              {/* --- THIS SECTION IS CORRECTED --- */}
              {/* The icon is now wrapped in a span that holds the title attribute */}
              {category.requiresQa && (
                <span title="This category requires QA">
                  <ShieldCheck className="h-4 w-4 text-green-400 ml-2" />
                </span>
              )}
            </h3>
            <span className="text-sm font-medium text-gray-400">{`${completedTasks}/${totalTasks} tasks`}</span>
          </div>
          <ProgressBar progress={categoryProgress} />
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4"
        >
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </motion.div>
      </header>
      
      <AnimatePresence>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="px-4 pb-4"
          >
            {isReadyForQa ? (
              <div className="text-center p-4 my-2 border-2 border-dashed border-green-500/50 bg-green-900/30 rounded-lg">
                <ShieldCheck className="h-10 w-10 text-green-400 mx-auto mb-2" />
                <h4 className="font-bold text-white">QA Review Pending</h4>
                <p className="text-sm text-gray-400 mb-4">All tasks are complete. Please review the work.</p>
                <div className="flex justify-center space-x-2">
                  <Button size="sm" variant="outline" onClick={() => onQaStatusChange(category.id, false)}>
                    <ShieldAlert className="w-4 h-4 mr-2" />
                    Fail QA & Reset Tasks
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => onQaStatusChange(category.id, true)}>
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Pass QA
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="space-y-1 pt-4 border-t border-gray-700">
                {category.subTasks.map(task => (
                  <li 
                    key={task.id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 rounded-md hover:bg-gray-700/50"
                  >
                    <div 
                      onClick={() => onTaskToggle(task.id, category.id)}
                      className="flex items-center cursor-pointer mb-2 sm:mb-0 flex-grow"
                    >
                      {getStatusIcon(task.status)}
                      <span className={`text-gray-300 ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
                        {task.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center self-end sm:self-center ml-4 sm:ml-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onToggleApproval(task.id, category.id); }}
                          className={`p-1 rounded-full transition-colors mr-2 ${task.requiresClientApproval ? 'bg-blue-900/80 text-blue-300' : 'text-gray-500 hover:bg-gray-700'}`}
                          title="Request Client Approval"
                        >
                          <HelpCircle className="h-4 w-4" />
                        </button>

                        <select
                          value={task.assignedTo || ''}
                          onChange={(e) => onTaskAssign(task.id, category.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                        >
                            <option value="">Unassigned</option>
                            {technicians.map(tech => (
                                <option key={tech.id} value={tech.id}>{tech.name}</option>
                            ))}
                        </select>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveProgressCategory;