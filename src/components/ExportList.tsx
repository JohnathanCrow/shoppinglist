import React, { useRef } from 'react';
import { FileText, Image, X, Clipboard } from 'lucide-react';
import { Item } from '../types';
import html2canvas from 'html2canvas';

interface ExportListProps {
  items: Item[];
  onClose: () => void;
}

export function ExportList({ items, onClose }: ExportListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // Function to format the list items into a string
  const getFormattedList = () => {
    return items
      .map((item) => item.quantity > 1 ? `${item.name} x${item.quantity}` : item.name)
      .join('\n');
  };

  // Function to export the list as a text file
  const exportAsText = () => {
    const text = getFormattedList();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shopping-list.txt';
    a.click();
    URL.revokeObjectURL(url);
    onClose();
  };

  // Function to copy the list to the clipboard
  const copyToClipboard = async () => {
    const text = getFormattedList();
    await navigator.clipboard.writeText(text);
    onClose();
  };

  // Function to export the list as an image
  const exportAsImage = async () => {
    if (!listRef.current) return;
    
    const canvas = await html2canvas(listRef.current);
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shopping-list.png';
    a.click();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {/* Overlay for the export modal */}
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div ref={listRef} className="bg-gray-700 p-4 rounded-lg mb-4">
          <h4 className="text-lg font-semibold mb-2">Shopping List</h4>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between py-1">
              <span>{item.quantity > 1 ? `${item.name} x${item.quantity}` : item.name}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={copyToClipboard}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-gray-200 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Clipboard className="w-4 h-4" />
            Copy to Clipboard
          </button>
          <button
            onClick={exportAsText}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-gray-200 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Save as Text
          </button>
          <button
            onClick={exportAsImage}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-gray-200 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Image className="w-4 h-4" />
            Save as Image
          </button>
        </div>
      </div>
    </div>
  );
}
