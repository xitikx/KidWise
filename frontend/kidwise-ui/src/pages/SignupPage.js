
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/SignupPage.css';
import RobotHappy from '../assets/robotHappy.png';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    
    // console.log('Signing up with:', email, password);
    navigate('/home'); 
  };

  return (
    <div className="signup-container">
      {/* Background Animation with Floating Circles */}
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
        className="signup-card"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <motion.button
          onClick={handleSignup}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Sign Up
        </motion.button>
        <p>
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </motion.div>
      <motion.div
        className="floating-character character-1"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
        <img src={RobotHappy} alt="Happy Robot" />
      </motion.div>
    </div>
  );
};

export default SignupPage;
