import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white text-xs px-3 py-2 rounded shadow flex items-center gap-2">
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 hover:text-white cursor-pointer ml-1"
      >
        ✕
      </button>
    </div>
  );
};
