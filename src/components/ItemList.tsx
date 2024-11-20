import React from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';
import { Item } from '../types';

interface ItemListProps {
  items: Item[];
  onToggleWeeklyShop: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export function ItemList({ items, onToggleWeeklyShop, onDeleteItem }: ItemListProps) {
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-200 capitalize">{category}</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onToggleWeeklyShop(item.id)}
                    className={`p-2 rounded-full transition-colors ${
                      item.inWeeklyShop
                        ? 'bg-emerald-500 hover:bg-emerald-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {item.inWeeklyShop ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <span className="text-gray-200">{item.name}</span>
                </div>
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}