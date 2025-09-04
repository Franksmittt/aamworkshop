// [path]: components/dashboard/Sidebar.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Home, Car, Users, UserSquare, DollarSign, Package, MessageSquare, Bot, BarChart3, Settings, X, LogOut, RefreshCw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/app/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const allNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['Boss', 'Manager'] },
    { name: 'Projects', href: '/dashboard/projects', icon: Car, roles: ['Boss', 'Manager'] },
    { name: 'Technicians', href: '/dashboard/technicians', icon: Users, roles: ['Boss', 'Manager'] },
    { name: 'Clients', href: '/dashboard/clients', icon: UserSquare, roles: ['Boss', 'Manager'] },
    { name: 'Finance', href: '/dashboard/financials', icon: DollarSign, roles: ['Boss'] },
    { name: 'Inventory', href: '/dashboard/inventory', icon: Package, roles: ['Boss', 'Manager'] },
    { name: 'Communication Hub', href: '/dashboard/communication-hub', icon: MessageSquare, roles: ['Boss', 'Manager'] },
    { name: 'AI Pit Chief', href: '/dashboard/ai-pit-chief', icon: Bot, roles: ['Boss'] },
    { name: 'Reports', href: '/dashboard/reports', icon: BarChart3, roles: ['Boss'] },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['Boss'] },
  ];

  const navItems = allNavItems.filter(item => user?.role && item.roles.includes(user.role));

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all project data? This will clear any changes you have made and restore the original mock data.')) {
        localStorage.removeItem('AAM_PROJECTS');
        window.location.reload();
    }
  };

  const SidebarContent = () => (
    <div className="w-64 bg-gray-900 text-gray-300 flex flex-col h-full border-r border-white/10">
      <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
        <Link href="/dashboard" className="transition-opacity hover:opacity-80">
          <Image
            src="http://allamericanmuscle.co.za/wp-content/uploads/2025/01/AAM-Logo-3-Transparent.png"
            alt="All American Muscle Logo"
            width={150}
            height={50}
            priority
          />
        </Link>
        <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white" aria-label="Close sidebar">
            <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-grow px-4 py-6">
        <ul>
          {navItems.map(item => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={onClose}
                className={`flex items-center px-4 py-3 my-1 rounded-md transition-colors ${
                  (pathname === item.href ||
                  (pathname.startsWith(item.href) && item.href !== '/dashboard'))
                    ? 'bg-red-600 text-white'
                    : 'hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
            onClick={handleResetData}
            className="flex w-full items-center px-4 py-3 my-1 rounded-md text-gray-400 hover:bg-yellow-900/50 hover:text-yellow-300 transition-colors"
        >
            <RefreshCw className="h-5 w-5 mr-3" />
            <span className="font-medium">Reset Mock Data</span>
        </button>

        <button
            onClick={logout}
            className="flex w-full items-center px-4 py-3 my-1 rounded-md text-gray-400 hover:bg-red-900/50 hover:text-red-300 transition-colors"
        >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:flex md:flex-shrink-0">
        <SidebarContent />
      </div>
      <AnimatePresence>
        {isOpen && (
            <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={onClose} />
                <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed top-0 left-0 h-full z-40 md:hidden">
                    <SidebarContent />
                </motion.div>
            </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;