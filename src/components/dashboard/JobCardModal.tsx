// [path]: components/dashboard/JobCardModal.tsx

'use client';

import { AssignedTask } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wrench, MessageSquare, Timer, Square, Play } from 'lucide-react';
import Button from '../ui/Button';
import { useState, useEffect } from 'react';

interface JobCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: AssignedTask | null;
  // --- NEW: Props for timer functionality ---
  activeTimerTaskId: string | null;
  timerStartTime: number | null;
  onStartTimer: (task: AssignedTask) => void;
  onStopTimer: () => void;
}

const JobCardModal = ({ isOpen, onClose, task, activeTimerTaskId, timerStartTime, onStartTimer, onStopTimer }: JobCardModalProps) => {
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  const isTimerActiveForThisTask = task ? activeTimerTaskId === task.id : false;

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isTimerActiveForThisTask && timerStartTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const diff = now - timerStartTime;
        const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        setElapsedTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);
    } else {
        setElapsedTime('00:00:00');
    }
    return () => clearInterval(interval);
  }, [isTimerActiveForThisTask, timerStartTime]);


  if (!task) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-gray-800 border border-white/10 w-full max-w-2xl rounded-lg shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 bg-gray-900/50 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white">{task.name}</h2>
                <p className="text-sm text-red-400">{task.projectName} - ({task.categoryName})</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="h-6 w-6" /></button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              {/* --- MODIFIED: Time Tracking UI is now dynamic --- */}
              <div className="bg-gray-900/50 p-4 rounded-lg">
                 <h3 className="font-semibold text-lg text-white mb-4 flex items-center"><Timer className="mr-3 h-5 w-5 text-green-400"/>Time Tracking</h3>
                 <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-400">Estimated Hours: <span className="font-bold text-white">{task.estimateHours || 'N/A'}</span></p>
                        <p className="text-sm text-gray-400">Actual Hours Logged: <span className="font-bold text-white">{task.actualHours?.toFixed(2) || '0.00'}</span></p>
                    </div>
                    {isTimerActiveForThisTask ? (
                        <div className="text-center">
                            <p className="text-2xl font-mono font-bold text-green-400">{elapsedTime}</p>
                            <Button onClick={onStopTimer} variant="secondary" size="sm" className="bg-red-900/80 text-red-300 w-full mt-2">
                                <Square className="w-4 h-4 mr-2"/>Stop Timer
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={() => onStartTimer(task)} variant="primary" size="sm" disabled={!!activeTimerTaskId}>
                           <Play className="w-4 h-4 mr-2"/>Start Timer
                        </Button>
                    )}
                 </div>
              </div>

              {task.parts && task.parts.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg text-white mb-2 flex items-center"><Wrench className="mr-3 h-5 w-5 text-blue-400"/>Parts Required</h3>
                  <ul className="space-y-2 bg-gray-900/50 p-4 rounded-lg">
                    {task.parts.map(part => (
                      <li key={part.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">{part.name} (x{part.qty})</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${part.status === 'Received' ? 'bg-green-800 text-green-300' : 'bg-yellow-800 text-yellow-300'}`}>{part.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {task.internalNotes && task.internalNotes.length > 0 && (
                 <div>
                    <h3 className="font-semibold text-lg text-white mb-2 flex items-center"><MessageSquare className="mr-3 h-5 w-5 text-yellow-400"/>Manager&apos;s Notes</h3>
                     <div className="bg-gray-900/50 p-4 rounded-lg text-sm text-gray-300 space-y-2">
                        {task.internalNotes.map(note => (<p key={note.id}>- {note.note}</p>))}
                     </div>
                 </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobCardModal;