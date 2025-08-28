'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [projectCode, setProjectCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCustomerAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // --- MOCK AUTHENTICATION ---
    // This now correctly redirects to the new public-facing project page.
    if (projectCode.trim() === 'mustang-1969-smith' && password === 'smith') {
      router.push(`/projects/${projectCode.trim()}`);
    } else {
      setError('Invalid project code or password.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1617546889104-62f321b2383c?q=80&w=2070&auto=format&fit=crop"
        alt="Classic muscle car in a workshop"
        fill
        className="object-cover z-0"
        unoptimized
        priority
      />
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Login Portal */}
      <div className="relative z-20 w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
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

        <div className="grid md:grid-cols-2 gap-8 md:gap-4 backdrop-blur-sm bg-gray-900/50 p-8 rounded-lg border border-white/10">
          
          {/* Workshop Login */}
          <div className="flex flex-col p-6 border-r-0 md:border-r md:border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <LogIn className="mr-3 text-red-500" />
              Workshop Portal
            </h2>
            <p className="text-gray-400 mb-6">Internal access for workshop staff.</p>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 sr-only">Username</label>
                <Input type="text" placeholder="Username" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 sr-only">Password</label>
                <Input type="password" placeholder="Password" />
              </div>
              <Button href="/dashboard" variant="primary" className="w-full">
                Login
              </Button>
            </form>
          </div>

          {/* Customer Access */}
          <div className="flex flex-col p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Search className="mr-3 text-red-500" />
              Customer Portal
            </h2>
            <p className="text-gray-400 mb-6">Enter your project code and password to see its progress.</p>
            <form onSubmit={handleCustomerAccess} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 sr-only">Project Code</label>
                <Input 
                  type="text" 
                  placeholder="Project Code"
                  value={projectCode}
                  onChange={(e) => setProjectCode(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 sr-only">Password</label>
                <Input 
                  type="password"
                  placeholder="Password / PIN"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button type="submit" variant="outline" className="w-full">
                Track My Project
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
