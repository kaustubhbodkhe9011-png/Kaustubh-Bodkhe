import { useState } from "react";

/**
 * Custom hook for a typewriter/typing animation effect.
 * Cycles through an array of strings, typing and deleting each one.
 */
export function useTypewriter(strings = [], typingSpeed = 80, deletingSpeed = 40, pauseTime = 1800) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Use refs to track mutable state without re-renders
  const state = useState(() => ({
    currentIndex: 0,
    currentChar: 0,
    isDeleting: false,
    started: false,
  }))[0];

  // Start the animation loop once
  if (!state.started && strings.length > 0) {
    state.started = true;

    const tick = () => {
      const currentString = strings[state.currentIndex];

      if (!state.isDeleting) {
        // Typing forward
        state.currentChar++;
        setDisplayText(currentString.substring(0, state.currentChar));
        setIsTyping(true);

        if (state.currentChar === currentString.length) {
          // Finished typing — pause, then start deleting
          state.isDeleting = true;
          setTimeout(tick, pauseTime);
          return;
        }
        setTimeout(tick, typingSpeed);
      } else {
        // Deleting backward
        state.currentChar--;
        setDisplayText(currentString.substring(0, state.currentChar));
        setIsTyping(false);

        if (state.currentChar === 0) {
          // Finished deleting — move to next string
          state.isDeleting = false;
          state.currentIndex = (state.currentIndex + 1) % strings.length;
          setTimeout(tick, typingSpeed);
          return;
        }
        setTimeout(tick, deletingSpeed);
      }
    };

    setTimeout(tick, 500); // initial delay
  }

  return { displayText, isTyping };
}
