import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal'; 
import { motion } from 'framer-motion'; 
import { FaTrophy } from 'react-icons/fa';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { BalanceContext } from './components/BalanceContext';

Chart.register(...registerables);
Modal.setAppElement('#root'); 

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%', 
    left: '50%', 
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%', 
    transform: 'translate(-50%, -50%)', 
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#000',
    width: '400px',
    maxWidth: '90%',
  },
};

const BetPage = ({ selectedCoin }) => {
  const { balance, setBalance } = useContext(BalanceContext);
  const [showOptions, setShowOptions] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedLeverage, setSelectedLeverage] = useState(null);
  const [purchasePrice, setPurchasePrice] = useState(null);
  const [sellPrice, setSellPrice] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isProfit, setIsProfit] = useState(false);
  const [lineColor, setLineColor] = useState('rgba(75,192,192,1)'); // Default color

  const amountOptions = [50, 100, 500, 1000];
  const leverageOptions = [1, 5, 10, 20, 50, 100];

  const currentTime = new Date();
  const dataPoints = 50;

  const generatePriceData = (initialPrice = 50) => {
    return Array.from({ length: dataPoints }, (_, index) => {
      const time = new Date(currentTime.getTime() + index * 2 * 60 * 1000);
      const price = initialPrice + Math.floor(Math.random() * 10 - 5);
      return { x: time.toISOString(), y: price };
    });
  };

  const [priceData, setPriceData] = useState(generatePriceData());

  useEffect(() => {
    const latestPrice = priceData[priceData.length - 1].y;
    setCurrentPrice(latestPrice);

    // Update color based on the latest price compared to purchasePrice
    if (purchasePrice !== null) {
      const profitOrLoss = latestPrice - purchasePrice;
      setProfitLoss(profitOrLoss * selectedLeverage);
      
      // Change line color based on price movement
      setLineColor(profitOrLoss > 0 ? 'rgba(75,192,192,1)' : 'rgba(255, 99, 132, 1)');
    }

    // If the sell price is set, change the color based on its value
    if (sellPrice !== null) {
      setLineColor(latestPrice > sellPrice ? 'rgba(75,192,192,1)' : 'rgba(255, 99, 132, 1)');
    }

  }, [priceData, purchasePrice, selectedLeverage, sellPrice]);

  const data = {
    datasets: [
      {
        label: '',
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

    // Simulate a price increase after buying
    const randomIncrease = Math.floor(Math.random() * 10) + 1; // Random increase between 1 to 10
    const increasedPriceData = priceData.map((dataPoint, index) =>
      index === priceData.length - 1
        ? { ...dataPoint, y: dataPoint.y + randomIncrease }
        : dataPoint
    );
    setPriceData(increasedPriceData);
    
    const profit = randomIncrease * selectedLeverage; 
    setBalance((prevBalance) => prevBalance + profit); // Increase balance by profit amount

    setModalMessage(`💸 You made a profit of ₹${profit.toFixed(2)}!`);
    setIsProfit(true);
    setModalIsOpen(true);
  };

  const handleSell = () => {
    const latestPrice = priceData[priceData.length - 1].y;
    setSellPrice(latestPrice);

    // Simulate a price decrease after selling
    const randomDecrease = Math.floor(Math.random() * 10) + 1; // Random decrease between 1 to 10
    const decreasedPriceData = priceData.map((dataPoint, index) =>
      index === priceData.length - 1
        ? { ...dataPoint, y: dataPoint.y - randomDecrease }
        : dataPoint
    );
    setPriceData(decreasedPriceData);

    const profit = (latestPrice - purchasePrice) * selectedLeverage - randomDecrease; // Adjust profit by random decrease
    const isProfitMade = profit >= 0;
    setIsProfit(isProfitMade);

    if (isProfitMade) {
      setBalance((prevBalance) => prevBalance + profit); // Increase balance by profit amount
    } else {
      setBalance((prevBalance) => prevBalance - Math.abs(profit)); // Decrease balance by the loss amount
    }

    setModalMessage(
      isProfitMade
        ? `💸 You made a profit of ₹${profit.toFixed(2)}!`
        : `💸 You lost ₹${Math.abs(profit).toFixed(2)}.`
    );
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold">Your Balance: ₹{balance}</h2>
        <Line data={data} options={options} />
      </div>

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

        {showOptions === 'buy' && (
          <div className="border border-gray-300 p-4 rounded-lg bg-gray-50">
            <h4 className="font-semibold">Select Amount</h4>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {amountOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-2 border border-gray-300 rounded-lg hover:bg-green-200 transition ${selectedAmount === amount ? 'bg-green-400' : ''}`}
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
                  className={`py-2 border border-gray-300 rounded-lg hover:bg-green-200 transition ${selectedLeverage === leverage ? 'bg-green-400' : ''}`}
                >
                  {leverage}x
                </button>
              ))}
            </div>
            <button
              onClick={handleBuy}
              className={`mt-4 w-full py-2 bg-green-500 text-white rounded-lg transition ${!(selectedAmount && selectedLeverage) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
              disabled={!selectedAmount || !selectedLeverage}
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
                  className={`py-2 border border-gray-300 rounded-lg hover:bg-red-200 transition ${selectedAmount === amount ? 'bg-red-400' : ''}`}
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
                  className={`py-2 border border-gray-300 rounded-lg hover:bg-red-200 transition ${selectedLeverage === leverage ? 'bg-red-400' : ''}`}
                >
                  {leverage}x
                </button>
              ))}
            </div>
            <button
              onClick={handleSell}
              className={`mt-4 w-full py-2 bg-red-500 text-white rounded-lg transition ${!(selectedAmount && selectedLeverage) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
              disabled={!selectedAmount || !selectedLeverage}
            >
              Confirm Sell
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customModalStyles}
      >
        <h2 className="text-xl font-bold mb-4">
          {isProfit ? <FaTrophy className="inline mr-2 text-yellow-500" /> : '❌'} Result
        </h2>
        <p>{modalMessage}</p>
        <button
          onClick={handleModalClose}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default BetPage;
