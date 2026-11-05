const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// POST /api/admin/login
router.post("/login", async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "Password required" });

  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) return res.status(500).json({ error: "Admin not configured" });

  const valid = await bcrypt.compare(password, hash);
  if (!valid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET || "dev_secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
  res.json({ token });
});

// GET /api/admin/messages (protected)
router.get("/messages", auth, async (req, res) => {
  try {
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState !== 1) {
      return res.json({ messages: [], note: "Database not connected" });
    }
    const Message = require("../models/Message");
    const messages = await Message.find().sort({ createdAt: -1 }).limit(100);
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/admin/messages/:id/read (protected)
router.patch("/messages/:id/read", auth, async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const Message = require("../models/Message");
    await Message.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
