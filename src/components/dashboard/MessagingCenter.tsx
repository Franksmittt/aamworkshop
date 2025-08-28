'use client';

import { useState } from 'react';
import { Project, Message } from '@/lib/types';
import Button from '../ui/Button';
// Corrected: Removed unused 'MessageSquarePlus'
import { Send, Eye, EyeOff } from 'lucide-react';

interface MessagingCenterProps {
  project: Project;
  currentUserRole: 'Client' | 'Boss' | 'Manager';
  onSendMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
}

// Define a specific type for our visibility options
type MessageVisibility = 'All' | 'BossOnly' | 'StaffOnly';

const MessagingCenter = ({ project, currentUserRole, onSendMessage }: MessagingCenterProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [visibility, setVisibility] = useState<MessageVisibility>('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    onSendMessage({
      author: currentUserRole,
      text: newMessage,
      visibleTo: visibility,
    });

    setNewMessage('');
    setVisibility(currentUserRole === 'Client' ? 'All' : 'StaffOnly');
  };
  
  const filteredMessages = project.messages.filter(msg => {
    if (currentUserRole === 'Boss') return true;
    if (currentUserRole === 'Manager') return msg.visibleTo !== 'BossOnly';
    if (currentUserRole === 'Client') return msg.visibleTo === 'All';
    return false;
  }).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return (
    <div className="bg-gray-800 border border-white/10 p-6 rounded-lg shadow-soft">
      <h3 className="text-xl font-bold text-white mb-4">Communication Center</h3>
      
      <div className="h-64 overflow-y-auto mb-4 p-3 bg-gray-900/50 rounded-md border border-gray-700 space-y-4">
        {filteredMessages.length > 0 ? (
          filteredMessages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.author === 'Client' ? 'items-start' : 'items-end'}`}>
              <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.author === 'Client' ? 'bg-gray-700' : 'bg-red-900/80'}`}>
                <p className="text-sm text-white">{msg.text}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1 px-1">
                {msg.author} - {new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                {currentUserRole === 'Boss' && msg.visibleTo !== 'All' && (
                  <span className='ml-2 inline-flex items-center text-yellow-400'>({msg.visibleTo === 'BossOnly' ? <EyeOff className='h-3 w-3 mr-1'/> : <Eye className='h-3 w-3 mr-1'/>}{msg.visibleTo})</span>
                )}
              </p>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          rows={3}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder={currentUserRole === 'Client' ? "Have a question? Send a message..." : "Type your reply or internal note..."}
        />
        <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2 text-sm">
                {currentUserRole === 'Client' && (
                    // Corrected: Cast to our specific MessageVisibility type
                    <select value={visibility} onChange={e => setVisibility(e.target.value as MessageVisibility)} className="text-xs rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500">
                        <option value="All">To Boss & Manager</option>
                        <option value="BossOnly">To Boss Only (Confidential)</option>
                    </select>
                )}
                {currentUserRole !== 'Client' && (
                    // Corrected: Cast to our specific MessageVisibility type
                    <select value={visibility} onChange={e => setVisibility(e.target.value as MessageVisibility)} className="text-xs rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500">
                        <option value="All">Reply to Client</option>
                        <option value="StaffOnly">Internal Note (Staff Only)</option>
                    </select>
                )}
            </div>
            <Button type="submit" variant="primary" size="sm" disabled={!newMessage.trim()}>
                Send <Send className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </form>
    </div>
  );
};

export default MessagingCenter;