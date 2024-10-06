// BalanceContext.js
import React, { createContext, useState } from 'react';

export const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState(''); // Add userName state

  return (
    <BalanceContext.Provider value={{ balance, setBalance, userName, setUserName }}>
      {children}
    </BalanceContext.Provider>
  );
};
