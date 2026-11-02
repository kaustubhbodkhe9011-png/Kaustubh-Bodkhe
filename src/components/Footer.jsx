import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";
import { siteConfig } from "../data/config";

/**
 * Footer with social links and copyright.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/5 bg-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-muted text-sm text-center sm:text-left">
            © {year} {siteConfig.name}. Built with{" "}
            <FiHeart className="inline text-accent" size={13} /> using React & Tailwind.
          </p>

          {/* Social Links */}
          <div className="flex gap-3">
            {[
              { icon: FiGithub, href: siteConfig.github, label: "GitHub" },
              { icon: FiLinkedin, href: siteConfig.linkedin, label: "LinkedIn" },
              { icon: FiMail, href: `mailto:${siteConfig.email}`, label: "Email" },
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
          </div>
        </div>
      </div>
    </footer>
  );
}
