import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/LoginPage.css';
import RobotThink from '../assets/robotThink.png';
import Rocket from '../assets/rocket.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
    navigate('/home');
  };

  return (
    <div className="login-container">
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
        className="login-card"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Login</h1>
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
          onClick={handleLogin}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Login
        </motion.button>
        <p>
          Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </motion.div>
      <motion.div
        className="floating-character character-2"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={RobotThink} alt="Thinking Robot" />
      </motion.div>

      <motion.div
        className="floating-character character-3"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={Rocket} alt="Rocket" />
      </motion.div>
    </div>
  );
};

export default LoginPage;
