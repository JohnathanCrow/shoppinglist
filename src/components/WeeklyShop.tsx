import React, { useState } from "react";
import {
  ListPlus,
  X,
  FileText,
  Image,
  Clipboard,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { Item } from "../types";
import { NoteModal } from "./NoteModal";
import html2canvas from "html2canvas";

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
        backgroundColor: "#1a1b1e",
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
      console.error("Error generating image:", error);
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
            <h2 className="text-xl font-semibold text-white">List</h2>
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
              {weeklyItems.length}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopyToClipboard}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Copy list to clipboard"
            >
              <Clipboard className="w-5 h-5" />
            </button>
            <button
              onClick={handleExportText}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Save list as text file"
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={handleExportImage}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Save list as image"
            >
              <Image className="w-5 h-5" />
            </button>
            <button
              onClick={onResetWeeklyShop}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Clear shopping list"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {weeklyItems.length === 0 ? (
            <p className="text-gray-400 text-base">
              Add items to your weekly shop
            </p>
          ) : (
            <div className="space-y-2">
              {weeklyItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-700"
                >
                  <div className="flex-1">
                    <span className="text-gray-200 text-base">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingNoteId(item.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        item.note
                          ? "text-blue-600 hover:text-blue-500"
                          : "text-gray-400 hover:text-gray-300"
                      }`}
                      title="Add note to item"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        onUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-12 px-2 py-1 rounded bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                      title="Change quantity"
                    />
                    <button
                      onClick={() => onToggleWeeklyShop(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                      title="Remove from list"
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
              backgroundColor: "#1a1b1e",
              color: "#e5e7eb",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                marginBottom: "20px",
                color: "#d1d5db",
              }}
            >
              Shopping List
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {weeklyItems.map((item) => (
                <div key={item.id} style={{ fontSize: "18px" }}>
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
