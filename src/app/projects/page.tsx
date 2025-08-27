import { mockProjects } from '@/lib/mock-data';
import { Project } from '@/lib/types';
import Link from 'next/link';

const calculateOverallProgress = (project: Project): number => {
  if (!project.categories || project.categories.length === 0) return 0;
  const totalProgress = project.categories.reduce((acc, category) => {
    const completedTasks = category.subTasks.filter(t => t.completed).length;
    const categoryProgress = category.subTasks.length > 0 ? (completedTasks / category.subTasks.length) : 0;
    return acc + (categoryProgress * category.weight);
  }, 0);
  const totalWeight = project.categories.reduce((acc, category) => acc + category.weight, 0);
  return totalWeight > 0 ? totalProgress / totalWeight * 100 : 0;
};

const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const statusClasses = {
    Active: 'bg-green-100 text-green-800',
    'On Hold': 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-blue-100 text-blue-800',
  };
  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

export default function ProjectsPage() {
  const projects = mockProjects;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">All Projects</h1>
        <p className="text-gray-400">A complete list of all workshop projects.</p>
      </div>

      <div className="bg-white rounded-lg shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map(project => {
                const progress = calculateOverallProgress(project);
                return (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{project.car.year} {project.car.make} {project.car.model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{project.customerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-1.5 mr-2">
                          <div className="bg-red-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/dashboard/projects/${project.id}`} className="text-red-600 hover:text-red-800">
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}