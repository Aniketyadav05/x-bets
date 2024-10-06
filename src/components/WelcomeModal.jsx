import React from 'react';

const WelcomeModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Welcome New User!</h2>
        <p>We're giving you ₹200 as a welcome bonus!</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
