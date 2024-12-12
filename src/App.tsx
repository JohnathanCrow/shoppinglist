import React, { useEffect, useState, useRef } from "react";
import { Download, Upload, X, Info } from "lucide-react";
import { AddItemForm } from "./components/AddItemForm";
import { ItemList } from "./components/ItemList";
import { WeeklyShop } from "./components/WeeklyShop";
import { ResetDatabase } from "./components/ResetDatabase";
import { InfoModal } from "./components/InfoModal";
import { ThemeToggle } from "./components/ThemeToggle";
import { Item } from "./types";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem("shoppingItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [showResetModal, setShowResetModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("shoppingItems", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (name: string) => {
    const isDivider = name.startsWith("-");
    const dividerName = isDivider ? name.slice(1).trim() : "";

    const [itemName, sectionName] = name.split("-").map((s) => s.trim());

    const newItem = {
      id: uuidv4(),
      name: isDivider ? dividerName : itemName,
      inWeeklyShop: false,
      quantity: 1,
      lastAdded: new Date().toISOString(),
      type: isDivider ? "divider" : ("item" as const),
    };

    setItems((prev) => {
      if (isDivider) {
        return [...prev, newItem];
      }

      if (!sectionName) {
        return [...prev, newItem];
      }

      const sectionExists = prev.some(
        (item) =>
          item.type === "divider" &&
          item.name.toLowerCase() === sectionName.toLowerCase()
      );

      const updatedItems = sectionExists
        ? prev
        : [
            ...prev,
            {
              id: uuidv4(),
              name: sectionName,
              inWeeklyShop: false,
              quantity: 1,
              lastAdded: new Date().toISOString(),
              type: "divider" as const,
            },
          ];

      const sections = updatedItems.reduce<
        { start: number; end: number; name: string }[]
      >((acc, item, index) => {
        if (item.type === "divider") {
          if (acc.length > 0) {
            acc[acc.length - 1].end = index;
          }
          acc.push({ start: index, end: updatedItems.length, name: item.name });
        }
        return acc;
      }, []);

      const matchingSection = sections.find(
        (section) => section.name.toLowerCase() === sectionName.toLowerCase()
      );

      if (!matchingSection) {
        return [...updatedItems, newItem];
      }

      const finalItems = [...updatedItems];
      finalItems.splice(matchingSection.end, 0, newItem);
      return finalItems;
    });
  };

  const handleEditItem = (id: string, name: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name } : item))
    );
  };

  const handleToggleWeeklyShop = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inWeeklyShop: !item.inWeeklyShop } : item
      )
    );
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleUpdateNote = (id: string, note: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, note } : item))
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetDatabase = () => {
    setItems([]);
    setShowResetModal(false);
  };

  const handleBackupDatabase = () => {
    const data = JSON.stringify(items, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shopping-list-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadBackup = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        if (Array.isArray(parsedData)) {
          setItems(parsedData);
        }
      } catch (error) {
        console.error("Error Loading Backup:", error);
        alert("Invalid Backup");
      }
    };
    reader.readAsText(file);
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleResetWeeklyShop = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        inWeeklyShop: false,
        quantity: 1,
        note: undefined,
      }))
    );
  };

  const handleReorder = (startIndex: number, endIndex: number) => {
    const result = Array.from(items);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setItems(result);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-3 max-w-[1200px]">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div className="w-full md:w-[360px] md:shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-0">
                <h1 className="text-3xl font-bold app-title">Shopping List</h1>
                <button
                  onClick={() => setShowInfoModal(true)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="How to Use"
                >
                  <Info className="w-5 h-6" />
                </button>
                <ThemeToggle />
              </div>
              <div className="flex gap-2 md:hidden">
                <button
                  onClick={handleBackupDatabase}
                  className="flex items-center justify-center w-10 h-10 bg-green-600 text-gray-200 rounded-lg hover:bg-green-700 transition-colors"
                  title="Export Database"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={handleLoadBackup}
                  className="flex items-center justify-center w-10 h-10 bg-yellow-600 text-gray-200 rounded-lg hover:bg-yellow-700 transition-colors"
                  title="Import Database"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowResetModal(true)}
                  className="flex items-center justify-center w-10 h-10 bg-red-600 text-gray-200 rounded-lg hover:bg-red-700 transition-colors"
                  title="Reset Database"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <AddItemForm onAddItem={handleAddItem} />
              <ItemList
                items={items}
                onToggleWeeklyShop={handleToggleWeeklyShop}
                onDeleteItem={handleDeleteItem}
                onReorder={handleReorder}
                onEditItem={handleEditItem}
              />
            </div>
          </div>
          <div className="w-full md:w-[360px] md:shrink-0">
            <div className="hidden md:flex gap-3 mb-4">
              <button
                onClick={handleBackupDatabase}
                className="flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors gap-2"
                title="Export Database"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={handleLoadBackup}
                className="flex items-center justify-center w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors gap-2"
                title="Import Database"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button
                onClick={() => setShowResetModal(true)}
                className="flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors gap-2"
                title="Reset Database"
              >
                <X className="w-4 h-4" />
                Reset
              </button>
            </div>
            <WeeklyShop
              items={items.filter((item) => item.type === "item")}
              onToggleWeeklyShop={handleToggleWeeklyShop}
              onUpdateQuantity={handleUpdateQuantity}
              onUpdateNote={handleUpdateNote}
              onResetWeeklyShop={handleResetWeeklyShop}
            />
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {showResetModal && (
        <ResetDatabase
          onReset={handleResetDatabase}
          onClose={() => setShowResetModal(false)}
        />
      )}

      {showInfoModal && <InfoModal onClose={() => setShowInfoModal(false)} />}
    </div>
  );
}

export default App;
