export interface Technician {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  author: 'Client' | 'Boss' | 'Manager';
  text: string;
  visibleTo: 'All' | 'BossOnly' | 'StaffOnly';
  createdAt: string;
}

export interface Invoice {
  id: string;
  amount: number;
  status: 'Pending' | 'Paid' | 'Overdue';
  dueDate: string;
  description: string;
}

export interface SubTask {
  id: string;
  name: string;
  completed: boolean;
  assignedTo?: Technician['id'];
  requiresClientApproval?: boolean;
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
  id:string;
  customerName: string;
  car: {
    make: string;
    model: string;
    year: number;
  };
  status: 'Active' | 'Completed' | 'On Hold';
  holdReason?: 'Awaiting Parts' | 'Awaiting Payment' | 'Awaiting Client Decision' | '';
  createdAt: string;
  categories: Category[];
  timeline: TimelineUpdate[];
  media: Media[];
  messages: Message[];
  financials: {
    invoices: Invoice[];
    totalQuoted: number;
    totalPaid: number;
  };
}