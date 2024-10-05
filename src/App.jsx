// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Assuming you have a Header component
import Home from './Home';
import Footer from './components/Footer';
import BetPage from './BetPage'; // Import your BetPage component

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bet/:stockName" element={<BetPage />} /> {/* This route takes stockName as a parameter */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
