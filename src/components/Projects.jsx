import { useState } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "../data/config";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import ProjectModal from "./ProjectModal";

/**
 * Projects section — card grid with screenshots, tech tags, and detail modal.
 */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="Some things I've built — click a card to learn more."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
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
                           hover:border-accent/20 hover:shadow-[0_8px_40px_rgba(6,182,212,0.08)]
                           transition-all duration-400 overflow-hidden h-full flex flex-col"
              >
                {/* Screenshot */}
                <div className="relative w-full h-48 bg-surface/50 overflow-hidden">
                  <img
                    src={project.screenshot}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.classList.add(
                        "flex",
                        "items-center",
                        "justify-center"
                      );
                      const span = document.createElement("span");
                      span.className = "text-muted/30 text-sm font-heading";
                      span.textContent = "Screenshot Coming Soon";
                      e.target.parentElement.appendChild(span);
                    }}
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                flex items-end justify-center pb-3"
                  >
                    <span className="text-accent text-sm font-medium">
                      Click for details →
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold font-heading text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-muted text-sm leading-relaxed flex-1">
                    {project.shortDesc}
                  </p>

                  {/* Tech Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-xs rounded-md bg-surface/80 text-muted
                                   border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 text-xs rounded-md bg-surface/80 text-muted border border-white/5">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="mt-4 flex gap-3 pt-2 border-t border-white/5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${project.title} GitHub`}
                      className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-all"
                    >
                      <FiGithub size={18} />
                    </a>
                    {project.liveDemo && project.liveDemo !== "#" && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${project.title} live demo`}
                        className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-all"
                      >
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
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
