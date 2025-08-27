import { mockProjects } from '@/lib/mock-data';
import { Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

export default function TimelinePage() {
  const allUpdates = mockProjects
    .flatMap(project => 
      project.timeline.map(update => ({
        ...update,
        project,
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Global Timeline</h1>
        <p className="text-gray-600">A chronological feed of all updates across all projects.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-soft">
        <div className="relative border-l-2 border-gray-200 ml-4">
          {allUpdates.map((item) => ( // 'index' parameter removed
            <div key={item.id} className="mb-8 pl-8">
              <span className="absolute -left-[11px] flex items-center justify-center w-6 h-6 bg-red-600 rounded-full ring-8 ring-white">
                <Calendar className="w-3 h-3 text-white" />
              </span>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <Link href={`/dashboard/projects/${item.project.id}`} className="font-semibold text-gray-900 hover:text-red-600 transition-colors">
                    {item.project.car.year} {item.project.car.make} {item.project.car.model}
                  </Link>
                  <time className="mt-1 sm:mt-0 text-sm font-normal text-gray-500">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <p className="text-base font-normal text-gray-700 mb-2">{item.update}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                  <Tag className="w-3 h-3 mr-1.5" />
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}