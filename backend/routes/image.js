const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const router = express.Router();

// Function to generate an image for a given prompt
async function generateImage(prompt) {
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
            { inputs: prompt },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json"
                },
                responseType: 'arraybuffer'
            }
        );

        return `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
    } catch (error) {
        console.error("❌ Error generating image:", error.response ? error.response.data : error.message);
        throw new Error("Failed to generate image");
    }
}

// API Route to generate images for four parts of a story
router.post('/generate', async (req, res) => {
    console.log("📨 Image generation request received:", req.body);
    const { beginning, middle, climax, end } = req.body;

    if (!beginning || !middle || !climax || !end) {
        return res.status(400).json({ error: "All four story parts are required" });
    }

    try {
        // Generate images for each part in parallel
        const [beginningImage, middleImage, climaxImage, endImage] = await Promise.all([
            generateImage(beginning),
            generateImage(middle),
            generateImage(climax),
            generateImage(end)
        ]);

        res.json({ beginningImage, middleImage, climaxImage, endImage });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate images" });
    }
});

module.exports = router;
