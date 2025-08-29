// [path]: components/dashboard/ActionRequiredFeed.tsx

'use client';

import { Project } from '@/lib/types';
import { DollarSign, MessageCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

interface ActionRequiredFeedProps {
  projects: Project[];
}

const generateActionItems = (projects: Project[]) => {
    const items = [];

    for (const project of projects) {
        if (project.status === 'On Hold' && project.holdReason === 'Awaiting Payment') {
            items.push({
                id: `payment-${project.id}`,
                type: 'Payment',
                text: `Payment pending for ${project.car.year} ${project.car.make}.`,
                projectId: project.id,
                icon: DollarSign,
                color: 'blue',
                // This hash will now scroll the user to the financials panel
                href: `/dashboard/projects/${project.id}#financials`
            });
        }

        for (const message of project.messages) {
            if (message.visibleTo === 'BossOnly' && message.authorRole === 'Client') {
                items.push({
                    id: `message-${message.id}`,
                    type: 'Message',
                    text: `New confidential message from ${project.customerName}.`,
                    projectId: project.id,
                    icon: MessageCircle,
                    color: 'purple',
                    // This hash will now scroll the user to the messages panel
                    href: `/dashboard/projects/${project.id}#messages`
                });
            }
        }
    }
    
    // Placeholder for overdue tasks, can be made dynamic later
    items.push({
        id: `overdue-placeholder`,
        type: 'Overdue',
        text: `Mustang project is 2 weeks overdue on Engine Assembly.`,
        projectId: 'mustang-1969-smith',
        icon: Clock,
        color: 'red',
        // This hash will now scroll the user to the progress section
        href: `/dashboard/projects/mustang-1969-smith#progress`
    });

    return items;
};


const ActionRequiredFeed = ({ projects }: ActionRequiredFeedProps) => {
  const actionItems = useMemo(() => generateActionItems(projects), [projects]);

  return (
    <div className="bg-gray-800 border border-white/10 p-6 rounded-lg shadow-soft">
      <h3 className="text-xl font-bold text-white mb-4">Action Required</h3>
      {actionItems.length > 0 ? (
        <ul className="space-y-4">
          {actionItems.map(item => (
            <li key={item.id}>
              <Link href={item.href} className="flex items-start p-2 rounded-md hover:bg-gray-700/50 transition-colors">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-${item.color}-900/50 border border-${item.color}-500/30`}>
                    <item.icon className={`h-5 w-5 text-${item.color}-400`} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-200">{item.text}</p>
                  <p className="text-xs text-gray-500">{item.type}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">The workshop is running smoothly. No actions required.</p>
      )}
    </div>
  );
};

export default ActionRequiredFeed;