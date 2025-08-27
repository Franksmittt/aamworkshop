export interface SubTask {
  id: string;
  name: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  weight: number;
  subTasks: SubTask[];
}

export interface TimelineUpdate {
  id: string;
  date: string;
  update: string;
  category: string;
}

export interface Media {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface Project {
  id: string;
  customerName: string;
  car: {
    make: string;
    model: string;
    year: number;
  };
  status: 'Active' | 'Completed' | 'On Hold';
  createdAt: string; // Add this line
  categories: Category[];
  timeline: TimelineUpdate[];
  media: Media[];
}