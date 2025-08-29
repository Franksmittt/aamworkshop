// [path]: app/(dashboard)/dashboard/schedule/page.tsx

'use client';

import { getProjects } from '@/lib/data-service';
import ScheduleView from '@/components/dashboard/ScheduleView';

export default function SchedulePage() {
    const projects = getProjects();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Workshop Schedule</h1>
                <p className="text-gray-400">A visual timeline of assigned tasks across the workshop.</p>
            </div>
            <ScheduleView allProjects={projects} />
        </div>
    );
}