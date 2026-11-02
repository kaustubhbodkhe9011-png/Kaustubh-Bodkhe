import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

/**
 * Dark/Light theme toggle button.
 * Persists choice in localStorage.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    // Check saved preference, default to dark
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-lg bg-surface/50 hover:bg-surface text-muted hover:text-accent
                 transition-all duration-300 backdrop-blur-sm border border-white/5
                 hover:border-accent/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
    >
      {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
