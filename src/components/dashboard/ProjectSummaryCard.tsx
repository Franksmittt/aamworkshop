import { Project } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import ProgressBar from '../ui/ProgressBar';

interface ProjectSummaryCardProps {
  project: Project;
  progress: number;
}

const ProjectSummaryCard = ({ project, progress }: ProjectSummaryCardProps) => {
  const statusClasses = {
    Active: 'bg-green-100 text-green-800',
    'On Hold': 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-blue-100 text-blue-800',
  };

  const photoUrl = project.media.length > 0 ? project.media[0].url : 'https://placehold.co/600x400/111827/4b5563?text=AAM';

  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden transition-transform hover:-translate-y-1">
      <div className="relative h-40">
        <Image 
          src={photoUrl} 
          alt={`${project.car.make} ${project.car.model}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="font-bold text-lg text-gray-900">{project.car.year} {project.car.make} {project.car.model}</p>
            <p className="text-sm text-gray-500">{project.customerName}</p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusClasses[project.status]}`}>
            {project.status}
          </span>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-500">Progress</span>
            <span className="text-xs font-bold text-red-600">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
        <Link href={`/dashboard/projects/${project.id}`} className="block w-full text-center mt-6 bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-900 transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectSummaryCard;