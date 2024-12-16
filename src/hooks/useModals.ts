import { useState } from 'react';

export function useModals() {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  return {
    showResetModal,
    showInfoModal,
    setShowResetModal,
    setShowInfoModal
  };
}