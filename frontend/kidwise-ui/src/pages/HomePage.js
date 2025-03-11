import React from 'react';
import Header from '../components/Header';
import '../styles/HomePage.css';
import { motion } from 'framer-motion';
import wizardImage from '../assets/wizard.png';

const HomePage = () => {
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
      <main className="main-content">
        <h1>Welcome, Young Explorer!</h1>
        <div className="realm-modal">
          <img src={wizardImage} alt="Wizard Guide" className="realm-image" />
          <div className="realm-content">
            <h2>Story Realm</h2>
            <p>Embark on an exciting journey through stories filled with magic and adventure!</p>
            <button className="explore-button">Start Your Journey</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
