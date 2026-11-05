const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const validate = [
  body("name").trim().notEmpty().isLength({ max: 100 }).withMessage("Name required (max 100 chars)"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("subject").trim().notEmpty().isLength({ max: 200 }).withMessage("Subject required"),
  body("message").trim().isLength({ min: 10, max: 2000 }).withMessage("Message must be 10–2000 chars"),
];

router.post("/", validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, subject, message } = req.body;

  // Save to DB if available
  try {
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState === 1) {
      const Message = require("../models/Message");
      await Message.create({ name, email, subject, message, ip: req.ip });
    }
  } catch (err) {
    console.error("DB save error:", err.message);
  }

  // Email notification (optional)
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer = require("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `[Portfolio] ${subject} — from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        replyTo: email,
      });
    } catch (err) {
      console.error("Email send error:", err.message);
    }
  }

  console.log(`📧 Contact form: ${name} <${email}> — "${subject}"`);
  res.json({ success: true, message: "Message received! I'll get back to you soon." });
});

module.exports = router;
