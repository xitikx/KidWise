import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import Logo from '../assets/wizard.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={Logo} alt="KidWise Logo" className="logo" />
        <Link to="/" className='brand-name'>KidWise</Link>
      </div>
      <nav className="nav-links">
        <Link to="/realms">Realms</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/logout">Logout</Link>
      </nav>
      <div className="header-animation"></div>
    </header>
  );
};

export default Header;