// src/pages/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/LandingPage.css';
import RobotBook from '../assets/robotBook.png';
import RobotPencil from '../assets/robotPencil.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

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

      {/* Main Content */}
      <motion.div
        className="landing-content"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1>Welcome to <span>KidWise</span>!</h1>
        <p>Embark on a magical learning adventure and restore knowledge to the world.</p>

        {/* Interactive Feature Cards */}
        <div className="feature-cards">
          <div
            className="card"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2>Explore Realms</h2>
            <p>Lorem Ipsum </p>
          </div>

          <div
            className="card"
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2>Lorem</h2>
            <p>Lorem Ipsum</p>
          </div>

          <div
            className="card"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2>Lorem</h2>
            <p>Lorem Ipsum</p>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="cta-buttons">
          <motion.button
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.1, rotate: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            Login
          </motion.button>
          <motion.button
            onClick={() => navigate('/signup')}
            whileHover={{ scale: 1.1, rotate: -1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>

      {/* Floating Characters */}
      <motion.div
        className="floating-character character-4"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <img src={RobotBook} alt="Wizard" />
      </motion.div>
      <motion.div
        className="floating-character character-5"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <img src={RobotPencil} alt="Wizard" />
      </motion.div>
    </div>
  );
};

export default LandingPage;