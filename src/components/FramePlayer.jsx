import { useEffect, useRef, useState, useCallback } from "react";
import { FiPlay, FiPause, FiMaximize2, FiMinimize2 } from "react-icons/fi";

/**
 * Canvas-based frame sequence player — renders pre-loaded image frames
 * on a <canvas> element like a video. Supports full-frame uncropped playback,
 * playback scrubber, fullscreen toggle, and visibility pausing.
 *
 * Props:
 *   frameCount  — total number of frames (default 192)
 *   framePath   — optional function(index) => URL string, 1-indexed
 *   fps         — playback framerate (default 24)
 *   loop        — whether to loop playback (default true)
 *   objectFit   — 'contain' (default, full-frame uncropped) | 'cover'
 *   className   — extra CSS classes for the wrapper
 *   onLoaded    — callback when all frames are preloaded
 */
export default function FramePlayer({
  frameCount = 192,
  framePath,
  fps = 24,
  loop = true,
  objectFit = "contain",
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
  const [currentFrameNum, setCurrentFrameNum] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Pause animation when out of viewport
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

  // Listen to fullscreen changes
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => console.warn(err));
    } else {
      document.exitFullscreen().catch((err) => console.warn(err));
    }
  };

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
        const idx = frameIndexRef.current;
        const frame = framesRef.current[idx];

        if (frame && frame.complete && frame.naturalWidth > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        }

        // Update frame counter for UI
        if (idx % 3 === 0) {
          setCurrentFrameNum(idx + 1);
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
    <div
      ref={containerRef}
      className={`relative overflow-hidden group select-none bg-black ${className}`}
    >
      {/* Subtle loader pill while remaining frames stream in */}
      {!loaded && (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/30 text-cyan-400 text-xs font-mono">
          <div className="w-3 h-3 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
          <span>{progress}%</span>
        </div>
      )}

      {/* Canvas — full-frame uncropped rendering */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${
          objectFit === "contain" ? "object-contain" : "object-cover"
        }`}
        style={{ display: "block" }}
      />

      {/* Top badges: Full-Frame format indicator & frame count */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase font-semibold bg-black/75 backdrop-blur-md border border-cyan-400/30 text-cyan-300">
          FULL-FRAME 16:9
        </span>
        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase font-semibold bg-black/75 backdrop-blur-md border border-white/10 text-slate-300">
          FRAME {String(currentFrameNum).padStart(3, "0")} / {frameCount}
        </span>
      </div>

      {/* Scrub / Progress Bar along bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-75"
          style={{ width: `${(currentFrameNum / frameCount) * 100}%` }}
        />
      </div>

      {/* Interactive Controls Overlay on Hover */}
      <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          title={isPlaying ? "Pause 24fps motion" : "Play 24fps motion"}
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
          className="p-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/10
                     text-slate-200 hover:text-cyan-400 hover:border-cyan-400/40
                     transition-all shadow-xl"
        >
          {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
        </button>

        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "View Full Frame Fullscreen"}
          aria-label={isFullscreen ? "Exit Fullscreen" : "View Full Frame Fullscreen"}
          className="p-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/10
                     text-slate-200 hover:text-cyan-400 hover:border-cyan-400/40
                     transition-all shadow-xl"
        >
          {isFullscreen ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />}
        </button>
      </div>
    </div>
  );
}
