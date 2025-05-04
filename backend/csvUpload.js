const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const Question = require("./models/Question"); // make sure this schema exists

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/smartprepzone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB connected");

  const questions = [];

  fs.createReadStream("questions.csv")
    .pipe(csv())
    .on("data", (data) => {
      questions.push(data);
    })
    .on("end", async () => {
      try {
        await Question.insertMany(questions);
        console.log("✅ CSV data inserted into DB");
      } catch (err) {
        console.error("❌ Error inserting CSV data:", err);
      } finally {
        mongoose.disconnect();
      }
    });
});
