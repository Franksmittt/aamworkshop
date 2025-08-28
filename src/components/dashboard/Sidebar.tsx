'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// Added LayoutGrid for our new page icon
import { Home, Car, Camera, List, Users, Settings, X, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    // NEW: Link to the Workshop Ops Deck
    { name: 'Ops Deck', href: '/dashboard/workshop', icon: LayoutGrid },
    { name: 'Projects', href: '/dashboard/projects', icon: Car },
    { name: 'Media', href: '/dashboard/media', icon: Camera },
    { name: 'Timeline', href: '/dashboard/timeline', icon: List },
    { name: 'Customers', href: '/dashboard/customers', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

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
                  (pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard'))
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
        <p className="text-xs text-gray-500">© 2025 All American Muscle</p>
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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed top-0 left-0 h-full z-40 md:hidden"
                >
                    <SidebarContent />
                </motion.div>
            </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;