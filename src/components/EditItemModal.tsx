// Modal component for editing existing items
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Item } from '../types';

interface EditItemModalProps {
  item: Item;
  onSave: (name: string) => void;
  onClose: () => void;
}

export function EditItemModal({ item, onSave, onClose }: EditItemModalProps) {
  // State for the edited name
  const [name, setName] = useState(item.name);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      
      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-200">Edit Item</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Edit item..."
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-400 placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-blue-500/50 mb-4"
              autoFocus
            />
            
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
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}