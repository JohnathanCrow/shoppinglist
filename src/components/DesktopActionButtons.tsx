import React from 'react';
import { Download, Upload, X } from 'lucide-react';

interface DesktopActionButtonsProps {
  onBackup: () => void;
  onLoad: () => void;
  onReset: () => void;
}

export function DesktopActionButtons({ onBackup, onLoad, onReset }: DesktopActionButtonsProps) {
  return (
    <div className="hidden md:flex gap-3 mb-4">
      <button
        onClick={onBackup}
        className="flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors gap-2"
        title="Export Database"
      >
        <Download className="w-4 h-4" />
        Export
      </button>
      <button
        onClick={onLoad}
        className="flex items-center justify-center w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors gap-2"
        title="Import Database"
      >
        <Upload className="w-4 h-4" />
        Import
      </button>
      <button
        onClick={onReset}
        className="flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors gap-2"
        title="Reset Database"
      >
        <X className="w-4 h-4" />
        Reset
      </button>
    </div>
  );
}