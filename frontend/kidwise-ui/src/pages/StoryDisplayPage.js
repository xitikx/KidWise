import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/StoryDisplayPage.css";

const StoryDisplayPage = () => {
    const { state } = useLocation();
    const { title, prompt, storyParts } = state || {}; // Destructure the necessary data
    const [images, setImages] = useState({});
    const [audioUrls, setAudioUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!storyParts) {
            setError("Story parts not found.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch image data
                const imageResponse = await axios.post("http://localhost:5000/api/image/generate", storyParts);
                console.log("Image response:", imageResponse.data);

                // Fetch audio data for each part of the story
                const audioPromises = Object.values(storyParts).map(async (textPart) => {
                    const response = await axios.post("http://localhost:5000/api/tts/synthesize", { text: textPart }, { responseType: 'arraybuffer' });
                    const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
                    const audioUrl = URL.createObjectURL(audioBlob);  // Create URL from the Blob
                    return audioUrl;
                });

                // Wait for all audio and images to be fetched
                const audioUrls = await Promise.all(audioPromises);
                setAudioUrls(audioUrls); // Store the audio URLs in state
                setImages(imageResponse.data || {}); // Store image data
                setLoading(false);
            } catch (error) {
                setError("Error fetching story images or audio.");
                setLoading(false);
                console.error("Error:", error);
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, [storyParts]); // Re-run when storyParts change

    const handleAudioPlay = (index) => {
        const audioElement = document.getElementById(`audio-${index}`);
        if (audioElement) {
            audioElement.play(); // Play the audio corresponding to the part
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="story-display-page">
            <h1>{title}</h1>
            <h3>{prompt}</h3>

            <div className="story-content">
                {Object.keys(storyParts).map((part, index) => {
                    const imageKey = `${part}Image`; // Dynamic image key
                    const voiceUrl = audioUrls[index]; // Get the corresponding audio URL

                    return (
                        <div key={index} className="story-part">
                            <h2>{part.charAt(0).toUpperCase() + part.slice(1)}</h2>
                            {images[imageKey] ? (
                                <img src={images[imageKey]} alt={part} className="story-image" />
                            ) : (
                                <p>Loading {part} image...</p>
                            )}
                            <p>{storyParts[part]}</p>
                            {voiceUrl ? (
                                <audio
                                    id={`audio-${index}`}
                                    src={voiceUrl}
                                    controls
                                    onPlay={() => handleAudioPlay(index)}
                                />
                            ) : (
                                <p>Loading {part} audio...</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StoryDisplayPage;
