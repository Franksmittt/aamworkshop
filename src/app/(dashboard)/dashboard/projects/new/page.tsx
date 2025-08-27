'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, User, ListChecks, ArrowRight } from 'lucide-react';
import { fullRestorationTemplate, majorServiceTemplate } from '@/lib/project-templates';
import { addProject } from '@/lib/data-service';
import { Category } from '@/lib/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Category[]>([]);
  
  const handleSaveProject = () => {
    if (!customerName || !carYear || !carMake || !carModel) {
        alert('Please fill out all car and customer details.');
        return;
    }

    addProject({
        customerName: customerName,
        car: {
            year: parseInt(carYear),
            make: carMake,
            model: carModel,
        },
        status: 'Active',
        createdAt: new Date().toISOString().split('T')[0], // This line was missing
        categories: selectedTemplate,
        timeline: [{
            id: `t-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            update: 'Project created and added to the system.',
            category: 'Project Start'
        }],
        media: [],
    });

    router.push('/dashboard/projects');
  };

  const selectTemplate = (template: Category[]) => {
    setSelectedTemplate(template);
    setStep(3);
  };

  const steps = [
    { number: 1, title: 'Customer & Car', icon: User },
    { number: 2, title: 'Project Type', icon: ListChecks },
    { number: 3, title: 'Review & Save', icon: Car },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Create New Project</h1>
        <p className="text-gray-400">Follow the steps to add a new restoration job.</p>
      </div>
      
      <div className="mb-8 p-4 bg-white rounded-lg shadow-soft">
        <ol className="flex items-center w-full">
          {steps.map((s, index) => (
            <li key={s.number} className={`flex w-full items-center ${index < steps.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:inline-block" : ""}`}>
              <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${step >= s.number ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                <s.icon className="w-5 h-5" />
              </span>
            </li>
          ))}
        </ol>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="bg-white p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Customer & Car Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input placeholder="Customer Full Name" value={customerName} onChange={e => setCustomerName(e.target.value)} required />
                <Input placeholder="Car Year" type="number" value={carYear} onChange={e => setCarYear(e.target.value)} required />
                <Input placeholder="Car Make" value={carMake} onChange={e => setCarMake(e.target.value)} required />
                <Input placeholder="Car Model" value={carModel} onChange={e => setCarModel(e.target.value)} required />
              </div>
              <Button onClick={() => setStep(2)} className="mt-8" disabled={!customerName || !carYear || !carMake || !carModel}>
                Next: Select Project Type <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 2: Select Project Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div onClick={() => selectTemplate(fullRestorationTemplate)} className="p-6 border rounded-lg hover:bg-gray-50 cursor-pointer text-center">
                  <h3 className="font-bold text-lg text-gray-900">Full Restoration</h3>
                  <p className="text-sm text-gray-600">{fullRestorationTemplate.length} categories</p>
                </div>
                <div onClick={() => selectTemplate(majorServiceTemplate)} className="p-6 border rounded-lg hover:bg-gray-50 cursor-pointer text-center">
                  <h3 className="font-bold text-lg text-gray-900">Major Service</h3>
                  <p className="text-sm text-gray-600">{majorServiceTemplate.length} categories</p>
                </div>
                <div onClick={() => selectTemplate([])} className="p-6 border rounded-lg hover:bg-gray-50 cursor-pointer text-center">
                  <h3 className="font-bold text-lg text-gray-900">Custom Job</h3>
                  <p className="text-sm text-gray-600">Start with a blank slate</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 3: Review & Save</h2>
              <div className="space-y-2 text-gray-800 border p-4 rounded-md">
                <p><strong>Customer:</strong> {customerName}</p>
                <p><strong>Vehicle:</strong> {carYear} {carMake} {carModel}</p>
                <p><strong>Tasks:</strong> {selectedTemplate.length > 0 ? `${selectedTemplate.reduce((acc, cat) => acc + cat.subTasks.length, 0)} tasks across ${selectedTemplate.length} categories.` : 'Custom job (add tasks later)'}</p>
              </div>
              <Button onClick={handleSaveProject} variant="primary" className="mt-6">
                Save New Project
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}