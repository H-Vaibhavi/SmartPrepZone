import React, { useState, useEffect } from "react";
import "../styles/ProfilePage.css";
import profileImage from "../assets/profile.png"; // Import your fixed image

function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!userData) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Fixed Profile Image */}
        <div className="profile-img-section">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-img"
          />
        </div>

        {/* User Details */}
        <div className="profile-details">
          <h2>{userData.name || "No Name"}</h2>
          <p>Email: {userData.email || "Not Available"}</p>
        </div>

        {/* Logout Button */}
        <div className="profile-actions">
          <button onClick={handleLogout} className="logout-btn">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
