import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    children?: React.ReactNode;
    onCancel: () => void;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
  }

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title = 'Tem certeza?',
    children,
    onCancel,
    onConfirm,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          {children && <div className="mb-4 text-gray-700">{children}</div>}
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ConfirmModal;
