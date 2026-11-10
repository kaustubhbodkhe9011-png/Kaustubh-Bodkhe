import { siteConfig } from "../data/config";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

/**
 * About section — story, career goal, and photo.
 */
export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="A glimpse into who I am and what drives me."
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <ScrollReveal className="lg:col-span-2 flex justify-center" direction="left">
            <div className="relative group">
              <div
                className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-accent/20 to-cyan-400/10
                            blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div
                className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden
                            border border-white/10 shadow-xl"
              >
                <img
                  src={siteConfig.photoUrl}
                  alt={`${siteConfig.name} — About`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    if (!e.target.dataset.triedRelative) {
                      e.target.dataset.triedRelative = "true";
                      e.target.src = "./photo.jpg";
                      return;
                    }
                    e.target.style.display = "none";
                    e.target.parentElement.classList.add(
                      "flex",
                      "items-center",
                      "justify-center",
                      "bg-surface"
                    );
                    const span = document.createElement("span");
                    span.className =
                      "text-7xl font-bold text-accent/30 font-heading";
                    span.textContent = siteConfig.name.charAt(0);
                    e.target.parentElement.appendChild(span);
                  }}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal className="lg:col-span-3" direction="right" delay={0.15}>
            <div className="space-y-5">
              <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                {siteConfig.bio}
              </p>
              <div className="pt-2 space-y-3">
                <InfoRow label="📍 Location" value={siteConfig.location} />
                <InfoRow label="🎓 Focus" value="AI/ML, NLP, LLMs & RAG Systems" />
                <InfoRow label="💼 Open to" value="Internships & Entry-Level Roles" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-wrap gap-2 text-base">
      <span className="text-muted font-medium">{label}:</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
