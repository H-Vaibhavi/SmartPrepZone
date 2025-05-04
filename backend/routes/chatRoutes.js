const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { question } = req.body;
  console.log("🔍 AI Chat asked:", question);

  if (!question) return res.status(400).json({ message: "Question required" });

  // Mocked response for now:
  res.json({ solution: `This is a placeholder solution for: ${question}` });
});

module.exports = router;
