import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for the API call
import "../styles/StorySelectionPage.css";
import { motion } from "framer-motion";

const stories = [
    { title: "The Brave Knight", prompt: "A brave knight", image: require("../assets/braveKnight.jpg") },
    { title: "Space Adventure", prompt: "A space Adventure", image: require("../assets/spaceAdventure.jpg") },
    { title: "The Lost Treasure", prompt: "The lost treasure", image: require("../assets/lostTreasure.jpg") },
    { title: "Magical Forest", prompt: "A magical forest", image: require("../assets/magicForest.jpg") },
    { title: "The Time Machine", prompt: "The time machine", image: require("../assets/timeMachine.jpg") },
    { title: "Underwater Kingdom", prompt: "Underwater Kingdom", image: require("../assets/waterKingdom.jpg") },
    { title: "Robot’s Dream", prompt: "A robot's dream", image: require("../assets/robotDream.jpg") },
    { title: "The Flying Ship", prompt: "A flying ship", image: require("../assets/flyingShip.jpg") }
];

const StorySelectionPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleStorySelect = async (story) => {
        setIsLoading(true);
        setError(null);
        try {
            // Make API call to generate story using the selected prompt
            const response = await axios.post("http://localhost:5000/api/story/generate", { prompt: story.prompt });
            const storyParts = response.data.storyParts; // API response containing the 4 story parts

            console.log("Generated story parts:", storyParts); // Debugging step to verify the response

            // Navigate to the StoryDisplayPage with the generated story parts
            navigate("/story-display", { state: { prompt: story.prompt, title: story.title, storyParts } });
        } catch (error) {
            setError("An error occurred while generating the story.");
            console.error("Error generating story:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="story-selection-page">
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
                        onClick={() => handleStorySelect(story)}
                    >
                        <img src={story.image} alt={story.title} className="story-thumbnail" />
                        <h3>{story.title}</h3>
                    </motion.div>
                ))}
            </main>
            {isLoading && <div>Loading story...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default StorySelectionPage;