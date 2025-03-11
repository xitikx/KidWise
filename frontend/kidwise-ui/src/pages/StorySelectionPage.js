import React from 'react';
// import Header from '../components/Header';
import '../styles/StorySelectionPage.css';
import { motion } from 'framer-motion';

const stories = [
    { title: 'The Brave Knight', prompt: 'A courageous knight embarks on a quest to save the kingdom.', image: require('../assets/braveKnight.jpg') },
    { title: 'Space Adventure', prompt: 'An astronaut discovers a new planet filled with mysteries.', image: require('../assets/spaceAdventure.jpg') },
    { title: 'The Lost Treasure', prompt: 'A pirate searches for hidden treasure on a deserted island.', image: require('../assets/lostTreasure.jpg') },
    { title: 'Magical Forest', prompt: 'A young girl befriends talking animals in an enchanted forest.', image: require('../assets/magicForest.jpg') },
    { title: 'The Time Machine', prompt: 'A scientist travels to the future and uncovers secrets of time.', image: require('../assets/timeMachine.jpg') },
    { title: 'Underwater Kingdom', prompt: 'A diver explores the deep ocean and meets mystical sea creatures.', image: require('../assets/waterKingdom.jpg') },
    { title: 'Robot’s Dream', prompt: 'A friendly robot wishes to become human and goes on a journey.', image: require('../assets/robotDream.jpg') },
    { title: 'The Flying Ship', prompt: 'A boy discovers a magical ship that sails through the clouds.', image: require('../assets/flyingShip.jpg') }
];

const StorySelection = ({ onStorySelect }) => {
    return (
        <div className="story-selection-page">
            {/* <Header /> */}
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
            <main className="story-grid">
                {stories.map((story, index) => (
                    <motion.div 
                        key={index} 
                        className="story-card"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onStorySelect(story.prompt)}
                    >
                        <img src={story.image} alt={story.title} className="story-thumbnail" />
                        <h3>{story.title}</h3>
                    </motion.div>
                ))}
            </main>
        </div>
    );
};

export default StorySelection;
