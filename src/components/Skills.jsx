import { useState } from "react";
import {
  FiCode,
  FiGlobe,
  FiDatabase,
  FiCpu,
  FiTool,
  FiServer,
} from "react-icons/fi";
import { skills } from "../data/config";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

// Map category icon names to React Icons
const iconMap = {
  code:     FiCode,
  globe:    FiGlobe,
  database: FiDatabase,
  brain:    FiCpu,
  tool:     FiTool,
  server:   FiServer,
};

/**
 * Skills section — 6 grouped cards, no fake % bars.
 */
export default function Skills() {
  const [hoveredGroup, setHoveredGroup] = useState(null);

  return (
    <section id="skills" className="py-20 lg:py-28 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I work with — no fake progress bars, just honest skill tags."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, i) => {
            const Icon = iconMap[group.icon] || FiCode;
            const isHovered = hoveredGroup === group.category;
            return (
              <ScrollReveal key={group.category} delay={i * 0.08}>
                <div
                  className={`group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border h-full
                              transition-all duration-400 cursor-default
                              ${isHovered
                                ? "border-accent/40 shadow-[0_0_30px_rgba(6,182,212,0.12)]"
                                : "border-white/5 hover:border-accent/20"
                              }`}
                  onMouseEnter={() => setHoveredGroup(group.category)}
                  onMouseLeave={() => setHoveredGroup(null)}
                >
                  {/* Icon + Category name */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`p-2.5 rounded-xl transition-colors duration-300
                                  ${isHovered ? "bg-accent/20 text-accent" : "bg-accent/10 text-accent"}`}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-semibold font-heading text-foreground">
                      {group.category}
                    </h3>
                    <span className="ml-auto text-xs text-muted bg-surface/80 rounded-full px-2 py-0.5 border border-white/5">
                      {group.items.length}
                    </span>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-300
                                    ${isHovered
                                      ? "bg-accent/8 text-foreground border-accent/15"
                                      : "bg-surface/80 text-muted border-white/5"
                                    }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
