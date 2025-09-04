// [path]: lib/mock-data.ts

import { Project, Technician, User } from './types';
import { subDays, addDays } from 'date-fns';

const today = new Date();
export const mockUsers: User[] = [
  { id: 'user-boss', name: 'John "Boss" Doe', role: 'Boss' },
  { id: 'user-manager', name: 'Sarah Manager', role: 'Manager' },
  { id: 'user-client-1', name: 'John Smith', role: 'Client' },
  // Technicians as Users
  { id: 'user-tech-dean', name: 'Dean', role: 'Technician' },
  { id: 'user-tech-jovan', name: 'Jovan', role: 'Technician' },
  { id: 'user-tech-ruan', name: 'Ruan', role: 'Technician' },
  { id: 'user-tech-dj', name: 'DJ', role: 'Technician' },
  { id: 'user-tech-moses', name: 'Moses', role: 'Technician' },
  { id: 'user-tech-nico', name: 'Nico', role: 'Technician' },
  { id: 'user-tech-thabo', name: 'Thabo', role: 'Technician' },
];

export const mockTechnicians: Technician[] = [
  // New Technicians
  { id: 'tech-dean', name: 'Dean', userId: 'user-tech-dean', hourlyRate: 220 },
  { id: 'tech-jovan', name: 'Jovan', userId: 'user-tech-jovan', hourlyRate: 135 },
  { id: 'tech-ruan', name: 'Ruan', userId: 'user-tech-ruan', hourlyRate: 130 },
  { id: 'tech-dj', name: 'DJ', userId: 'user-tech-dj', hourlyRate: 170 },
  { id: 'tech-moses', name: 'Moses', userId: 'user-tech-moses', hourlyRate: 125 },
  { id: 'tech-nico', name: 'Nico', userId: 'user-tech-nico', hourlyRate: 105 },
  { id: 'tech-thabo', name: 'Thabo', userId: 'user-tech-thabo', hourlyRate: 130 },
];

export const mockProjects: Project[] = [
  {
    id: 'mustang-1969-smith',
    customerName: 'John Smith',
    car: { make: 'Ford', model: 'Mustang Mach 1', year: 1969, vin: '9R02R154875' },
    status: 'Active',
    createdAt: subDays(today, 45).toISOString(),
    promisedDate: addDays(today, 60).toISOString(),
    provenance: [
      { id: 'prov-1', title: 'Car Acquired', date: '2024-05-10', description: 'Acquired from a farm in the Eastern Cape. Original matching-numbers 351W V8.', imageUrl: '/images/projects/mustang-1969-smith/provenance-acquired.jpg' },
      { id: 'prov-2', title: 'Workshop Check-in', date: subDays(today, 45).toISOString(), description: 'Car arrived at the workshop and was documented for a full nut-and-bolt restoration.', imageUrl: '/images/projects/mustang-1969-smith/provenance-check-in.jpg' },
    ],
    media: [
        { id: 'media-mustang-1', url: '/images/projects/mustang-1969-smith/gallery-01-arrival.jpg', caption: 'Initial state upon arrival.', category: 'Body & Paint' },
        { id: 'media-mustang-2', url: '/images/projects/mustang-1969-smith/gallery-02-engine-machined.jpg', caption: 'Engine block after machining.', category: 'Engine & Drivetrain', isFeatured: true },
        { id: 'media-mustang-3', url: '/images/projects/mustang-1969-smith/gallery-03-wheel-fitment.jpg', caption: 'Test fitting the new wheels.', category: 'Chassis & Suspension' },
        { id: 'media-mustang-4', url: '/images/projects/mustang-1969-smith/gallery-04-bare-metal.jpg', caption: 'Bare metal after media blasting.', category: 'Body & Paint' },
        { id: 'media-mustang-5', url: '/images/projects/mustang-1969-smith/gallery-05-wiring.jpg', caption: 'Dashboard wiring in progress.', category: 'Interior' },
    ],
    categories: [
      { 
        id: 'bp', name: 'Body & Paint', weight: 30,
        subTasks: [
          { id: 'bp1', name: 'Media Blasting', status: 'Completed', priority: 'Normal', assignedTo: 'tech-dean', estimateHours: 20, actualHours: 22, completedAt: subDays(today, 4).toISOString(), technicianNotes: 'Media blasting complete. Revealed some minor rust on the passenger-side floor pan that wasn\'t visible before. We\'ll address this in the next step.', beforeImageUrl: '/images/projects/mustang-1969-smith/task-bp1-before.jpg', afterImageUrl: '/images/projects/mustang-1969-smith/task-bp1-after.jpg' },
          { id: 'bp2', name: 'Rust Repair', status: 'Completed', priority: 'High', assignedTo: 'tech-dean', estimateHours: 40, actualHours: 35, completedAt: subDays(today, 2).toISOString(), technicianNotes: 'Fabricated a new patch panel for the floor pan and welded it in. Treated the entire area with rust inhibitor. It\'s solid now.', beforeImageUrl: '/images/projects/mustang-1969-smith/task-bp2-before.jpg', afterImageUrl: '/images/projects/mustang-1969-smith/task-bp2-after.jpg' },
          { id: 'bp3', name: 'Body Filler & Sanding', status: 'In Progress', priority: 'High', assignedTo: 'tech-jovan', 
            startDate: subDays(today, 1).toISOString(), dueDate: addDays(today, 8).toISOString(),
            internalNotes: [{id: 'note-1', authorId: 'user-manager', authorName: 'Sarah Manager', note: 'Ensure feathering is perfect.', createdAt: subDays(today, 1).toISOString(), type: 'Instruction'}], 
            estimateHours: 30, actualHours: 14 },
          { id: 'bp4', name: 'Primer Application', status: 'Pending', priority: 'Normal', assignedTo: 'tech-jovan', estimateHours: 15, 
            startDate: addDays(today, 9).toISOString(), dueDate: addDays(today, 13).toISOString() },
          { id: 'bp5', name: 'Select Final Paint Shade', status: 'Awaiting Approval', priority: 'High', requiresClientApproval: true, 
            estimateHours: 2, priceImpact: 8500, etaImpactDays: 3,
            decisionPrompt: 'Please select the final paint shade for your Mustang.',
            decisionOptions: [
                { name: 'Candy Apple Red', imageUrl: '/images/projects/mustang-1969-smith/decision-paint-red.jpg' },
                { name: 'Wimbledon White', imageUrl: '/images/projects/mustang-1969-smith/decision-paint-white.jpg' },
                { name: 'Highland Green', imageUrl: '/images/projects/mustang-1969-smith/decision-paint-green.jpg' },
            ]
          },
        ]
      },
      { 
        id: 'en', name: 'Engine & Drivetrain', weight: 40, 
        subTasks: [ 
          { id: 'en3', name: 'Engine Assembly (351W)', status: 'In Progress', priority: 'High', assignedTo: 'tech-ruan', estimateHours: 24, actualHours: 18, 
            startDate: subDays(today, 1).toISOString(), dueDate: addDays(today, 4).toISOString(),
            beforeImageUrl: '/images/projects/mustang-1969-smith/task-en3-before.jpg',
            afterImageUrl: '/images/projects/mustang-1969-smith/task-en3-after.jpg',
            technicianNotes: 'Beginning the engine assembly. All parts have been cleaned, inspected, and are ready to go. This is where the heart of the beast comes together.',
            parts: [
                { id: 'part-1', taskId: 'en3', name: 'Piston Ring Set', qty: 1, status: 'Received' },
                { id: 'part-2', taskId: 'en3', name: 'High Volume Oil Pump', qty: 1, status: 'Ordered' },
            ]
          } 
         ]
      },
      {
        id: 'cs', name: 'Chassis & Suspension', weight: 30, 
        subTasks: [ { id: 'cs2', name: 'Upgrade to Coilover Suspension', status: 'Awaiting Approval', priority: 'High', assignedTo: 'tech-dj', estimateHours: 12, requiresClientApproval: true, priceImpact: 22000, etaImpactDays: 5 } ]
      }
    ],
    timeline: [ { id: 't1', date: subDays(today, 4).toISOString(), update: 'Engine block returned from machine shop.', category: 'Engine & Drivetrain' } ],
    messages: [],
    financials: { totalQuoted: 75000, totalPaid: 37500, invoices: [ { id: 'inv-1', description: 'Project Deposit (50%)', amount: 37500, status: 'Paid', dueDate: subDays(today, 45).toISOString() }, { id: 'inv-2', description: 'Final Payment', amount: 37500, status: 'Pending', dueDate: addDays(today, 60).toISOString() } ] }
  },
  {
    id: 'camaro-1969-davis',
    customerName: 'Robert Davis',
    car: { make: 'Chevrolet', model: 'Camaro Z/28', year: 1969 },
    status: 'Active',
    createdAt: subDays(today, 15).toISOString(),
    promisedDate: addDays(today, 75).toISOString(),
    media: [
        { id: 'media-camaro-1', url: '/images/projects/mustang-1969-smith/gallery-05-wiring.jpg', caption: 'Stripped interior, ready for sound deadening.', category: 'Interior' },
        { id: 'media-camaro-2', url: '/images/projects/mustang-1969-smith/gallery-03-wheel-fitment.jpg', caption: 'Polishing the original chrome bumpers.', category: 'Body & Paint' },
    ],
    categories: [
      {
        id: 'cam-int', name: 'Interior Restoration', weight: 50,
        subTasks: [
            { id: 'cam-int1', name: 'Strip Interior', status: 'Completed', priority: 'Normal', assignedTo: 'tech-moses', actualHours: 8, completedAt: subDays(today, 10).toISOString() },
            { id: 'cam-int2', name: 'Install Sound Deadening', status: 'Completed', priority: 'Normal', assignedTo: 'tech-nico', actualHours: 16, completedAt: subDays(today, 5).toISOString() },
            { id: 'cam-int3', name: 'Dash and Wiring', status: 'Pending', priority: 'High', assignedTo: 'tech-thabo',
              startDate: addDays(today, 1).toISOString(), dueDate: addDays(today, 7).toISOString() },
        ]
      }
    ],
    timeline: [ { id: 't7', date: subDays(today, 15).toISOString(), update: 'New project "1969 Camaro Z/28" has been checked in.', category: 'Project Start' } ],
    messages: [],
    financials: { totalQuoted: 120000, totalPaid: 60000, invoices: [ { id: 'inv-7', description: 'Project Deposit (50%)', amount: 60000, status: 'Paid', dueDate: subDays(today, 15).toISOString() } ] }
  },
  {
    id: 'charger-1968-chen',
    customerName: 'David Chen',
    car: { make: 'Dodge', model: 'Charger R/T', year: 1968 },
    status: 'Completed',
    createdAt: subDays(today, 60).toISOString(),
    promisedDate: subDays(today, 5).toISOString(),
    media: [
        { id: 'media-charger-1', url: '/images/projects/mustang-1969-smith/gallery-02-engine-machined.jpg', caption: 'Final hero shot of the completed build.', category: 'Final Assembly' },
        { id: 'media-charger-2', url: '/images/projects/mustang-1969-smith/gallery-04-bare-metal.jpg', caption: 'Detailed shot of the restored vinyl top.', category: 'Final Assembly' },
    ],
    categories: [ { id: 'fa', name: 'Final Assembly', weight: 100, subTasks: [ 
        { id: 'fa1', name: 'Install chrome trim', status: 'Completed', priority: 'High', assignedTo: 'tech-ruan', actualHours: 15, completedAt: subDays(today, 10).toISOString()}, 
        { id: 'fa2', name: 'Install vinyl top', status: 'Completed', priority: 'Normal', assignedTo: 'tech-dean', actualHours: 9, completedAt: subDays(today, 8).toISOString()}, 
    ] } ],
    timeline: [{ id: 't4', date: subDays(today, 5).toISOString(), update: 'Project complete and ready for customer pickup.', category: 'Project Status' }], 
    messages: [],
    financials: { totalQuoted: 45000, totalPaid: 45000, invoices: [ { id: 'inv-5', description: 'Full Project Payment', amount: 45000, status: 'Paid', dueDate: subDays(today, 60).toISOString() } ] }
  },
];