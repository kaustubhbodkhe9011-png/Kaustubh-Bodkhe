import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi";
import { useEffect } from "react";

/**
 * Project detail modal — problem, features, what was learned.
 */
export default function ProjectModal({ project, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl
                     bg-card border border-white/10 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-lg bg-surface/50 text-muted
                       hover:text-foreground hover:bg-surface transition-colors z-10"
          >
            <FiX size={20} />
          </button>

          {/* Screenshot */}
          <div className="w-full h-48 sm:h-56 bg-surface/50 overflow-hidden">
            <img
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.classList.add(
                  "flex",
                  "items-center",
                  "justify-center"
                );
                const span = document.createElement("span");
                span.className = "text-muted/30 text-lg font-heading";
                span.textContent = "Screenshot Coming Soon";
                e.target.parentElement.appendChild(span);
              }}
            />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-heading text-foreground">
                {project.title}
              </h3>
              <p className="mt-2 text-muted leading-relaxed">
                {project.shortDesc}
              </p>
            </div>

            {/* Problem */}
            <div>
              <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                The Problem
              </h4>
              <p className="text-foreground/80 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                Key Features
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex gap-2 text-foreground/80">
                    <span className="text-accent mt-1 shrink-0">▹</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* What I Learned */}
            <div>
              <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                What I Learned
              </h4>
              <p className="text-foreground/80 leading-relaxed">
                {project.learned}
              </p>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                           border border-accent/30 text-accent hover:bg-accent/10
                           transition-all duration-300"
              >
                <FiGithub size={16} />
                View Code
              </a>
              {project.liveDemo && project.liveDemo !== "#" && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                             bg-gradient-to-r from-accent to-cyan-400 text-background
                             hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300"
                >
                  <FiExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
