import React, { useEffect, useState, useRef } from 'react';
import { ListPlus, Download, Upload, X } from 'lucide-react';
import { AddItemForm } from './components/AddItemForm';
import { ItemList } from './components/ItemList';
import { WeeklyShop } from './components/WeeklyShop';
import { ResetDatabase } from './components/ResetDatabase';
import { Item } from './types';

function App() {
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('shoppingItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [showResetModal, setShowResetModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('shoppingItems', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (name: string) => {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        inWeeklyShop: false,
        quantity: 1,
        lastAdded: new Date().toISOString(),
      },
    ]);
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
      prev.map((item) =>
        item.id === id ? { ...item, note } : item
      )
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
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shopping-list-backup-${new Date().toISOString().split('T')[0]}.json`;
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
        console.error('Error loading backup:', error);
        alert('Invalid backup file');
      }
    };
    reader.readAsText(file);
    if (event.target) {
      event.target.value = '';
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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full lg:w-[calc(50%-180px)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ListPlus className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold">Shopping List</h1>
              </div>
            </div>
            <div className="space-y-6">
              <AddItemForm onAddItem={handleAddItem} />
              <ItemList
                items={items}
                onToggleWeeklyShop={handleToggleWeeklyShop}
                onDeleteItem={handleDeleteItem}
                onReorder={handleReorder}
              />
            </div>
          </div>
          <div className="w-full lg:w-[360px] shrink-0">
            <div className="flex gap-2 mb-6">
              <button
                onClick={handleBackupDatabase}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-base"
              >
                <Download className="w-5 h-5" />
                Save
              </button>
              <button
                onClick={handleLoadBackup}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-base"
              >
                <Upload className="w-5 h-5" />
                Load
              </button>
              <button
                onClick={() => setShowResetModal(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-base"
              >
                <X className="w-5 h-5" />
                Reset
              </button>
            </div>
            <WeeklyShop
              items={items}
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
    </div>
  );
}

export default App;