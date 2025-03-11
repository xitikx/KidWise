// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import Wizard from '../assets/wizard.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className='link'>KidWise</Link>
      </div>
      <nav className="nav-links">
        <Link to="/realms">Realms</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/logout">Logout</Link>
      </nav>
      <div className="avatar">
        <img src={Wizard} alt="Avatar" />
      </div>
    </header>
  );
};

export default Header;