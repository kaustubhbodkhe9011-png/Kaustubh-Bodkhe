// ============================================================
// ★ config.js — Portfolio Configuration for Kaustubh Bodkhe ★
// ============================================================

// Dynamic base URL for assets - works on GitHub Pages subpaths, Vercel, and localhost
const BASE = (import.meta.env.BASE_URL || "./").replace(/\/+$/, "");
const getAsset = (file) => {
  const clean = file.replace(/^\/+/, "");
  return BASE ? `${BASE}/${clean}` : `./${clean}`;
};

export const siteConfig = {
  name: "Kaustubh Bodkhe",
  title: "BSc CS Student | AI/ML & NLP Enthusiast | Full-Stack Developer",
  location: "Pune, Maharashtra, India",
  email: "kaustubhbodkhe@gmail.com",
  github: "https://github.com/kaustubhbodkhe9011-png/Kaustubh-Bodkhe",
  linkedin: "https://linkedin.com/in/kaustubhbodkhe", // [ADD EXACT LINKEDIN URL]
  resumeUrl: getAsset("resume.pdf"),
  photoUrl: getAsset("photo.jpg"),
  ogImage: getAsset("og-image.png"),

  // Bio shown in Hero and About sections
  bio: `I'm a Computer Science student at ASM CSIT (Affiliated to SPPU, Pune), passionate about building intelligent systems that understand and generate human language.

Currently exploring Natural Language Processing, Large Language Models, and Retrieval-Augmented Generation (RAG) architectures alongside full-stack engineering. My goal is to bridge the gap between cutting-edge AI research and practical, reliable web applications.

I speak Marathi, Hindi, and English fluently and enjoy working on projects that solve real-world problems.`,

  // Short one-liner for hero
  heroTagline:
    "Building intelligent systems that understand language and solve real-world problems.",

  // Roles for the typing animation
  roles: [
    "AI/ML & NLP Enthusiast",
    "Full-Stack Developer",
    "LLM & RAG Builder",
    "BSc CS Student @ ASM CSIT",
  ],

  // Languages spoken
  languages: ["Marathi", "Hindi", "English"],

  // Career goal
  careerGoal:
    "AI/ML and NLP Engineer focused on LLMs, RAG systems, and intelligent chatbots",
};

// ============================================================
// SKILLS — grouped by category (no fake % bars)
// ============================================================
export const skills = [
  {
    category: "Languages",
    icon: "code",
    items: ["Python", "JavaScript (ES6+)", "C", "SQL", "HTML5", "CSS3"],
  },
  {
    category: "Frontend",
    icon: "globe",
    items: ["React 18", "Vite", "Tailwind CSS", "Bootstrap 5", "Framer Motion", "EJS"],
  },
  {
    category: "Backend",
    icon: "server",
    items: ["Node.js", "Express.js", "Django", "REST APIs", "JWT Auth"],
  },
  {
    category: "Database",
    icon: "database",
    items: ["MySQL", "SQLite3", "MongoDB", "Mongoose", "3NF Normalization"],
  },
  {
    category: "AI / ML & NLP",
    icon: "brain",
    items: ["NLP Fundamentals", "LLM APIs (Gemini, Replicate)", "RAG Basics", "Prompt Engineering", "Langchain (learning)"],
  },
  {
    category: "Tools & Platforms",
    icon: "tool",
    items: ["Git", "GitHub", "VS Code", "Vercel", "Postman", "Linux CLI", "Figma"],
  },
];

// ============================================================
// PROJECTS — 4 featured projects
// ============================================================
export const projects = [
  {
    id: "stocksync",
    title: "StockSync — Smart Inventory Management",
    shortDesc:
      "A database-backed inventory system with autonomous low-stock detection and atomic stock updates for retail shops.",
    problem:
      "Small retail merchants struggle to track stock using manual paper notebooks, leading to unnoticed stock-outs, overstocking, and calculation discrepancies.",
    solution:
      "Built StockSync with Django — a full CRUD inventory system with role-based access, automatic low-stock alerts, and atomic stock transactions to prevent race conditions.",
    features: [
      "Autonomous low-stock detection engine with reorder alerts",
      "Live atomic dual-direction stock updates for sales and purchases",
      "Pessimistic concurrency locking (select_for_update) preventing race conditions",
      "Role-based session authentication (Owner, Staff)",
      "Financial dashboard calculating inventory valuation & gross profit margins",
      "Visual Chart.js analytics for stock trends",
    ],
    learned:
      "Relational schema design (3NF), pessimistic row locking in ACID transactions, role-based session security, and data visualization.",
    tech: ["Python", "Django", "MySQL", "SQLite3", "Bootstrap 5", "Chart.js"],
    github: "https://github.com/kaustubhbodkhe9011-png/Kaustubh-Bodkhe",
    liveDemo: null,
    screenshot: getAsset("projects/smart-inventory.png"),
    category: "fullstack",
  },
  {
    id: "reel-forge",
    title: "Reel Forge — AI Video Generator",
    shortDesc:
      "A full-stack generative AI web application that converts natural language text prompts into video clips.",
    problem:
      "Creating short-form video content is time-consuming and requires specialized editing skills. Content creators need a fast, AI-powered generation pipeline.",
    solution:
      "Built Reel Forge using Node.js + Express + Replicate AI diffusion models. Users type a text prompt and the app asynchronously generates, polls, and delivers a downloadable video.",
    features: [
      "Text prompt to video generation powered by Replicate AI diffusion models",
      "Asynchronous job polling with real-time status and progress indicators",
      "Interactive video preview player, direct download, and sharing tools",
      "Responsive, sleek dark-themed UI built for speed and accessibility",
    ],
    learned:
      "Integrating cutting-edge Generative AI APIs, managing asynchronous background jobs, handling media streams, and resilient error recovery.",
    tech: ["Node.js", "Express", "Replicate API", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/kaustubhbodkhe9011-png/Kaustubh-Bodkhe",
    liveDemo: null,
    screenshot: getAsset("projects/reel-forge.png"),
    category: "ai",
  },
  {
    id: "python-learning",
    title: "Interactive Python Learning Platform",
    shortDesc:
      "An educational web portal featuring structured, step-by-step learning tracks from Python fundamentals to data structures.",
    problem:
      "Beginners often struggle to find a structured, hands-on path to learn programming without getting overwhelmed by theory.",
    solution:
      "Designed a clean, distraction-free learning portal with progressive tracks — Basics → Control Flow → Functions → OOP → Data Structures — with live code examples.",
    features: [
      "Structured tracks: Basics → Control Flow → Functions → OOP → Data Structures",
      "Interactive code snippets with real-time syntax highlighting",
      "Visual progress tracking across multiple modules and chapters",
      "Fully responsive, clean interface tailored for distraction-free study",
    ],
    learned:
      "Curriculum architecture for technical learning, accessible UI design, progressive disclosure patterns, and client-side state management.",
    tech: ["HTML5", "CSS3", "JavaScript", "Python"],
    github: "https://github.com/kaustubhbodkhe9011-png/Kaustubh-Bodkhe",
    liveDemo: null,
    screenshot: getAsset("projects/python-learning.png"),
    category: "frontend",
  },
  {
    id: "this-portfolio",
    title: "Personal Portfolio Website",
    shortDesc:
      "This portfolio — a production-ready React + Vite + Tailwind CSS site with Framer Motion animations, dark/light theme, and a Node.js + MongoDB backend.",
    problem:
      "Needed a professional online presence to showcase projects, skills, and education — with a contact form, resume download, and fast performance.",
    solution:
      "Built a complete full-stack portfolio: React frontend with Framer Motion animations, dark/light toggle, responsive design; Node.js + Express REST API backend; MongoDB for contact messages; SEO, sitemap, Open Graph.",
    features: [
      "React 18 + Vite 6 + Tailwind CSS + Framer Motion",
      "Dark / light theme with system preference detection",
      "Two-column hero with animated typing role display",
      "Project cards with filter and detail modal",
      "Contact form with validation — saves to MongoDB via Express API",
      "Node.js + Express REST API with JWT admin panel",
      "Resume PDF download, SEO meta tags, sitemap.xml, og-image",
    ],
    learned:
      "Full production-quality project architecture, SEO best practices, accessibility, performance optimization, and full-stack deployment.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/kaustubhbodkhe9011-png/Kaustubh-Bodkhe",
    liveDemo: null,
    screenshot: getAsset("projects/portfolio.png"),
    category: "fullstack",
  },
];

// ============================================================
// EDUCATION & CERTIFICATES
// ============================================================
export const education = [
  {
    degree: "Bachelor of Science in Computer Science (B.Sc. CS)",
    institution: "ASM CSIT (Affiliated to SPPU, Pune)",
    location: "Pune, Maharashtra, India",
    period: "2023 – 2026",
    description:
      "Focusing on software engineering, data structures, algorithms, relational database systems (RDBMS), and artificial intelligence fundamentals. Developed StockSync (Smart Inventory Management) as academic capstone project under NEP CBCS pattern.",
    current: true,
    subjects: ["Data Structures", "Algorithms", "RDBMS", "AI Fundamentals", "Web Technologies", "Operating Systems"],
  },
];

export const certificates = [
  {
    title: "Python for Data Science & Machine Learning",
    issuer: "Coursera / DeepLearning.AI",
    date: "2025",
    link: "#", // [ADD CERTIFICATE URL]
  },
  {
    title: "Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    date: "2024",
    link: "#", // [ADD CERTIFICATE URL]
  },
  {
    title: "Academic Capstone Mini Project Excellence (CS-231-FP)",
    issuer: "ASM CSIT / Department of Computer Science",
    date: "2025",
    link: "#",
  },
];

// ============================================================
// NAV LINKS
// ============================================================
export const navLinks = [
  { label: "Home",      href: "#home" },
  { label: "About",     href: "#about" },
  { label: "Skills",    href: "#skills" },
  { label: "Projects",  href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact",   href: "#contact" },
];
