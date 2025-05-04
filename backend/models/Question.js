const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  ID: String,
  Question: String,
  OptionA: String,
  OptionB: String,
  OptionC: String,
  OptionD: String,
  Answer: String,
  Subject: String,
  Section: String,
  Topic: String,
  Difficulty: String,
  Date: String,
  Shift: String,
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
