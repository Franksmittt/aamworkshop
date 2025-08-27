'use client';

import { useState } from 'react';
import { User, Bell, Palette } from 'lucide-react';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
  // State for preferences - in a real app, this would be saved
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and workshop preferences.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-soft">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <User className="mr-3 text-gray-500" /> User Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              {/* This is the corrected line */}
              <p className="text-lg text-gray-900">John &quot;Boss&quot; Doe (Placeholder)</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg text-gray-900">boss@allamericanmuscle.co.za</p>
            </div>
            <Button variant="outline" size="sm">Edit Profile</Button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white p-6 rounded-lg shadow-soft">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Bell className="mr-3 text-gray-500" /> Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive an email when a customer comments.</p>
              </div>
              <ToggleSwitch enabled={emailNotifications} setEnabled={setEmailNotifications} />
            </div>
          </div>
        </div>
        
        {/* Appearance Section */}
        <div className="bg-white p-6 rounded-lg shadow-soft">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Palette className="mr-3 text-gray-500" /> Appearance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Dark Mode Content</p>
                <p className="text-sm text-gray-500">Apply dark theme to the main content area.</p>
              </div>
              <ToggleSwitch enabled={darkMode} setEnabled={setDarkMode} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}