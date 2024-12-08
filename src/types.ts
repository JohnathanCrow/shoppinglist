export interface Item {
  id: string;
  name: string;
  inWeeklyShop: boolean;
  quantity: number;
  note?: string;
  lastAdded?: string;
  type: 'item' | 'divider';
}

export interface ExportOptions {
  format: 'text' | 'image';
}