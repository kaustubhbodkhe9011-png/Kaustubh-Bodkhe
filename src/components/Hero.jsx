import { motion } from "framer-motion";
import { FiGithub, FiMail, FiMapPin, FiChevronDown, FiDownload } from "react-icons/fi";
import { siteConfig } from "../data/config";

/**
 * Hero — Behance 2026 full-bleed cinematic layout.
 * Layout (top to bottom):
 *   [NAVBAR - handled externally, ~64px]
 *   [WELCOME TO MY label]
 *   [PORTFOLIO  giant text]
 *   [2026]
 *   [spacer flex-1]
 *   [KAUSTUBH BODKHE  +  roles  +  contacts  +  buttons]
 *   [SCROLL TO EXPLORE]
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}
    >
      {/* ── Full-bleed Background Photo ── */}
      <img
        src="/photo.jpg"
        alt="Kaustubh Bodkhe"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "65% center" }}
        draggable={false}
      />

      {/* ── Overlay: dark on left & bottom, fade to transparent right ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "linear-gradient(to right, rgba(4,7,18,0.92) 0%, rgba(4,7,18,0.65) 55%, rgba(4,7,18,0.15) 100%)",
            "linear-gradient(to top,   rgba(4,7,18,0.97) 0%, rgba(4,7,18,0.60) 40%, rgba(4,7,18,0.05) 100%)",
          ].join(", "),
        }}
      />

      {/* ── Right-edge neon glow border ── */}
      <div
        className="absolute right-0 top-0 h-full pointer-events-none"
        style={{
          width: "2px",
          background:
            "linear-gradient(to bottom, transparent 5%, rgba(6,182,212,0.55) 35%, rgba(6,182,212,0.55) 65%, transparent 95%)",
          boxShadow: "0 0 28px 6px rgba(6,182,212,0.22)",
        }}
      />

      {/* ── Sparkle decorations ── */}
      <Sparkle style={{ position:"absolute", top:"72px",  right:"52px",  zIndex:20 }} size={20} opacity={0.5} />
      <Sparkle style={{ position:"absolute", top:"42%",   right:"36px",  zIndex:20 }} size={14} opacity={0.35} />
      <Sparkle style={{ position:"absolute", bottom:"96px", right:"52px", zIndex:20 }} size={26} opacity={0.6} />

      {/* ══════════════════════════════════════════
          CONTENT — flex column, full height
      ══════════════════════════════════════════ */}
      <div
        className="relative z-10 flex flex-col w-full"
        style={{ flex: 1, paddingTop: "80px" /* clears fixed navbar */ }}
      >
        {/* ── 1. WELCOME TO MY ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-8 sm:px-12 lg:px-16 pt-6"
        >
          <p
            style={{
              color: "#e2e8f0",
              fontWeight: 700,
              letterSpacing: "0.3em",
              fontSize: "clamp(10px, 1.1vw, 14px)",
              textTransform: "uppercase",
            }}
          >
            WELCOME TO MY
          </p>
          {/* cyan accent underline */}
          <div
            style={{
              marginTop: "6px",
              height: "2px",
              width: "80px",
              background: "linear-gradient(to right, #06b6d4, transparent)",
              boxShadow: "0 0 10px rgba(6,182,212,0.7)",
            }}
          />
        </motion.div>

        {/* ── 2. PORTFOLIO + 2026 ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="px-8 sm:px-12 lg:px-16 mt-2"
        >
          <h1
            style={{
              color: "#ffffff",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.01em",
              fontSize: "clamp(58px, 10vw, 148px)",
              textShadow: "0 4px 40px rgba(0,0,0,0.55)",
              userSelect: "none",
            }}
          >
            PORTFOLIO
          </h1>

          {/* 2026 row */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "4px" }}>
            <span
              style={{
                color: "#ffffff",
                fontWeight: 800,
                lineHeight: 1,
                fontSize: "clamp(32px, 5vw, 72px)",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                userSelect: "none",
              }}
            >
              2026
            </span>
            <div
              style={{
                flex: 1,
                maxWidth: "100px",
                height: "2px",
                background: "linear-gradient(to right, rgba(6,182,212,0.7), transparent)",
              }}
            />
          </div>
        </motion.div>

        {/* ── 3. Flexible spacer pushes identity block to bottom ── */}
        <div style={{ flex: 1, minHeight: "24px" }} />

        {/* ── 4. IDENTITY BLOCK (name, roles, contacts, buttons) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="px-8 sm:px-12 lg:px-16 pb-4"
        >
          {/* Name */}
          <h2
            style={{
              color: "#ffffff",
              fontWeight: 900,
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              fontSize: "clamp(22px, 3.2vw, 48px)",
              textShadow: "0 2px 24px rgba(0,0,0,0.6)",
            }}
          >
            {siteConfig.name.toUpperCase()}
          </h2>

          {/* Degree */}
          <p
            style={{
              color: "#94a3b8",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontSize: "clamp(9px, 0.85vw, 11px)",
              marginTop: "4px",
            }}
          >
            BSC COMPUTER SCIENCE
          </p>

          {/* Role tagline */}
          <p
            style={{
              color: "#64748b",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontSize: "clamp(8px, 0.75vw, 10px)",
              marginTop: "2px",
            }}
          >
            AI/ML &amp; NLP Enthusiast&nbsp;•&nbsp;Full-Stack Developer
          </p>

          {/* Contact rows */}
          <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
            <ContactRow icon={<FiMapPin size={11} />} text={siteConfig.location} />
            <ContactRow
              icon={<FiMail size={11} />}
              text={siteConfig.email}
              href={`mailto:${siteConfig.email}`}
            />
            <ContactRow
              icon={<FiGithub size={11} />}
              text="GITHUB.COM/KAUSTUBHBODKHE9011-PNG"
              href={siteConfig.github}
              external
            />
          </div>

          {/* CTA buttons */}
          <div style={{ marginTop: "18px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 22px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#040810",
                background: "linear-gradient(135deg, #06b6d4, #0284c7)",
                boxShadow: "0 0 20px rgba(6,182,212,0.38)",
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
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 22px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
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

        {/* ── 5. SCROLL TO EXPLORE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "20px",
            paddingTop: "10px",
            gap: "4px",
          }}
        >
          <span
            style={{
              color: "#64748b",
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
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "-4px" }}
          >
            <FiChevronDown size={17} color="#06b6d4" style={{ opacity: 0.85 }} />
            <FiChevronDown size={17} color="#06b6d4" style={{ opacity: 0.45, marginTop: "-6px" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Helpers ── */

function ContactRow({ icon, text, href, external }) {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    gap: "7px",
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
      <a
        href={href}
        style={baseStyle}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  return <span style={baseStyle}>{inner}</span>;
}

function Sparkle({ size = 20, opacity = 0.6, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="white"
      style={{ opacity, pointerEvents: "none", userSelect: "none", ...style }}
    >
      <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" />
    </svg>
  );
}
