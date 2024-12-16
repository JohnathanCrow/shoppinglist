import React from 'react';
import { WeeklyShop } from './WeeklyShop';
import { DesktopActionButtons } from './DesktopActionButtons';
import { Item } from '../types';

interface ShoppingListProps {
  items: Item[];
  itemHandlers: any; // TODO: Create proper type
  fileHandlers: {
    handleBackupDatabase: () => void;
    handleLoadBackup: () => void;
  };
}

export function ShoppingList({
  items,
  itemHandlers,
  fileHandlers
}: ShoppingListProps) {
  return (
    <div className="w-full md:w-[360px] md:shrink-0">
      <DesktopActionButtons
        onBackup={fileHandlers.handleBackupDatabase}
        onLoad={fileHandlers.handleLoadBackup}
        onReset={itemHandlers.handleResetDatabase}
      />
      <WeeklyShop
        items={items.filter((item) => item.type === "item")}
        onToggleWeeklyShop={itemHandlers.handleToggleWeeklyShop}
        onUpdateQuantity={itemHandlers.handleUpdateQuantity}
        onUpdateNote={itemHandlers.handleUpdateNote}
        onResetWeeklyShop={itemHandlers.handleResetWeeklyShop}
      />
    </div>
  );
}