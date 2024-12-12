// Modal component for adding/editing item notes
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Item } from '../types';

interface NoteModalProps {
  item: Item;
  onSave: (note: string) => void;
  onClose: () => void;
}

export function NoteModal({ item, onSave, onClose }: NoteModalProps) {
  // State for the note content
  const [note, setNote] = useState(item.note || '');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(note.trim());
  };

  return (
    // Modal container with backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        {/* Modal header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-200">Add Note to {item.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Note input form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add note..."
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-400 placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-blue-600/50 mb-4"
            autoFocus
          />
          
          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-gray-200 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}