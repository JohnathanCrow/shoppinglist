import React from "react";
import { AlertTriangle } from "lucide-react";

interface ResetDatabaseProps {
  onReset: () => void;
  onClose: () => void;
}

export function ResetDatabase({ onReset, onClose }: ResetDatabaseProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4 text-red-500">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-xl font-semibold">Reset Database</h3>
        </div>

        <p className="text-yellow-500 mb-6">
          Caution! This will reset your entire database. This action
          cannot be undone.
        </p>
        <p className="text-gray-200 mb-6">
          If you only want to reset your current shopping list click the bin icon in the top right of the list column. </p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
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
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
