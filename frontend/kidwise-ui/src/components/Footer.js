import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Import Footer.css

const Footer = () => {
  return (
    <footer className="footer">
      {/* Copyright Text (Left) */}
      <div className="footer-copyright">
        © 2023 Learniverse. All rights reserved
      </div>

      {/* Links (Right) */}
      <nav className="nav-links">
        <Link to="/about">About</Link>
        {/* <Link to="/help">Help</Link>
        <Link to=" /contact">Contact</Link> */}
      </nav>
    </footer>
  );
};

export default Footer;