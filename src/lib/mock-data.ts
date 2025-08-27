import { Project } from './types';

// Today is August 27, 2025
const project1: Project = {
  id: 'mustang-69-smith',
  customerName: 'John Smith',
  car: { make: 'Ford', model: 'Mustang Mach 1', year: 1969 },
  status: 'Active',
  createdAt: '2025-08-05', // This month
  categories: [ /* ... */ ],
  timeline: [ /* ... */ ],
  media: [ /* ... */ ]
};

const project2: Project = {
  id: 'camaro-69-jones',
  customerName: 'Jane Jones',
  car: { make: 'Chevrolet', model: 'Camaro SS', year: 1969 },
  status: 'Active',
  createdAt: '2025-08-26', // This week
  categories: [ /* ... */ ],
  timeline: [ /* ... */ ],
  media: [ /* ... */ ]
};

const project3: Project = {
  id: 'charger-71-doe',
  customerName: 'Richard Doe',
  car: { make: 'Dodge', model: 'Charger R/T', year: 1971 },
  status: 'On Hold',
  createdAt: '2025-07-15', // Last month
  categories: [ /* ... */ ],
  timeline: [ /* ... */ ],
  media: []
};

export const mockProjects: Project[] = [project1, project2, project3];