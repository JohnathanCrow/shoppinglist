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
            <h4 className="font-semibold text-white mb-2">Adding Items</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Type an item name and click Add or press Enter</li>
              <li>To add an item to a section, type "item-section" (e.g., "Bread-Baked")</li>
              <li>To create a section divider, type "- Section Name" (e.g., "- Frozen")</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-white mb-2">Managing Items</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Click + to add an item to your weekly shop</li>
              <li>Drag items to reorder them</li>
              <li>Click the pencil icon to edit an item</li>
              <li>Click X to remove an item</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-white mb-2">Weekly Shop List</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Adjust quantities using the number input</li>
              <li>Add notes to items using the message icon</li>
              <li>Export your list using the clipboard, text, or image options</li>
              <li>Reset the weekly shop to clear all selections</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-white mb-2">Database Management</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Save: Download a backup of your database</li>
              <li>Load: Restore from a previous backup</li>
              <li>Reset: Clear all items (use with caution!)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}