require('dotenv').config();
console.log("API Key Loaded:", process.env.HF_API_KEY ? "✅ Yes" : "❌ No");

const express = require("express");
const cors = require('cors');

const storyRoutes = require('./routes/story');
const imageRoutes = require('./routes/image');
const ttsRoutes = require('./routes/tts');
// const pdfRoutes = require('./routes/pdf');

const app = express();
// app.use(cors());
app.use(cors({
    origin: 'https://kidwise.netlify.app/',  // Or any other domain your frontend is hosted on
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }));
app.use(express.json());

// Microservice Routes
app.use('/api/story', storyRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/tts', ttsRoutes);
// app.use('/api/pdf', pdfRoutes);




// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err.stack);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// app.use(cors({
//     origin: 'https://kidwise.netlify.app/',  // Or any other domain your frontend is hosted on
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type']
//   }));

const PORT = process.env.PORT || 5000;

console.log("✅ Registered Routes:");
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
