import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/StoryDisplayPage.css";
import RobotInfo from "../assets/robotInfo.jpg";
import RobotAngry from "../assets/robotAngry.jpg";
import LoadingPage from "../components/LoadingPage";

const StoryDisplayPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log("State received in StoryDisplayPage:", state); // Debug log

  const { title, prompt, storyParts, imageUrls, audioUrls } = state || {};
  const [currentPart, setCurrentPart] = useState('beginning');
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const partsOrder = ['beginning', 'middle', 'climax', 'end'];

  useEffect(() => {
    if (audioUrls && audioUrls[currentPart]) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      const newAudio = new Audio(audioUrls[currentPart]);
      setAudio(newAudio);
      setIsPlaying(false);
      return () => {
        newAudio.pause();
        newAudio.currentTime = 0;
      };
    }
  }, [currentPart, audioUrls]);

  const toggleAudio = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(err => console.error("Audio play failed:", err));
      setIsPlaying(true);
    }
  };

  const handleNextPart = () => {
    const currentIndex = partsOrder.indexOf(currentPart);
    if (currentIndex < partsOrder.length - 1) {
      setCurrentPart(partsOrder[currentIndex + 1]);
    }
  };

  const handlePrevPart = () => {
    const currentIndex = partsOrder.indexOf(currentPart);
    if (currentIndex > 0) {
      setCurrentPart(partsOrder[currentIndex - 1]);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (!storyParts || !imageUrls || !audioUrls) {
    console.log("Missing data:", { storyParts, imageUrls, audioUrls }); // Debug log
    return <LoadingPage />;
  }

  return (
    <div className="story-display-page">
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

      <div className="story-content">
        <h1 className="story-title">{title}</h1>
        {/* <h3>{prompt}</h3> */}
        <h2>{currentPart.charAt(0).toUpperCase() + currentPart.slice(1)}</h2>
        <img src={imageUrls[currentPart]} alt={currentPart} className="story-image" />
        <p className="story-text">{storyParts[currentPart]}</p>
        <div className="story-buttons">
          <button className="back-button" onClick={handleBack}>Back to Stories</button>
          {audioUrls[currentPart] && (
            <button className="listen-button" onClick={toggleAudio}>
              {isPlaying ? 'Pause Audio' : 'Listen to Story'}
            </button>
          )}
          <button
            className="back-button"
            onClick={handlePrevPart}
            disabled={partsOrder.indexOf(currentPart) === 0}
          >
            Previous
          </button>
          <button
            className="back-button"
            onClick={handleNextPart}
            disabled={partsOrder.indexOf(currentPart) === partsOrder.length - 1}
          >
            Next
          </button>
        </div>
      </div>

      <motion.div
        className="floating-character character-10"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <img src={RobotInfo} alt="Robot Info" />
      </motion.div>
      <motion.div
        className="floating-character character-11"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <img src={RobotAngry} alt="Robot Angry" />
      </motion.div>
    </div>
  );
};

export default StoryDisplayPage;