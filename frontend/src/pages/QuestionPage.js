import React, { useState, useEffect, useCallback } from "react";
import axios from "../axiosConfig";
import { fetchFilteredQuestions } from "../utils/api";
import "../styles/QuestionsPage.css";
import { FaRegStar, FaStar } from "react-icons/fa";

function QuestionsPage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState({
    subjects: ["Physics", "Chemistry", "Maths"],
    sections: [],
    topics: [],
    difficulties: [],
    dates: [],
    shifts: [],
  });

  const [filters, setFilters] = useState({
    search: "",
    subject: "",
    section: "",
    topic: "",
    difficulty: "",
    date: "",
    shift: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const updateDropdowns = useCallback((questions) => {
    const bySubject = filters.subject
      ? questions.filter((q) => q.Subject === filters.subject)
      : questions;
    const bySection = filters.section
      ? bySubject.filter((q) => q.Section === filters.section)
      : bySubject;

    const unique = (arr, key) => [...new Set(arr.map((q) => q[key]).filter(Boolean))];
    const dates = unique(bySection, "Date");

    setDropdownOptions((prev) => ({
      ...prev,
      sections: unique(bySubject, "Section"),
      topics: unique(bySection, "Topic"),
      difficulties: unique(bySection, "Difficulty"),
      dates: dates.filter(Boolean),
      shifts: unique(bySection, "Shift"),
    }));
  }, [filters.subject, filters.section]);

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await fetchFilteredQuestions();
      setAllQuestions(res.data);
      setFilteredQuestions(res.data);
      updateDropdowns(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  }, [updateDropdowns]);

  const fetchBookmarks = useCallback(async () => {
    try {
      const res = await axios.get(`/api/bookmarks/${user._id}`, { withCredentials: true });
      setBookmarks(res.data);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    }
  }, [user._id]);

  const filterQuestions = useCallback(() => {
    const { search, subject, section, topic, difficulty, date, shift } = filters;

    const filtered = allQuestions.filter((q) => {
      return (
        (!search || q.Question.toLowerCase().includes(search.toLowerCase())) &&
        (!subject || q.Subject === subject) &&
        (!section || q.Section === section) &&
        (!topic || q.Topic === topic) &&
        (!difficulty || q.Difficulty === difficulty) &&
        (!date || q.Date === date) &&
        (!shift || q.Shift === shift)
      );
    });

    setFilteredQuestions(filtered);
    updateDropdowns(filtered);
  }, [allQuestions, filters, updateDropdowns]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "subject" && { section: "", topic: "" }),
      ...(name === "section" && { topic: "" }),
    }));
  };

  const handleBookmark = async (id) => {
    try {
      const isBookmarked = bookmarks.includes(id);
      if (isBookmarked) {
        setBookmarks(bookmarks.filter((bId) => bId !== id));
        await axios.delete("/api/bookmarks", {
          data: { userId: user._id, questionId: id },
        });
      } else {
        setBookmarks([...bookmarks, id]);
        await axios.post("/api/bookmarks", {
          userId: user._id,
          questionId: id,
        });
      }
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchBookmarks();
  }, [fetchQuestions, fetchBookmarks]);

  useEffect(() => {
    filterQuestions();
  }, [filters, allQuestions]);

  return (
    <div className="question-page" style={{ position: "relative" }}>
      <h2>Explore Questions</h2>

      {/* Chatbot Button (Top-Right Corner) */}
      <button
        onClick={() =>
          window.open(
            "https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/21/14/20250421140206-95L99T63.json",
            "_blank"
          )
        }
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "#4a90e2",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "22px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          cursor: "pointer",
          zIndex: 1000,
        }}
        title="Chat with us"
      >
        💬
      </button>

      <div className="filters">
        <input name="search" placeholder="Search question..." onChange={handleChange} />
        <select name="subject" value={filters.subject} onChange={handleChange}>
          <option value="">All Subjects</option>
          {dropdownOptions.subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select name="section" value={filters.section} onChange={handleChange}>
          <option value="">All Sections</option>
          {dropdownOptions.sections.map((sec) => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
        <select name="topic" value={filters.topic} onChange={handleChange}>
          <option value="">All Topics</option>
          {dropdownOptions.topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select name="difficulty" value={filters.difficulty} onChange={handleChange}>
          <option value="">All Difficulty</option>
          {dropdownOptions.difficulties.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select name="date" value={filters.date} onChange={handleChange}>
          <option value="">All Dates</option>
          {dropdownOptions.dates.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select name="shift" value={filters.shift} onChange={handleChange}>
          <option value="">All Shifts</option>
          {dropdownOptions.shifts.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="questions-container">
        {filteredQuestions.length ? (
          filteredQuestions.map((q, index) => (
            <div className="question-card" key={q._id}>
              <p><strong>Q{index + 1}:</strong> {q.Question}</p>
              <ul>
                <li>A. {q.OptionA}</li>
                <li>B. {q.OptionB}</li>
                <li>C. {q.OptionC}</li>
                <li>D. {q.OptionD}</li>
              </ul>
              <p><strong>Answer:</strong> {q.Answer}</p>
              <p>
                <strong>Subject:</strong> {q.Subject} |{" "}
                <strong>Section:</strong> {q.Section} |{" "}
                <strong>Topic:</strong> {q.Topic} |{" "}
                <strong>Difficulty:</strong> {q.Difficulty} |{" "}
                <strong>Date:</strong> {q.Date} |{" "}
                <strong>Shift:</strong> {q.Shift}
              </p>
              <div className="question-actions">
                <span onClick={() => handleBookmark(q._id)} style={{ cursor: "pointer" }}>
                  {bookmarks.includes(q._id) ? <FaStar color="#ffc107" /> : <FaRegStar />}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </div>
  );
}

export default QuestionsPage;
