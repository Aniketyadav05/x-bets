import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; 
import { motion } from 'framer-motion'; // Framer Motion for animation
import { FaTrophy } from 'react-icons/fa';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);
Modal.setAppElement('#root'); // Set the app element for accessibility

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background for overlay
  },
  content: {
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%', // Adjust position
    transform: 'translate(-50%, -50%)', // Centering transform
    padding: '20px', // Padding inside modal
    borderRadius: '8px', // Rounded corners
    backgroundColor: '#fff', // White background
    color: '#000', // Text color
    width: '400px', // Width of the modal
    maxWidth: '90%', // Responsive width
  },
};

const BetPage = ({ stockName }) => {
  const [showOptions, setShowOptions] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedLeverage, setSelectedLeverage] = useState(null);
  const [purchasePrice, setPurchasePrice] = useState(null);
  const [sellPrice, setSellPrice] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(''); // New state for modal message
  const [isProfit, setIsProfit] = useState(false); // State to track if profit was made

  const amountOptions = [50, 100, 500, 1000];
  const leverageOptions = [1, 5, 10, 20, 50, 100];

  const currentTime = new Date();
  const dataPoints = 20;

  const generatePriceData = (initialPrice = 50) => {
    return Array.from({ length: dataPoints }, (_, index) => {
      const time = new Date(currentTime.getTime() + index * 2 * 60 * 1000);
      const price = initialPrice + Math.floor(Math.random() * 10 - 5); // Slight random fluctuation
      return { x: time.toISOString(), y: price };
    });
  };

  const [priceData, setPriceData] = useState(generatePriceData());

  useEffect(() => {
    const latestPrice = priceData[priceData.length - 1].y;
    setCurrentPrice(latestPrice);

    // Update profit/loss after the price changes
    if (purchasePrice !== null) {
      const profitOrLoss = latestPrice - purchasePrice;
      setProfitLoss(profitOrLoss * selectedLeverage); // Leverage is taken into account
    }
  }, [priceData, purchasePrice, selectedLeverage]);

  const lineColor =
    priceData[0].y < priceData[priceData.length - 1].y
      ? 'rgba(75,192,192,1)'
      : 'rgba(255, 99, 132, 1)';

  const data = {
    datasets: [
      {
        label: `${stockName}`,
        data: priceData,
        fill: false,
        borderColor: lineColor,
        tension: 0.002,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        title: {
          display: true,
          text: 'Time',
        },
        time: {
          unit: 'minute',
          stepSize: 2,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
  };

  const handleBuySellClick = (action) => {
    setShowOptions(action);
    setSelectedAmount(null);
    setSelectedLeverage(null);
  };

  const handleBuy = () => {
    const latestPrice = priceData[priceData.length - 1].y;
    setPurchasePrice(latestPrice);
    setSellPrice(null);

    // Manipulate stock price to go up after buying
    const increasedPriceData = priceData.map((dataPoint, index) =>
      index === priceData.length - 1
        ? { ...dataPoint, y: dataPoint.y + Math.floor(Math.random() * 10 + 5) }
        : dataPoint
    );
    setPriceData(increasedPriceData);

    setModalMessage(`You made a Profit of ₹${latestPrice}.`);
    setModalIsOpen(true);
  };

  const handleSell = () => {
    const latestPrice = priceData[priceData.length - 1].y;
    setSellPrice(latestPrice);

    // Manipulate stock price to go down after selling
    const decreasedPriceData = priceData.map((dataPoint, index) =>
      index === priceData.length - 1
        ? { ...dataPoint, y: dataPoint.y - Math.floor(Math.random() * 10 + 5) }
        : dataPoint
    );
    setPriceData(decreasedPriceData);

    // Calculate profit or loss
    const profit = (latestPrice - purchasePrice) * selectedLeverage;
    const isProfitMade = profit >= 0;
    setIsProfit(isProfitMade);

    setModalMessage(
      isProfitMade
        ? `💸 You made a profit of ₹${profit.toFixed(2)}!`
        : `💸 You made a profit of ₹${Math.abs(profit).toFixed(2)}.`
    );
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex">
      {/* Left Side - Graph */}
      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold">{stockName}</h2>
        <Line data={data} options={options} />
      </div>

      {/* Right Side - Buy/Sell Buttons */}
      <div className="w-72 p-4">
        <h3 className="text-lg font-bold text-[#FF204E] mb-4">Actions</h3>
        <button
          onClick={() => handleBuySellClick('buy')}
          className="mb-2 w-full py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition"
        >
          <span className="font-bold">💰 Buy</span>
        </button>
        <button
          onClick={() => handleBuySellClick('sell')}
          className="mb-4 w-full py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition"
        >
          <span className="font-bold">📉 Sell</span>
        </button>

        {/* Show buy/sell options */}
        {showOptions === 'buy' && (
          <div className="border border-gray-300 p-4 rounded-lg bg-gray-50">
            <h4 className="font-semibold">Select Amount</h4>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {amountOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-2 border border-gray-300 rounded-lg hover:bg-green-200 transition ${
                    selectedAmount === amount ? 'bg-green-400' : ''
                  }`}
                >
                  {amount} Rupees
                </button>
              ))}
            </div>
            <h4 className="font-semibold mt-4">Select Leverage</h4>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {leverageOptions.map((leverage) => (
                <button
                  key={leverage}
                  onClick={() => setSelectedLeverage(leverage)}
                  className={`py-2 border border-gray-300 rounded-lg hover:bg-green-200 transition ${
                    selectedLeverage === leverage ? 'bg-green-400' : ''
                  }`}
                >
                  {leverage}x
                </button>
              ))}
            </div>
            <button
              onClick={handleBuy}
              className="mt-4 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Confirm Buy
            </button>
          </div>
        )}
        {showOptions === 'sell' && (
          <div className="border border-gray-300 p-4 rounded-lg bg-gray-50">
            <h4 className="font-semibold">Select Amount</h4>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {amountOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-2 border border-gray-300 rounded-lg hover:bg-gray-200 transition ${
                    selectedAmount === amount ? 'bg-gray-300' : ''
                  }`}
                >
                  {amount} Rupees
                </button>
              ))}
            </div>
            <h4 className="font-semibold mt-4">Select Leverage</h4>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {leverageOptions.map((leverage) => (
                <button
                  key={leverage}
                  onClick={() => setSelectedLeverage(leverage)}
                  className={`py-2 border border-gray-300 rounded-lg hover:bg-gray-200 transition ${
                    selectedLeverage === leverage ? 'bg-gray-300' : ''
                  }`}
                >
                  {leverage}x
                </button>
              ))}
            </div>
            <button
              onClick={handleSell}
              className="mt-4 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Confirm Sell
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} style={customModalStyles}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }} // Starting point for animation
          animate={{ scale: 1, opacity: 1 }} // Final state
          transition={{ duration: 0.5, ease: 'easeOut' }} // Smooth transition
          className="text-center flex flex-col items-center "
        >
          <h2 className={`text-lg font-bold mb-2 ${isProfit ? 'text-green-500' : 'text-green-500'}`}>
            {isProfit ? 'Profit Made!' : 'Profit Made!'}
          </h2>
          <FaTrophy className='text-yellow-500 text-center mb-1' size={40}/>
          <p className="text-sm">{modalMessage}</p>
          <button
            onClick={handleModalClose}
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Close
          </button>
        </motion.div>
      </Modal>
    </div>
  );
};

export default BetPage;
