import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ResetDatabaseProps {
  onReset: () => void;
  onClose: () => void;
}

export function ResetDatabase({ onReset, onClose }: ResetDatabaseProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4 text-yellow-500">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-xl font-semibold">Reset Database</h3>
        </div>
        
        <p className="text-gray-300 mb-6">
          This will permanently delete all items from your database. This action cannot be undone.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onReset();
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reset Database
          </button>
        </div>
      </div>
    </div>
  );
}