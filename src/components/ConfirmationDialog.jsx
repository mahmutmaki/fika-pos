import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ConfirmationDialog({ confirmModal, setConfirmModal }) {
  if (!confirmModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertCircle size={28} />
          <h3 className="text-xl font-bold text-stone-800">{confirmModal.title}</h3>
        </div>
        <p className="text-stone-600 mb-6 leading-relaxed">{confirmModal.message}</p>
        <div className="flex gap-3 justify-end">
          <button 
            onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })} 
            className="px-5 py-2 rounded-lg font-medium text-stone-600 hover:bg-stone-100 transition-colors"
          >
            İptal
          </button>
          <button 
            onClick={confirmModal.onConfirm} 
            className="px-5 py-2 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-100 transition-colors"
          >
            Evet, Onayla
          </button>
        </div>
      </div>
    </div>
  );
}

