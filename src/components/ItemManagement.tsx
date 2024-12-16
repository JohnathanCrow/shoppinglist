import React from 'react';
import { Info } from 'lucide-react';
import { AddItemForm } from './AddItemForm';
import { ItemList } from './ItemList';
import { ThemeToggle } from './ThemeToggle';
import { ActionButtons } from './ActionButtons';
import { Item } from '../types';

interface ItemManagementProps {
  items: Item[];
  itemHandlers: any; // TODO: Create proper type
  modalHandlers: {
    setShowInfoModal: (show: boolean) => void;
    setShowResetModal: (show: boolean) => void;
  };
  fileHandlers: {
    handleBackupDatabase: () => void;
    handleLoadBackup: () => void;
  };
}

export function ItemManagement({
  items,
  itemHandlers,
  modalHandlers,
  fileHandlers
}: ItemManagementProps) {
  return (
    <div className="w-full md:w-[360px] md:shrink-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-0">
          <h1 className="text-3xl font-bold app-title">Shopping List</h1>
          <button
            onClick={() => modalHandlers.setShowInfoModal(true)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="How to Use"
          >
            <Info className="w-5 h-6" />
          </button>
          <ThemeToggle />
        </div>
        <ActionButtons
          onBackup={fileHandlers.handleBackupDatabase}
          onLoad={fileHandlers.handleLoadBackup}
          onReset={() => modalHandlers.setShowResetModal(true)}
        />
      </div>
      <div className="space-y-4">
        <AddItemForm onAddItem={itemHandlers.handleAddItem} />
        <ItemList
          items={items}
          onToggleWeeklyShop={itemHandlers.handleToggleWeeklyShop}
          onDeleteItem={itemHandlers.handleDeleteItem}
          onReorder={itemHandlers.handleReorder}
          onEditItem={itemHandlers.handleEditItem}
        />
      </div>
    </div>
  );
}