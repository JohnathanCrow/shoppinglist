import React, { useEffect, useState, useRef } from 'react';
import { ListPlus, Download, Upload, XCircle } from 'lucide-react';
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
      <div className="container mx-auto px-3 py-6 max-w-[1400px]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ListPlus className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl font-bold">Shopping List</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBackupDatabase}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleLoadBackup}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
            >
              <Upload className="w-4 h-4" />
              Load
            </button>
            <button
              onClick={() => setShowResetModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              <XCircle className="w-4 h-4" />
              Reset
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:min-w-0 lg:w-[calc(100%-340px)] space-y-4">
            <AddItemForm onAddItem={handleAddItem} />
            <ItemList
              items={items}
              onToggleWeeklyShop={handleToggleWeeklyShop}
              onDeleteItem={handleDeleteItem}
              onReorder={handleReorder}
            />
          </div>
          <div className="w-full lg:w-[320px] shrink-0">
            <WeeklyShop
              items={items}
              onToggleWeeklyShop={handleToggleWeeklyShop}
              onUpdateQuantity={handleUpdateQuantity}
              onResetWeeklyShop={handleResetWeeklyShop}
            />
          </div>
        </div>
      </div>

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