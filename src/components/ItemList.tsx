import React from 'react';
import { Check, Plus, Trash2, GripVertical } from 'lucide-react';
import { Item } from '../types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ItemListProps {
  items: Item[];
  onToggleWeeklyShop: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export function ItemList({ items, onToggleWeeklyShop, onDeleteItem, onReorder }: ItemListProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
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
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div {...provided.dragHandleProps} className="text-gray-400 cursor-grab">
                        <GripVertical className="w-4 h-4" />
                      </div>
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}