// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Assuming you have a Header component
import Home from './Home';
import Footer from './components/Footer';
import BetPage from './BetPage'; // Import your BetPage component
import { BalanceProvider } from './components/BalanceContext';

function App() {
  return (
    <BalanceProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
      <Footer/>
    </Router>
    </BalanceProvider>
  );
}

export default App;
