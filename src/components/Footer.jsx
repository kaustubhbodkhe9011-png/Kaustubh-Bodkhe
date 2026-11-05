import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from "react-icons/fi";
import { siteConfig } from "../data/config";

/**
 * Footer — copyright 2026, social icons, back-to-top button.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Copyright */}
          <p className="text-muted text-sm text-center sm:text-left">
            © {year}{" "}
            <span className="text-foreground font-medium">{siteConfig.name}</span>
            . Built with{" "}
            <FiHeart className="inline text-accent" size={12} />{" "}
            using React &amp; Tailwind CSS.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {[
              { icon: FiGithub,   href: siteConfig.github,              label: "GitHub" },
              { icon: FiLinkedin, href: siteConfig.linkedin,            label: "LinkedIn" },
              { icon: FiMail,     href: `mailto:${siteConfig.email}`,   label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-1" />

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-lg border border-white/10 text-muted
                         hover:text-accent hover:border-accent/30 hover:bg-accent/5
                         transition-all duration-300 group"
            >
              <FiArrowUp
                size={16}
                className="group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
