import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaRupeeSign, FaPlus, FaUser } from 'react-icons/fa';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-[#132043] text-[#ECFFE6] p-4 flex justify-between items-center">
      {/* Company Name */}
      <div className="text-2xl font-bold">
        TRADE WITH US
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/user"
              className="hover:text-[#399918] flex items-center space-x-2"
            >
              <FaUser />
              <span>User</span>
            </NavLink>
          </li>
          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            className="relative" // To position the dropdown
          >
            <NavLink
              to="#"
              className="hover:text-[#399918] flex items-center space-x-2"
            >
              <FaRupeeSign />
              <span>Cash</span>
            </NavLink>
            {showDropdown && (
              <div className="absolute left-0 mt-2 w-36 bg-[#132043] text-[#ECFFE6] rounded-lg shadow-lg z-10 border border-[#399918] overflow-hidden">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-[#399918] cursor-pointer transition duration-300 ease-in-out">
                    Your Balance: ₹10,000 {/* Replace with dynamic value */}
                  </li>
                  <li className="px-4 py-2 hover:bg-[#399918] cursor-pointer transition duration-300 ease-in-out">
                    Add Cash
                  </li>
                  <li className="px-4 py-2 hover:bg-[#399918] cursor-pointer transition duration-300 ease-in-out">
                    Withdraw
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <NavLink
              to="/" // Update the route as needed
              className="hover:text-[#399918] flex items-center space-x-2"
            >
              <FaPlus />
              <span>TRADE</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
