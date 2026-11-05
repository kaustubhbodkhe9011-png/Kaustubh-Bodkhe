import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiX, FiFilter } from "react-icons/fi";
import { projects } from "../data/config";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import ProjectModal from "./ProjectModal";

const FILTERS = [
  { label: "All",        value: "all" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "AI / ML",   value: "ai" },
  { label: "Frontend",  value: "frontend" },
];

/**
 * Projects section — filterable card grid with screenshots,
 * tech tags, GitHub/Live links, and a detail modal.
 */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="Things I've built — click any card to see the full case study."
        />

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <FiFilter size={14} className="text-muted mr-1" />
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                          ${activeFilter === value
                            ? "bg-accent text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                            : "border border-white/10 text-muted hover:border-accent/30 hover:text-foreground"
                          }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <ScrollReveal delay={i * 0.08}>
                  <div
                    onClick={() => setSelectedProject(project)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                    className="group cursor-pointer rounded-2xl bg-card/50 backdrop-blur-sm border border-white/5
                               hover:border-accent/25 hover:shadow-[0_8px_40px_rgba(6,182,212,0.10)]
                               transition-all duration-400 overflow-hidden h-full flex flex-col
                               focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    {/* Screenshot */}
                    <div className="relative w-full h-48 bg-surface/50 overflow-hidden shrink-0">
                      <img
                        src={project.screenshot}
                        alt={`${project.title} screenshot preview`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                          const p = e.target.parentElement;
                          p.classList.add("flex", "items-center", "justify-center");
                          const span = document.createElement("span");
                          span.className = "text-muted/30 text-xs font-mono";
                          span.textContent = "[ Screenshot Coming Soon ]";
                          p.appendChild(span);
                        }}
                      />
                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold
                                        bg-accent/90 text-slate-950 capitalize">
                          {project.category === "ai" ? "AI/ML" : project.category}
                        </span>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                      flex items-end justify-center pb-3">
                        <span className="text-accent text-sm font-medium">View Case Study →</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold font-heading text-foreground
                                     group-hover:text-accent transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-muted text-sm leading-relaxed flex-1">
                        {project.shortDesc}
                      </p>

                      {/* Tech Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-1 text-xs rounded-md bg-surface/80 text-muted border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 5 && (
                          <span className="px-2 py-1 text-xs rounded-md bg-surface/80 text-accent border border-accent/15">
                            +{project.tech.length - 5}
                          </span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="mt-4 flex items-center gap-3 pt-3 border-t border-white/5">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${project.title} source code on GitHub`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                                     font-medium text-muted border border-white/8 hover:text-accent
                                     hover:border-accent/30 hover:bg-accent/5 transition-all"
                        >
                          <FiGithub size={13} />
                          GitHub
                        </a>
                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${project.title} live demo`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                                       font-medium text-accent border border-accent/25 hover:bg-accent/10
                                       transition-all"
                          >
                            <FiExternalLink size={13} />
                            Live Demo
                          </a>
                        )}
                        <span className="ml-auto text-xs text-muted group-hover:text-accent transition-colors">
                          Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-muted mt-8">No projects in this category yet.</p>
        )}
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
