// [path]: components/dashboard/DashboardHeader.tsx

'use client';

import { Menu } from 'lucide-react';
import ClockInOut from './ClockInOut';
import UniversalSearch from './UniversalSearch';
import NotificationsCenter from './NotificationsCenter'; // <-- NEW IMPORT

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  return (
    <header className="flex-shrink-0 bg-gray-900 border-b border-white/10">
      <div className="flex items-center justify-between p-4 h-16">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="md:hidden text-gray-400 hover:text-white mr-4"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 flex justify-center px-4">
            <UniversalSearch />
        </div>
        
        <div className="flex items-center space-x-4">
          <ClockInOut />
          <span className="h-6 w-px bg-gray-700"></span>
          <NotificationsCenter /> {/* <-- REPLACED STATIC ICON */}
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold text-gray-300">
           JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;