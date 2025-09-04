// [path]: app/(public)/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { User, Briefcase, Wrench, UserSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { UserRole } from '@/lib/types';

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (role: UserRole) => {
    login(role);

    switch (role) {
      case 'Boss':
      case 'Manager':
        router.push('/dashboard');
        break;
      case 'Technician':
        router.push('/dashboard/my-tasks');
        break;
      case 'Client':
        router.push('/projects/mustang-1969-smith');
        break;
    }
  };

  const loginOptions: { role: UserRole; icon: React.ElementType; color: string }[] = [
    { role: 'Boss', icon: Briefcase, color: 'red' },
    { role: 'Manager', icon: UserSquare, color: 'blue' },
    { role: 'Technician', icon: Wrench, color: 'yellow' },
    { role: 'Client', icon: User, color: 'green' },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <Image
        src="https://images.unsplash.com/photo-1617546889104-62f321b2383c?q=80&w=2070&auto-format&fit=crop"
        alt="Classic muscle car in a workshop"
        fill
        className="object-cover z-0"
        unoptimized
        priority
      />
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      <div className="relative z-20 w-full max-w-md mx-auto">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center mb-10">
              <Image
                src="http://allamericanmuscle.co.za/wp-content/uploads/2025/01/AAM-Logo-3-Transparent.png"
                alt="All American Muscle Logo"
                width={300}
                height={100}
                className="mx-auto"
                priority
              />
              <h1 className="text-2xl text-gray-300 mt-2">Restoration Project Tracker</h1>
            </div>
            <div className="backdrop-blur-sm bg-gray-900/50 p-8 rounded-lg border border-white/10 shadow-large">
                <h2 className="text-center text-2xl font-bold text-white mb-6">Workshop Portal Login</h2>
                <p className="text-center text-gray-400 mb-8 text-sm">This is a demo. Please select a role to continue.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {loginOptions.map(opt => (
                        <Button key={opt.role} onClick={() => handleLogin(opt.role)} variant="secondary" className="w-full">
                            <opt.icon className={`mr-3 h-5 w-5 text-${opt.color}-400`} />
                            Login as {opt.role}
                        </Button>
                    ))}
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
}