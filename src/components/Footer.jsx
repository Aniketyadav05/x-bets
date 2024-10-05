import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#132043] text-[#ECFFE6] p-4 flex justify-center items-center">
      <div className="text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TRADE WITH US. All Rights Reserved.
        </p>
        <p className="text-xs">
          Designed with ♥ by Your Company Name
        </p>
      </div>
    </footer>
  );
};

export default Footer;
