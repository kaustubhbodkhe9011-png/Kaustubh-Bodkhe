import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowDown,
  FiDownload,
} from "react-icons/fi";
import { siteConfig } from "../data/config";
import { useTypewriter } from "../hooks/useTypewriter";

/**
 * Hero — Two-column layout.
 * LEFT : intro text, name H1, typing roles, value statement, CTA buttons, social icons.
 * RIGHT: portrait photo in a framed 4:5 card — teal glow, face/shoulders visible.
 *        Photo is NEVER behind text. No full-page background image.
 */
export default function Hero() {
  const { displayText } = useTypewriter(siteConfig.roles, 80, 40, 2000);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center py-24 overflow-hidden"
    >
      {/* ── Ambient background glows (not photo) ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ══════════════════════════════════
              LEFT COLUMN — All text content
          ══════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 order-2 lg:order-1"
          >
            {/* Hi, I'm */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-accent font-semibold tracking-widest uppercase text-sm mb-2"
              >
                Hi, I'm
              </motion.p>

              {/* Name H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-foreground leading-tight"
              >
                Kaustubh
                <br />
                <span className="text-accent">Bodkhe</span>
              </motion.h1>
            </div>

            {/* Typing animation — roles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-2 text-lg sm:text-xl"
            >
              <span className="text-accent font-mono font-bold">&gt;</span>
              <span className="font-mono text-foreground/80 font-medium min-w-0">
                {displayText}
              </span>
              <span className="w-0.5 h-6 bg-accent animate-blink shrink-0" />
            </motion.div>

            {/* Value statement */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-muted text-base sm:text-lg leading-relaxed max-w-lg"
            >
              BSc Computer Science student at{" "}
              <span className="text-foreground font-medium">ASM CSIT, Pune</span>{" "}
              — building intelligent systems with LLMs, RAG pipelines &amp; full-stack
              web apps. Open to internships &amp; entry-level opportunities.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollTo("#projects")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                           bg-gradient-to-r from-accent to-cyan-400 text-slate-950
                           hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105
                           active:scale-95 transition-all duration-300"
              >
                View Projects
                <FiArrowDown size={15} />
              </button>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                           border border-accent/40 text-accent hover:bg-accent/10
                           hover:border-accent hover:scale-105 active:scale-95
                           transition-all duration-300"
              >
                <FiDownload size={15} />
                Download Resume
              </a>
            </motion.div>

            {/* Social icon links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-4 pt-1"
            >
              <span className="text-muted text-xs uppercase tracking-widest">Find me on</span>
              <div className="h-px flex-1 max-w-[60px] bg-white/10" />
              {[
                { icon: FiGithub,   href: siteConfig.github,              label: "GitHub" },
                { icon: FiLinkedin, href: siteConfig.linkedin,            label: "LinkedIn" },
                { icon: FiMail,     href: `mailto:${siteConfig.email}`,   label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl border border-white/10 text-muted
                             hover:text-accent hover:border-accent/40 hover:bg-accent/5
                             hover:scale-110 transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex items-center gap-2 text-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-medium">
                Available for Internships &amp; Entry-Level Roles
              </span>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════
              RIGHT COLUMN — Portrait photo card
              4:5 aspect ratio, face visible at top
          ══════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative group">
              {/* Teal glow behind card */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(6,182,212,0.4) 0%, rgba(6,182,212,0.1) 55%, transparent 75%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Photo card — 4:5 ratio */}
              <div
                className="relative w-72 sm:w-80 lg:w-[340px] overflow-hidden rounded-2xl
                           border-2 border-accent/30 shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                           group-hover:border-accent/60 group-hover:shadow-[0_0_60px_rgba(6,182,212,0.25)]
                           transition-all duration-500"
                style={{ aspectRatio: "4/5" }}
              >
                {/* Background gradient (shows if image fails) */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />

                {/* Portrait image with multi-fallback handling */}
                <img
                  src={siteConfig.photoUrl}
                  alt="Kaustubh Bodkhe — AI/ML & Full-Stack Developer"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: "center top" }}
                  loading="eager"
                  onError={(e) => {
                    if (!e.target.dataset.triedRelative) {
                      e.target.dataset.triedRelative = "true";
                      e.target.src = "./photo.jpg";
                    } else if (!e.target.dataset.triedAbsolute) {
                      e.target.dataset.triedAbsolute = "true";
                      e.target.src = `${window.location.pathname.replace(/\/$/, "")}/photo.jpg`;
                    }
                  }}
                />

                {/* Subtle bottom gradient — does NOT cover face */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,15,26,0.6) 0%, transparent 100%)",
                  }}
                />

                {/* Corner accent dots */}
                <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-accent opacity-70" />
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent opacity-70" />
              </div>

              {/* Floating info badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl
                           bg-background/90 backdrop-blur-sm border border-accent/30
                           shadow-lg flex items-center gap-2"
              >
                <span className="text-accent text-lg">🎓</span>
                <div>
                  <p className="text-xs font-bold text-foreground">BSc CS Student</p>
                  <p className="text-xs text-muted">ASM CSIT, Pune</p>
                </div>
              </motion.div>

              {/* AI/ML floating badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="absolute -top-4 -left-4 px-3 py-1.5 rounded-xl
                           bg-accent/10 backdrop-blur-sm border border-accent/30
                           shadow-lg"
              >
                <p className="text-xs font-bold text-accent">AI/ML &amp; NLP</p>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() => scrollTo("#about")}
            aria-label="Scroll to About section"
            className="flex flex-col items-center gap-1 group"
          >
            <span className="text-muted text-xs uppercase tracking-widest group-hover:text-accent transition-colors">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiArrowDown size={18} className="text-muted group-hover:text-accent transition-colors" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
