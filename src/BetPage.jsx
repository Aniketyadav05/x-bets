import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { Chart, registerables } from 'chart.js';
import { BalanceContext } from './components/BalanceContext';
import StockChart from './components/StockChart';
import QR from './assets/QR.png';

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
  const [purchasePrice, setPurchasePrice] = useState(null);
  const [sellPrice, setSellPrice] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [finalModalIsOpen, setFinalModalIsOpen] = useState(false); // Fixed name
  const [profitModalIsOpen, setProfitModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [lineColor, setLineColor] = useState('rgba(75,192,192,1)');
  const [totalProfit, setTotalProfit] = useState(0);
  const [withdrawModalIsOpen, setWithdrawModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [feeMessage, setFeeMessage] = useState('');
  const [showQr, setShowQr] = useState(false);

  const amountOptions = [99, 149, 499, 999];
  const currentTime = new Date();
  const dataPoints = 50;
  const customModalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000, // Ensure the overlay is above other elements
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
      maxWidth: '400px',
      zIndex: 1001, // Ensure the modal content is above other elements
    },
  };
  
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
      setProfitLoss(profitOrLoss * 4);
      setLineColor(profitOrLoss > 0 ? 'rgba(75,192,192,1)' : 'rgba(255, 99, 132, 1)');
    }
  }, [priceData, purchasePrice]);

  const handleBuy = () => {
    const latestPrice = priceData[priceData.length - 1].y;
    setPurchasePrice(latestPrice);

    const randomIncrease = Math.floor(Math.random() * 10) + 1;
    const newPrice = latestPrice + randomIncrease;

    setPriceData((prevData) => [
      ...prevData.slice(0, -1),
      { x: new Date(), y: newPrice },
    ]);

    const profit = randomIncrease * 40;
    setBalance((prevBalance) => prevBalance + profit);
    setTotalProfit((prevProfit) => prevProfit + profit);
    setModalMessage(`💸 You made a profit of ₹${profit.toFixed(2)}!`);
    setProfitModalIsOpen(true); 
    setShowOptions(null);
  };

  const handleSell = () => {
    const latestPrice = priceData[priceData.length - 1].y;
    setSellPrice(latestPrice);

    const randomDecrease = Math.floor(Math.random() * 10) + 1;
    const newPrice = latestPrice - randomDecrease;

    setPriceData((prevData) => [
      ...prevData.slice(0, -1),
      { x: new Date(), y: newPrice },
    ]);

    const profit = (latestPrice - purchasePrice) * 4;
    setTotalProfit((prevProfit) => prevProfit + profit);
    setModalMessage(`💸 You made a profit of ₹${profit.toFixed(2)}!`);
    setProfitModalIsOpen(true); 
    setShowOptions(null);
  };

  const handleWithdraw = () => {
    const fee = withdrawAmount * 0.10;
    if (withdrawAmount > balance) {
      alert("You cannot withdraw more than your total balance!");
      return;
    }
    setFeeMessage(`⚠️ You have to pay a ₹${fee.toFixed(2)} fee for the withdrawal.`);
    setWithdrawModalIsOpen(false);
    setModalMessage(`You are about to withdraw ₹${withdrawAmount.toFixed(2)} with a fee of ₹${fee.toFixed(2)}. Proceed?`);
    setShowQr(false);
    setModalIsOpen(true);
  };

  const confirmWithdraw = () => {
    const fee = withdrawAmount * 0.10;
    const finalAmount = withdrawAmount - fee;
    setBalance((prevBalance) => prevBalance + finalAmount);
    setTotalProfit((prevProfit) => prevProfit - withdrawAmount);
    setModalMessage(`💸 PAY THE FEES ₹${finalAmount.toFixed(2)} AND YOUR WITHDRAWAL WILL BE TRANSFERRED`);
    setShowQr(true);
    setFinalModalIsOpen(true); // Show the final confirmation modal
  };

  const handleWithdrawModalOpen = () => {
    setWithdrawModalIsOpen(true);
    setName('');
    setWithdrawAmount(0);
    setFeeMessage('');
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    
  };

  const handleProfitModalClose = () => {
    setProfitModalIsOpen(false);
  };

  const handleFinalModalClose = () => {
    setFinalModalIsOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold">Your Balance: ₹{balance}</h2>
        <div className="h-96 lg:h-[600px] w-[400px] lg:w-full">
          <StockChart priceData={priceData} />
        </div>
      </div>

      <div className="relative w-[400px] lg:w-72  p-4 flex flex-col mt-24 lg:mt-8">
        <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 mt-2 mb-2 z-10 top-0 left-0 right-0">
          <div className="flex flex-row items-center justify-between">
            <h4 className="font-semibold">Select Amount</h4>
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
        </div>

        <button
          onClick={handleBuy}
          disabled={selectedAmount === null}
          className={`mb-2 w-full py-3 ${selectedAmount === null ? 'bg-gray-400' : 'bg-green-500'} text-white rounded-lg shadow-lg hover:bg-green-600 transition ${selectedAmount === null ? 'cursor-not-allowed' : ''}`}
        >
          💰 UP
        </button>
        <button
          onClick={handleSell}
          disabled={selectedAmount === null}
          className={`mb-4 w-full py-3 ${selectedAmount === null ? 'bg-gray-400' : 'bg-red-500'} text-white rounded-lg shadow-lg hover:bg-red-600 transition ${selectedAmount === null ? 'cursor-not-allowed' : ''}`}
        >
          📉 Down
        </button>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Total Profit: ₹{balance}</h3>
          <button
            onClick={handleWithdrawModalOpen}
            className="mt-2 w-full py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            Withdraw
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customModalStyles}
      >
        <h2>Withdrawal Confirmation</h2>
        <p>{modalMessage}</p>
        <button onClick={confirmWithdraw} className="mt-4 mr-4 bg-green-500 text-white px-4 py-2 rounded">Confirm</button>
        <button onClick={handleCloseModal} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
      </Modal>

      <Modal
        isOpen={finalModalIsOpen}
        onRequestClose={handleFinalModalClose}
        style={customModalStyles}
      >
        <h2>Final Confirmation</h2>
        {showQr && <img src={QR} alt="QR Code" />}
        <p>{modalMessage}</p>
        <button onClick={() => { handleFinalModalClose(); handleCloseModal(); }} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Close</button>
      </Modal>

      <Modal
        isOpen={profitModalIsOpen}
        onRequestClose={handleProfitModalClose}
        style={customModalStyles}
      >
        <h2>Profit</h2>
        <p>{modalMessage}</p>
        <button onClick={handleProfitModalClose} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Close</button>
      </Modal>

      <Modal
        isOpen={withdrawModalIsOpen}
        onRequestClose={() => setWithdrawModalIsOpen(false)}
        style={customModalStyles}
      >
        <h2>Withdraw</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
          className="border border-gray-300 p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="UPI ID "
          
         
          className="border border-gray-300 p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="PHONE NUMBER"
          
          
          className="border border-gray-300 p-2 rounded mb-2 w-full"
        />
        <p>{feeMessage}</p>
        <button onClick={handleWithdraw} className="mt-4 bg-blue-500 mr-4 text-white px-4 py-2 rounded">Next</button>
        <button onClick={() => setWithdrawModalIsOpen(false)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
      </Modal>
    </div>
  );
};

export default BetPage;
