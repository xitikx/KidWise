// LandingPage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/LandingPage.css";
import RobotBook from "../assets/robotBook.png";
import RobotPencil from "../assets/robotPencil.png";
import { useAuth } from "react-oidc-context";

function LandingPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/home");
    }
  }, [auth.isAuthenticated, navigate]);

  const signOutRedirect = () => {
    const clientId = "5fp6vcrtok7vdsp7sec9p0qbep";
    const logoutUri = "http://localhost:3000";
    const cognitoDomain = "https://eu-north-1sebcuwp64.auth.eu-north-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) return <div>Loading...</div>;

  if (auth.error) return <div>Error: {auth.error.message}</div>;

  return (
    <div className="landing-container">
      {/* Background Animation */}
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

        {/* Feature Cards */}
        <div className="feature-cards">
          {[{
            title: "Explore Realms",
            desc: "Step into vibrant worlds where stories come to life and every turn holds a new adventure!"
          }, {
            title: "Create Your Story",
            desc: "Let your imagination soar as you craft your own magical story and share it with the world."
          }, {
            title: "Interactive Learning",
            desc: "Learn through play with engaging stories and lessons that will ignite a love for knowledge."
          }].map((card, i) => (
            <motion.div
              key={i}
              className="card"
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2>{card.title}</h2>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Auth Buttons */}
        {!auth.isAuthenticated ? (
          <button onClick={() => auth.signinRedirect()}>Sign in</button>
        ) : (
          <button onClick={() => signOutRedirect()}>Sign out</button>
        )}

        {/* Optional: Debug token info */}
        {/* {auth.isAuthenticated && (
          <div className="token-info">
            <pre>Email: {auth.user?.profile.email}</pre>
            <pre>ID Token: {auth.user?.id_token}</pre>
            <pre>Access Token: {auth.user?.access_token}</pre>
            <pre>Refresh Token: {auth.user?.refresh_token}</pre>
          </div>
        )} */}
      </motion.div>

      {/* Floating Characters */}
      <motion.div
        className="floating-character character-4"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <img src={RobotBook} alt="Robot Book" />
      </motion.div>
      <motion.div
        className="floating-character character-5"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <img src={RobotPencil} alt="Robot Pencil" />
      </motion.div>
    </div>
  );
}

export default LandingPage;
