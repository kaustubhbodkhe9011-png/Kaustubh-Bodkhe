import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiArrowDown,
  FiDownload,
} from "react-icons/fi";
import { siteConfig } from "../data/config";
import { useTypewriter } from "../hooks/useTypewriter";
import FramePlayer from "./FramePlayer";

/**
 * Hero section — Behance 2026 visual showcase aesthetic featuring
 * Kaustubh's video frames in TRUE FULL-FRAME 16:9 uncropped format.
 */
export default function Hero() {
  const { displayText } = useTypewriter(siteConfig.roles, 80, 40, 2000);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse delay-1000" />
        <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Main Behance Portfolio 2026 Graphic Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-gradient-to-br from-[#060913] via-[#080d1a] to-[#04060c]
                     border border-cyan-500/30 shadow-[0_25px_90px_rgba(6,182,212,0.18)]
                     overflow-hidden p-6 sm:p-10 lg:p-12"
        >
          {/* Top-left Glowing Fluid Neon Smoke / Wave SVG */}
          <svg
            className="absolute -top-12 -left-12 w-[380px] sm:w-[480px] h-[200px] sm:h-[240px] pointer-events-none opacity-85 z-20"
            viewBox="0 0 500 220"
            fill="none"
          >
            <path
              d="M-30,50 C100,10 220,130 380,45 C440,15 480,70 520,110"
              stroke="url(#waveGlow)"
              strokeWidth="5"
              filter="url(#glowFilter)"
              fill="none"
            />
            <path
              d="M-20,65 C110,25 240,145 400,60 C460,30 490,85 530,125"
              stroke="#22d3ee"
              strokeWidth="1.5"
              fill="none"
              opacity="0.75"
            />
            <defs>
              <linearGradient id="waveGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="45%" stopColor="#06b6d4" />
                <stop offset="85%" stopColor="#0284c7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0a0f1d" stopOpacity="0" />
              </linearGradient>
              <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* 2-Column Grid: Left Branding & Contact, Right True 16:9 Full-Frame Video */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column — 6 Columns */}
            <div className="lg:col-span-6 flex flex-col justify-between z-20">
              <div>
                {/* Cyan Bracket Outline Frame */}
                <div className="relative border-l-2 border-t-2 border-cyan-400/80 pt-4 pl-5 sm:pl-6 pb-3 pr-4 sm:pr-8 max-w-lg">
                  {/* Subtle Corner Accents */}
                  <div className="absolute top-0 right-0 w-4 h-0.5 bg-cyan-400" />
                  <div className="absolute bottom-0 left-0 w-4 h-0.5 bg-cyan-400" />

                  {/* "WELCOME TO MY" */}
                  <p className="text-cyan-400 font-bold tracking-[0.26em] text-xs sm:text-sm uppercase font-heading">
                    WELCOME TO MY
                  </p>

                  {/* "PORTFOLIO" Headline */}
                  <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-wider leading-none mt-1">
                    PORTFOLIO
                  </h1>

                  {/* "2026" Badge */}
                  <div className="flex justify-end mt-2">
                    <span className="text-cyan-400 font-extrabold text-lg sm:text-2xl font-mono tracking-widest px-3 py-0.5 rounded border border-cyan-400/40 bg-cyan-950/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      2026
                    </span>
                  </div>
                </div>

                {/* Identity & Subtitles */}
                <div className="mt-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-wide">
                    {siteConfig.name.toUpperCase()}
                  </h2>
                  <p className="text-xs sm:text-sm text-cyan-400/90 font-semibold tracking-[0.18em] uppercase mt-1">
                    BSC COMPUTER SCIENCE
                  </p>
                  <p className="text-xs text-muted font-medium tracking-wider uppercase mt-0.5">
                    AI/ML & NLP ENTHUSIAST • FULL-STACK DEVELOPER
                  </p>
                </div>

                {/* Animated Role Cycler */}
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="text-cyan-400 font-mono font-bold">&gt;</span>
                  <span className="font-mono text-cyan-200 font-medium">
                    {displayText}
                  </span>
                  <span className="w-1.5 h-4 bg-cyan-400 animate-blink" />
                </div>
              </div>

              {/* Bottom: Contact Block + CTA Buttons */}
              <div className="mt-8 pt-2">
                {/* Contact Information Box (Exact Reference Layout) */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-cyan-500/25 bg-cyan-950/25 backdrop-blur-sm max-w-lg space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <FiMapPin className="text-cyan-400 shrink-0" size={14} />
                    <span className="uppercase tracking-wider font-mono">
                      {siteConfig.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <FiMail className="text-cyan-400 shrink-0" size={14} />
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="hover:text-cyan-400 font-mono uppercase tracking-wider transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <FiGithub className="text-cyan-400 shrink-0" size={14} />
                    <a
                      href={siteConfig.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 font-mono tracking-wider transition-colors truncate"
                    >
                      GITHUB.COM/KAUSTUBHBODKHE9011-PNG
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <FiLinkedin className="text-cyan-400 shrink-0" size={14} />
                    <a
                      href={siteConfig.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 font-mono tracking-wider transition-colors"
                    >
                      LINKEDIN.COM/IN/KAUSTUBHBODKHE
                    </a>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector("#projects")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm
                               bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 text-slate-950
                               hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300
                               hover:scale-105 active:scale-95"
                  >
                    View Projects
                    <FiArrowDown size={14} />
                  </a>
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                               border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/15
                               hover:border-cyan-400 transition-all duration-300 shadow-sm"
                  >
                    <FiDownload size={14} />
                    Download Resume
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column — 6 Columns: TRUE 16:9 FULL-FRAME UNCRIPPLED VIDEO PLAYER */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center z-20">
              {/* Ambient Glow behind player */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-600/15 to-amber-500/20 blur-2xl -z-10" />

              {/* Full-Frame 16:9 Video Player Container */}
              <div
                className="relative w-full aspect-video rounded-2xl overflow-hidden
                            border-2 border-cyan-400/40 shadow-[0_0_50px_rgba(6,182,212,0.3)]
                            bg-black"
              >
                {/* 24FPS Frame Player in full-frame contain mode */}
                <FramePlayer
                  frameCount={192}
                  fps={24}
                  loop={true}
                  objectFit="contain"
                  className="w-full h-full"
                />
              </div>

              {/* Bottom Status & Info Bar below player */}
              <div className="mt-3 w-full flex items-center justify-between px-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-slate-300 font-medium">
                    Available for Internships
                  </span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 tracking-wider">
                  24 FPS • 192 FRAMES
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down indicator */}
      <motion.div
        className="mt-8 flex justify-center"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a
          href="#about"
          className="p-2 rounded-full text-muted hover:text-cyan-400 transition-colors"
          aria-label="Scroll down"
        >
          <FiArrowDown size={18} />
        </a>
      </motion.div>
    </section>
  );
}
