'use client';

import { Bell, Menu } from 'lucide-react';

interface FilterButtonProps {
  filter: string;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterButton = ({ filter, activeFilter, onFilterChange }: FilterButtonProps) => (
    <button
        onClick={() => onFilterChange(filter)}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            activeFilter === filter
                ? 'bg-gray-200 text-gray-800'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
        }`}
    >
        {filter}
    </button>
);


interface DashboardHeaderProps {
  onMenuClick: () => void;
  activeFilter?: string; 
  onFilterChange?: (filter: string) => void;
}

const DashboardHeader = ({ onMenuClick, activeFilter, onFilterChange }: DashboardHeaderProps) => {
  const filters = ['Today', 'This Week', 'This Month', 'All Time'];
    
  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between p-4 h-16">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="md:hidden text-gray-500 hover:text-gray-800 mr-4"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {activeFilter && onFilterChange && (
            <div className="hidden sm:flex items-center space-x-2 bg-gray-50 border rounded-lg p-1">
              {filters.map(f => (
                  <FilterButton key={f} filter={f} activeFilter={activeFilter} onFilterChange={onFilterChange} />
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Bell className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-800" />
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;