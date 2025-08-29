// [path]: lib/types.ts

// =======================================================================
// NEW ENTITIES - These are the new data models for our advanced features
// =======================================================================

export type QAStatus = 'Pending' | 'Passed' | 'Failed';
export type HoldReason = 'Awaiting Parts' | 'Awaiting Payment' | 'Awaiting Client Decision' | 'Internal QA' | '';

export interface Approval {
  id: string;
  taskId: string;
  title: string;
  description?: string;
  priceImpact?: number;
  etaImpactDays?: number;
  status: 'Pending'|'Approved'|'Rejected';
  decidedAt?: string;
  decidedBy?: string; // userId
}

export interface Part {
  id: string;
  taskId: string;
  name: string;
  partNumber?: string;
  supplier?: string;
  qty: number;
  unitCost?: number;
  status: 'Needed'|'Ordered'|'Received'|'Cancelled';
  eta?: string;
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  items: { partId: string; qty: number; unitCost: number }[];
  status: 'Open'|'Received'|'Cancelled';
  eta?: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  stockQty: number;
  reorderPoint?: number;
  supplier?: string;
  unitCost?: number;
}


// =======================================================================
// EXISTING ENTITIES - These are being extended with new fields
// =======================================================================

export interface Technician {
  id: string;
  name: string;
}

export type UserRole = 'Boss' | 'Manager' | 'Technician' | 'Client';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface Message {
  id: string;
  author: string;
  authorRole: UserRole;
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

export interface InternalTaskNote {
  id: string;
  authorId: string;
  note: string;
  createdAt: string;
  type: 'Instruction' | 'Feedback';
}

export interface SubTask {
  id: string;
  name:string;
  status: 'Pending' | 'In Progress' | 'Awaiting Approval' | 'Completed';
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  assignedTo?: Technician['id'];
  requiresClientApproval?: boolean;
  internalNotes?: InternalTaskNote[];
  estimateHours?: number;
  actualHours?: number;
  // --- MODIFIED: Added startDate ---
  startDate?: string; // Format: 'YYYY-MM-DD'
  dueDate?: string;   // Format: 'YYYY-MM-DD'
  qaStatus?: QAStatus;
  blockedBy?: string[];
  checklist?: {label:string; value?:string|number|boolean; checked: boolean}[];
  attachments?: {mediaId:string}[];
  parts?: Part[];
  approvals?: Approval[];
}

export interface Category {
  id: string;
  name: string;
  weight: number;
  subTasks: SubTask[];
  requiresQa?: boolean;
  owner?: string; // Technician id for category lead
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
    vin?: string;
    color?: string;
    mileageIn?: number;
    mileageOut?: number;
  };
  status: 'Active' | 'Completed' | 'On Hold';
  holdReason?: HoldReason;
  createdAt: string;
  promisedDate?: string;
  categories: Category[];
  timeline: TimelineUpdate[];
  media: Media[];
  messages: Message[];
  financials: {
    invoices: Invoice[];
    totalQuoted: number;
    totalPaid: number;
    partsCost?: number;
    laborCost?: number;
    totalCost?: number; // parts + labor
  };
  purchaseOrders?: PurchaseOrder[];
  branchId?: string;
}

export interface AssignedTask extends SubTask {
  projectId: string;
  projectName: string;
  categoryName: string;
}