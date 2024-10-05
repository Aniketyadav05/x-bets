import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import B1 from './assets/Bitcoin.png';
import B2 from './assets/Doge.png';
import B3 from './assets/Dollar.png';
import './Index.css';
import { useState } from 'react';
import FeedbackModal from './components/FeedbackModal'; 

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Testimonials data
  const testimonials = [
    { name: "John Doe", feedback: "Great platform! I love trading here!" },
    { name: "Jane Smith", feedback: "Amazing experience and support." },
    { name: "Sam Wilson", feedback: "I made profits consistently!" },
    { name: "Chris Evans", feedback: "User-friendly interface and quick transactions!" },
    { name: "Robert Stark", feedback: "I trust this platform for all my trades." },
  ];

  // FAQs data
  const faqs = [
    { question: "How do I deposit funds?", answer: "You can deposit funds via bank transfer, credit card, etc." },
    { question: "What are the fees?", answer: "We have a transparent fee structure. Check our fees page for details." },
    { question: "How can I withdraw my earnings?", answer: "You can withdraw funds using the same method you deposited." },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1F4172] p-8">
      {/* Animated Title */}
      <motion.h1
        className="text-[#ECFFE6] text-4xl md:text-6xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        TRADE WITH US
      </motion.h1>

      {/* Transparent Boxes with Hover Animation and BET Link */}
      <div className="flex gap-8 justify-center items-center mb-12">
        {/* Box 1 */}
        <div className="relative shining-box bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg shadow-lg group">
          <motion.img
            src={B1}
            alt="Trade Image 1"
            className="w-48 h-48 object-cover rounded-lg"
            whileHover={{ scale: 1.1 }} // Slight scale effect on hover
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <Link 
            to="/bet/Bitcoin" 
            className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-70 rounded-lg"
          >
            BET
          </Link>
        </div>

        {/* Box 2 */}
        <div className="relative shining-box bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg shadow-lg group">
          <motion.img
            src={B2}
            alt="Trade Image 2"
            className="w-48 h-48 object-cover rounded-lg"
            whileHover={{ scale: 1.1 }} // Slight scale effect on hover
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <Link 
            to="/bet/Doge" 
            className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-70 rounded-lg"
          >
            BET
          </Link>
        </div>

        {/* Box 3 */}
        <div className="relative shining-box bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg shadow-lg group">
          <motion.img
            src={B3}
            alt="Trade Image 3"
            className="w-48 h-48 object-cover rounded-lg"
            whileHover={{ scale: 1.1 }} // Slight scale effect on hover
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <Link 
            to="/bet/Dollar" 
            className="absolute inset-0 flex items-center justify-center text-green-500 text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-70 rounded-lg"
          >
            BET
          </Link>
        </div>
      </div>

      {/* Looping Animated Text */}
      <motion.div
        className="text-white font-bold mt-24 text-4xl"
        initial={{ x: '-100%' }} // Start outside of the view from the right
        animate={{ x: '100%' }} // Move it to the left out of the view
        transition={{
          repeat: Infinity, // Infinite looping
          duration: 10, // Duration of one complete loop
          ease: "linear" // Smooth and consistent speed
        }}
      >
        More stocks coming...
      </motion.div>

      {/* Animated Testimonials Section */}
      <div className="my-20 w-full overflow-hidden">
        <h2 className="text-3xl font-extrabold text-red-300 mb-6 text-center">What Our Users Say</h2>

        {/* Row 1: Testimonials moving infinitely */}
        <motion.div
          className="flex"
          initial={{ x: '100%' }} // Start off screen to the right
          animate={{ x: '-100%' }} // Move to the left off screen
          transition={{
            repeat: Infinity, // Infinite looping
            duration: 30, // Duration of one complete loop
            ease: "linear" // Smooth and consistent speed
          }}
        >
          {/* Render two sets of testimonials for a seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-[#1F4172] p-6 rounded-lg shadow-lg text-white w-fit mx-2 flex-shrink-0 cursor-pointer"
            >
              <p className="italic">"{testimonial.feedback}"</p>
              <h4 className="font-bold mt-2">{testimonial.name}</h4>
            </div>
          ))}
        </motion.div>
      </div>

      {/* FAQs Section */}
      <div className="my-20">
        <h2 className="text-3xl mb-6 font-extrabold text-red-300">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#1F4172] p-4 rounded-lg shadow-lg text-white transition-transform transform hover:scale-105 cursor-pointer">
              <h4 className="font-bold">{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center mt-10">
        <h2 className="text-3xl text-white mb-4">Get in Touch</h2>
        <p className="text-white">Have any questions? Reach us at:</p>
        <p className="font-bold text-white">support@tradingwebsite.com</p>

        {/* Button to open the feedback form modal */}
        <button
          onClick={() => setModalOpen(true)}
          className="mt-4 bg-[#399918] text-white py-2 px-4 rounded-lg hover:bg-[#4caf50]"
        >
          Give Feedback
        </button>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} // Pass the close handler
      />
    </div>
  );
};

export default Home;
