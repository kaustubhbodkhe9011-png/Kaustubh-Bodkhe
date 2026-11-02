import { FiHome, FiAlertTriangle } from "react-icons/fi";

/**
 * Custom 404 page — shows when route is not found.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4 space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-accent/10">
            <FiAlertTriangle className="text-accent" size={48} />
          </div>
        </div>
        <h1 className="text-7xl font-bold font-heading text-foreground">404</h1>
        <p className="text-xl text-muted max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                     bg-gradient-to-r from-accent to-cyan-400 text-background
                     hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-300
                     hover:scale-105 active:scale-95"
        >
          <FiHome size={16} />
          Back to Home
        </a>
      </div>
    </div>
  );
}
