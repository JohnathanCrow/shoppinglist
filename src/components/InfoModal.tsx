import React from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  onClose: () => void;
}

export function InfoModal({ onClose }: InfoModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">How to Use</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4 text-gray-300">
          <section>
            <h4 className="font-semibold text-white mb-2">General</h4>
            <ul className="list-disc list-inside space-y-1">
              <p>Welcome! This shopping list web app saves its data to your device via your browser. Remember to back up your shopping list if you are clearing browser data or switching to a new browser.</p>
            </ul>
          </section>
          
          <section>
            <h4 className="font-semibold text-white mb-2">Database</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Type an item name and click Add or press Enter</li>
              <li>Prepend a dash to create a divider (e.g., "-Fruit")</li>
              <li>Append a divider input after an item to automatically place the item (e.g., "Bread -Baked")</li>
              <li>Drag the left edge of items to reorder them</li>
              <li>Click the pencil icon to edit an item</li>
              <li>Click the x icon to remove an item</li>
              <li>Click + to add an item to your weekly shop</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-white mb-2">List</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Add notes to items using the message icon</li>
              <li>Adjust quantities using the number field</li>
              <li>Click the x icon to remove an item</li>
              <li>Export your list using the clipboard, text, or image icons at the top</li>
              <li>Reset the weekly shop using the bin icon at the top</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-white mb-2">Other</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Save (green): Download a backup of your database as a .json file</li>
              <li>Load (Amber): Restore a previous backup of your database from a .json file</li>
              <li>Reset (Red): Remove all database and list entries (irreversable!)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
