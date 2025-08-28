'use client';

import { useState } from 'react';
import { InternalNote } from '@/lib/types';
import Button from '../ui/Button';
import { MessageSquarePlus } from 'lucide-react';

interface InternalNotesProps {
  notes: InternalNote[];
  onAddNote: (noteText: string) => void;
}

const InternalNotes = ({ notes, onAddNote }: InternalNotesProps) => {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddNote(newNote);
    setNewNote('');
  };

  return (
    <div className="bg-gray-800 border border-white/10 p-6 rounded-lg shadow-soft">
      <h3 className="text-xl font-bold text-white mb-4">Internal Workshop Notes</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          rows={3}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Add a new note for the workshop team..."
        />
        <Button type="submit" variant="secondary" size="sm" className="mt-2" disabled={!newNote.trim()}>
          <MessageSquarePlus className="w-4 h-4 mr-2" />
          Add Note
        </Button>
      </form>
      
      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(note => (
            <div key={note.id} className="p-3 bg-gray-900/50 rounded-md border border-gray-700">
              <p className="text-sm text-gray-300">{note.note}</p>
              <p className="text-xs text-gray-500 mt-2">
                - <span className="font-semibold text-gray-400">{note.author}</span> on {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No internal notes for this project yet.</p>
        )}
      </div>
    </div>
  );
};

export default InternalNotes;