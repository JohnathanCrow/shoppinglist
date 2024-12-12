import React, { useState } from "react";
import {
  ListPlus,
  X,
  FileText,
  FileImage,
  Image,
  Clipboard,
  Trash2,
  MessageSquare,
  ShoppingCart,
} from "lucide-react";
import { Item } from "../types";
import { NoteModal } from "./NoteModal";
import { ExportImage } from "./ExportImage";
import { useExport } from "../hooks/useExport";
import { useTheme } from "../contexts/ThemeContext";

interface WeeklyShopProps {
  items: Item[];
  onToggleWeeklyShop: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onUpdateNote: (id: string, note: string) => void;
  onResetWeeklyShop: () => void;
}

export function WeeklyShop({
  items,
  onToggleWeeklyShop,
  onUpdateQuantity,
  onUpdateNote,
  onResetWeeklyShop,
}: WeeklyShopProps) {
  const weeklyItems = items.filter((item) => item.inWeeklyShop);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const { theme } = useTheme();
  const { handleCopyToClipboard, handleExportText, handleExportImage } = useExport(weeklyItems);

  return (
    <>
      <div className="bg-gray-800 rounded-lg p-4 sticky top-4" role="region" aria-label="Shopping List">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">

            <h2 className="text-xl text-gray-200">Basket</h2>
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm" role="status">
              {weeklyItems.length}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopyToClipboard}
              className="p-2 text-gray-400 hover:text-green-500 transition-colors"
              title="Copy to Clipboard"
              aria-label="Copy list to clipboard"
            >
              <Clipboard className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={handleExportText}
              className="p-2 text-gray-400 hover:text-green-500 transition-colors"
              title="Save as Text File"
              aria-label="Save list as text file"
            >
              <FileText className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={handleExportImage}
              className="p-2 text-gray-400 hover:text-green-500 transition-colors"
              title="Save as Image File"
              aria-label="Save list as image file"
            >
              <FileImage className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={onResetWeeklyShop}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Clear List"
              aria-label="Clear shopping list"
            >
              <Trash2 className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {weeklyItems.length === 0 ? (
            <p className="text-gray-400 text-base" role="status">
              Add items from your database to your list...
            </p>
          ) : (
            <div className="space-y-0 bg-gray-400/5 rounded-lg">
              {weeklyItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg"
                >
                  <div className="flex-1">
                    <span className="text-gray-200 text-base">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingNoteId(item.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        item.note
                          ? "text-yellow-400 hover:text-yellow-600"
                          : "text-gray-400 hover:text-yellow-600"
                      }`}
                      title="Add/Edit Note"
                      aria-label={`${item.note ? 'Edit' : 'Add'} note for ${item.name}`}
                    >
                      <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-12 px-2 py-1 rounded text-gray-400 dark:text-gray-200 border border-gray-400/20 dark:border-gray-400/20 focus:outline-none focus:border-blue-600/50 text-sm bg-gray-800"
                      title="Change Quantity"
                      aria-label={`Quantity for ${item.name}`}
                    />
                    <button
                      onClick={() => onToggleWeeklyShop(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove Item"
                      aria-label={`Remove ${item.name} from list`}
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <ExportImage items={weeklyItems} theme={theme} />
      </div>

      {editingNoteId && (
        <NoteModal
          item={weeklyItems.find((item) => item.id === editingNoteId)!}
          onSave={(note) => {
            onUpdateNote(editingNoteId, note);
            setEditingNoteId(null);
          }}
          onClose={() => setEditingNoteId(null)}
        />
      )}
    </>
  );
}
