import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import B1 from './assets/Bitcoin.png';
import B2 from './assets/Doge.png';
import B3 from './assets/Dollar.png';
import B4 from './assets/Dollar.png'; // Add your new stock images
import B5 from './assets/Dollar.png';
import B6 from './assets/Dollar.png';
import B7 from './assets/Dollar.png';
import B8 from './assets/Dollar.png';
import B9 from './assets/Dollar.png';
import B10 from './assets/Dollar.png';
import B11 from './assets/Dollar.png';
import B12 from './assets/Dollar.png';
import B13 from './assets/Dollar.png';
import './index.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 

import FeedbackModal from './components/FeedbackModal'; 
import BetPage from './BetPage';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null); // State to store selected coin
  const [balance, setBalance] = useState(1000);
  const [displayedCoins, setDisplayedCoins] = useState([]); // State to hold the displayed coins

  // Automatically select the first coin on mount
  useEffect(() => {
    setSelectedCoin(stocks[0].name); // Set the first stock as selected
    setDisplayedCoins(stocks.slice(0, 4)); // Display only the first 4 stocks initially
  }, []); // Empty dependency array means this runs once when component mounts

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin); // Update selected coin state
  };

  // Stock data
  const stocks = [
    { name: "Bitcoin", image: B1 },
    { name: "Doge", image: B2 },
    { name: "Dollar", image: B3 },
    { name: "Stock 4", image: B4 },
    { name: "Stock 5", image: B5 },
    { name: "Stock 6", image: B6 },
    { name: "Stock 7", image: B7 },
    { name: "Stock 8", image: B8 },
    { name: "Stock 9", image: B9 },
    { name: "Stock 10", image: B10 },
    { name: "Stock 11", image: B11 },
    { name: "Stock 12", image: B12 },
    { name: "Stock 13", image: B13 },
  ];

  // Testimonials and FAQs data (unchanged)
  const testimonials = [
    { name: "John Doe", feedback: "Great platform! I love trading here!" },
    { name: "Jane Smith", feedback: "Amazing experience and support." },
    { name: "Sam Wilson", feedback: "I made profits consistently!" },
    { name: "Chris Evans", feedback: "User-friendly interface and quick transactions!" },
    { name: "Robert Stark", feedback: "I trust this platform for all my trades." },
  ];

  const faqs = [
    { question: "How do I deposit funds?", answer: "You can deposit funds via bank transfer, credit card, etc." },
    { question: "What are the fees?", answer: "We have a transparent fee structure. Check our fees page for details." },
    { question: "How can I withdraw my earnings?", answer: "You can withdraw funds using the same method you deposited." },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#1F4172] relative ">
      {/* Transparent Boxes with Hover Animation and BET Link */}
      <div className="flex gap-8 justify-center items-center mt-4 lg:w-[1400px] w-[350px]">
        <Swiper
          slidesPerView={5} // Show 4 coins on mobile
          spaceBetween={5} // Space between slides
          breakpoints={{
            // Responsive settings
            640: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 10, // Show more on larger screens
              spaceBetween: 5,
            },
          }}
        >
          {stocks.map((stock) => (
            <SwiperSlide key={stock.name}>
              <div 
                className={`relative shining-box bg-white bg-opacity-10 backdrop-blur-sm p-2 rounded-lg shadow-lg group w-16 h-16 ${selectedCoin === stock.name ? "bg-yellow-500 bg-opacity-100" : "black-and-white"}`} // Darker background when selected
              >
                <motion.img
                  src={stock.image}
                  alt={stock.name}
                  className="w-full h-full object-cover rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                <Link 
                  to="/" 
                  className={`absolute inset-0 flex items-center justify-center text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-70 rounded-lg ${selectedCoin === stock.name ? "bg-yellow-500 bg-opacity-100" : ""}`}
                  onClick={() => handleCoinClick(stock.name)} // Set the selected coin on click
                >
                  BET
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Pass selectedCoin as a prop to BetPage */}
      <div className="w-full h-[calc(100vh-64px)] mt-8">
        {selectedCoin ? <BetPage selectedCoin={selectedCoin} /> : <p className="text-white">Please select a coin to bet on.</p>}
      </div>

      {/* Animated Testimonials Section */}
      <div className="w-full overflow-hidden">
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
              className="bg-[#1F4172] p-6 rounded-lg shadow-lg text-white w-fit flex-shrink-0 cursor-pointer"
            >
              <p className="italic">"{testimonial.feedback}"</p>
              <h4 className="font-bold mt-2">{testimonial.name}</h4>
            </div>
          ))}
        </motion.div>
      </div>

      {/* FAQs Section */}
      <div className="my-20 mx-4 lg:w-[1400px] w-[350px]">
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
          className="mt-4 bg-[#399918] text-white py-2 px-4 rounded-lg hover:bg-[#4caf50] mb-4"
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
