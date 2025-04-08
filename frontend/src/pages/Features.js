import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaBookOpen, FaUpload, FaSearch, FaTrophy } from "react-icons/fa";
import "../styles/Feature.css";

function FeaturesPage() {
  return (
    <>

      <div className="page-wrapper">
        <main className="feature-container">
          <h2 className="feature-title">Why Choose SmartPrepZone?</h2>
          <p className="feature-subtitle">
            Enhance your MHT-CET preparation with our smart features.
          </p>

          <div className="feature-grid">
            <div className="feature-card">
              <FaBookOpen className="feature-icon" />
              <h3>Topic-Wise Questions</h3>
              <p>Practice subject-wise and topic-wise questions effortlessly.</p>
            </div>

            <div className="feature-card">
              <FaUpload className="feature-icon" />
              <h3>Easy Uploads</h3>
              <p>Upload question papers and categorize them with AI.</p>
            </div>

            <div className="feature-card">
              <FaSearch className="feature-icon" />
              <h3>Advanced Filters</h3>
              <p>Search and filter questions by subject, year, and difficulty.</p>
            </div>

            <div className="feature-card">
              <FaTrophy className="feature-icon" />
              <h3>Achievements & Badges</h3>
              <p>Track progress and earn rewards for consistent learning.</p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default FeaturesPage;
