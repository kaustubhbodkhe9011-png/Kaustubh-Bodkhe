import { useState } from "react";
import { FiSend, FiCheckCircle, FiAlertCircle, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { siteConfig } from "../data/config";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

/**
 * Contact section — working form (Formspree), validation, honeypot spam filter.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState(""); // spam trap
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) {
      errs.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return; // bot detected
    if (!validate()) return;

    setStatus("sending");

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
    if (!formspreeId) {
      // Direct mailto fallback if Formspree ID is not configured yet
      const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a question or want to work together? Let's connect."
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <p className="text-muted text-lg leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or
                opportunities to be part of your team. Feel free to reach out!
              </p>

              <div className="space-y-4 pt-4">
                <ContactLink
                  icon={FiMail}
                  label="Email"
                  value={siteConfig.email}
                  href={`mailto:${siteConfig.email}`}
                />
                <ContactLink
                  icon={FiGithub}
                  label="GitHub"
                  value={siteConfig.github.replace("https://github.com/", "@")}
                  href={siteConfig.github}
                />
                <ContactLink
                  icon={FiLinkedin}
                  label="LinkedIn"
                  value="Connect on LinkedIn"
                  href={siteConfig.linkedin}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.15}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 p-6 sm:p-8 rounded-2xl bg-card/50 backdrop-blur-sm
                         border border-white/5"
            >
              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                name="_gotcha"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <InputField
                label="Name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-surface/80 border text-foreground
                    placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30
                    focus:border-accent/50 transition-all resize-none
                    ${errors.message ? "border-red-500/50" : "border-white/10"}`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                           font-semibold bg-gradient-to-r from-accent to-cyan-400 text-background
                           hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-300
                           hover:scale-[1.02] active:scale-[0.98]
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === "sending" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={16} />
                    Send Message
                  </>
                )}
              </button>

              {/* Success / Error Messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-400 text-sm">
                  <FiCheckCircle size={16} />
                  Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
                  <FiAlertCircle size={16} />
                  Something went wrong. Please try again or email me directly.
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* Reusable input field */
function InputField({ label, name, type, placeholder, value, onChange, error }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground mb-1.5"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl bg-surface/80 border text-foreground
          placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30
          focus:border-accent/50 transition-all
          ${error ? "border-red-500/50" : "border-white/10"}`}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}

/* Contact info link */
function ContactLink({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-white/5
                 hover:border-accent/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]
                 transition-all duration-300 group"
    >
      <div className="p-2.5 rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
        <p className="text-foreground font-medium group-hover:text-accent transition-colors">
          {value}
        </p>
      </div>
    </a>
  );
}
