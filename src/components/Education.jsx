import { FiBookOpen, FiAward, FiExternalLink } from "react-icons/fi";
import { education, certificates } from "../data/config";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

/**
 * Education section — timeline for degrees + certificate cards.
 */
export default function Education() {
  return (
    <section id="education" className="py-20 lg:py-28 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Education & Certificates"
          subtitle="My academic journey and professional development."
        />

        {/* Education Timeline */}
        <div className="max-w-3xl mx-auto">
          {education.map((edu, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative pl-8 pb-10 last:pb-0 group">
                {/* Timeline line */}
                <div className="absolute left-0 top-2 bottom-0 w-px bg-accent/20 group-last:hidden" />
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-2 w-2.5 h-2.5 -translate-x-1 rounded-full
                    ${edu.current ? "bg-accent shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "bg-accent/50"}`}
                />

                <div
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/5
                              hover:border-accent/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-accent/10 text-accent shrink-0 mt-0.5">
                      <FiBookOpen size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold font-heading text-foreground">
                        {edu.degree}
                      </h3>
                      <p className="text-accent text-sm font-medium mt-0.5">
                        {edu.institution}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted">
                        <span>{edu.location}</span>
                        <span>{edu.period}</span>
                        {edu.current && (
                          <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                            Currently Pursuing
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-muted text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Certificates */}
        {certificates.length > 0 && (
          <div className="mt-16 max-w-3xl mx-auto">
            <ScrollReveal>
              <h3 className="text-xl font-bold font-heading text-foreground mb-6 flex items-center gap-2">
                <FiAward className="text-accent" size={22} />
                Certificates
              </h3>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {certificates.map((cert, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div
                    className="p-5 rounded-xl bg-card/50 backdrop-blur-sm border border-white/5
                                hover:border-accent/20 transition-all duration-300 group"
                  >
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-muted mt-1">
                      {cert.issuer} · {cert.date}
                    </p>
                    {cert.link && cert.link !== "#" && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-accent text-sm hover:underline"
                      >
                        View Certificate
                        <FiExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
