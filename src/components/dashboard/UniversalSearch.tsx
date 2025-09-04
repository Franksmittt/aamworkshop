// [path]: components/dashboard/UniversalSearch.tsx

'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Car, UserSquare, Package, X } from 'lucide-react';
import { getProjects, getInventoryItems } from '@/lib/data-service';
import Link from 'next/link';

interface Client {
  name: string;
  slug: string;
}

const UniversalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  
  const allProjects = useMemo(() => getProjects(), []);
  const allInventory = useMemo(() => getInventoryItems(), []);
  
  const allClients = useMemo(() => {
    const clientsMap = new Map<string, Client>();
    allProjects.forEach(p => {
      if (!clientsMap.has(p.customerName)) {
        clientsMap.set(p.customerName, {
          name: p.customerName,
          slug: p.customerName.toLowerCase().replace(/\s+/g, '-'),
        });
      }
    });
    return Array.from(clientsMap.values());
  }, [allProjects]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query) return null;

    const lowerCaseQuery = query.toLowerCase();

    const projects = allProjects.filter(p =>
      `${p.car.year} ${p.car.make} ${p.car.model}`.toLowerCase().includes(lowerCaseQuery) ||
      p.customerName.toLowerCase().includes(lowerCaseQuery)
    );

    const clients = allClients.filter(c =>
      c.name.toLowerCase().includes(lowerCaseQuery)
    );

    const inventory = allInventory.filter(i =>
      i.name.toLowerCase().includes(lowerCaseQuery) ||
      i.sku.toLowerCase().includes(lowerCaseQuery)
    );

    return { projects, clients, inventory };
  }, [query, allProjects, allClients, allInventory]);

  return (
    <>
      <div className="relative w-full max-w-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full text-left bg-gray-800 border border-white/10 rounded-md py-2 px-4 text-gray-400 flex items-center justify-between"
        >
          <div className="flex items-center">
            <Search className="h-4 w-4 mr-3" />
            <span>Find anything...</span>
          </div>
          <kbd className="text-xs font-sans border border-gray-600 rounded px-1.5 py-0.5">⌘K</kbd>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="relative bg-gray-800 border border-white/10 w-full max-w-2xl rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Find project, client, or part..."
                  autoFocus
                  className="w-full bg-transparent p-4 pl-12 text-white placeholder-gray-500 focus:outline-none"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <button onClick={() => setIsOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                    <X className="h-5 w-5"/>
                </button>
              </div>

              {searchResults && (
                <div className="border-t border-gray-700 max-h-96 overflow-y-auto">
                  {searchResults.projects.length === 0 && searchResults.clients.length === 0 && searchResults.inventory.length === 0 ? (
                    <p className="p-4 text-center text-gray-500">No results found.</p>
                  ) : (
                    <>
                      {searchResults.projects.length > 0 && (
                        <div>
                          <h3 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Projects</h3>
                          <ul>{searchResults.projects.map(p => (
                            <li key={p.id}><Link href={`/dashboard/projects/${p.id}`} onClick={() => setIsOpen(false)} className="flex items-center p-4 hover:bg-red-900/50"><Car className="h-4 w-4 mr-3 text-red-400" /><span>{p.car.year} {p.car.make} {p.car.model}</span></Link></li>
                          ))}</ul>
                        </div>
                      )}
                      {searchResults.clients.length > 0 && (
                        <div>
                          <h3 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Clients</h3>
                          <ul>{searchResults.clients.map(c => (
                            <li key={c.slug}><Link href={`/dashboard/clients/${c.slug}`} onClick={() => setIsOpen(false)} className="flex items-center p-4 hover:bg-red-900/50"><UserSquare className="h-4 w-4 mr-3 text-blue-400" /><span>{c.name}</span></Link></li>
                          ))}</ul>
                        </div>
                      )}
                      {searchResults.inventory.length > 0 && (
                        <div>
                          <h3 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Inventory</h3>
                          <ul>{searchResults.inventory.map(i => (
                            <li key={i.id}><Link href="/dashboard/inventory" onClick={() => setIsOpen(false)} className="flex items-center p-4 hover:bg-red-900/50"><Package className="h-4 w-4 mr-3 text-yellow-400" /><span>{i.name}</span></Link></li>
                          ))}</ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UniversalSearch;