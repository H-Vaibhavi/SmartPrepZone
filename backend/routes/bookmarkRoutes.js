const express = require("express");
const router = express.Router();
const Bookmark = require("../models/Bookmark");

// GET /api/bookmarks/:userId - return full question details
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userBookmarks = await Bookmark.find({ userId }).populate("questionId"); // populate full question
    const bookmarkedQuestions = userBookmarks.map((bookmark) => bookmark.questionId);

    res.json(bookmarkedQuestions);
  } catch (err) {
    console.error("Error fetching bookmarks:", err);
    res.status(500).json({ message: "Error fetching bookmarks" });
  }
});

// POST /api/bookmarks - toggle bookmark
router.post("/", async (req, res) => {
  const { userId, questionId } = req.body;

  if (!userId || !questionId) {
    return res.status(400).json({ message: "userId and questionId are required" });
  }

  try {
    const existing = await Bookmark.findOne({ userId, questionId });

    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      return res.status(200).json({ message: "Bookmark removed" });
    }

    const newBookmark = new Bookmark({ userId, questionId });
    await newBookmark.save();

    res.status(201).json({ message: "Bookmark added", bookmark: newBookmark });
  } catch (error) {
    console.error("Bookmark error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
