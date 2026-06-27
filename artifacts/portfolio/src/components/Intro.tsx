import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface IntroProps {
  onEnter: () => void;
}

const NAME_LETTERS = "NILAMBAR".split("");

const PARTICLE_COUNT = 60;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 3,
  opacity: Math.random() * 0.5 + 0.1,
}));

export default function Intro({ onEnter }: IntroProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [allLit, setAllLit] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return;
    didMount.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    NAME_LETTERS.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveIndex(i), 500 + i * 200));
    });
    timers.push(setTimeout(() => setAllLit(true), 500 + NAME_LETTERS.length * 200 + 400));
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    try {
      const audio = new Audio("/Running Up That Hill.mp3");
      audio.volume = 0;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx() as AudioContext;
      const source = ctx.createMediaElementSource(audio);
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.85, ctx.currentTime + 2.2);
      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      audio.play().catch(() => {});
      (window as any).__introAudio = audio;
      (window as any).__introAudioCtx = ctx;
    } catch (_) {
      try {
        const fallback = new Audio("/Running Up That Hill.mp3");
        fallback.volume = 0.7;
        fallback.play().catch(() => {});
        (window as any).__introAudio = fallback;
      } catch (_2) {}
    }

    setIsExiting(true);
    setTimeout(() => onEnter(), 900);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] overflow-hidden flex flex-col items-center justify-center"
          style={{ background: "#030913" }}
        >
          {/* Stars / particles */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  background: `rgba(65, 176, 255, ${p.opacity})`,
                  boxShadow: `0 0 ${p.size * 4}px rgba(0, 120, 231, 0.4)`,
                }}
                animate={{ opacity: [p.opacity, p.opacity * 0.2, p.opacity] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Radial glow behind name */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "60vw",
              height: "40vh",
              background: "radial-gradient(ellipse at center, rgba(0,120,231,0.12) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden="true"
          />

          {/* Thin horizontal rule above name */}
          <motion.div
            className="w-16 h-px mb-8"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,120,231,0.6), transparent)" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Eyebrow label */}
          <motion.p
            className="text-xs tracking-[0.35em] uppercase mb-6 font-light"
            style={{ color: "rgba(0, 157, 223, 0.7)", fontFamily: "system-ui, sans-serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Portfolio
          </motion.p>

          {/* Name letters */}
          <div className="flex items-end gap-1 sm:gap-2 mb-6" aria-label="Nilambar">
            {NAME_LETTERS.map((letter, i) => {
              const lit = i <= activeIndex;
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: lit ? 1 : 0, y: lit ? 0 : 24 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Ancizar Serif', Georgia, serif",
                    fontSize: "clamp(3rem, 8vw, 7rem)",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    color: "#0078e7",
                    textShadow: lit
                      ? "0 0 28px rgba(0,120,231,0.55), 0 0 60px rgba(0,120,231,0.28)"
                      : "none",
                    lineHeight: 1,
                    userSelect: "none",
                    textTransform: "uppercase",
                    transition: "text-shadow 0.3s ease",
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </div>

          {/* Full name subtitle */}
          <motion.p
            className="text-sm tracking-[0.22em] uppercase mb-2 font-light"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "system-ui, sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: allLit ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Nilambar Behera
          </motion.p>

          <motion.p
            className="text-xs tracking-[0.18em] mb-12"
            style={{ color: "rgba(0,157,223,0.55)", fontFamily: "system-ui, sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: allLit ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            Founder &amp; CEO · Mitti-AI
          </motion.p>

          {/* Enter button */}
          <motion.button
            onClick={handleEnter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: allLit ? 1 : 0, y: allLit ? 0 : 16 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full cursor-pointer border transition-all duration-300"
            style={{
              background: "rgba(0,120,231,0.08)",
              border: "1px solid rgba(0,120,231,0.35)",
              color: "rgba(255,255,255,0.88)",
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,120,231,0.18)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,120,231,0.7)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 28px rgba(0,120,231,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,120,231,0.08)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,120,231,0.35)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            Enter Portfolio
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={15} style={{ color: "#0078e7" }} />
            </motion.span>
          </motion.button>

          {/* Bottom thin rule */}
          <motion.div
            className="absolute bottom-10 w-8 h-px"
            style={{ background: "rgba(0,120,231,0.3)" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
