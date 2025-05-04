import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import profileLogo from "../assets/prof.png"; // Importing the profile logo

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/questionpage");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="app-header">
      <div className="app-logo" onClick={() => navigate("/")}>
        SmartPrepZone
      </div>
      <nav className="app-nav">
        <button className="nav-link" onClick={() => navigate("/")}>Home</button>
        <button className="nav-link" onClick={() => navigate("/features")}>Features</button>
        <button className="nav-link" onClick={() => navigate("/contact")}>Contact</button>
        <button onClick={handleGetStarted} className="nav-link">Get Started</button>
        {user ? (
          <div className="profile-dropdown">
            <img
              src={profileLogo} // Using the imported logo
              alt="Profile Logo"
              className="profile-logo"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => navigate("/profile")}>My Profile</button>
                <button onClick={() => navigate("/bookmarked")}>Bookmarked Questions</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="btn" onClick={() => navigate("/login")}>Log In</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
