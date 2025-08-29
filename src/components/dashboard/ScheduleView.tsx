// [path]: components/dashboard/ScheduleView.tsx

'use client';

import { Project } from '@/lib/types';
import { mockTechnicians } from '@/lib/mock-data';
import { useMemo } from 'react';
import { differenceInDays, format, addDays } from 'date-fns';

const ScheduleView = ({ allProjects }: { allProjects: Project[] }) => {
    // --- CORRECTED: Wrapped date calculations in useMemo to prevent re-renders ---
    const { scheduleStartDate, scheduleEndDate, totalDays } = useMemo(() => {
        const startDate = new Date('2025-08-18');
        const endDate = addDays(startDate, 30);
        const days = differenceInDays(endDate, startDate);
        return { scheduleStartDate: startDate, scheduleEndDate: endDate, totalDays: days };
    }, []);

    const tasksWithDates = useMemo(() => {
        return allProjects.flatMap(p => 
            p.categories.flatMap(c => 
                c.subTasks
                    .filter(t => t.startDate && t.dueDate && t.assignedTo)
                    .map(t => ({
                        ...t,
                        project: p,
                        startOffset: differenceInDays(new Date(t.startDate!), scheduleStartDate),
                        duration: differenceInDays(new Date(t.dueDate!), new Date(t.startDate!)) + 1,
                    }))
            )
        );
    }, [allProjects, scheduleStartDate]);

    return (
        <div className="bg-gray-800 border border-white/10 rounded-lg p-4 overflow-x-auto">
            <div className="grid gap-2 min-w-[1200px]" style={{ gridTemplateColumns: `150px repeat(${totalDays}, minmax(40px, 1fr))` }}>
                {/* Header Row: Dates */}
                <div className="sticky left-0 bg-gray-900/50 p-2 rounded text-xs font-bold text-white z-10">Technician</div>
                {Array.from({ length: totalDays }).map((_, i) => (
                    <div key={i} className="text-center text-xs text-gray-400 border-l border-gray-700 pt-2">
                        <p>{format(addDays(scheduleStartDate, i), 'dd')}</p>
                        <p className="font-bold">{format(addDays(scheduleStartDate, i), 'EEE')}</p>
                    </div>
                ))}

                {/* Technician Rows */}
                {mockTechnicians.map(tech => (
                    <div key={tech.id} className="contents">
                        <div className="sticky left-0 bg-gray-900/50 p-2 rounded text-sm font-semibold text-white z-10 flex items-center">{tech.name}</div>
                        {Array.from({ length: totalDays }).map((_, i) => (
                            <div key={i} className="border-l border-t border-gray-700 h-12"></div>
                        ))}
                    </div>
                ))}

                {/* Task Bars Overlay */}
                {tasksWithDates.map(task => {
                    const techIndex = mockTechnicians.findIndex(t => t.id === task.assignedTo);
                    if (techIndex === -1 || task.startOffset < 0 || task.startOffset >= totalDays) return null;

                    return (
                        <div
                            key={task.id}
                            className="bg-red-600/70 hover:bg-red-500 border border-red-400 rounded p-1 text-white text-xs overflow-hidden cursor-pointer flex items-center"
                            style={{
                                gridRow: techIndex + 2,
                                gridColumn: `${task.startOffset + 2} / span ${task.duration}`,
                            }}
                            title={`${task.name} (${task.project.car.model})`}
                        >
                            <p className="font-bold truncate px-1">{task.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ScheduleView;