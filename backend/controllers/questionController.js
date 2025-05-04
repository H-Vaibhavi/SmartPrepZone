const Question = require("../models/Question");

const getQuestions = async (req, res) => {
  try {
    const {
      section,
      topic,
      difficulty,
      year,
      shift,
      search,
      page = 1,
      limit = 100,
    } = req.query;

    let query = {};

    if (section) query.section = { $regex: section, $options: "i" };
    if (topic) query.topic = { $regex: topic, $options: "i" };
    if (difficulty) query.difficulty = difficulty;
    if (year) query.date = { $regex: `^${year}` };
    if (shift) query.shift = shift;
    if (search) {
      query.$or = [
        { question: new RegExp(search, "i") },
        { optionA: new RegExp(search, "i") },
        { optionB: new RegExp(search, "i") },
        { optionC: new RegExp(search, "i") },
        { optionD: new RegExp(search, "i") },
        { answer: new RegExp(search, "i") },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const questions = await Question.find(query).skip(skip).limit(parseInt(limit));
    const total = await Question.countDocuments(query);

    res.json({
      data: questions,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
    });
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Server error while fetching questions" });
  }
};

module.exports = {
  getQuestions,
};
