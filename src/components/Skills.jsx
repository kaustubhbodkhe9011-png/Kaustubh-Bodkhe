import {
  FiCode,
  FiGlobe,
  FiDatabase,
  FiCpu,
  FiTool,
} from "react-icons/fi";
import { skills } from "../data/config";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

// Map category icon names to React Icons
const iconMap = {
  code: FiCode,
  globe: FiGlobe,
  database: FiDatabase,
  brain: FiCpu,
  tool: FiTool,
};

/**
 * Skills section — grouped cards with icons and skill tags.
 */
export default function Skills() {
  return (
    <section id="skills" className="py-20 lg:py-28 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I work with every day."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, i) => {
            const Icon = iconMap[group.icon] || FiCode;
            return (
              <ScrollReveal key={group.category} delay={i * 0.1}>
                <div
                  className="group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/5
                              hover:border-accent/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]
                              transition-all duration-400 h-full"
                >
                  {/* Icon + Category */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="p-2.5 rounded-xl bg-accent/10 text-accent
                                  group-hover:bg-accent/20 transition-colors duration-300"
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-semibold font-heading text-foreground">
                      {group.category}
                    </h3>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm rounded-lg bg-surface/80 text-muted
                                   border border-white/5 group-hover:border-accent/10
                                   group-hover:text-foreground transition-all duration-300"
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
