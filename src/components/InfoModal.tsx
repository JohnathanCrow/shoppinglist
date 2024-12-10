import React from "react";
import { X } from "lucide-react";

interface InfoModalProps {
  onClose: () => void;
}

export function InfoModal({ onClose }: InfoModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg p-5 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Usage</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-gray-300">
          <section>
            <h4 className="font-semibold text-white mb-2">
              Adding Database Items
            </h4>
            <ul className="list-disc list-inside space-y-0">
              <li>
                Type an item name and click Add or press Enter (e.g., "Apple")
              </li>
              <li>Prepend a dash to create a divider (e.g., "-Fruit")</li>
              <li>
                Append a divider to automatically place the item (e.g., "Apple
                -Fruit")
              </li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-white mb-2">
              Managing Database Items
            </h4>
            <ul className="list-disc list-inside space-y-0">
              <li>Drag the left edge of an item to reorder</li>
              <li>Click the + icon to add it to your list</li>
              <li>Click the pencil icon to edit the item</li>
              <li>Click the x icon to delete the item</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-white mb-2">
              Managing List Items
            </h4>
            <ul className="list-disc list-inside space-y-0">
              <li>Add notes to items using the message icon</li>
              <li>Adjust quantities using the number input</li>
              <li>Remove items by using the x icon</li>
              <li>
                Export your list using the clipboard, text, or image options
              </li>
              <li>Reset the list using the upper right x icon</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-white mb-2">Controls</h4>
            <ul className="list-disc list-inside space-y-0">
              <li>Export: Save a backup of your database</li>
              <li>Import: Load a backup of your database</li>
              <li>Reset: Reset all items in your database (caution!)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
