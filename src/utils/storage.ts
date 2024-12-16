import { Item } from '../types';

const API_URL = '/api';

interface StorageData {
  items: Item[];
  theme: 'light' | 'dark';
}

const DEFAULT_DATA: StorageData = {
  items: [],
  theme: 'dark'
};

export async function loadData(): Promise<StorageData> {
  try {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) throw new Error('Failed to load data');
    const data = await response.json();
    return {
      ...DEFAULT_DATA,
      ...data
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return DEFAULT_DATA;
  }
}

export async function saveData(data: StorageData): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to save data');
  } catch (error) {
    console.error('Error saving data:', error);
  }
}