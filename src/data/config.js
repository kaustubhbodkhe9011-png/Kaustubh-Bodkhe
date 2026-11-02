// ============================================================
// ★ config.js — Portfolio Configuration for Kaustubh Bodkhe ★
// ============================================================

export const siteConfig = {
  name: "Kaustubh Bodkhe",
  title: "BSc CS Student | AI/ML & NLP Enthusiast | Full-Stack Developer",
  location: "Pune, Maharashtra, India",
  email: "kaustubhbodkhe@gmail.com",
  github: "https://github.com/kaustubhbodkhe",
  linkedin: "https://linkedin.com/in/kaustubhbodkhe",
  resumeUrl: "/resume.pdf",
  photoUrl: "/photo.jpg",
  ogImage: "/og-image.png",

  // Bio shown in Hero and About sections
  bio: `I'm a Computer Science student at Dr. D. Y. Patil ACS College (SPPU, Pune) passionate about building intelligent systems that understand and generate human language.

Currently exploring Natural Language Processing, Large Language Models, and Retrieval-Augmented Generation (RAG) architectures alongside full-stack engineering. My goal is to bridge the gap between cutting-edge AI research and practical, reliable web applications.`,

  // Short one-liner for hero
  heroTagline:
    "Building intelligent systems that understand language and solve real-world problems.",

  // Roles for the typing animation
  roles: [
    "AI/ML Enthusiast",
    "NLP Explorer",
    "Full-Stack Developer",
    "RAG & LLM Builder",
  ],
};

// ============================================================
// SKILLS — grouped by category
// ============================================================
export const skills = [
  {
    category: "Languages",
    icon: "code",
    items: ["Python", "JavaScript (ES6+)", "C", "SQL", "HTML5", "CSS3"],
  },
  {
    category: "Web Development",
    icon: "globe",
    items: ["React 18", "Node.js", "Express", "Django", "Tailwind CSS", "Bootstrap 5"],
  },
  {
    category: "Databases",
    icon: "database",
    items: ["MySQL", "SQLite3", "MongoDB", "3NF Normalization"],
  },
  {
    category: "AI / ML & NLP",
    icon: "brain",
    items: ["NLP Fundamentals", "LLM APIs (Gemini, Replicate)", "RAG Basics", "Prompt Engineering"],
  },
  {
    category: "Tools & Platforms",
    icon: "tool",
    items: ["Git", "GitHub", "VS Code", "Vercel", "Postman", "Linux CLI"],
  },
];

// ============================================================
// PROJECTS
// ============================================================
export const projects = [
  {
    id: "smart-inventory",
    title: "Smart Inventory Management System (SIMS)",
    shortDesc:
      "A database-backed inventory system with autonomous low-stock detection and atomic stock updates for retail shops.",
    problem:
      "Small retail merchants struggle to track stock using manual paper notebooks, leading to unnoticed stock-outs, overstocking, and calculation discrepancies.",
    features: [
      "Autonomous low-stock detection engine with reorder alerts",
      "Live atomic dual-direction stock updates for sales and purchases",
      "Pessimistic concurrency locking (select_for_update) preventing race conditions",
      "Role-based session authentication (Owner, Staff)",
      "Financial dashboard calculating inventory valuation & gross profit margins",
    ],
    learned:
      "Relational schema design (3NF), pessimistic row locking in ACID transactions, role-based session security, and data visualization.",
    tech: ["Python", "Django", "MySQL", "SQLite3", "Bootstrap 5", "Chart.js"],
    github: "https://github.com/kaustubhbodkhe/smart-inventory",
    liveDemo: "#",
    screenshot: "/projects/smart-inventory.png",
  },
  {
    id: "reel-forge",
    title: "Reel Forge — AI Video Generator",
    shortDesc:
      "A full-stack generative AI web application that converts natural language text prompts into video clips.",
    problem:
      "Creating short-form video content is time-consuming and requires specialized editing skills. Content creators need a fast, AI-powered generation pipeline.",
    features: [
      "Text prompt to video generation powered by Replicate AI diffusion models",
      "Asynchronous job polling with real-time status and progress indicators",
      "Interactive video preview player, direct download, and sharing tools",
      "Responsive, sleek dark-themed UI built for speed and accessibility",
    ],
    learned:
      "Integrating cutting-edge Generative AI APIs, managing asynchronous background jobs, handling media streams, and resilient error recovery.",
    tech: ["Node.js", "Express", "Replicate API", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/kaustubhbodkhe/reel-forge",
    liveDemo: "#",
    screenshot: "/projects/reel-forge.png",
  },
  {
    id: "python-learning",
    title: "Interactive Python Learning Platform",
    shortDesc:
      "An educational web portal featuring structured, step-by-step learning tracks from Python fundamentals to data structures.",
    problem:
      "Beginners often struggle to find a structured, hands-on path to learn programming without getting overwhelmed by theory.",
    features: [
      "Structured tracks: Basics → Control Flow → Functions → OOP → Data Structures",
      "Interactive code snippets with real-time syntax highlighting",
      "Visual progress tracking across multiple modules and chapters",
      "Fully responsive, clean interface tailored for distraction-free study",
    ],
    learned:
      "Curriculum architecture for technical learning, accessible UI design, progressive disclosure patterns, and client-side state management.",
    tech: ["HTML5", "CSS3", "JavaScript", "Python"],
    github: "https://github.com/kaustubhbodkhe/python-learning",
    liveDemo: "#",
    screenshot: "/projects/python-learning.png",
  },
];

// ============================================================
// EDUCATION & CERTIFICATES
// ============================================================
export const education = [
  {
    degree: "Bachelor of Science in Computer Science (B.Sc. CS)",
    institution: "Dr. D. Y. Patil ACS College (SPPU)",
    location: "Pune, Maharashtra, India",
    period: "2023 – 2026",
    description:
      "Focusing on software engineering, data structures, algorithms, relational database systems (RDBMS), and artificial intelligence fundamentals. Developed the Smart Inventory Management System as academic capstone project under NEP CBCS pattern.",
    current: true,
  },
];

export const certificates = [
  {
    title: "Python for Data Science & Machine Learning",
    issuer: "Coursera / DeepLearning.AI",
    date: "2025",
    link: "#",
  },
  {
    title: "Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    date: "2024",
    link: "#",
  },
  {
    title: "Academic Capstone Mini Project Excellence (CS-231-FP)",
    issuer: "SPPU / Department of Computer Science",
    date: "2025",
    link: "#",
  },
];

// ============================================================
// NAV LINKS
// ============================================================
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
