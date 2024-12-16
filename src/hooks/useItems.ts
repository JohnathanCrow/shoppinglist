import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Item } from '../types';
import { loadData, saveData } from '../utils/storage';

// Helper function for adding items to sections
function addItemToSection(items: Item[], newItem: Item, sectionName: string) {
  const sectionExists = items.some(
    (item) => item.type === "divider" && 
    item.name.toLowerCase() === sectionName.toLowerCase()
  );

  const updatedItems = sectionExists ? items : [
    ...items,
    {
      id: uuidv4(),
      name: sectionName,
      inWeeklyShop: false,
      quantity: 1,
      lastAdded: new Date().toISOString(),
      type: "divider" as const,
    }
  ];

  const sections = updatedItems.reduce<{ start: number; end: number; name: string }[]>(
    (acc, item, index) => {
      if (item.type === "divider") {
        if (acc.length > 0) {
          acc[acc.length - 1].end = index;
        }
        acc.push({ start: index, end: updatedItems.length, name: item.name });
      }
      return acc;
    },
    []
  );

  const matchingSection = sections.find(
    (section) => section.name.toLowerCase() === sectionName.toLowerCase()
  );

  if (!matchingSection) {
    return [...updatedItems, newItem];
  }

  const finalItems = [...updatedItems];
  finalItems.splice(matchingSection.end, 0, newItem);
  return finalItems;
}

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);

  // Load items from server on mount
  useEffect(() => {
    loadData().then(data => setItems(data.items));
  }, []);

  // Save items to server when they change
  useEffect(() => {
    loadData().then(data => {
      saveData({ ...data, items });
    });
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
      if (isDivider) return [...prev, newItem];
      if (!sectionName) return [...prev, newItem];
      return addItemToSection(prev, newItem, sectionName);
    });
  };

  const handleEditItem = (id: string, name: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, name } : item
    ));
  };

  const handleToggleWeeklyShop = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, inWeeklyShop: !item.inWeeklyShop } : item
    ));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const handleUpdateNote = (id: string, note: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, note } : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleResetDatabase = () => {
    setItems([]);
  };

  const handleResetWeeklyShop = () => {
    setItems(prev => prev.map(item => ({
      ...item,
      inWeeklyShop: false,
      quantity: 1,
      note: undefined,
    })));
  };

  const handleReorder = (startIndex: number, endIndex: number) => {
    setItems(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return {
    items,
    setItems,
    handleAddItem,
    handleEditItem,
    handleToggleWeeklyShop,
    handleUpdateQuantity,
    handleUpdateNote,
    handleDeleteItem,
    handleResetDatabase,
    handleResetWeeklyShop,
    handleReorder,
  };
}