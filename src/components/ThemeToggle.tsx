// Component for toggling between light and dark themes
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  // Get current theme and toggle function from context
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-0 text-gray-400 hover:text-blue-600 transition-colors"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
    >
      {/* Show sun icon for dark mode, moon icon for light mode */}
      {theme === 'dark' ? (
        <Sun className="w-5 h-6" />
      ) : (
        <Moon className="w-5 h-6" />
      )}
    </button>
  );
}