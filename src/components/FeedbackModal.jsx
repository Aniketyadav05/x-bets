// FeedbackModal.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimes } from 'react-icons/fa'; // Importing check and close icons

const FeedbackModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Set submitted state to true
    // Here you can handle the form submission logic (e.g., send data to server)
    
    setTimeout(() => {
      onClose(); // Close modal after a delay
    }, 2000); // Close modal after 2 seconds
  };

  if (!isOpen) return null; // Render nothing if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <motion.div
        className="bg-white rounded-lg p-6 shadow-lg w-96 relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        >
          <FaTimes size={20} />
        </button>
        
        {!isSubmitted ? (
          <>
            <h2 className="text-xl font-bold mb-4">Feedback Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#399918] text-white py-2 px-4 rounded-lg hover:bg-[#4caf50]"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 text-red-600 ml-6"
              >
                Cancel
              </button>
            </form>
          </>
        ) : (
          // Show submitted message with tick icon
          <motion.div
            className="text-center flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaCheckCircle className="text-green-500 mb-2" size={40} />
            <h2 className="text-xl font-bold mb-4 text-green-500">Submitted</h2>
            <p className="text-gray-700">Thank you for your feedback!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default FeedbackModal;
