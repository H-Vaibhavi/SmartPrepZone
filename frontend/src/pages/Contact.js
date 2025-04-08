import React from "react";
import "../styles/Contact.css"; 
import Footer from "../components/Footer";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser } from "react-icons/fa";

function Contact() {
  return (
    <div className="contact-container">

      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>We’re here to help! Reach out using the options below.</p>

        <div className="contact-grid">
          {/* Upper Row - Email & Phone */}
          <div className="contact-row">
            <div className="contact-card">
              <FaEnvelope className="contact-icon" />
              <h3>Email</h3>
              <p>
                <a href="mailto:support@smartprepzone.com" className="contact-link">
                  support@smartprepzone.com
                </a>
              </p>
            </div>

            <div className="contact-card">
              <FaPhone className="contact-icon" />
              <h3>Phone</h3>
              <p>
                <a href="tel:+919763248843" className="contact-link">
                  +91 97632 48843
                </a>
              </p>
            </div>
          </div>

          {/* Bottom Row - Address & Developer */}
          <div className="contact-row">
            <div className="contact-card">
              <FaMapMarkerAlt className="contact-icon" />
              <h3>Address</h3>
              <p>Walchand College of Engineering, Sangli, Maharashtra, India</p>
            </div>

            <div className="contact-card">
              <FaUser className="contact-icon" />
              <h3>Developed By</h3>
              <p>IT Developers</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
