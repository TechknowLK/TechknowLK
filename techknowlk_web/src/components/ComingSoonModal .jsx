import React from "react";

const ComingSoonModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-bounce">
        <h2 className="text-2xl font-bold text-[#33A1E0] mb-2">🚀 Coming Soon</h2>
        <p className="text-gray-600 mb-4">
          This feature is still in progress. Stay tuned!
        </p>
        <button
          onClick={onClose}
          className="bg-[#33A1E0] text-white px-6 py-2 rounded-lg hover:bg-[#2285c5] transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default ComingSoonModal;
