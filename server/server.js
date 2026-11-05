require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rate limiter for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { error: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes
app.use("/api/contact", contactLimiter, require("./routes/contact"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/admin", require("./routes/admin"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

// Connect DB and start
const connectDB = async () => {
  if (process.env.MONGODB_URI) {
    try {
      const mongoose = require("mongoose");
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.warn("⚠️  MongoDB connection failed:", err.message);
      console.warn("   Running without database (contact form will log to console)");
    }
  } else {
    console.warn("⚠️  No MONGODB_URI set — running without database");
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Portfolio API running on http://localhost:${PORT}`);
  });
});
