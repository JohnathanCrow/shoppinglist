import React from 'react';
import { Download, Upload, X } from 'lucide-react';

interface ActionButtonsProps {
  onBackup: () => void;
  onLoad: () => void;
  onReset: () => void;
}

export function ActionButtons({ onBackup, onLoad, onReset }: ActionButtonsProps) {
  return (
    <div className="flex gap-2 md:hidden">
      <button
        onClick={onBackup}
        className="flex items-center justify-center w-10 h-10 bg-green-600 text-gray-200 rounded-lg hover:bg-green-700 transition-colors"
        title="Export Database"
      >
        <Download className="w-4 h-4" />
      </button>
      <button
        onClick={onLoad}
        className="flex items-center justify-center w-10 h-10 bg-yellow-600 text-gray-200 rounded-lg hover:bg-yellow-700 transition-colors"
        title="Import Database"
      >
        <Upload className="w-4 h-4" />
      </button>
      <button
        onClick={onReset}
        className="flex items-center justify-center w-10 h-10 bg-red-600 text-gray-200 rounded-lg hover:bg-red-700 transition-colors"
        title="Reset Database"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}