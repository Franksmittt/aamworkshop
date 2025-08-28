'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// NEW: Import the HelpCircle icon for our new button
import { ChevronDown, CheckCircle2, Circle, HelpCircle } from 'lucide-react';
import { Category, Technician } from '@/lib/types';
import ProgressBar from '../ui/ProgressBar';

interface InteractiveProgressCategoryProps {
  category: Category;
  technicians: Technician[];
  onTaskToggle: (taskId: string, categoryId: string) => void;
  onTaskAssign: (taskId:string, categoryId: string, techId: string) => void;
  // NEW: Callback for toggling the approval flag
  onToggleApproval: (taskId: string, categoryId: string) => void;
}

const InteractiveProgressCategory = ({ category, technicians, onTaskToggle, onTaskAssign, onToggleApproval }: InteractiveProgressCategoryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const completedTasks = category.subTasks.filter(task => task.completed).length;
  const totalTasks = category.subTasks.length;
  const categoryProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-gray-800 border border-white/10 shadow-soft overflow-hidden rounded-lg">
      <header
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/50"
      >
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
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
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                    )}
                    <span className={`text-gray-300 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center self-end sm:self-center ml-4 sm:ml-2">
                      {/* NEW: Button to flag a task for client approval */}
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
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveProgressCategory;