// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import Logo from '../assets/wizard.png';
import { useAuth } from 'react-oidc-context';

const Header = () => {
  const auth = useAuth();

  const handleSignOut = async () => {
    const clientId = "5fp6vcrtok7vdsp7sec9p0qbep";
    const logoutUri = "http://localhost:3000";
    const cognitoDomain = "https://eu-north-1sebcuwp64.auth.eu-north-1.amazoncognito.com";
  
    // First clear the local auth state
    await auth.removeUser();
  
    // Then redirect to Cognito logout URL
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };
  

  if (!auth.isAuthenticated) return null; // Hide header if not signed in

  return (
    <header className="header">
      <div className="logo-container">
        <img src={Logo} alt="KidWise Logo" className="logo" />
        <Link to="/home" className="brand-name">KidWise</Link>
      </div>
      <nav className="nav-links">
        <Link to="/realms">Realms</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleSignOut} className="sign-out-btn">Sign out</button>
      </nav>
      <div className="header-animation"></div>
    </header>
  );
};

export default Header;
