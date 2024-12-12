// Component for rendering the shopping list as an image
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Item } from '../types';
import { getFormattedItemText } from '../utils/formatters';

interface ExportImageProps {
  items: Item[];
  theme: 'dark' | 'light';
}

export function ExportImage({ items, theme }: ExportImageProps) {
  // Hidden container used for generating image exports
  return (
    <div id="weekly-shop-export" className="hidden">
      {/* Main container with theme-aware styling */}
      <div style={{
        width: "300px",
        padding: "20px",
        backgroundColor: theme === 'light' ? "#f0f4f8" : "#1a1b1e",
        color: theme === 'light' ? "#374151" : "#e5e7eb",
      }}>
        {/* Header section with logo and title */}
        <div style={{ 
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "20px",
        }}>
          <ShoppingCart style={{ 
            width: "24px",
            height: "24px",
            color: "#2563eb",
            position: "relative",
            top: "0px"
          }} />
          <h2 style={{
            fontSize: "26px",
            fontFamily: "'Dancing Script', cursive",
            color: theme === 'light' ? "#374151" : "#d1d5db",
            margin: 0,
            padding: 0,
            lineHeight: 1,
            marginTop: -27
          }}>
            Shopping List
          </h2>
        </div>
        {/* List of items */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "10px",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}>
          {items.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                fontSize: "16px",
                color: theme === 'light' ? "#374151" : "#e5e7eb"
              }}
            >
              {getFormattedItemText(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}