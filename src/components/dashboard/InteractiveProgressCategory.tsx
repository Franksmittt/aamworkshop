'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Circle } from 'lucide-react';
import { Category } from '@/lib/types';
import ProgressBar from '../ui/ProgressBar';

interface InteractiveProgressCategoryProps {
  category: Category;
  onTaskToggle: (taskId: string, categoryId: string) => void;
}

const InteractiveProgressCategory = ({ category, onTaskToggle }: InteractiveProgressCategoryProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const completedTasks = category.subTasks.filter(task => task.completed).length;
  const totalTasks = category.subTasks.length;
  const categoryProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-white shadow-soft overflow-hidden border border-gray-200 rounded-lg">
      <header
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
      >
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
            <span className="text-sm font-medium text-gray-600">{`${completedTasks}/${totalTasks} tasks`}</span>
          </div>
          <ProgressBar progress={categoryProgress} />
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4"
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
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
            <ul className="space-y-1 pt-4 border-t border-gray-200">
              {category.subTasks.map(task => (
                <li 
                  key={task.id} 
                  onClick={() => onTaskToggle(task.id, category.id)}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300 mr-3 flex-shrink-0" />
                  )}
                  <span className={`text-gray-700 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.name}
                  </span>
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