import { useState } from "react";
import {
  FiSend, FiCheckCircle, FiAlertCircle,
  FiGithub, FiLinkedin, FiMail, FiMapPin,
} from "react-icons/fi";
import { siteConfig } from "../data/config";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const API_URL = import.meta.env.VITE_API_URL || null;

/**
 * Contact section — form with validation.
 * Sends to backend API (/api/contact) if VITE_API_URL is set,
 * otherwise falls back to Formspree or mailto:.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
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
    if (!form.subject.trim()) errs.subject = "Subject is required.";
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
    if (honeypot) return; // bot trap
    if (!validate()) return;

    setStatus("sending");

    // Try backend API first
    if (API_URL) {
      try {
        const res = await fetch(`${API_URL}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setForm({ name: "", email: "", subject: "", message: "" });
          return;
        }
        setStatus("error");
        return;
      } catch {
        // fall through to Formspree/mailto
      }
    }

    // Try Formspree
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
    if (formspreeId) {
      try {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form }),
        });
        if (res.ok) {
          setStatus("success");
          setForm({ name: "", email: "", subject: "", message: "" });
          return;
        }
      } catch {
        // fall through to mailto
      }
    }

    // Final fallback: mailto
    const subject = encodeURIComponent(`Portfolio: ${form.subject} — from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a question or want to work together? Let's connect!"
        />

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">

          {/* ── Left: contact info ── */}
          <ScrollReveal className="lg:col-span-2" direction="left">
            <div className="space-y-6 h-full">
              <p className="text-muted text-base leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your team. Feel free to reach out!
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { icon: FiMail,     label: "Email",    value: siteConfig.email,      href: `mailto:${siteConfig.email}` },
                  { icon: FiMapPin,   label: "Location", value: siteConfig.location,   href: null },
                  { icon: FiGithub,   label: "GitHub",   value: "kaustubhbodkhe9011-png", href: siteConfig.github },
                  { icon: FiLinkedin, label: "LinkedIn", value: "Connect on LinkedIn", href: siteConfig.linkedin },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3 group">
                    <div className="p-2 rounded-xl bg-accent/10 text-accent mt-0.5 shrink-0
                                    group-hover:bg-accent/20 transition-colors">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground text-sm font-medium hover:text-accent transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-foreground text-sm font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ── Right: contact form ── */}
          <ScrollReveal className="lg:col-span-3" direction="right" delay={0.15}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/5"
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

              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="Name *"    name="name"    type="text"  placeholder="Your name"      value={form.name}    onChange={handleChange} error={errors.name} />
                <InputField label="Email *"   name="email"   type="email" placeholder="your@email.com" value={form.email}   onChange={handleChange} error={errors.email} />
              </div>

              {/* Subject */}
              <InputField label="Subject *" name="subject" type="text" placeholder="What's this about?" value={form.subject} onChange={handleChange} error={errors.subject} />

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project, opportunity, or just say hello..."
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-surface/80 border text-foreground text-sm
                    placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30
                    focus:border-accent/50 transition-all resize-none
                    ${errors.message ? "border-red-500/50" : "border-white/10"}`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                           font-semibold text-sm bg-gradient-to-r from-accent to-cyan-400 text-slate-950
                           hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-300
                           hover:scale-[1.02] active:scale-[0.98]
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === "sending" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <FiSend size={16} />
                    Send Message
                  </>
                )}
              </button>

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-400 text-sm">
                  <FiCheckCircle size={16} />
                  Message sent! I'll get back to you as soon as possible.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
                  <FiAlertCircle size={16} />
                  Something went wrong. Please email me directly at{" "}
                  <a href={`mailto:${siteConfig.email}`} className="underline">{siteConfig.email}</a>.
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function InputField({ label, name, type, placeholder, value, onChange, error }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl bg-surface/80 border text-foreground text-sm
          placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30
          focus:border-accent/50 transition-all
          ${error ? "border-red-500/50" : "border-white/10"}`}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
