import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import { siteConfig } from "../data/config";
import { useTypewriter } from "../hooks/useTypewriter";
import FramePlayer from "./FramePlayer";

/**
 * Hero section — text LEFT, interactive 24fps portrait RIGHT. Animated role, social links, CTA buttons.
 */
export default function Hero() {
  const { displayText } = useTypewriter(siteConfig.roles, 80, 40, 2000);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-0 left-1/2 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-accent font-medium text-lg mb-3">
              👋 Hi there, I&apos;m
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-foreground leading-tight">
              {siteConfig.name}
              <span className="text-accent">.</span>
            </h1>

            {/* Animated role */}
            <div className="mt-4 h-8 sm:h-10 flex items-center">
              <span className="text-xl sm:text-2xl text-accent/80 font-heading">
                {displayText}
              </span>
              <span className="ml-0.5 w-0.5 h-6 sm:h-7 bg-accent animate-blink" />
            </div>

            <p className="mt-6 text-muted text-lg max-w-lg leading-relaxed">
              {siteConfig.heroTagline}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                           bg-gradient-to-r from-accent to-cyan-400 text-background
                           hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-300
                           hover:scale-105 active:scale-95"
              >
                View Projects
                <FiArrowDown size={16} />
              </a>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                           border border-accent/30 text-accent hover:bg-accent/10
                           transition-all duration-300 hover:border-accent/60"
              >
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              {[
                {
                  icon: FiGithub,
                  href: siteConfig.github,
                  label: "GitHub",
                },
                {
                  icon: FiLinkedin,
                  href: siteConfig.linkedin,
                  label: "LinkedIn",
                },
                {
                  icon: FiMail,
                  href: `mailto:${siteConfig.email}`,
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 rounded-xl bg-surface/50 border border-white/5
                             text-muted hover:text-accent hover:border-accent/30
                             hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]
                             transition-all duration-300 hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Interactive Frame Player / Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Outer Ambient Glow */}
              <div
                className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-accent/25 via-cyan-400/15 to-blue-600/25
                            blur-2xl animate-pulse"
              />

              {/* Futuristic Cyber Frame / Card */}
              <div
                className="relative w-72 h-[380px] sm:w-84 sm:h-[440px] lg:w-96 lg:h-[490px] rounded-[2rem] overflow-hidden
                            border-2 border-accent/25 shadow-2xl shadow-accent/15 bg-card/80 backdrop-blur-md
                            transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-accent/25"
              >
                {/* 24FPS Interactive Frame Player */}
                <FramePlayer
                  frameCount={192}
                  fps={24}
                  loop={true}
                  className="w-full h-full"
                />

                {/* Top Badge: Portfolio 2026 */}
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold
                                   bg-background/80 backdrop-blur-md border border-white/10 text-accent/90 shadow-sm">
                    PORTFOLIO 2026
                  </span>
                </div>

                {/* Bottom Status Pill */}
                <div className="absolute bottom-3 left-3 right-3 z-10 p-2.5 rounded-xl
                                bg-background/80 backdrop-blur-md border border-white/10
                                flex items-center justify-between text-xs shadow-md pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="font-medium text-foreground text-[11px] sm:text-xs">
                      Available for Internships
                    </span>
                  </div>
                  <span className="text-[10px] text-accent font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                    24 FPS
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FiArrowDown className="text-muted/50" size={20} />
      </motion.div>
    </section>
  );
}
