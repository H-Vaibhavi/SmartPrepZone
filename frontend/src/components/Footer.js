import React from "react";
import "../styles/Footer.css";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Side: Branding & Tagline */}
        <div className="footer-left">
          <h3>SmartPrepZone</h3>
          <p>Empowering students to achieve success in MHT-CET and beyond.</p>
        </div>

        {/* Right Side: Social Media Links */}
        <div className="footer-right">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Bottom Centered Copyright Text */}
      <div className="footer-bottom">
        <p>&copy; 2025 SmartPrepZone. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
