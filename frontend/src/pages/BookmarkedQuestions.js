import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "../styles/QuestionsPage.css";

const BookmarkedQuestions = () => {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(`/api/bookmarks/${user._id}`);
        setBookmarkedQuestions(res.data); // Now this contains full question objects
      } catch (err) {
        console.error("Failed to fetch bookmarked questions:", err);
      }
    };

    fetchBookmarks();
  }, [user._id]);

  return (
    <div className="question-page">
      <h2>⭐ Bookmarked Questions</h2>
      {bookmarkedQuestions.length === 0 ? (
        <p>No bookmarks yet!</p>
      ) : (
        bookmarkedQuestions.map((q, index) => {
          // Check if q is a valid object before rendering
          if (!q) {
            console.error("Invalid bookmark object:", q); // Log invalid objects for debugging
            return null; // Skip rendering this bookmark
          }

          return (
            <div key={q._id} className="question-card">
              <p><strong>Q{index + 1}:</strong> {q.Question}</p>
              <ul>
                <li>A. {q.OptionA}</li>
                <li>B. {q.OptionB}</li>
                <li>C. {q.OptionC}</li>
                <li>D. {q.OptionD}</li>
              </ul>
              <p><strong>Answer:</strong> {q.Answer}</p>
              <p><strong>Topic:</strong> {q.Topic}</p>
              <p><strong>Difficulty:</strong> {q.Difficulty}</p>
              <p><strong>Date:</strong> {q.Date}</p>
              <p><strong>Shift:</strong> {q.Shift}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BookmarkedQuestions;
