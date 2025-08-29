// [path]: lib/mock-data.ts

import { Project, Technician, User } from './types';

export const mockUsers: User[] = [
  { id: 'user-boss', name: 'John "Boss" Doe', role: 'Boss' },
  { id: 'user-manager', name: 'Sarah Manager', role: 'Manager' },
  { id: 'user-tech-1', name: 'Mike L.', role: 'Technician' },
  { id: 'user-tech-2', name: 'Chris P.', role: 'Technician' },
  { id: 'user-client-1', name: 'John Smith', role: 'Client' },
];

export const mockTechnicians: Technician[] = [
  { id: 'tech-1', name: 'Mike L.' },
  { id: 'tech-2', name: 'Chris P.' },
  { id: 'tech-3', name: 'James M.' },
];

export const mockProjects: Project[] = [
  {
    id: 'mustang-1969-smith',
    customerName: 'John Smith',
    car: { make: 'Ford', model: 'Mustang Mach 1', year: 1969, vin: '9R02R154875', color: 'Wimbledon White', mileageIn: 85450 },
    status: 'Active',
    createdAt: '2025-07-15',
    promisedDate: '2025-10-31',
    categories: [
      { 
        id: 'bp', name: 'Body & Paint', weight: 30, requiresQa: true,
        subTasks: [
          { id: 'bp1', name: 'Media Blasting', status: 'Completed', priority: 'Normal', assignedTo: 'tech-1', estimateHours: 20, actualHours: 22, startDate: '2025-08-20', dueDate: '2025-08-25' },
          { id: 'bp2', name: 'Rust Repair', status: 'Completed', priority: 'High', assignedTo: 'tech-1', estimateHours: 40, actualHours: 45, startDate: '2025-08-26', dueDate: '2025-09-05' },
          { id: 'bp3', name: 'Body Filler & Sanding', status: 'In Progress', priority: 'High', assignedTo: 'tech-2', internalNotes: [{id: 'note-1', authorId: 'user-manager', note: 'Ensure feathering is perfect before primer.', createdAt: '2025-08-28T10:00:00Z', type: 'Instruction'}], estimateHours: 30, actualHours: 12, startDate: '2025-08-28', dueDate: '2025-09-10' },
          { id: 'bp4', name: 'Primer Application', status: 'Pending', priority: 'Normal', assignedTo: 'tech-2', estimateHours: 15, startDate: '2025-09-11', dueDate: '2025-09-15' },
          { id: 'bp5', name: 'Select Final Paint Shade', status: 'Awaiting Approval', priority: 'High', requiresClientApproval: true, estimateHours: 2 },
        ]
      },
      { 
        id: 'en', name: 'Engine & Drivetrain', weight: 40, 
        subTasks: [
          { id: 'en3', name: 'Engine Assembly (351W)', status: 'In Progress', priority: 'High', assignedTo: 'tech-1', estimateHours: 24, actualHours: 6, startDate: '2025-09-08', dueDate: '2025-09-12', parts: [
            { id: 'part-1', taskId: 'en3', name: 'Piston Ring Set', partNumber: 'PRS-351W', qty: 1, status: 'Received', unitCost: 1200 },
            { id: 'part-2', taskId: 'en3', name: 'Main Bearing Kit', partNumber: 'MBK-351W', qty: 1, status: 'Received', unitCost: 950 },
            { id: 'part-3', taskId: 'en3', name: 'High Volume Oil Pump', partNumber: 'OP-HV-351', qty: 1, status: 'Ordered', unitCost: 800 },
          ]},
        ]
      },
      {
        id: 'cs', name: 'Chassis & Suspension', weight: 30, 
        subTasks: [
          { id: 'cs2', name: 'Upgrade to Coilover Suspension', status: 'Awaiting Approval', priority: 'High', assignedTo: 'tech-3', estimateHours: 12, requiresClientApproval: true },
        ]
      }
    ],
    timeline: [ { id: 't1', date: '2025-08-26', update: 'Engine block returned from machine shop.', category: 'Engine & Drivetrain' } ],
    // --- CORRECTED: Replaced Unsplash URLs with placehold.co ---
    media: [
      { id: 'm1', url: 'https://placehold.co/1280x720/1f2937/ffffff?text=Mustang+Before', caption: 'Initial state of the vehicle.', category: 'Body & Paint' },
      { id: 'm2', url: 'https://placehold.co/1280x720/4b5563/ffffff?text=Engine+Block', caption: '351 Windsor engine block after machining.', category: 'Engine & Drivetrain' },
    ],
    messages: [ { id: 'msg-1', author: 'John Smith', authorRole: 'Client', text: 'The engine block looks incredible!', visibleTo: 'All', createdAt: '2025-08-27T10:00:00Z' } ],
    financials: { totalQuoted: 75000, totalPaid: 37500, invoices: [ { id: 'inv-1', description: 'Project Deposit (50%)', amount: 37500, status: 'Paid', dueDate: '2025-07-15' }, { id: 'inv-2', description: 'Final Payment', amount: 37500, status: 'Pending', dueDate: '2025-10-31' } ] }
  },
  {
    id: 'chevelle-1970-garcia',
    customerName: 'Maria Garcia',
    car: { make: 'Chevrolet', model: 'Chevelle SS', year: 1970, vin: '136370R123456' },
    status: 'On Hold', holdReason: 'Awaiting Payment', createdAt: '2025-06-01', promisedDate: '2025-08-15',
    categories: [ { id: 'el', name: 'Electrical', weight: 100, subTasks: [ { id: 'el1', name: 'Diagnose wiring short', status: 'Completed', priority: 'High', assignedTo: 'tech-2', estimateHours: 8, actualHours: 10, startDate: '2025-08-25', dueDate: '2025-08-26' }, { id: 'el2', name: 'Replace main wiring harness', status: 'Pending', priority: 'Urgent', estimateHours: 40, startDate: '2025-08-27', dueDate: '2025-09-02' }] } ],
    timeline: [ { id: 't4', date: '2025-07-25', update: 'Project on hold for payment.', category: 'Project Status' } ],
    // --- CORRECTED: Replaced Unsplash URL ---
    media: [ { id: 'm3', url: 'https://placehold.co/1280x720/1f2937/ffffff?text=Chevelle+Diagnostics', caption: 'Chevelle in the diagnostics bay.', category: 'Electrical' } ],
    messages: [],
    financials: { totalQuoted: 25000, totalPaid: 10000, invoices: [ { id: 'inv-3', description: 'Initial Deposit', amount: 10000, status: 'Paid', dueDate: '2025-06-01' }, { id: 'inv-4', description: 'Wiring Harness Replacement', amount: 5000, status: 'Overdue', dueDate: '2025-07-20' } ] }
  },
  {
    id: 'charger-1968-chen',
    customerName: 'David Chen',
    car: { make: 'Dodge', model: 'Charger R/T', year: 1968, vin: 'XS29L8B123456' },
    status: 'Active',
    createdAt: '2025-08-20',
    promisedDate: '2025-11-20',
    categories: [ { id: 'fa', name: 'Final Assembly', weight: 100, subTasks: [ { id: 'fa1', name: 'Install chrome trim and bumpers', status: 'In Progress', priority: 'High', assignedTo: 'tech-3', estimateHours: 16, startDate: '2025-09-01', dueDate: '2025-09-05', parts: [ { id: 'part-4', taskId: 'fa1', name: 'Front Bumper', qty: 1, status: 'Received' }, { id: 'part-5', taskId: 'fa1', name: 'Rear Bumper', qty: 1, status: 'Ordered' }, { id: 'part-6', taskId: 'fa1', name: 'Wheel Well Trim Kit', qty: 1, status: 'Needed' }, ]}, { id: 'fa2', name: 'Install vinyl top', status: 'Pending', priority: 'Normal', assignedTo: 'tech-3', estimateHours: 8, startDate: '2025-09-08', dueDate: '2025-09-10', parts: [ { id: 'part-7', taskId: 'fa2', name: 'Black Vinyl Top', qty: 1, status: 'Needed' }, ]}, ]}, ],
    timeline: [ { id: 't5', date: '2025-08-22', update: 'Final assembly has begun.', category: 'Final Assembly' } ],
    media: [],
    messages: [ { id: 'msg-3', author: 'David Chen', authorRole: 'Client', text: 'Hi John, can we talk about the final invoice amount offline?', visibleTo: 'BossOnly', createdAt: '2025-08-29T09:00:00Z' } ],
    financials: { totalQuoted: 45000, totalPaid: 40000, invoices: [ { id: 'inv-5', description: 'Full Project Payment', amount: 45000, status: 'Paid', dueDate: '2025-08-20' } ] }
  },
  {
    id: 'cuda-1971-williams',
    customerName: 'Susan Williams',
    car: { make: 'Plymouth', model: 'Barracuda', year: 1971, vin: 'BS23R0B123456' },
    status: 'Completed',
    createdAt: '2025-04-10',
    promisedDate: '2025-08-20',
    categories: [
     { id: 'fa', name: 'Final Assembly', weight: 100, subTasks: [
        { id: 'fa1', name: 'Final Polish & Detailing', status: 'Completed', priority: 'Normal' },
        { id: 'fa2', name: 'Customer Delivery', status: 'Completed', priority: 'Normal' },
      ]},
    ],
    timeline: [ { id: 't6', date: '2025-08-20', update: 'Project completed and delivered to customer.', category: 'Final Assembly' } ],
    // --- CORRECTED: Replaced Unsplash URL ---
    media: [ { id: 'm4', url: 'https://placehold.co/1280x720/1f2937/ffffff?text=Finished+Barracuda!', caption: 'The finished Barracuda!', category: 'Final Assembly' } ],
    messages: [],
    financials: {
      totalQuoted: 95000, totalPaid: 95000,
      invoices: [
        { id: 'inv-5', description: 'Project Deposit', amount: 47500, status: 'Paid', dueDate: '2025-04-10' },
        { id: 'inv-6', description: 'Final Payment', amount: 47500, status: 'Paid', dueDate: '2025-08-15' },
      ]
    }
  },
];