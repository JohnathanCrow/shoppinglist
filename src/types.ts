export interface Item {
  id: string;
  name: string;
  category: string;
  inWeeklyShop: boolean;
  quantity: number;
  lastAdded?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface ExportOptions {
  format: 'text' | 'image';
}