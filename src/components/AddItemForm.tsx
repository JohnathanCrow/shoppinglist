import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface AddItemFormProps {
  onAddItem: (name: string) => void;
}

export function AddItemForm({ onAddItem }: AddItemFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddItem(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 px-3 py-1.5 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
        />
        <button
          type="submit"
          className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          Add
        </button>
      </div>
    </form>
  );
}