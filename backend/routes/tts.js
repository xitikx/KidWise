const express = require('express');
const synthesizeSpeech = require('../services/pollyService'); // Import Polly function
const router = express.Router();

router.post('/synthesize', async (req, res) => {
    console.log("📢 TTS API hit!");

    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Text is required for synthesis." });
    }

    try {
        const audioStream = await synthesizeSpeech(text);

        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': 'attachment; filename="speech.mp3"',
        });

        res.send(audioStream);
    } catch (error) {
        res.status(500).json({ error: "Failed to generate speech." });
    }
});

module.exports = router;
