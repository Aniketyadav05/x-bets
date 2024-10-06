import React, { useState, useContext } from 'react';
import { BalanceContext } from './BalanceContext';

const LoginPage = ({ onLogin }) => {
  const { setBalance } = useContext(BalanceContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [depositAmount, setDepositAmount] = useState(0);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      // Save the deposit and mark the user as logged in
      setBalance(depositAmount);
      onLogin(true); // Notify parent component that the user has logged in
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Sign Up / Log In</h2>
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
