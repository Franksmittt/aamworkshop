// [path]: components/dashboard/MessageView.tsx

'use client';

import { useState } from 'react';
import { Project, Message, UserRole } from '@/lib/types';
import Button from '../ui/Button';
import { Send, Eye, EyeOff } from 'lucide-react';

interface MessageViewProps {
  project: Project | null;
  currentUserRole: UserRole;
  onSendMessage: (projectId: string, message: Omit<Message, 'id' | 'createdAt' | 'authorRole'>) => void;
}

type MessageVisibility = 'All' | 'BossOnly' | 'StaffOnly';

const MessageView = ({ project, currentUserRole, onSendMessage }: MessageViewProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [visibility, setVisibility] = useState<MessageVisibility>('StaffOnly');

  if (!project) {
    return (
        <div className="h-full flex items-center justify-center bg-gray-800 rounded-lg border-2 border-dashed border-gray-700">
            <p className="text-gray-500">Select a project to view messages.</p>
        </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    onSendMessage(project.id, {
      author: currentUserRole,
      text: newMessage,
      visibleTo: visibility,
    });

    setNewMessage('');
    setVisibility('StaffOnly');
  };
  
  const filteredMessages = project.messages.filter(msg => {
    if (currentUserRole === 'Boss') return true;
    if (currentUserRole === 'Manager') return msg.visibleTo !== 'BossOnly';
    return false; // Technicians and Clients don't use this view
  }).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return (
    <div className="bg-gray-800 border border-white/10 rounded-lg shadow-soft h-full flex flex-col">
      <div className="p-4 border-b border-white/10 flex-shrink-0">
        <h3 className="text-xl font-bold text-white">{`${project.car.year} ${project.car.make} ${project.car.model}`}</h3>
        <p className="text-sm text-gray-400">{project.customerName}</p>
      </div>
      
      <div className="flex-grow h-0 overflow-y-auto p-4 space-y-4">
        {filteredMessages.length > 0 ? (
          filteredMessages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.authorRole === 'Client' ? 'items-start' : 'items-end'}`}>
              <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.authorRole === 'Client' ? 'bg-gray-700' : 'bg-red-900/80'}`}>
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
      
      <div className="p-4 border-t border-white/10 flex-shrink-0">
        <form onSubmit={handleSubmit}>
          <textarea
            rows={3}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Type your reply or internal note..."
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2 text-sm">
              <select value={visibility} onChange={e => setVisibility(e.target.value as MessageVisibility)} className="text-xs rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500">
                  <option value="All">Reply to Client</option>
                  <option value="StaffOnly">Internal Note (Staff Only)</option>
                  {currentUserRole === 'Boss' && <option value="BossOnly">Internal Note (Boss Only)</option>}
              </select>
            </div>
            <Button type="submit" variant="primary" size="sm" disabled={!newMessage.trim()}>
                Send <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageView;