const express = require("express");
const router = express.Router();

// Return projects data (from config — could be DB in future)
const projects = [
  {
    id: "stocksync",
    title: "StockSync — Smart Inventory Management",
    shortDesc: "A database-backed inventory system with autonomous low-stock detection and atomic stock updates for retail shops.",
    tech: ["Python", "Django", "MySQL", "SQLite3", "Bootstrap 5", "Chart.js"],
    github: "https://github.com/kaustubhbodkhe9011-png/Kaustubh-Bodkhe",
    liveDemo: null,
    category: "fullstack",
  },
  {
    id: "reel-forge",
    title: "Reel Forge — AI Video Generator",
    shortDesc: "A full-stack generative AI web application that converts natural language text prompts into video clips.",
    tech: ["Node.js", "Express", "Replicate API", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/kaustubhbodkhe9011-png/Kaustubh-Bodkhe",
    liveDemo: null,
    category: "ai",
  },
  {
    id: "python-learning",
    title: "Interactive Python Learning Platform",
    shortDesc: "An educational web portal featuring structured, step-by-step learning tracks from Python fundamentals to data structures.",
    tech: ["HTML5", "CSS3", "JavaScript", "Python"],
    github: "https://github.com/kaustubhbodkhe9011-png/Kaustubh-Bodkhe",
    liveDemo: null,
    category: "frontend",
  },
];

router.get("/", (req, res) => res.json(projects));
router.get("/:id", (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

module.exports = router;
