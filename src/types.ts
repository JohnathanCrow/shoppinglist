// Type definitions for the application
export interface Item {
  id: string;          // Unique identifier for the item
  name: string;        // Display name of the item
  inWeeklyShop: boolean; // Whether item is in current shopping list
  quantity: number;    // Number of items to purchase
  note?: string;       // Optional note for the item
  lastAdded?: string;  // Timestamp of when item was last added
  type: 'item' | 'divider'; // Type of entry (regular item or section divider)
}

export interface ExportOptions {
  format: 'text' | 'image'; // Format for exporting the shopping list
}