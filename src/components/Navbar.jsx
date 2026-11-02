import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import { navLinks, siteConfig } from "../data/config";
import ThemeToggle from "./ThemeToggle";

/**
 * Sticky navbar with mobile hamburger menu, smooth scroll, and resume button.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Detect scroll to add glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleClick(e, "#home")}
            className="text-xl font-bold font-heading text-foreground hover:text-accent transition-colors"
          >
            &lt;{siteConfig.name} /&gt;
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    activeSection === href.slice(1)
                      ? "text-accent bg-accent/10"
                      : "text-muted hover:text-foreground hover:bg-surface/50"
                  }`}
              >
                {label}
              </a>
            ))}

            <div className="ml-2 flex items-center gap-2">
              <ThemeToggle />
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                           bg-gradient-to-r from-accent to-cyan-400 text-background
                           hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-300
                           hover:scale-105 active:scale-95"
              >
                <FiDownload size={14} />
                Resume
              </a>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface/50 transition-colors"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleClick(e, href)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all
                    ${
                      activeSection === href.slice(1)
                        ? "text-accent bg-accent/10"
                        : "text-muted hover:text-foreground hover:bg-surface/50"
                    }`}
                >
                  {label}
                </a>
              ))}
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 px-4 py-3 rounded-lg text-center text-sm font-semibold
                           bg-gradient-to-r from-accent to-cyan-400 text-background"
              >
                <FiDownload className="inline mr-2" size={14} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
