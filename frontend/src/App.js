// import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import ProfilePage from "./pages/ProfilePage";
import BookmarkedQuestions from "./pages/BookmarkedQuestions";
import Features from "./pages/Features";
import QuestionsPage from "./pages/QuestionPage";
import FloatingChatbot from "./components/FloatingChatbot";
import photo1 from "./assets/photo1.jpg";
import "./styles/App.css";

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/questionpage");
    } else {
      navigate("/login");
    }
  };

  return (
    <main className="app-main">
      <div className="content">
        <div className="text">
          <h1>Unlock Your Potential with SmartPrepZone</h1>
          <p>Your Ultimate Hub for Topic-Wise & Level-Sorted Past Papers.</p>
          <div className="app-buttons">
            <button onClick={handleGetStarted} className="btn get-started">
              Get Started
            </button>
            <button className="btn learn-more" onClick={() => navigate("/features")}>
              Learn More
            </button>
          </div>
        </div>
        <div className="image">
          <img src={photo1} alt="Student studying" />
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/questionpage" element={<QuestionsPage />} />
        <Route path="/floatingchatbot" element={<FloatingChatbot />} />
        <Route path="/bookmarked" element={<BookmarkedQuestions />} />
      </Routes>
  
      <Footer />
    </div>

  );
}

export default App;
