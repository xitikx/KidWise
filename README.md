# KidWise - A Magical Storytelling App for Kids

## Overview
KidWise is an interactive storytelling web application designed for kids, featuring a whimsical UI with animated backgrounds, floating robot characters, and a robust story generation pipeline powered by a sophisticated AWS backend. Built with React on the frontend, KidWise leverages a suite of AWS services to generate engaging stories, images, and audio based on user-selected prompts like "A Space Adventure" or "The Brave Knight." The stories are generated using Gemini, images are created using Stable Diffusion 3.5 Large via the Hugging Face API (`https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large`), and audio is synthesized using AWS Polly. AWS Step Functions orchestrates the entire pipeline through four dedicated Lambda functions—`GenerateStoryLambda`, `GenerateImageLambda`, `GenerateAudioLambda`, and `ValidateOutputLambda`—alongside API Gateway, S3 storage, and Polly for audio synthesis, while AWS Cognito ensures secure user authentication with OIDC integration, delivering a delightful experience for young users.

## Features
- **Interactive Story Selection**: Choose from a variety of story prompts displayed as animated cards, with selections triggering the AWS backend pipeline.
- **Dynamic Story Display**: Stories are split into parts (Beginning, Middle, Climax, End), each with accompanying images and audio, all generated and delivered through AWS services.
- **Whimsical UI**: Dark gradient background, floating circles, and playful robot characters animated with Framer Motion, creating a magical frontend experience.
- **Secure Authentication**: AWS Cognito provides robust user authentication with OIDC integration, ensuring secure access to the app.
- **Powerful AWS Backend Pipeline**: AWS Step Functions orchestrates the entire workflow, coordinating four Lambda functions: `GenerateStoryLambda` (for story generation via Gemini), `GenerateImageLambda` (for image generation via Stable Diffusion 3.5 Large), `GenerateAudioLambda` (for audio synthesis via AWS Polly), and `ValidateOutputLambda` (for validating and formatting the outputs). AWS API Gateway handles secure API requests, and generated assets are stored in AWS S3 buckets (`store-images-kidwise` for images and `store-audios-kidwise` for audio).
- **Responsive Design**: Fully responsive UI that works on desktops, tablets, and mobile devices, seamlessly integrated with the AWS backend.

## Tech Stack
- **Frontend**:
  - React.js (for building the UI)
  - React Router (for navigation between pages)
  - Framer Motion (for animations like floating circles and robots)
  - React OIDC Context (for AWS Cognito authentication)
  - Axios (for making API calls to the AWS backend)
- **AWS Backend**:
  - **AWS Step Functions**: Orchestrates the story generation pipeline by coordinating multiple AWS services in a serverless workflow.
  - **AWS Lambda**: Executes four serverless functions to handle the pipeline:
    - `GenerateStoryLambda`: Generates the story text using Gemini.
    - `GenerateImageLambda`: Creates images for each story part using Stable Diffusion 3.5 Large via the Hugging Face API.
    - `GenerateAudioLambda`: Synthesizes audio for each story part using AWS Polly.
    - `ValidateOutputLambda`: Validates the outputs (story, images, audio) and formats them for delivery.
  - **AWS API Gateway**: Provides a secure API endpoint (`https://ydrr43po2d.execute-api.us-east-1.amazonaws.com/prod/generate-story`) to trigger the Step Functions workflow.
  - **AWS S3**: Stores generated images in the `store-images-kidwise` bucket and audio files in the `store-audios-kidwise` bucket, ensuring scalable and reliable storage.
  - **AWS Cognito**: Manages user authentication with OIDC integration, providing secure access control for the app.
  - **AWS Polly**: Synthesizes high-quality audio from story text, creating an immersive listening experience for each story part.
- **AI Services**:
  - Gemini (story generation)
  - Stable Diffusion 3.5 Large via Hugging Face API (`https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large`) (image generation)
- **Other**:
  - AWS SDK for JavaScript (for interacting with Step Functions in the frontend)
  - Environment variables (via `.env` for local development)

## Usage
1. **Sign In**: Use your Cognito credentials to log in, securely authenticated via AWS Cognito.
2. **Select a Story**: On the Story Selection page, click a story card (e.g., "The Brave Knight") to trigger the AWS backend pipeline.
3. **View the Story**: The AWS Step Functions workflow, powered by the four Lambda functions (`GenerateStoryLambda`, `GenerateImageLambda`, `GenerateAudioLambda`, `ValidateOutputLambda`), will generate the story (via Gemini), images (via Stable Diffusion 3.5 Large), and audio (via AWS Polly), then display the results with navigation buttons to cycle through story parts (Beginning, Middle, Climax, End).
4. **Listen and Explore**: Use the "Listen to Story" button to play audio for each part (synthesized by AWS Polly), and enjoy the animated UI with floating robots.

---

Built with ❤️ by [Your Name]