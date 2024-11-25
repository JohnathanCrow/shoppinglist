import React from 'react';
import { ShoppingCart, X, FileText, Image, Clipboard, Trash2 } from 'lucide-react';
import { Item } from '../types';
import html2canvas from 'html2canvas';

interface WeeklyShopProps {
  items: Item[];
  onToggleWeeklyShop: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onResetWeeklyShop: () => void;
}

export function WeeklyShop({ 
  items, 
  onToggleWeeklyShop, 
  onUpdateQuantity,
  onResetWeeklyShop 
}: WeeklyShopProps) {
  const weeklyItems = items.filter((item) => item.inWeeklyShop);

  const getFormattedList = () => {
    return weeklyItems
      .map((item) => item.quantity > 1 ? `${item.name} x${item.quantity}` : item.name)
      .join('\n');
  };

  const handleCopyToClipboard = async () => {
    const text = getFormattedList();
    await navigator.clipboard.writeText(text);
  };

  const handleExportText = () => {
    const text = getFormattedList();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shopping-list.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportImage = async () => {
    const element = document.getElementById('weekly-shop-export');
    if (!element) return;

    // Make the element visible but positioned off-screen
    element.style.position = 'fixed';
    element.style.left = '-9999px';
    element.style.top = '0';
    element.style.display = 'block';
    
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#1a1b1e',
        scale: 2, // Increase quality
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'shopping-list.png';
      a.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      // Reset the element to hidden
      element.style.display = 'none';
      element.style.position = 'static';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-full sticky top-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">List</h2>
          <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded-full text-xs">
            {weeklyItems.length}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopyToClipboard}
            className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
            title="Copy to clipboard"
          >
            <Clipboard className="w-4 h-4" />
          </button>
          <button
            onClick={handleExportText}
            className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
            title="Save as text"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={handleExportImage}
            className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
            title="Save as image"
          >
            <Image className="w-4 h-4" />
          </button>
          <button
            onClick={onResetWeeklyShop}
            className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
            title="Reset weekly shop"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main interactive list */}
      <div className="space-y-1.5">
        {weeklyItems.length === 0 ? (
          <p className="text-gray-400 text-sm">Add items to your weekly shop</p>
        ) : (
          <div className="space-y-1.5">
            {weeklyItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-700"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-200 text-sm">{item.name}</span>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="w-14 px-1.5 py-0.5 rounded bg-gray-600 text-white border border-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
                <button
                  onClick={() => onToggleWeeklyShop(item.id)}
                  className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden element for image export */}
      <div id="weekly-shop-export" className="hidden">
        <div style={{ width: '300px', padding: '16px', backgroundColor: '#1a1b1e', color: '#e5e7eb' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#d1d5db' }}>Shopping List</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {weeklyItems.map((item) => (
              <div key={item.id} style={{ fontSize: '16px' }}>
                {item.name}{item.quantity > 1 ? ` x${item.quantity}` : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}