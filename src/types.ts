export interface Item {
  id: string;
  name: string;
  inWeeklyShop: boolean;
  quantity: number;
  lastAdded?: string;
}

export interface ExportOptions {
  format: 'text' | 'image';
}