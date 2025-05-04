const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Middleware
const corsOptions = {
  origin: "http://localhost:3000",  // ✅ Your frontend origin
  credentials: true,               // ✅ Allow credentials like cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Allow necessary HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],     // Allow specific headers
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Static Files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/questions", questionRoutes);  // This path is now correctly matched with frontend
app.use("/api/bookmarks", bookmarkRoutes); // ✅ updated to match frontend
app.use("/api/chat", chatRoutes);

// Handle OPTIONS preflight request (for CORS)
app.options("*", cors(corsOptions));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to SmartPrepZone API 🚀");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Internal server error:", err.message);
  console.error("Stack Trace:", err.stack); // Logs the stack trace for more details
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
