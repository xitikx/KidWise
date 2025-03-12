import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import '../styles/LoadingPage.css';
import RobotHappy from '../assets/robotHappy2.jpg';

const jokes = [
    "Why don’t eggs tell jokes? Because they might crack up! 🥚😂",
    "What did one wall say to the other wall? I'll meet you at the corner! 🏠🤣",
    "Why don’t skeletons fight each other? They don’t have the guts! 💀😆",
    "Why was the math book sad? It had too many problems! 📖😢",
    "What do you call a bear with no teeth? A gummy bear! 🐻🍬",
    "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾🏆",
    "What do you call a sleeping bull? A bulldozer! 🐂💤",
    "Why did the computer catch a cold? It left its Windows open! 💻😷",
    "How do you organize a space party? You planet! 🪐🎉",
    "What kind of tree fits in your hand? A palm tree! 🌴🤚",
    "Why did the cookie go to the doctor? Because it was feeling crumbly! 🍪😄",
    "What did the ocean say to the shore? Nothing, it just waved! 🌊👋",
    "Why did the banana go to the party? Because it was a-peeling! 🍌🎊",
    "How do you catch a squirrel? Climb a tree and act like a nut! 🌰🐿️",
    "What do you call a snowman in summer? A puddle! ⛄☀️",
    "Why don’t fish do well in school? Because they work below sea level! 🐠📚",
    "Why did the golfer bring two pairs of pants? In case he got a hole in one! ⛳😆",
    "What’s a tornado’s favorite game? Twister! 🌪️🎲",
    "Why was the music teacher’s ladder broken? Because it had too many steps! 🎵📏",
    "What did the left eye say to the right eye? Between us, something smells! 👀👃",
    "Why do cows have bells? Because their horns don’t work! 🐄🔔",
    "Why did the tomato blush? Because it saw the salad dressing! 🍅🥗😳",
    "What’s orange and sounds like a parrot? A carrot! 🥕🦜",
    "What do you get when you cross a snowman and a vampire? Frostbite! ⛄🧛",
    "Why don’t elephants use computers? They’re afraid of the mouse! 🐘🖱️",
    "Why do bees have sticky hair? Because they use honeycombs! 🐝🍯",
    "Why can’t your nose be 12 inches long? Because then it would be a foot! 👃🦶",
    "What did the grape say when it got stepped on? Nothing, it just let out a little wine! 🍇🍷",
    "What’s the best way to talk to a monster? From a safe distance! 👹😆",
    "What kind of shoes do ninjas wear? Sneakers! 👟🥷"
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
