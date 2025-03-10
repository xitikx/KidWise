const express = require('express');
const axios = require('axios');
const router = express.Router();

// Function to generate a complete story
async function generateStory(prompt) {
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
            { 
                inputs: `Write a complete children's story based on: "${prompt}". The story should be engaging and suitable for children.`
            },
            {
                headers: { 
                    "Authorization": `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.data || !response.data[0] || !response.data[0].generated_text) {
            throw new Error("Invalid response from AI");
        }

        return response.data[0].generated_text.trim(); // Return the full story
    } catch (error) {
        console.error("❌ Error generating story:", error.response ? error.response.data : error.message);
        return "Error generating story"; // Return an error message instead of failing completely
    }
}

// Function to split the story into four parts
function splitStoryIntoParts(story) {
    const parts = {
        beginning: '',
        middle: '',
        climax: '',
        end: ''
    };

    // Split the story into paragraphs
    const paragraphs = story.split('\n\n').filter(p => p.trim() !== '');

    if (paragraphs.length >= 4) {
        // If there are at least 4 paragraphs, split by paragraphs
        const partLength = Math.ceil(paragraphs.length / 4);

        parts.beginning = paragraphs.slice(0, partLength).join('\n\n');
        parts.middle = paragraphs.slice(partLength, 2 * partLength).join('\n\n');
        parts.climax = paragraphs.slice(2 * partLength, 3 * partLength).join('\n\n');
        parts.end = paragraphs.slice(3 * partLength).join('\n\n');
    } else {
        // If there are fewer than 4 paragraphs, split by sentences
        const sentences = story.split('. ').filter(s => s.trim() !== '');
        const partLength = Math.ceil(sentences.length / 4);

        parts.beginning = sentences.slice(0, partLength).join('. ') + '.';
        parts.middle = sentences.slice(partLength, 2 * partLength).join('. ') + '.';
        parts.climax = sentences.slice(2 * partLength, 3 * partLength).join('. ') + '.';
        parts.end = sentences.slice(3 * partLength).join('. ') + '.';
    }

    return parts;
}

// API Route to generate a story
router.post('/generate', async (req, res) => {
    console.log("📨 Request received:", req.body);

    const { prompt } = req.body;
    if (!prompt) {
        console.error("❌ Missing prompt in request body");
        return res.status(400).json({ error: "Story prompt required" });
    }

    try {
        // Step 1: Generate the story
        const story = await generateStory(prompt);

        // Step 2: Split the story into four parts
        const storyParts = splitStoryIntoParts(story);

        // Step 3: Return the story and its parts
        res.json({ story, storyParts });
    } catch (error) {
        console.error("❌ Error processing request:", error.message);
        res.status(500).json({ error: "Error generating story" });
    }
});

module.exports = router;