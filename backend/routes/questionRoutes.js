const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET /api/questions - Fetch with optional filters and optional pagination
router.get("/", async (req, res) => {
  try {
    const {
      subject,
      section,
      topic,
      difficulty,
      year,
      shift,
      search,
      page,
      limit,
    } = req.query;

    let query = {};
    
    if (subject) query.section = { $regex: subject, $options: "i" };
    if (section) query.section = { $regex: section, $options: "i" };
    if (topic) query.topic = { $regex: topic, $options: "i" };
    if (difficulty) query.difficulty = difficulty;
    if (year) query.date = { $regex: `^${year}` };
    if (shift) query.shift = shift;
    if (search) {
      query.$or = [
        { question: new RegExp(search, "i") },
        { question: new RegExp(search, "i") },
        { optionA: new RegExp(search, "i") },
        { optionB: new RegExp(search, "i") },
        { optionC: new RegExp(search, "i") },
        { optionD: new RegExp(search, "i") },
        { answer: new RegExp(search, "i") },
      ];
    }

    // If pagination is applied
    if (page && limit) {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const questions = await Question.find(query).skip(skip).limit(parseInt(limit));
      const total = await Question.countDocuments(query);

      return res.json({
        data: questions,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
      });
    }

    // Otherwise fetch all
    const questions = await Question.find(query);
    return res.json({
      data: questions,
      totalItems: questions.length,
    });

  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Server error while fetching questions" });
  }
});

module.exports = router;
