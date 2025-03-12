import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import '../styles/LoadingPage.css';
import RobotHappy from '../assets/robotHappy2.jpg';

const jokes = [
    "Why did the computer catch a cold? Because it left its Windows open!",
    "Why don’t programmers like nature? It has too many bugs!",
    "Debugging: Removing the needles from the haystack.",
    "Why do Java developers wear glasses? Because they don’t C#.",
    "Parallel lines have so much in common. It’s a shame they’ll never meet!"
];

const LoadingPage = () => {
    const [joke, setJoke] = useState("");

    useEffect(() => {
        // Pick a random joke
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        setJoke(randomJoke);
    }, []);

    return (
        <>
        <div className="loading-container">
            <h2>Hey Champ! What's up?</h2>
            <p>While we create the most beautiful story for you, why don't you enjoy this joke? 😄</p>
            <blockquote>"{joke}"</blockquote>
            <p>Hang tight! Your magical journey is about to begin... ✨</p>
        </div>
        <motion.div
                className="floating-character character-12"
                initial={{ y: 0 }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <img src={RobotHappy} alt="Wizard" />
            </motion.div>
        </>
    );
};

export default LoadingPage;
