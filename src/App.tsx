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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ListPlus className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Shopping List</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleBackupDatabase}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleLoadBackup}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Load
            </button>
            <button
              onClick={() => setShowResetModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AddItemForm onAddItem={handleAddItem} />
            <ItemList
              items={items}
              onToggleWeeklyShop={handleToggleWeeklyShop}
              onDeleteItem={handleDeleteItem}
              onReorder={handleReorder}
            />
          </div>
          <div className="lg:sticky lg:top-8">
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