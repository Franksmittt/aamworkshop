import { Category } from './types';

export const fullRestorationTemplate: Category[] = [
  {
    id: 'body-paint', name: 'Body & Paint', weight: 25, subTasks: [
      { id: 'bp1', name: 'Media Blasting', completed: false },
      { id: 'bp2', name: 'Rust Repair & Panel Replacement', completed: false },
      { id: 'bp3', name: 'Body Filler & Sanding', completed: false },
      { id: 'bp4', name: 'Primer Application', completed: false },
      { id: 'bp5', name: 'Final Paint', completed: false },
      { id: 'bp6', name: 'Clear Coat & Polishing', completed: false },
    ]
  },
  {
    id: 'chassis-suspension', name: 'Chassis & Suspension', weight: 20, subTasks: [
      { id: 'cs1', name: 'Frame Inspection & Repair', completed: false },
      { id: 'cs2', name: 'Front Suspension Rebuild', completed: false },
      { id: 'cs3', name: 'Rear Suspension Rebuild', completed: false },
      { id: 'cs4', name: 'Brake System Installation', completed: false },
      { id: 'cs5', name: 'Steering Box & Linkage', completed: false },
    ]
  },
  {
    id: 'engine', name: 'Engine & Drivetrain', weight: 25, subTasks: [
      { id: 'en1', name: 'Engine Disassembly & Inspection', completed: false },
      { id: 'en2', name: 'Block Machining', completed: false },
      { id: 'en3', name: 'Engine Assembly', completed: false },
      { id: 'en4', name: 'Transmission Rebuild', completed: false },
      { id: 'en5', name: 'Driveshaft Balancing & Installation', completed: false },
      { id: 'en6', name: 'Engine & Transmission Installation', completed: false },
    ]
  },
  {
    id: 'interior', name: 'Interior', weight: 15, subTasks: [
      { id: 'in1', name: 'Floor Pan Sound Deadening', completed: false },
      { id: 'in2', name: 'Carpet Installation', completed: false },
      { id: 'in3', name: 'Dashboard & Gauge Restoration', completed: false },
      { id: 'in4', name: 'Seat Upholstery', completed: false },
      { id: 'in5', name: 'Headliner Installation', completed: false },
    ]
  },
  {
    id: 'electrical', name: 'Electrical & Wiring', weight: 15, subTasks: [
      { id: 'el1', name: 'Design & Layout New Wiring Harness', completed: false },
      { id: 'el2', name: 'Main Harness Installation', completed: false },
      { id: 'el3', name: 'Lighting & Signals', completed: false },
      { id: 'el4', name: 'Ignition System', completed: false },
    ]
  },
];

export const majorServiceTemplate: Category[] = [
    {
        id: 'engine', name: 'Engine Service', weight: 60, subTasks: [
            { id: 'ms1', name: 'Oil & Filter Change', completed: false },
            { id: 'ms2', name: 'Spark Plug Replacement', completed: false },
            { id: 'ms3', name: 'Air Filter Replacement', completed: false },
            { id: 'ms4', name: 'Coolant Flush', completed: false },
            { id: 'ms5', name: 'Carburetor Tune-up', completed: false },
        ]
    },
    {
        id: 'chassis', name: 'Chassis Check', weight: 40, subTasks: [
            { id: 'ms6', name: 'Brake Inspection', completed: false },
            { id: 'ms7', name: 'Tire Rotation & Pressure Check', completed: false },
            { id: 'ms8', name: 'Suspension Check', completed: false },
        ]
    }
];