import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

/**
 * AudioPlayer — Stranger Things synth music auto-play with floating toggle.
 * Uses a royalty-free synthwave track. Falls back gracefully if autoplay blocked.
 */
export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  // Synthwave audio — using a free CC0 synthwave loop
  const audioSrc = "https://assets.mixkit.co/music/preview/mixkit-stranger-things-style-synth-630.mp3";

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.3;
      audio.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
        setShowPrompt(false);
      }).catch(() => {
        // Autoplay blocked — wait for user interaction
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  // Try to auto-play on first user interaction anywhere on the page
  useEffect(() => {
    if (hasInteracted) return;

    const handleFirstInteraction = () => {
      const audio = audioRef.current;
      if (!audio || hasInteracted) return;
      
      audio.volume = 0.3;
      audio.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
        setShowPrompt(false);
      }).catch(() => {
        // Silently fail — user can click the button
      });
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hasInteracted]);

  // Dismiss prompt after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      {/* Floating prompt tooltip */}
      <AnimatePresence>
        {showPrompt && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 right-4 z-[60] max-w-[200px]"
          >
            <div className="bg-st-red/90 text-white text-xs px-3 py-2 rounded-lg shadow-lg font-retro">
              🎵 Click anywhere for the Stranger Things experience...
              <div className="absolute -bottom-1 right-4 w-3 h-3 bg-st-red/90 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating audio control */}
      <motion.button
        onClick={togglePlay}
        className="fixed bottom-6 right-4 z-[55] flex items-center gap-2 px-4 py-3 rounded-full bg-black/80 backdrop-blur-md border border-st-red/40 hover:border-st-red/80 transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {/* Equalizer bars */}
        <div className="flex items-end gap-[2px] h-4 mr-1">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-[3px] bg-st-red rounded-full"
              animate={isPlaying ? {
                height: ["4px", `${8 + i * 4}px`, "4px"],
              } : {
                height: "4px"
              }}
              transition={isPlaying ? {
                repeat: Infinity,
                duration: 0.6 + i * 0.1,
                ease: "easeInOut",
              } : {}}
            />
          ))}
        </div>

        {/* Icon */}
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-st-red" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-st-red transition-colors" />
        )}

        {/* Label */}
        <span className="text-xs font-retro text-muted-foreground group-hover:text-white transition-colors hidden sm:inline">
          {isPlaying ? "Playing" : "Play"}
        </span>
      </motion.button>
    </>
  );
}
