import React from 'react';
import { Download, ShoppingCart, Trash2, X } from 'lucide-react';
import { Item } from '../types';
import { ExportList } from './ExportList';

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
  const [showExport, setShowExport] = React.useState(false);

  return (
    <div className="bg-gray-800 rounded-lg p-6 h-full sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">List</h2>
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
            {weeklyItems.length}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowExport(true)}
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
            title="Export list"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={onResetWeeklyShop}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            title="Reset weekly shop"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      {weeklyItems.length === 0 ? (
        <p className="text-gray-400">Add items to your weekly shop</p>
      ) : (
        <div className="space-y-2">
          {weeklyItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-200">{item.name}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1 rounded bg-gray-600 text-white border border-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={() => onToggleWeeklyShop(item.id)}
                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {showExport && (
        <ExportList
          items={weeklyItems}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}