import { useRef } from 'react';
import { Item } from '../types';
import { loadData, saveData } from '../utils/storage';

export function useFileHandling(setItems: (items: Item[]) => void) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBackupDatabase = async () => {
    const data = await loadData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (Array.isArray(data.items)) {
        await saveData(data);
        setItems(data.items);
      }
    } catch (error) {
      console.error('Error Loading Backup:', error);
      alert('Invalid Backup File');
    }

    if (event.target) {
      event.target.value = '';
    }
  };

  return {
    fileInputRef,
    handleBackupDatabase,
    handleLoadBackup,
    handleFileChange
  };
}