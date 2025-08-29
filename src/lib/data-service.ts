// [path]: lib/data-service.ts

import { mockProjects } from './mock-data';
import { Project, SubTask, Category } from './types';
import { fullRestorationTemplate, majorServiceTemplate } from './project-templates';

const PROJECTS_STORAGE_KEY = 'AAM_PROJECTS';
const TEMPLATES_STORAGE_KEY = 'AAM_TEMPLATES';


// =======================================================================
// PROJECT DATA FUNCTIONS
// =======================================================================

const getProjectsFromStorage = (): Project[] => {
  if (typeof window === 'undefined') return mockProjects;
  try {
    const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!storedProjects) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(mockProjects));
      return mockProjects;
    }
    return JSON.parse(storedProjects);
  } catch (error) {
    console.error("Could not access localStorage for projects.", error);
    return mockProjects;
  }
};

const saveProjectsToStorage = (projects: Project[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error("Could not save projects to localStorage.", error);
    }
  }
};

// =======================================================================
// TEMPLATE DATA FUNCTIONS
// =======================================================================

export const getTemplates = (): Category[][] => {
  if (typeof window === 'undefined') return [fullRestorationTemplate, majorServiceTemplate];
  try {
    const storedTemplates = localStorage.getItem(TEMPLATES_STORAGE_KEY);
    if (!storedTemplates) {
      const defaultTemplates = [fullRestorationTemplate, majorServiceTemplate];
      // A simple way to give templates a name for the UI
      defaultTemplates[0][0].name = "Full Restoration - Body & Paint";
      defaultTemplates[1][0].name = "Major Service - Engine Service";
      localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(defaultTemplates));
      return defaultTemplates;
    }
    return JSON.parse(storedTemplates);
  } catch (error) {
    console.error("Could not access localStorage for templates.", error);
    return [fullRestorationTemplate, majorServiceTemplate];
  }
};

export const saveTemplates = (templates: Category[][]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
    } catch (error) {
      console.error("Could not save templates to localStorage.", error);
    }
  }
};

// =======================================================================
// EXPORTED API
// =======================================================================

export const getProjects = (): Project[] => getProjectsFromStorage();

export const getProjectById = (id: string): Project | undefined => {
  const projects = getProjectsFromStorage();
  return projects.find(p => p.id === id);
};

export const updateProject = (projectId: string, updatedData: Partial<Project>): Project | undefined => {
  const projects = getProjectsFromStorage();
  const projectIndex = projects.findIndex(p => p.id === projectId);
  if (projectIndex !== -1) {
    projects[projectIndex] = { ...projects[projectIndex], ...updatedData };
    saveProjectsToStorage(projects);
    return projects[projectIndex];
  }
};

export const addProject = (newProjectData: Omit<Project, 'id'>): Project => {
  const projects = getProjectsFromStorage();
  const newProject: Project = {
    ...newProjectData,
    id: `${newProjectData.car.make.toLowerCase().replace(/\s/g, '-')}-${newProjectData.car.year}-${Date.now()}`
  };
  const updatedProjects = [...projects, newProject];
  saveProjectsToStorage(updatedProjects);
  return newProject;
};

// --- CORRECTED: Added the missing deleteProject function back ---
export const deleteProject = (projectId: string): void => {
  const projects = getProjectsFromStorage();
  const updatedProjects = projects.filter(p => p.id !== projectId);
  saveProjectsToStorage(updatedProjects);
};

// --- CORRECTED: Added the missing logTaskTime function back ---
export const logTaskTime = (projectId: string, categoryId: string, taskId: string, hoursToAdd: number): Project | undefined => {
    const projects = getProjectsFromStorage();
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return undefined;
    const category = projects[projectIndex].categories.find(c => c.id === categoryId);
    const task = category?.subTasks.find(t => t.id === taskId);
    if (task) {
        task.actualHours = (task.actualHours || 0) + hoursToAdd;
        saveProjectsToStorage(projects);
        return projects[projectIndex];
    }
    return undefined;
};

export const updateTaskStatus = (projectId: string, categoryId: string, taskId: string, newStatus: SubTask['status']): Project | undefined => {
    const projects = getProjectsFromStorage();
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return undefined;
    const category = projects[projectIndex].categories.find(c => c.id === categoryId);
    const task = category?.subTasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
        saveProjectsToStorage(projects);
        return projects[projectIndex];
    }
    return undefined;
};

export const declineTaskApproval = (projectId: string, categoryId: string, taskId: string): Project | undefined => {
    const projects = getProjectsFromStorage();
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return undefined;
    const category = projects[projectIndex].categories.find(c => c.id === categoryId);
    const task = category?.subTasks.find(t => t.id === taskId);
    if (task) {
        task.status = 'Pending';
        task.requiresClientApproval = false;
        saveProjectsToStorage(projects);
        return projects[projectIndex];
    }
    return undefined;
};

export const updateCategoryQaStatus = (projectId: string, categoryId: string, qaPassed: boolean): Project | undefined => {
    const projects = getProjectsFromStorage();
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return undefined;
    const category = projects[projectIndex].categories.find(c => c.id === categoryId);
    if (category) {
        if (!qaPassed) {
            category.subTasks.forEach(task => { task.status = 'Pending'; });
        }
        saveProjectsToStorage(projects);
        return projects[projectIndex];
    }
    return undefined;
};