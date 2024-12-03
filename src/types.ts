export interface Item {
  id: string;
  name: string;
  inWeeklyShop: boolean;
  quantity: number;
  note?: string;
  lastAdded?: string;
}

export interface ExportOptions {
  format: 'text' | 'image';
}