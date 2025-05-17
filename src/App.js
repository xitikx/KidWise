// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import StorySelectionPage from "./pages/StorySelectionPage"; 
import StoryDisplayPage from "./pages/StoryDisplayPage";
import ProtectedLayout from "./components/ProtectedLayout";
import LoadingPage from "./components/LoadingPage";

const App = () => {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected routes with header */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/story-selection" element={<StorySelectionPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/story-display" element={<StoryDisplayPage />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
