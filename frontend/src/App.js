// src/App.js
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Features from "./pages/Features"; // ✅ Corrected Import
import "./styles/App.css";
import photo1 from "./assets/photo1.jpg"; 

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="app-main">
      <div className="content">
        <div className="text">
          <h1>Unlock Your Potential with SmartPrepZone</h1>
          <p>Your Ultimate Hub for Topic-Wise & Level-Sorted Past Papers.</p>
          <div className="app-buttons">
            <button className="btn get-started" onClick={() => navigate("/login")}>Get Started</button>
            <button className="btn learn-more" onClick={() => navigate("/features")}>Learn More</button> {/* ✅ Fixed Path */}
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
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} /> {/* ✅ Correct Route */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
