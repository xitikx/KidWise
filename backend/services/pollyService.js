const AWS = require('aws-sdk');
require('dotenv').config();

// Configure AWS Polly
const polly = new AWS.Polly({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

async function synthesizeSpeech(text) {
    const params = {
        Text: text,
        OutputFormat: 'mp3', // Options: 'mp3', 'ogg_vorbis', 'pcm'
        VoiceId: 'Joanna'  // You can change the voice (e.g., 'Matthew', 'Amy', 'Brian')
    };

    try {
        const { AudioStream } = await polly.synthesizeSpeech(params).promise();
        return AudioStream;
    } catch (error) {
        console.error("❌ Polly Error:", error);
        throw new Error("Text-to-speech conversion failed");
    }
}

module.exports = synthesizeSpeech;
