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
import html2canvas from "html2canvas";
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

  const getFormattedItemText = (item: Item) => {
    let text = item.name;
    if (item.note) {
      text += ` (${item.note})`;
    }
    if (item.quantity > 1) {
      text += ` x${item.quantity}`;
    }
    return text;
  };

  const getFormattedList = () => {
    return weeklyItems.map(getFormattedItemText).join("\n");
  };

  const handleCopyToClipboard = async () => {
    const text = getFormattedList();
    await navigator.clipboard.writeText(text);
  };

  const handleExportText = () => {
    const text = getFormattedList();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shopping-list.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportImage = async () => {
    const element = document.getElementById("weekly-shop-export");
    if (!element) return;

    element.style.position = "fixed";
    element.style.left = "-9999px";
    element.style.top = "0";
    element.style.display = "block";

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: theme === 'light' ? "#f0f4f8" : "#1a1b1e",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "shopping-list.png";
      a.click();
    } catch (error) {
      console.error("Error Generating Image:", error);
    } finally {
      element.style.display = "none";
      element.style.position = "static";
    }
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg p-5 sticky top-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ListPlus className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-200">List</h2>
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
              {weeklyItems.length}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopyToClipboard}
              className="p-2 text-gray-400 hover:text-green-500 transition-colors"
              title="Copy to Clipboard"
            >
              <Clipboard className="w-5 h-5" />
            </button>
            <button
              onClick={handleExportText}
              className="p-2 text-gray-400 hover:text-green-500 transition-colors"
              title="Save as Text File"
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={handleExportImage}
              className="p-2 text-gray-400 hover:text-green-500 transition-colors"
              title="Save as Image File"
            >
              <FileImage className="w-5 h-5" />
            </button>
            <button
              onClick={onResetWeeklyShop}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Clear List"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {weeklyItems.length === 0 ? (
            <p className="text-gray-400 text-base">
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
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-12 px-2 py-1 rounded text-gray-400 dark:text-white border border-gray-400/20 dark:border-gray-400/20 focus:outline-none focus:border-blue-600/50 text-sm bg-gray-800"
                      title="Change Quantity"
                    />
                    <button
                      onClick={() => onToggleWeeklyShop(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove Item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hidden element for image export */}
        <div id="weekly-shop-export" className="hidden">
          <div
            style={{
              width: "300px",
              padding: "20px",
              backgroundColor: theme === 'light' ? "#f0f4f8" : "#1a1b1e",
              color: theme === 'light' ? "#374151" : "#e5e7eb",
            }}
          >
            <div style={{ 
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}>
              <ShoppingCart 
                style={{ 
                  width: "24px",
                  height: "24px",
                  color: "#2563eb",
                  position: "relative",
                  top: "0px"
                }}
              />
              <h2 style={{
                fontSize: "26px",
                fontFamily: "'Dancing Script', cursive",
                color: theme === 'light' ? "#374151" : "#d1d5db",
                margin: 0,
                padding: 0,
                lineHeight: 1,
                marginTop: -27
              }}>
                Shopping List
              </h2>
            </div>
            <div
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "10px",
                fontFamily: "system-ui, -apple-system, sans-serif"
              }}
            >
              {weeklyItems.map((item) => (
                <div 
                  key={item.id} 
                  style={{ 
                    fontSize: "16px",
                    color: theme === 'light' ? "#374151" : "#e5e7eb"
                  }}
                >
                  {getFormattedItemText(item)}
                </div>
              ))}
            </div>
          </div>
        </div>
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