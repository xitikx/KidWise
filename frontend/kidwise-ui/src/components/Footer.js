import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  useEffect(() => {
    let hoverSound;
    try {
      hoverSound = new Audio('/assets/pop.mp3');
    } catch (error) {
      console.error("Error loading sound:", error);
      return;
    }

    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        if (hoverSound) {
          hoverSound.play().catch(err => console.warn("Audio play blocked:", err));
        }
      });
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', () => {
          if (hoverSound) {
            hoverSound.pause();
            hoverSound.currentTime = 0;
          }
        });
      });
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-wave"></div>

      <div className="footer-copyright">
        © 2025 Learniverse. All rights reserved
      </div>

      <nav className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/logout">Logout</Link>
      </nav>

      <div className="footer-icons">
        <FaFacebook className="icon" />
        <FaTwitter className="icon" />
        <FaInstagram className="icon" />
      </div>

      <div className="sparkles">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
    </footer>
  );
};

export default Footer;