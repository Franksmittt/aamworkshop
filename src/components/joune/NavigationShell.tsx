'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Heart, Users, MessageCircle, User, Menu, X } from 'lucide-react';
import Container from '@/components/ui/Container';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Tuis', icon: <Home className="h-5 w-5" />, href: '/' },
  { id: 'discover', label: 'Ontdek', icon: <Heart className="h-5 w-5" />, href: '/discover' },
  { id: 'community', label: 'Gemeenskap', icon: <Users className="h-5 w-5" />, href: '/community' },
  { id: 'messages', label: 'Boodskappe', icon: <MessageCircle className="h-5 w-5" />, href: '/messages', badge: 3 },
  { id: 'profile', label: 'Profiel', icon: <User className="h-5 w-5" />, href: '/profile' }
];

interface NavigationShellProps {
  children: React.ReactNode;
  currentPath?: string;
}

const NavigationShell = ({ children, currentPath = '/' }: NavigationShellProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => currentPath === href;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-beige to-orange-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-ochre/10 sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-ochre to-sunset rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="text-xl font-bold text-dusk">Joune</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-full transition-all
                    ${isActive(item.href)
                      ? 'bg-ochre text-white shadow-lg'
                      : 'text-dusk/70 hover:text-dusk hover:bg-ochre/10'
                    }
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-sunset text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-dusk"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </Container>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-ochre/10"
          >
            <Container>
              <nav className="py-4 space-y-2">
                {navigationItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                      ${isActive(item.href)
                        ? 'bg-ochre text-white'
                        : 'text-dusk/70 hover:text-dusk hover:bg-ochre/10'
                      }
                    `}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto w-5 h-5 bg-sunset text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </motion.a>
                ))}
              </nav>
            </Container>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dusk text-beige py-12">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-ochre to-sunset rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
                <span className="text-xl font-bold">Joune</span>
              </div>
              <p className="text-beige/80">
                Die Digital Veld waar Suid-Afrikaners verbind en betekenisvolle verhoudings bou.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Gemeenskap</h4>
              <ul className="space-y-2 text-beige/80">
                <li><a href="#" className="hover:text-ochre transition-colors">Oor Ons</a></li>
                <li><a href="#" className="hover:text-ochre transition-colors">Gemeenskapsriglyne</a></li>
                <li><a href="#" className="hover:text-ochre transition-colors">Veiligheid</a></li>
                <li><a href="#" className="hover:text-ochre transition-colors">Ondersteuning</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-beige/80">
                <li>hallo@joune.co.za</li>
                <li>+27 (0)21 123 4567</li>
                <li>Kaapstad, Suid-Afrika</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-beige/20 mt-8 pt-8 text-center text-beige/60">
            <p>&copy; 2024 Joune. Alle regte voorbehou. Gemaak met ❤️ in Suid-Afrika.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default NavigationShell;
