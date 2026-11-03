import { motion } from "framer-motion";
import { FiGithub, FiMail, FiMapPin, FiChevronDown, FiDownload } from "react-icons/fi";
import { siteConfig } from "../data/config";

/**
 * Hero — Behance 2026 Portfolio Card aesthetic.
 * Left: dark navy with all text content.
 * Right: Photo clearly visible (person on right side).
 * Top-left: blue fluid/smoke SVG decoration.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}
    >
      {/* ── Full-bleed photo — positioned RIGHT so person is clearly visible ── */}
      <img
        src="/photo.jpg"
        alt="Kaustubh Bodkhe"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "right center" }}
        draggable={false}
      />

      {/* ── Overlay: solid dark navy left → transparent right (shows photo) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(5,9,24,0.98) 0%, rgba(5,9,24,0.92) 30%, rgba(5,9,24,0.70) 52%, rgba(5,9,24,0.25) 72%, rgba(5,9,24,0.02) 100%)",
        }}
      />

      {/* ── Bottom fade for text readability ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(5,9,24,0.85) 0%, rgba(5,9,24,0.15) 30%, transparent 60%)",
        }}
      />

      {/* ── Blue fluid/smoke SVG wave — top-left decoration ── */}
      <svg
        className="absolute pointer-events-none"
        style={{ top: 0, left: 0, width: "480px", height: "220px", opacity: 0.9, zIndex: 5 }}
        viewBox="0 0 500 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="smokeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </linearGradient>
          <filter id="smokeBlur">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="smokeBlur2">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        {/* Glow blob behind waves */}
        <ellipse cx="80" cy="60" rx="120" ry="80" fill="#06b6d4" opacity="0.10" filter="url(#smokeBlur2)" />
        {/* Main wave */}
        <path
          d="M-40,30 C60,-10 180,100 320,30 C400,-5 450,50 520,80"
          stroke="url(#smokeGrad1)"
          strokeWidth="5"
          fill="none"
          filter="url(#smokeBlur)"
        />
        {/* Secondary wave */}
        <path
          d="M-30,52 C70,12 200,115 340,48 C415,15 462,68 530,98"
          stroke="#22d3ee"
          strokeWidth="2"
          fill="none"
          opacity="0.55"
        />
        {/* Thin accent */}
        <path
          d="M-20,68 C80,30 210,128 355,64 C428,32 472,82 538,112"
          stroke="#38bdf8"
          strokeWidth="0.8"
          fill="none"
          opacity="0.35"
        />
      </svg>

      {/* ── Right border neon glow ── */}
      <div
        className="absolute right-0 top-0 h-full pointer-events-none"
        style={{
          width: "2px",
          background:
            "linear-gradient(to bottom, transparent 5%, rgba(6,182,212,0.6) 35%, rgba(6,182,212,0.6) 65%, transparent 95%)",
          boxShadow: "0 0 28px 6px rgba(6,182,212,0.2)",
          zIndex: 10,
        }}
      />

      {/* ── Sparkle decorations ── */}
      <Sparkle top="70px"  right="50px"  size={20} opacity={0.5} />
      <Sparkle top="42%"   right="32px"  size={13} opacity={0.32} />
      <Sparkle bottom="90px" right="50px" size={26} opacity={0.62} />

      {/* ══════════════════════════════════════
          MAIN CONTENT — left-aligned column
      ══════════════════════════════════════ */}
      <div
        className="relative flex flex-col w-full"
        style={{ flex: 1, zIndex: 20, paddingTop: "80px", maxWidth: "660px" }}
      >
        {/* ── 1. WELCOME TO MY ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ paddingLeft: "clamp(28px,6vw,64px)", paddingTop: "28px" }}
        >
          {/* Bracket/frame top edge */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <div style={{ width: "2px", height: "18px", background: "#06b6d4" }} />
            <p
              style={{
                color: "#cbd5e1",
                fontWeight: 700,
                letterSpacing: "0.30em",
                fontSize: "clamp(10px, 1.05vw, 13px)",
                textTransform: "uppercase",
              }}
            >
              WELCOME TO MY
            </p>
          </div>
          {/* Cyan underline */}
          <div
            style={{
              height: "2px",
              width: "90px",
              background: "linear-gradient(to right, #06b6d4, transparent)",
              boxShadow: "0 0 12px rgba(6,182,212,0.65)",
              marginLeft: "12px",
            }}
          />
        </motion.div>

        {/* ── 2. PORTFOLIO ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            paddingLeft: "clamp(24px,5.5vw,58px)",
            marginTop: "6px",
          }}
        >
          <h1
            style={{
              color: "#ffffff",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
              fontSize: "clamp(60px, 10.5vw, 148px)",
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
              userSelect: "none",
            }}
          >
            PORTFOLIO
          </h1>

          {/* 2026 */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "4px" }}>
            <h2
              style={{
                color: "#ffffff",
                fontWeight: 800,
                lineHeight: 1,
                fontSize: "clamp(30px, 5vw, 70px)",
                userSelect: "none",
              }}
            >
              2026
            </h2>
            <div
              style={{
                flex: 1,
                maxWidth: "90px",
                height: "2px",
                background: "linear-gradient(to right, rgba(6,182,212,0.75), transparent)",
              }}
            />
          </div>
        </motion.div>

        {/* ── Spacer ── */}
        <div style={{ flex: 1, minHeight: "20px" }} />

        {/* ── 3. NAME + ROLES + CONTACT + BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45 }}
          style={{ paddingLeft: "clamp(24px,5.5vw,58px)", paddingBottom: "6px" }}
        >
          {/* Name */}
          <h3
            style={{
              color: "#ffffff",
              fontWeight: 900,
              letterSpacing: "0.05em",
              lineHeight: 1.1,
              fontSize: "clamp(22px, 3.2vw, 48px)",
              textShadow: "0 2px 20px rgba(0,0,0,0.7)",
            }}
          >
            {siteConfig.name.toUpperCase()}
          </h3>

          {/* Degree */}
          <p
            style={{
              color: "#94a3b8",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontSize: "clamp(8.5px, 0.82vw, 11px)",
              marginTop: "5px",
            }}
          >
            BSC COMPUTER SCIENCE
          </p>

          {/* Role */}
          <p
            style={{
              color: "#64748b",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontSize: "clamp(7.5px, 0.72vw, 10px)",
              marginTop: "2px",
            }}
          >
            AI/ML &amp; NLP Enthusiast&nbsp;•&nbsp;Full-Stack Developer
          </p>

          {/* Contact rows */}
          <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <ContactRow icon={<FiMapPin size={11} />} text={siteConfig.location} />
            <ContactRow icon={<FiMail size={11} />} text={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <ContactRow
              icon={<FiGithub size={11} />}
              text="GITHUB.COM/KAUSTUBHBODKHE9011-PNG"
              href={siteConfig.github}
              external
            />
          </div>

          {/* CTA Buttons */}
          <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "9px 22px", borderRadius: "9px",
                fontWeight: 700, fontSize: "11px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#040810",
                background: "linear-gradient(135deg, #06b6d4, #0284c7)",
                boxShadow: "0 0 22px rgba(6,182,212,0.4)",
                textDecoration: "none",
              }}
            >
              View Projects
            </a>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "9px 22px", borderRadius: "9px",
                fontWeight: 700, fontSize: "11px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#67e8f9",
                border: "1px solid rgba(6,182,212,0.4)",
                background: "rgba(6,182,212,0.07)",
                backdropFilter: "blur(8px)",
                textDecoration: "none",
              }}
            >
              <FiDownload size={13} />
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* ── 4. SCROLL TO EXPLORE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            paddingBottom: "18px", paddingTop: "12px", gap: "4px",
            width: "100%",
          }}
        >
          <span
            style={{
              color: "#475569",
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontSize: "9px",
            }}
          >
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <FiChevronDown size={17} color="#06b6d4" style={{ opacity: 0.85 }} />
            <FiChevronDown size={17} color="#06b6d4" style={{ opacity: 0.4, marginTop: "-7px" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Helpers ── */

function ContactRow({ icon, text, href, external }) {
  const style = {
    display: "flex", alignItems: "center", gap: "8px",
    color: "#cbd5e1",
    fontFamily: "monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontSize: "clamp(7px, 0.72vw, 9.5px)",
    textDecoration: "none",
  };
  const inner = (
    <>
      <span style={{ color: "#06b6d4", flexShrink: 0 }}>{icon}</span>
      <span>{text}</span>
    </>
  );
  if (href)
    return (
      <a href={href} style={style} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  return <span style={style}>{inner}</span>;
}

function Sparkle({ top, bottom, right, left, size = 20, opacity = 0.6 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="white"
      style={{
        position: "absolute",
        zIndex: 10,
        opacity,
        pointerEvents: "none",
        userSelect: "none",
        ...(top !== undefined && { top }),
        ...(bottom !== undefined && { bottom }),
        ...(right !== undefined && { right }),
        ...(left !== undefined && { left }),
      }}
    >
      <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" />
    </svg>
  );
}
