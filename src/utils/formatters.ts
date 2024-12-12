// Utility functions for formatting shopping list items
import { Item } from '../types';

// Format a single item with its note and quantity
export function getFormattedItemText(item: Item): string {
  let text = item.name;
  if (item.note) {
    text += ` (${item.note})`;
  }
  if (item.quantity > 1) {
    text += ` x${item.quantity}`;
  }
  return text;
}

// Format entire list of items as text
export function getFormattedList(items: Item[]): string {
  return items.map(getFormattedItemText).join("\n");
}