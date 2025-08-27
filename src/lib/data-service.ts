import { mockProjects } from './mock-data';
import { Project } from './types';

const STORAGE_KEY = 'AAM_PROJECTS';

// This function gets all projects: the initial ones plus any you've added.
export const getProjects = (): Project[] => {
  if (typeof window === 'undefined') {
    return mockProjects;
  }
  
  const savedProjectsJson = sessionStorage.getItem(STORAGE_KEY);
  
  if (savedProjectsJson) {
    return JSON.parse(savedProjectsJson);
  } else {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(mockProjects));
    return mockProjects;
  }
};

// This function finds a single project by its ID.
export const getProjectById = (id: string): Project | undefined => {
  const projects = getProjects();
  return projects.find(p => p.id === id);
};

// This function adds a new project to the list in session storage.
export const addProject = (newProjectData: Omit<Project, 'id'>): Project => {
  const projects = getProjects();
  
  const newProject: Project = {
    ...newProjectData,
    id: `${newProjectData.car.make.toLowerCase().replace(/\s/g, '-')}-${newProjectData.car.model.toLowerCase().replace(/\s/g, '-')}-${Date.now()}`
  };

  const updatedProjects = [newProject, ...projects];
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
  
  return newProject;
};

// This function updates an existing project in session storage.
export const updateProject = (updatedProject: Project): void => {
    if (typeof window === 'undefined') {
        return;
    }
    const projects = getProjects();
    const projectIndex = projects.findIndex(p => p.id === updatedProject.id);

    if (projectIndex !== -1) {
        projects[projectIndex] = updatedProject;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
};

// This function deletes a project from session storage.
export const deleteProject = (projectId: string): void => {
    if (typeof window === 'undefined') {
        return;
    }
    const projects = getProjects();
    const updatedProjects = projects.filter(p => p.id !== projectId);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
};

// This function gets the most recent media items from all projects.
export const getRecentMedia = (limit: number = 4) => {
    const projects = getProjects();
    // In a real app, you'd sort by an upload date. For now, we'll just take the first few.
    return projects
        .flatMap(p => p.media)
        .slice(0, limit);
};