import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import { SFNClient, DescribeExecutionCommand } from "@aws-sdk/client-sfn";
import "../styles/StorySelectionPage.css";
import { motion } from "framer-motion";

const stories = [
  { title: "The Brave Knight", prompt: "A brave knight", image: require("../assets/braveKnight.jpg") },
  { title: "Space Adventure", prompt: "A space adventure", image: require("../assets/spaceAdventure.jpg") },
  { title: "The Lost Treasure", prompt: "The lost treasure", image: require("../assets/lostTreasure.jpg") },
  { title: "Magical Forest", prompt: "A magical forest", image: require("../assets/magicForest.jpg") },
  { title: "The Time Machine", prompt: "The time machine", image: require("../assets/timeMachine.jpg") },
  { title: "Underwater Kingdom", prompt: "Underwater kingdom", image: require("../assets/waterKingdom.jpg") },
  { title: "Robot’s Dream", prompt: "A robot's dream", image: require("../assets/robotDream.jpg") },
  { title: "The Flying Ship", prompt: "A flying ship", image: require("../assets/flyingShip.jpg") }
];

// Initialize SFNClient with hardcoded credentials (for testing only)
const sfnClient = new SFNClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
    // sessionToken: "YOUR_SESSION_TOKEN" // Optional, only if using temporary credentials
  }
});

const StorySelectionPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pollStepFunctions = async (arn) => {
    for (let i = 0; i < 30; i++) {
      const command = new DescribeExecutionCommand({ executionArn: arn });
      const result = await sfnClient.send(command);
      if (result.status === 'SUCCEEDED') {
        return JSON.parse(result.output);
      }
      if (result.status === 'FAILED') {
        throw new Error('State machine execution failed');
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    throw new Error('Execution timed out');
  };

  const handleStorySelect = async (story) => {
    if (!auth.isAuthenticated) {
      navigate("/");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Navigate to loading page
      navigate('/loading');

      // Make API call to API Gateway with Cognito ID token
      const apiUrl = "https://ydrr43po2d.execute-api.us-east-1.amazonaws.com/prod/generate-story";
      const res = await axios.post(apiUrl, { prompt: story.prompt }, {
        headers: {
          Authorization: `Bearer ${auth.user.id_token}`
        }
      });
      const executionArn = res.data.executionArn;

      // Poll state machine
      const output = await pollStepFunctions(executionArn);
      const { storyOutput, imageOutput, audioOutput } = output;

      // Parse storyOutput body (it's a JSON string)
      const storyBody = JSON.parse(storyOutput.body);
      const parts = storyBody.parts;

      // Parse audioOutput body (it's a JSON string)
      const audioBody = JSON.parse(audioOutput.body);
      const audioUrls = audioBody.audioUrls;

      // Handle imageOutput (it might have failed)
      let imageUrls = {};
      if (imageOutput.statusCode === 200) {
        const imageBody = JSON.parse(imageOutput.body);
        imageUrls = imageBody.imageUrls;
      } else {
        console.warn("Image processing failed:", imageOutput.body);
        imageUrls = { beginning: "", middle: "", climax: "", end: "" };
      }

      // Navigate to story display page with results
      navigate("/story-display", {
        state: {
          title: story.title,
          prompt: story.prompt,
          storyParts: parts,
          imageUrls,
          audioUrls
        }
      });
    } catch (err) {
      console.error("Story pipeline error:", err);
      setError("Something went wrong while generating your story. Please try again.");
      navigate("/story-selection", { state: { error: err.message } });
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

      {isLoading && <div>Loading your story...</div>}
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default StorySelectionPage;