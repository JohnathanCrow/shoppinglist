// Custom hook for handling list export functionality
import { useCallback } from 'react';
import html2canvas from 'html2canvas';
import { Item } from '../types';
import { getFormattedList } from '../utils/formatters';

export function useExport(items: Item[]) {
  // Copy list to clipboard
  const handleCopyToClipboard = useCallback(async () => {
    const text = getFormattedList(items);
    await navigator.clipboard.writeText(text);
  }, [items]);

  // Export list as text file
  const handleExportText = useCallback(() => {
    const text = getFormattedList(items);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shopping-list.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [items]);

  // Export list as image
  const handleExportImage = useCallback(async () => {
    const element = document.getElementById("weekly-shop-export");
    if (!element) return;

    // Position element for capture
    element.style.position = "fixed";
    element.style.left = "-9999px";
    element.style.top = "0";
    element.style.display = "block";

    try {
      // Generate and download image
      const canvas = await html2canvas(element, {
        backgroundColor: document.documentElement.classList.contains('light-mode') ? "#f0f4f8" : "#1a1b1e",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "shopping-list.png";
      a.click();
    } catch (error) {
      console.error("Error Generating Image:", error);
    } finally {
      // Reset element position
      element.style.display = "none";
      element.style.position = "static";
    }
  }, []);

  return {
    handleCopyToClipboard,
    handleExportText,
    handleExportImage,
  };
}