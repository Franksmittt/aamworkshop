import { Project } from './types';

// This function is now centralized and can be imported anywhere.
export const calculateOverallProgress = (project: Project | null): number => {
  if (!project || !project.categories || project.categories.length === 0) return 0;

  const totalProgress = project.categories.reduce((acc, category) => {
    const completedTasks = category.subTasks.filter(t => t.completed).length;
    const categoryProgress = category.subTasks.length > 0 ? (completedTasks / category.subTasks.length) : 0;
    return acc + (categoryProgress * category.weight);
  }, 0);

  const totalWeight = project.categories.reduce((acc, category) => acc + category.weight, 0);
  return totalWeight > 0 ? totalProgress / totalWeight * 100 : 0;
};