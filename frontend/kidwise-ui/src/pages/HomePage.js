import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
import '../styles/HomePage.css';
import { motion } from 'framer-motion';
import wizardImage from '../assets/wizard.png';
import RobotLetter from '../assets/robotLetter.jpg'

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/story-selection'); // Navigate instead of rendering inline
  };

  return (
    <div className="home-page">
      {/* <Header /> */}
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

      <motion.div
        className="floating-character character-9"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <img src={RobotLetter} alt="Wizard" />
        </motion.div>
    </div>
  );
};

export default HomePage;
