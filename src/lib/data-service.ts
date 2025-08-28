import { mockProjects } from './mock-data';
import { Project, Media } from './types';

const STORAGE_KEY = 'AAM_PROJECTS';

// Helper to safely get projects from localStorage, seeding it if it's empty.
const getProjectsFromStorage = (): Project[] => {
  if (typeof window === 'undefined') {
    return mockProjects; // Return static data for server-side rendering
  }
  try {
    const storedProjects = localStorage.getItem(STORAGE_KEY);
    if (storedProjects) {
      return JSON.parse(storedProjects);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProjects));
      return mockProjects;
    }
  } catch (error) {
    console.error("Could not access localStorage. Returning mock data.", error);
    return mockProjects;
  }
};

// Helper to save the current list of projects to localStorage.
const saveProjectsToStorage = (projects: Project[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error("Could not save projects to localStorage.", error);
    }
  }
};

// --- CORE API ---

export const getProjects = (): Project[] => {
  return getProjectsFromStorage();
};

export const getProjectById = (id: string): Project | undefined => {
  const projects = getProjectsFromStorage();
  return projects.find(p => p.id === id);
};

export const addProject = (newProjectData: Omit<Project, 'id'>): Project => {
  const projects = getProjectsFromStorage();
  const newProject: Project = {
    ...newProjectData,
    id: `${newProjectData.car.make.toLowerCase().replace(/\s/g, '-')}-${newProjectData.car.year}-${Date.now()}`
  };
  const updatedProjects = [...projects, newProject];
  saveProjectsToStorage(updatedProjects);
  console.log("Project added and saved to localStorage:", newProject);
  return newProject;
};

// This function now needs to actually update the data in storage.
export const updateProject = (projectId: string, updatedData: Partial<Project>): Project | undefined => {
  const projects = getProjectsFromStorage();
  const projectIndex = projects.findIndex(p => p.id === projectId);
  if (projectIndex !== -1) {
    projects[projectIndex] = { ...projects[projectIndex], ...updatedData };
    saveProjectsToStorage(projects);
    return projects[projectIndex];
  }
  console.error("Failed to find project to update:", projectId);
};

export const deleteProject = (projectId: string): void => {
  const projects = getProjectsFromStorage();
  const updatedProjects = projects.filter(p => p.id !== projectId);
  saveProjectsToStorage(updatedProjects);
  console.log("Project deleted:", projectId);
};

export const getRecentMedia = (limit: number = 4): Media[] => {
    const projects = getProjects();
    // In a real app, you'd sort by an upload date. For now, we'll just take the first few.
    return projects
        .flatMap(p => p.media)
        .slice(0, limit);
};