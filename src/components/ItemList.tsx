import React, { useState } from 'react';
import { Check, Plus, X, GripVertical, Pencil } from 'lucide-react';
import { Item } from '../types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { EditItemModal } from './EditItemModal';

interface ItemListProps {
  items: Item[];
  onToggleWeeklyShop: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  onEditItem: (id: string, name: string) => void;
}

export function ItemList({ items, onToggleWeeklyShop, onDeleteItem, onReorder, onEditItem }: ItemListProps) {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="space-y-2"
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        item.type === 'divider' ? '' : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div {...provided.dragHandleProps} className="text-gray-400 cursor-grab">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        {item.type === 'item' && (
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
                        )}
                        {item.type === 'divider' && (
                          <>
                            {item.name && (
                              <span className="font-bold text-gray-400 text-base">
                                {item.name}
                              </span>
                            )}
                            <div className="h-[1px] bg-gray-600 flex-1" />
                          </>
                        )}
                        {item.type === 'item' && (
                          <span className="text-gray-200 text-base">
                            {item.name}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItemId(item.id)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {editingItemId && (
        <EditItemModal
          item={items.find(item => item.id === editingItemId)!}
          onSave={(name) => {
            onEditItem(editingItemId, name);
            setEditingItemId(null);
          }}
          onClose={() => setEditingItemId(null)}
        />
      )}
    </>
  );
}