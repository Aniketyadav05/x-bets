import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './Home';
import Footer from './components/Footer';
import BetPage from './BetPage';
import { BalanceProvider } from './components/BalanceContext';
import LoginPage from './components/LoginPage';
import WelcomeModal from './components/WelcomeModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Check if the user is already logged in (e.g., from localStorage)
  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);

    // If the user is logging in for the first time
    if (!localStorage.getItem('hasLoggedInBefore')) {
      setIsNewUser(true);
      setShowWelcomeModal(true); // Show the welcome modal
      localStorage.setItem('hasLoggedInBefore', true); // Prevent it from showing again in the future
      localStorage.setItem('balance', 200); // Give the new user 200 rupees
    }
    
    localStorage.setItem('isLoggedIn', status); // Store login state in localStorage
  };

  const closeModal = () => {
    setShowWelcomeModal(false);
  };

  return (
    <BalanceProvider>
      <Router>
        <div className="relative h-screen">
          {/* Render the home page and add blur/opacity effect when not logged in */}
          <div className={`${!isLoggedIn ? 'opacity-30 blur-sm' : 'opacity-100 blur-none'} transition-opacity duration-500 ease-in-out`}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
          </div>

          {/* Show login page overlay when not logged in */}
          {!isLoggedIn && (
            <div className="fixed lg:top-40 top-20 lg:left-[600px] left-0 lg:w-[350px] h-[350px] flex justify-center items-center bg-black bg-opacity-50">
              <LoginPage onLogin={handleLogin} />
            </div>
          )}

          {/* Show welcome modal for new users */}
          {isLoggedIn && showWelcomeModal && (
            <WelcomeModal onClose={closeModal} />
          )}
        </div>
      </Router>
    </BalanceProvider>
  );
}

export default App;
