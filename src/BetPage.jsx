import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { BalanceContext } from './components/BalanceContext';
import { FaTimes } from 'react-icons/fa';

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
  const [lineColor, setLineColor] = useState('rgba(75,192,192,1)');

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

    if (purchasePrice !== null) {
      const profitOrLoss = latestPrice - purchasePrice;
      setProfitLoss(profitOrLoss * selectedLeverage);
      setLineColor(profitOrLoss > 0 ? 'rgba(75,192,192,1)' : 'rgba(255, 99, 132, 1)');
    }
  }, [priceData, purchasePrice, selectedLeverage]);

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
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        title: { display: true, text: 'Time' },
        time: { unit: 'minute', stepSize: 2 },
      },
      y: { title: { display: true, text: 'Price' } },
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

    const randomIncrease = Math.floor(Math.random() * 10) + 1;
    setPriceData((prevData) =>
      prevData.map((dataPoint, index) =>
        index === prevData.length - 1 ? { ...dataPoint, y: dataPoint.y + randomIncrease } : dataPoint
      )
    );

    const profit = randomIncrease * selectedLeverage;
    setBalance((prevBalance) => prevBalance + profit);
    setModalMessage(`💸 You made a profit of ₹${profit.toFixed(2)}!`);
    setModalIsOpen(true);
    setShowOptions(null); // Close the options modal
  };

  const handleSell = () => {
    const latestPrice = priceData[priceData.length - 1].y;
    setSellPrice(latestPrice);

    const randomDecrease = Math.floor(Math.random() * 10) + 1;
    setPriceData((prevData) =>
      prevData.map((dataPoint, index) =>
        index === prevData.length - 1 ? { ...dataPoint, y: dataPoint.y - randomDecrease } : dataPoint
      )
    );

    const profit = (latestPrice - purchasePrice) * selectedLeverage;
    setModalMessage(`💸 You made a profit of ₹${profit.toFixed(2)}!`);
    setModalIsOpen(true);
    setShowOptions(null); // Close the options modal
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold">Your Balance: ₹{balance}</h2>
        <div className="h-96 lg:h-[600px] w-full"> {/* Adjusted graph height */}
          <Line data={data} options={options} />
        </div>
      </div>

      <div className="w-full lg:w-72 p-4">
        <button
          onClick={() => handleBuySellClick('buy')}
          className="mb-2 w-full py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition"
        >
          💰 Buy
        </button>
        <button
          onClick={() => handleBuySellClick('sell')}
          className="mb-4 w-full py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition"
        >
          📉 Sell
        </button>

        {showOptions && (
          <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 mt-2">
            <div className='flex flex-row items-center justify-between'>
            
            <h4 className="font-semibold">Select Amount</h4>
            <button
              onClick={() => setShowOptions(null)}
              className="py-2"
            >
              <FaTimes  />
            </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {amountOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-2 border border-gray-300 rounded-lg ${selectedAmount === amount ? 'bg-green-400' : ''}`}
                >
                  {amount}
                </button>
              ))}
            </div>
            <h4 className="font-semibold mt-4">Select Leverage</h4>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {leverageOptions.map((leverage) => (
                <button
                  key={leverage}
                  onClick={() => setSelectedLeverage(leverage)}
                  className={`py-2 border border-gray-300 rounded-lg ${selectedLeverage === leverage ? 'bg-green-400' : ''}`}
                >
                  {leverage}x
                </button>
              ))}
            </div>
            {selectedAmount && selectedLeverage && (
              <button
                onClick={showOptions === 'buy' ? handleBuy : handleSell}
                className="mt-4 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                {showOptions === 'buy' ? 'Confirm Buy' : 'Confirm Sell'}
              </button>
            )}
          

            {/* Close Button to close options modal */}
            
            
          </div>
        )}
  </div>

        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customModalStyles}>
          <h2>{modalMessage}</h2>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setModalIsOpen(false)}>
            X
          </button>
        </Modal>
      </div>
      );
};

      export default BetPage;
