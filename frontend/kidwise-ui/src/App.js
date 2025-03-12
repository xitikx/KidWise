import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import StorySelectionPage from './pages/StorySelectionPage';
import StoryDisplayPage from './pages/StoryDisplayPage';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/story-selection" element={<StorySelectionPage />} />
        <Route path="/story-display" element={<StoryDisplayPage />} />
      </Routes>

      {/* Show Footer only on the HomePage */}
      {location.pathname === '/home' && <Footer />}
    </>
  );
};

export default App;
