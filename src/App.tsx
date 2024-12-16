import React from 'react';
import { AppHeader } from './components/AppHeader';
import { MainContent } from './components/MainContent';
import { useItems } from './hooks/useItems';
import { useModals } from './hooks/useModals';
import { useFileHandling } from './hooks/useFileHandling';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const {
    items,
    setItems,
    ...itemHandlers
  } = useItems();
  
  const {
    showResetModal,
    showInfoModal,
    setShowResetModal,
    setShowInfoModal
  } = useModals();

  const fileHandlers = useFileHandling(setItems);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <div className="container mx-auto px-4 py-3 max-w-[1200px]">
          <MainContent
            items={items}
            itemHandlers={itemHandlers}
            modalHandlers={{
              showResetModal,
              showInfoModal,
              setShowResetModal,
              setShowInfoModal
            }}
            fileHandlers={fileHandlers}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}