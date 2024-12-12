// Form component for adding new items to the shopping list
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface AddItemFormProps {
  onAddItem: (name: string) => void;
}

export function AddItemForm({ onAddItem }: AddItemFormProps) {
  // State for the input field
  const [name, setName] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddItem(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-gray-400 placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-blue-600/50 text-base"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-base"
        >
          <PlusCircle className="w-5 h-5" />
          Add
        </button>
      </div>
    </form>
  );
}