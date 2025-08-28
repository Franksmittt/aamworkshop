import { Project, Technician } from './types';

export const mockTechnicians: Technician[] = [
  { id: 'tech-1', name: 'Mike L.' },
  { id: 'tech-2', name: 'Chris P.' },
  { id: 'tech-3', name: 'James M.' },
];

export const mockProjects: Project[] = [
  {
    id: 'mustang-1969-smith',
    customerName: 'John Smith',
    car: { make: 'Ford', model: 'Mustang Mach 1', year: 1969 },
    status: 'Active',
    holdReason: '',
    createdAt: '2025-08-05',
    categories: [
      { id: 'bp', name: 'Body & Paint', weight: 25, subTasks: [
        { id: 'bp1', name: 'Media Blasting', completed: true, assignedTo: 'tech-1' },
        { id: 'bp2', name: 'Rust Repair & Panel Replacement', completed: true, assignedTo: 'tech-1' },
        { id: 'bp3', name: 'Body Filler & Sanding', completed: true, assignedTo: 'tech-2' },
        { id: 'bp4', name: 'Primer Application', completed: false, assignedTo: 'tech-2' },
        { id: 'bp5', name: 'Final Paint (Wimbledon White)', completed: false, requiresClientApproval: true },
      ]},
      { id: 'cs', name: 'Chassis & Suspension', weight: 20, subTasks: [
        { id: 'cs1', name: 'Frame Inspection & Repair', completed: true, assignedTo: 'tech-3' },
        { id: 'cs2', name: 'Front Suspension Rebuild', completed: true, assignedTo: 'tech-3' },
        { id: 'cs3', name: 'Rear Leaf Spring Replacement', completed: false },
      ]},
      { id: 'en', name: 'Engine & Drivetrain', weight: 25, subTasks: [
        { id: 'en1', name: 'Engine Disassembly', completed: true, assignedTo: 'tech-1' },
        { id: 'en2', name: 'Block Machining', completed: true, assignedTo: 'tech-1' },
        { id: 'en3', name: 'Engine Assembly (351 Windsor)', completed: false },
      ]},
    ],
    timeline: [
      { id: 't1', date: '2025-08-26', update: 'Engine block returned from machine shop.', category: 'Engine & Drivetrain' },
      { id: 't2', date: '2025-08-18', update: 'Body filler work complete, prepping for primer.', category: 'Body & Paint' },
    ],
    media: [
      { id: 'm1', url: 'https://images.unsplash.com/photo-1603792025623-1a4a4f895a92?q=80&w=2070&auto=format&fit=crop', caption: 'Initial state of the vehicle.', category: 'Body & Paint' },
      { id: 'm2', url: 'https://images.unsplash.com/photo-159940113D-AAM-Logo-3-Transparent.png', caption: '351 Windsor engine block.', category: 'Engine & Drivetrain' },
    ],
    messages: [
      { id: 'msg-1', author: 'Client', text: 'Hey, just checking in. How is the bodywork looking?', visibleTo: 'All', createdAt: '2025-08-20T14:00:00Z' },
      { id: 'msg-2', author: 'Manager', text: 'Hi John, it\'s looking great. We just finished the final sanding. I\'ll upload some photos to the journal this afternoon.', visibleTo: 'All', createdAt: '2025-08-20T15:30:00Z' },
      { id: 'msg-3', author: 'Client', text: 'Can we discuss the budget privately? I have some concerns.', visibleTo: 'BossOnly', createdAt: '2025-08-28T09:00:00Z' },
    ],
    financials: {
      totalQuoted: 75000,
      totalPaid: 37500,
      invoices: [
        { id: 'inv-1', description: 'Project Deposit (50%)', amount: 37500, status: 'Paid', dueDate: '2025-08-05' },
        { id: 'inv-2', description: 'Final Payment', amount: 37500, status: 'Pending', dueDate: '2025-10-30' },
      ]
    }
  },
  {
    id: 'charger-1971-doe',
    customerName: 'Richard Doe',
    car: { make: 'Dodge', model: 'Charger R/T', year: 1971 },
    status: 'On Hold',
    holdReason: 'Awaiting Parts',
    createdAt: '2025-07-15',
    categories: [
     { id: 'ps', name: 'Parts Sourcing', weight: 100, subTasks: [
        { id: 'ps1', name: 'Source correct vinyl top', completed: false },
        { id: 'ps2', name: 'Locate OEM rallye wheels', completed: true },
      ]},
    ],
    timeline: [
      { id: 't4', date: '2025-08-25', update: 'Project on hold. Reason: Awaiting Parts - Sourcing correct vinyl top.', category: 'Project Status' }
    ],
    media: [],
    messages: [],
    financials: {
      totalQuoted: 15000,
      totalPaid: 0,
      invoices: [
        { id: 'inv-3', description: 'Parts Deposit', amount: 7500, status: 'Pending', dueDate: '2025-07-20' },
      ]
    }
  },
  {
    id: 'camaro-1969-jones',
    customerName: 'Jane Jones',
    car: { make: 'Chevrolet', model: 'Camaro SS', year: 1969 },
    status: 'On Hold',
    holdReason: 'Awaiting Payment',
    createdAt: '2025-08-26',
    categories: [
      { id: 'en', name: 'Engine Service', weight: 100, subTasks: [
        { id: 'en1', name: '396 V8 Teardown', completed: true },
        { id: 'en2', name: 'Replace Air Filter', completed: true },
        { id: 'en3', name: 'Oil & Filter Change', completed: false },
      ]},
    ],
    timeline: [
      { id: 't3', date: '2025-08-27', update: 'Project placed on hold. Reason: Awaiting Payment for engine service invoice.', category: 'Project Status' }
    ],
    media: [
      { id: 'm3', url: 'https://images.unsplash.com/photo-1552636242-18319f6a5e23?q=80&w=2070&auto=format&fit=crop', caption: 'Camaro arriving at the workshop.', category: 'Engine Service' }
    ],
    messages: [],
    financials: {
      totalQuoted: 2500,
      totalPaid: 0,
      invoices: [
        { id: 'inv-4', description: 'Major Engine Service', amount: 2500, status: 'Overdue', dueDate: '2025-08-20' },
      ]
    }
  },
  {
    id: 'cuda-1970-williams',
    customerName: 'Susan Williams',
    car: { make: 'Plymouth', model: 'Barracuda', year: 1970 },
    status: 'Completed',
    holdReason: '',
    createdAt: '2025-04-10',
    categories: [
     { id: 'fa', name: 'Final Assembly', weight: 100, subTasks: [
        { id: 'fa1', name: 'Final Polish & Detailing', completed: true },
        { id: 'fa2', name: 'Customer Delivery', completed: true },
      ]},
    ],
    timeline: [
      { id: 't5', date: '2025-08-20', update: 'Project completed and delivered to customer.', category: 'Final Assembly' }
    ],
    media: [
        { id: 'm4', url: 'https://images.unsplash.com/photo-1621287993213-e27145b23b42?q=80&w=2070&auto=format&fit=crop', caption: 'The finished Barracuda!', category: 'Final Assembly' }
    ],
    messages: [],
    financials: {
      totalQuoted: 95000,
      totalPaid: 95000,
      invoices: [
        { id: 'inv-5', description: 'Project Deposit', amount: 47500, status: 'Paid', dueDate: '2025-04-10' },
        { id: 'inv-6', description: 'Final Payment', amount: 47500, status: 'Paid', dueDate: '2025-08-15' },
      ]
    }
  },
];