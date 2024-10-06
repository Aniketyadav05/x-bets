import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaRupeeSign, FaUser } from 'react-icons/fa';
import { BalanceContext } from './BalanceContext';
const Header = () => {
  const { balance, setBalance } = useContext(BalanceContext);
  const [showDropdown, setShowDropdown] = useState(false);
  // Initial balance
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  

  return (
    <header className="bg-[#132043] text-[#ECFFE6] p-4 flex justify-between items-center">
      {/* Company Name */}
      <div className="text-2xl font-bold">TRADE WITH US</div>

      {/* Navigation Links */}
      <nav>
        <ul className="flex space-x-6">
          <li className='flex  items-center justify-center'>
            <FaRupeeSign/>{balance}
          </li>
        
          <li
            onMouseEnter={() => setShowDropdown(true)}
            className="relative" // To position the dropdown 
          >
            <div
              className="hover:text-[#399918] flex items-center space-x-2 mr-10 cursor-pointer"
            >
              <FaUser />
              <span>User</span>
            </div>
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute mt-6 right-0 w-36 bg-[#132043] text-[#ECFFE6] rounded-lg shadow-lg z-10 border border-[#399918] overflow-hidden"
              >
                <ul className="py-2">
            
                  <li
                    className="px-4 py-2 hover:bg-[#399918] cursor-pointer transition duration-300 ease-in-out"
                   // Simulate adding money
                  >
                    Add Cash 
                  </li>
                  <li className="px-4 py-2 hover:bg-[#399918] cursor-pointer transition duration-300 ease-in-out">
                    Withdraw
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
