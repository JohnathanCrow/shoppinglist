import React from 'react';
import { ItemManagement } from './ItemManagement';
import { ShoppingList } from './ShoppingList';
import { ResetDatabase } from './ResetDatabase';
import { InfoModal } from './InfoModal';
import { Item } from '../types';

interface MainContentProps {
  items: Item[];
  itemHandlers: any; // TODO: Create proper type
  modalHandlers: {
    showResetModal: boolean;
    showInfoModal: boolean;
    setShowResetModal: (show: boolean) => void;
    setShowInfoModal: (show: boolean) => void;
  };
  fileHandlers: any; // TODO: Create proper type
}

export function MainContent({
  items,
  itemHandlers,
  modalHandlers,
  fileHandlers
}: MainContentProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <ItemManagement
        items={items}
        itemHandlers={itemHandlers}
        modalHandlers={modalHandlers}
        fileHandlers={fileHandlers}
      />
      <ShoppingList
        items={items}
        itemHandlers={itemHandlers}
        fileHandlers={fileHandlers}
      />
      
      {modalHandlers.showResetModal && (
        <ResetDatabase
          onReset={itemHandlers.handleResetDatabase}
          onClose={() => modalHandlers.setShowResetModal(false)}
        />
      )}
      
      {modalHandlers.showInfoModal && (
        <InfoModal
          onClose={() => modalHandlers.setShowInfoModal(false)}
        />
      )}
      
      <input
        type="file"
        ref={fileHandlers.fileInputRef}
        onChange={fileHandlers.handleFileChange}
        accept=".json"
        className="hidden"
      />
    </div>
  );
}