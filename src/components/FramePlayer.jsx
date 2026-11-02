import { useEffect, useRef, useState, useCallback } from "react";
import { FiPlay, FiPause } from "react-icons/fi";

/**
 * Canvas-based frame sequence player — renders pre-loaded image frames
 * on a <canvas> element like a video. Used for the Hero section interactive portrait.
 *
 * Props:
 *   frameCount  — total number of frames (default 192)
 *   framePath   — optional function(index) => URL string, 1-indexed
 *   fps         — playback framerate (default 24)
 *   loop        — whether to loop playback (default true)
 *   className   — extra CSS classes for the wrapper
 *   onLoaded    — callback when all frames are preloaded
 */
export default function FramePlayer({
  frameCount = 192,
  framePath,
  fps = 24,
  loop = true,
  className = "",
  onLoaded,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const framesRef = useRef([]);
  const frameIndexRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const isVisibleRef = useRef(true);

  const [isPlaying, setIsPlaying] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const getPath = useCallback(
    (i) => {
      if (framePath) return framePath(i);
      return `/video-frames/frame_${String(i).padStart(4, "0")}.webp`;
    },
    [framePath]
  );

  // Preload frames and draw first frame immediately
  useEffect(() => {
    let cancelled = false;
    const images = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = getPath(i);

      img.onload = () => {
        loadedCount++;
        if (!cancelled) {
          setProgress(Math.round((loadedCount / frameCount) * 100));

          // Render first frame immediately as soon as it arrives!
          if (i === 1 && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            canvas.width = img.naturalWidth || 800;
            canvas.height = img.naturalHeight || 450;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }

        if (loadedCount === frameCount && !cancelled) {
          framesRef.current = images;
          setLoaded(true);
          onLoaded?.();
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount && !cancelled) {
          framesRef.current = images;
          setLoaded(true);
          onLoaded?.();
        }
      };

      images.push(img);
    }

    return () => {
      cancelled = true;
    };
  }, [frameCount, getPath, onLoaded]);

  // Pause animation when hero is scrolled out of view to conserve battery and CPU
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Animate frames on canvas
  useEffect(() => {
    if (!loaded || !isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const firstFrame = framesRef.current[0];
    if (firstFrame && canvas.width !== firstFrame.naturalWidth) {
      canvas.width = firstFrame.naturalWidth;
      canvas.height = firstFrame.naturalHeight;
    }

    const frameDuration = 1000 / fps;

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (isVisibleRef.current && elapsed >= frameDuration) {
        lastTimeRef.current = timestamp - (elapsed % frameDuration);
        const frame = framesRef.current[frameIndexRef.current];
        if (frame && frame.complete && frame.naturalWidth > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        }

        frameIndexRef.current++;
        if (frameIndexRef.current >= framesRef.current.length) {
          if (loop) {
            frameIndexRef.current = 0;
          } else {
            return;
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, isPlaying, fps, loop]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Subtle loader pill while remaining frames stream in */}
      {!loaded && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-accent text-xs font-mono">
          <div className="w-3 h-3 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
          <span>{progress}%</span>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ display: "block" }}
      />

      {/* Play/Pause Button on Hover */}
      {loaded && (
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          title={isPlaying ? "Pause 24fps motion" : "Play 24fps motion"}
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
          className="absolute bottom-14 right-3 z-20 p-2.5 rounded-xl bg-background/80 backdrop-blur-md
                     border border-white/10 text-muted hover:text-accent hover:border-accent/40
                     opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
        >
          {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
        </button>
      )}
    </div>
  );
}
