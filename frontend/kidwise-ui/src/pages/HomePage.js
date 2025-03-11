import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/HomePage.css';
import { motion } from 'framer-motion';
import wizardImage from '../assets/wizard.png';
import StorySelection from './StorySelectionPage';

const HomePage = () => {
  const [showStorySelection, setShowStorySelection] = useState(false);

  const handleStartJourney = () => {
    setShowStorySelection(true);
  };

  return (
    <div className="home-page">
      <Header />
      <motion.div
        className="background-animation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </motion.div>
      
      {showStorySelection ? (
        <StorySelection />
      ) : (
        <main className="main-content">
          <h1>Welcome, Young Explorer!</h1>
          <div className="realm-modal">
            <img src={wizardImage} alt="Wizard Guide" className="realm-image" />
            <div className="realm-content">
              <h2>Story Realm</h2>
              <p>Embark on an exciting journey through stories filled with magic and adventure!</p>
              <button className="explore-button" onClick={handleStartJourney}>
                Start Your Journey
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default HomePage;
