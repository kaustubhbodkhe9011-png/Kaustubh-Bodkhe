import ScrollReveal from "./ScrollReveal";

/**
 * Consistent section heading with accent line and subtitle.
 */
export default function SectionHeading({ title, subtitle, className = "" }) {
  return (
    <ScrollReveal className={`text-center mb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">
        {title}
      </h2>
      <div className="mt-3 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-accent to-cyan-400" />
      {subtitle && (
        <p className="mt-4 text-muted max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
