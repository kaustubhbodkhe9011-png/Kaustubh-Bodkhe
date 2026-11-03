import { motion } from "framer-motion";
import {
  FiGithub,
  FiMail,
  FiMapPin,
  FiChevronDown,
} from "react-icons/fi";
import { siteConfig } from "../data/config";

/**
 * Hero section — Full-bleed cinematic Behance 2026 aesthetic.
 * Photo as background, giant PORTFOLIO / 2026 text overlay,
 * identity block bottom-left, SCROLL TO EXPLORE bottom-center.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden flex items-end"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* ── Full-bleed Background Photo ── */}
      <img
        src="/photo.jpg"
        alt="Kaustubh Bodkhe"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ objectPosition: "60% center" }}
        draggable={false}
      />

      {/* ── Dark gradient overlay — heavier at bottom & left ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(5,8,20,0.88) 0%, rgba(5,8,20,0.55) 50%, rgba(5,8,20,0.18) 100%), " +
            "linear-gradient(to top, rgba(5,8,20,0.95) 0%, rgba(5,8,20,0.55) 45%, rgba(5,8,20,0.10) 100%)",
        }}
      />

      {/* ── Right-edge blue vertical border glow ── */}
      <div
        className="absolute right-0 top-0 h-full w-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(6,182,212,0.5) 40%, rgba(6,182,212,0.5) 60%, transparent)",
          boxShadow: "0 0 30px 6px rgba(6,182,212,0.25)",
        }}
      />

      {/* ── Top-left: WELCOME TO MY + blue accent line ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="absolute top-10 left-8 sm:left-12 lg:left-16 z-20"
      >
        <p
          className="text-white font-semibold tracking-[0.28em] uppercase"
          style={{ fontSize: "clamp(11px, 1.3vw, 15px)", letterSpacing: "0.28em" }}
        >
          WELCOME TO MY
        </p>
        <div
          className="mt-1.5 h-[2px] w-20"
          style={{
            background:
              "linear-gradient(to right, #06b6d4, rgba(6,182,212,0))",
            boxShadow: "0 0 10px rgba(6,182,212,0.7)",
          }}
        />
      </motion.div>

      {/* ── Sparkle decorations ── */}
      {/* Top-right sparkle */}
      <div className="absolute top-12 right-16 z-20 pointer-events-none select-none">
        <SparkleIcon size={22} opacity={0.55} />
      </div>
      {/* Mid-right sparkle */}
      <div className="absolute top-1/2 right-10 z-20 pointer-events-none select-none" style={{ marginTop: "60px" }}>
        <SparkleIcon size={16} opacity={0.4} />
      </div>
      {/* Bottom-right sparkle */}
      <div className="absolute bottom-28 right-14 z-20 pointer-events-none select-none">
        <SparkleIcon size={26} opacity={0.6} />
      </div>

      {/* ── GIANT PORTFOLIO + 2026 Headline — centre-left, vertically centred ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-20 left-8 sm:left-12 lg:left-16"
        style={{ top: "50%", transform: "translateY(-58%)" }}
      >
        <h1
          className="font-black text-white leading-none tracking-tight select-none"
          style={{
            fontSize: "clamp(64px, 11vw, 160px)",
            textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            letterSpacing: "-0.01em",
          }}
        >
          PORTFOLIO
        </h1>
        <div className="flex items-center gap-4 mt-1">
          <p
            className="font-extrabold text-white leading-none select-none"
            style={{
              fontSize: "clamp(36px, 5.5vw, 80px)",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            2026
          </p>
          {/* Decorative small horizontal line */}
          <div
            className="hidden sm:block flex-1 max-w-[120px] h-[2px]"
            style={{
              background: "linear-gradient(to right, rgba(6,182,212,0.7), transparent)",
              marginBottom: "4px",
            }}
          />
        </div>
      </motion.div>

      {/* ── Bottom content: Identity + Contact + SCROLL ── */}
      <div className="relative z-20 w-full pb-10 sm:pb-12 px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-4">

          {/* Bottom-left: Identity block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            {/* Name */}
            <h2
              className="font-black text-white tracking-wide leading-none"
              style={{
                fontSize: "clamp(26px, 3.8vw, 54px)",
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              }}
            >
              {siteConfig.name.toUpperCase()}
            </h2>

            {/* Role titles */}
            <p
              className="mt-1 font-semibold tracking-[0.22em] uppercase text-slate-300"
              style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
            >
              BSC COMPUTER SCIENCE
            </p>
            <p
              className="font-medium tracking-[0.16em] uppercase text-slate-400"
              style={{ fontSize: "clamp(8px, 0.9vw, 11px)", marginTop: "2px" }}
            >
              AI/ML &amp; NLP ENTHUSIAST&nbsp;•&nbsp;FULL-STACK DEVELOPER
            </p>

            {/* Contact icons row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-3 flex flex-col gap-1.5"
            >
              <ContactRow
                icon={<FiMapPin size={11} />}
                text={siteConfig.location}
              />
              <ContactRow
                icon={<FiMail size={11} />}
                text={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
              />
              <ContactRow
                icon={<FiGithub size={11} />}
                text={"GITHUB.COM/KAUSTUBHBODKHE9011-PNG"}
                href={siteConfig.github}
                external
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="mt-5 flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-xs tracking-wider uppercase"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #0284c7)",
                  color: "#040810",
                  boxShadow: "0 0 20px rgba(6,182,212,0.4)",
                  letterSpacing: "0.12em",
                }}
              >
                View Projects
              </a>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-xs tracking-wider uppercase text-cyan-300"
                style={{
                  border: "1px solid rgba(6,182,212,0.45)",
                  background: "rgba(6,182,212,0.08)",
                  letterSpacing: "0.12em",
                  backdropFilter: "blur(8px)",
                }}
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Bottom-center: SCROLL TO EXPLORE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="hidden sm:flex flex-col items-center gap-1 self-end pb-2"
            style={{ minWidth: "140px" }}
          >
            <p
              className="text-slate-400 font-semibold tracking-[0.25em] uppercase"
              style={{ fontSize: "9px" }}
            >
              SCROLL TO EXPLORE
            </p>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center -space-y-2"
            >
              <FiChevronDown size={16} className="text-cyan-400 opacity-80" />
              <FiChevronDown size={16} className="text-cyan-400 opacity-50" />
            </motion.div>
          </motion.div>

          {/* Spacer right */}
          <div className="hidden lg:block" style={{ minWidth: "80px" }} />
        </div>
      </div>
    </section>
  );
}

/* ── Helper Components ── */

function ContactRow({ icon, text, href, external }) {
  const cls =
    "flex items-center gap-1.5 text-slate-300 font-mono tracking-wider uppercase transition-colors hover:text-cyan-300";
  const style = { fontSize: "clamp(7px, 0.75vw, 10px)" };

  const inner = (
    <>
      <span className="text-cyan-400 shrink-0">{icon}</span>
      <span>{text}</span>
    </>
  );

  if (href)
    return (
      <a
        href={href}
        className={cls}
        style={style}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  return (
    <span className={cls} style={style}>
      {inner}
    </span>
  );
}

/** 4-pointed sparkle/star SVG icon */
function SparkleIcon({ size = 20, opacity = 0.6 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="white"
      style={{ opacity }}
    >
      <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" />
    </svg>
  );
}
