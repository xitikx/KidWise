import React from 'react';
import '../styles/StoryDisplayPage.css';
import { motion } from 'framer-motion';

const StoryDisplay = ({ story, onBack }) => {
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

            <main className="story-content">
                <h1 className="story-title">{story.title}</h1>
                <img src={story.image} alt={story.title} className="story-image" />
                <p className="story-text">{story.prompt}</p>

                <div className="story-buttons">
                    <motion.button 
                        className="back-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBack}
                    >
                        Back to Selection
                    </motion.button>

                    <motion.button 
                        className="listen-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Listen to Story
                    </motion.button>
                </div>
            </main>
        </div>
    );
};

export default StoryDisplay;
