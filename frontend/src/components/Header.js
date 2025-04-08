// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="app-logo" onClick={() => navigate("/")}>
        SmartPrepZone
      </div>
      <nav className="app-nav">
        <button className="nav-link" onClick={() => navigate("/")}>Home</button>
        <button className="nav-link" onClick={() => navigate("/features")}>Features</button> {/* ✅ Correct Path */}
        <button className="nav-link" onClick={() => navigate("/contact")}>Contact</button>
        <button className="btn get-started" onClick={() => navigate("/login")}>Get Started</button>
        <button className="btn sign-up" onClick={() => navigate("/signup")}>Sign Up</button>
      </nav>
    </header>
  );
}

export default Header;
