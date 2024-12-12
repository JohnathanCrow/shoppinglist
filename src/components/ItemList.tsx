// Component for displaying and managing the database items
import React, { useState } from "react";
import { Check, Plus, X, GripVertical, Pencil } from "lucide-react";
import { Item } from "../types";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { EditItemModal } from "./EditItemModal";

interface ItemListProps {
  items: Item[];
  onToggleWeeklyShop: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  onEditItem: (id: string, name: string) => void;
}

export function ItemList({
  items,
  onToggleWeeklyShop,
  onDeleteItem,
  onReorder,
  onEditItem,
}: ItemListProps) {
  // State for tracking which item is being edited
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <>
      {/* Drag and drop context for item reordering */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {/* Map through items and render each one */}
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        item.type === "divider"
                          ? ""
                          : "bg-gray-800 dark:bg-gray-800 hover:bg-gray-400/20"
                      }`}
                    >
                      {/* Item content and controls */}
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          {...provided.dragHandleProps}
                          className="text-gray-400 cursor-grab"
                        >
                          <GripVertical className="w-5 h-5" />
                        </div>
                        {/* Toggle button for regular items */}
                        {item.type === "item" && (
                          <button
                            onClick={() => onToggleWeeklyShop(item.id)}
                            className={`p-2 rounded-full transition-colors ${
                              item.inWeeklyShop
                                ? "bg-green-600 hover:bg-emerald-700"
                                : "bg-gray-700 hover:bg-gray-400"
                            }`}
                            title={
                              item.inWeeklyShop
                                ? "Remove from List"
                                : "Add to List"
                            }
                          >
                            {item.inWeeklyShop ? (
                              <Check className="w-4 h-4 text-gray-200" />
                            ) : (
                              <Plus className="w-4 h-4 text-gray-200" />
                            )}
                          </button>
                        )}
                        {/* Display name based on item type */}
                        {item.type === "divider" ? (
                          <span className="font-bold text-gray-200 text-base">
                            {item.name}
                          </span>
                        ) : (
                          <span className="text-gray-200 dark:text-gray-200 text-base">
                            {item.name}
                          </span>
                        )}
                      </div>
                      {/* Item actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItemId(item.id)}
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                          title="Edit Item"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete Item"
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

      {/* Edit modal */}
      {editingItemId && (
        <EditItemModal
          item={items.find((item) => item.id === editingItemId)!}
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