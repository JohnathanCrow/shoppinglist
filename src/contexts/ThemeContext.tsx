// Theme context for managing application-wide dark/light mode
import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/storage';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Theme;
}

export function ThemeProvider({ children, initialTheme = 'dark' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Load theme from server on mount
  useEffect(() => {
    loadData().then(data => setTheme(data.theme));
  }, []);

  // Save theme to server when it changes
  useEffect(() => {
    loadData().then(data => {
      saveData({ ...data, theme });
    });
    document.documentElement.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}