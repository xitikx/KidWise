import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/StoryDisplay.css';

const StoryDisplayPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { storyData } = location.state || {};

    const [storyParts, setStoryParts] = useState([]);
    const [images, setImages] = useState([]);
    const [voices, setVoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPart, setCurrentPart] = useState(0);

    useEffect(() => {
        if (!storyData) {
            navigate('/story-selection');
            return;
        }
        fetchStoryAndAssets();
    }, [storyData]);

    const fetchStoryAndAssets = async () => {
        try {
            // Step 1: Fetch the story parts
            const storyResponse = await fetch('http://localhost:5000/api/story/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: storyData.prompt })
            });
            const storyResult = await storyResponse.json();
            setStoryParts(storyResult.parts);

            // Step 2: Fetch images
            const imageResponse = await fetch('http://localhost:5000/api/image/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompts: storyResult.parts })
            });
            const imageResult = await imageResponse.json();
            setImages(imageResult.imageUrls);

            // Step 3: Fetch voice clips
            const voiceClips = await Promise.all(
                storyResult.parts.map(async (part) => {
                    const voiceResponse = await fetch('http://localhost:5000/api/tts/synthesize', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text: part })
                    });
                    const voiceData = await voiceResponse.json();
                    return voiceData.voiceUrl;
                })
            );
            setVoices(voiceClips);
        } catch (error) {
            console.error('Error fetching story assets:', error);
        } finally {
            setLoading(false);
        }
    };

    const playVoice = () => {
        if (voices[currentPart]) {
            new Audio(voices[currentPart]).play();
        }
    };

    const nextPart = () => {
        if (currentPart < storyParts.length - 1) {
            setCurrentPart(currentPart + 1);
        }
    };

    const prevPart = () => {
        if (currentPart > 0) {
            setCurrentPart(currentPart - 1);
        }
    };

    if (loading) return <div className="loading-overlay">Loading story...</div>;

    return (
        <div className="story-display-page">
            <Header />
            <main className="story-content">
                <h2>{storyData.title}</h2>
                <img src={images[currentPart]} alt={`Story part ${currentPart + 1}`} className="story-image" />
                <p>{storyParts[currentPart]}</p>
                <div className="controls">
                    <button onClick={prevPart} disabled={currentPart === 0}>Back</button>
                    <button onClick={playVoice}>Listen</button>
                    <button onClick={nextPart} disabled={currentPart === storyParts.length - 1}>Next</button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StoryDisplayPage;
