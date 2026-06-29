import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface IntroProps {
  onEnter: () => void;
}

const ROLES = ["Founder & CEO · Mitti-AI", "AI Engineer", "Full-Stack Developer", "State-Level Innovator"];
const NAME = "NILAMBAR";

function useMouseParallax(strength = 1) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 40, damping: 20 });
  const springY = useSpring(y, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      x.set(((e.clientX - cx) / cx) * strength * 30);
      y.set(((e.clientY - cy) / cy) * strength * 30);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [strength]);

  return { x: springX, y: springY };
}

const PARTICLES = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.6,
  delay: Math.random() * 5,
  dur: Math.random() * 3 + 3,
  opacity: Math.random() * 0.45 + 0.08,
  depth: Math.random(),
}));

export default function Intro({ onEnter }: IntroProps) {
  const [phase, setPhase] = useState<"particles" | "name" | "sub" | "done">("particles");
  const [activeLetters, setActiveLetters] = useState(-1);
  const [roleIdx, setRoleIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [sweepPos, setSweepPos] = useState(-100);
  const didMount = useRef(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallax1 = useMouseParallax(0.5);
  const parallax2 = useMouseParallax(0.25);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    if (didMount.current) return;
    didMount.current = true;

    const t: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: particles fade in — then name starts
    t.push(setTimeout(() => setPhase("name"), 400));

    // Letter reveal
    NAME.split("").forEach((_, i) => {
      t.push(setTimeout(() => setActiveLetters(i), 600 + i * 130));
    });

    // Phase 2: subtitle
    t.push(setTimeout(() => setPhase("sub"), 600 + NAME.length * 130 + 300));

    // Phase 3: button + sweep loop
    t.push(setTimeout(() => {
      setPhase("done");
      // light sweep loop
      let pos = -100;
      const sweep = () => {
        pos = -100;
        const loop = setInterval(() => {
          pos += 4;
          setSweepPos(pos);
          if (pos > 200) clearInterval(loop);
        }, 16);
        return loop;
      };
      sweep();
      // repeat sweep every 4s
      const interval = setInterval(() => sweep(), 4200);
      t.push(interval as unknown as ReturnType<typeof setTimeout>);
    }, 600 + NAME.length * 130 + 900));

    return () => t.forEach(clearTimeout);
  }, []);

  // Role cycle
  useEffect(() => {
    if (phase !== "done") return;
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, [phase]);

  const handleEnter = useCallback(() => {
    try {
      const audio = new Audio("/Running Up That Hill.mp3");
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx() as AudioContext;
      const src = ctx.createMediaElementSource(audio);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.85, ctx.currentTime + 2.2);
      src.connect(gain);
      gain.connect(ctx.destination);
      audio.play().catch(() => {});
      (window as any).__introAudio = audio;
      (window as any).__introAudioCtx = ctx;
    } catch (_) {
      try {
        const a = new Audio("/Running Up That Hill.mp3");
        a.volume = 0.7;
        a.play().catch(() => {});
        (window as any).__introAudio = a;
      } catch (_2) {}
    }
    setIsExiting(true);
    setTimeout(() => onEnter(), 650);
  }, [onEnter]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="intro-root"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest(".intro-enter-btn")) return;
          }}
        >
          {/* ── Aurora background layers ── */}
          <motion.div
            className="intro-aurora-1"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="intro-aurora-2"
            animate={{ opacity: [0.4, 0.75, 0.4], x: [-20, 20, -20] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="intro-aurora-3"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.12, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />

          {/* ── Animated grid ── */}
          <div className="intro-grid" aria-hidden="true" />

          {/* ── Particle layer 1 (close) ── */}
          <motion.div
            className="intro-particles"
            style={{ x: parallax1.x, y: parallax1.y }}
            aria-hidden="true"
          >
            {PARTICLES.filter(p => p.depth > 0.5).map(p => (
              <motion.span
                key={p.id}
                className="intro-particle"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size + 1,
                  height: p.size + 1,
                  background: `rgba(65, 176, 255, ${p.opacity})`,
                  boxShadow: `0 0 ${p.size * 5}px rgba(0, 120, 231, 0.5)`,
                }}
                animate={{ opacity: [p.opacity, p.opacity * 0.15, p.opacity] }}
                transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.div>

          {/* ── Particle layer 2 (far) ── */}
          <motion.div
            className="intro-particles"
            style={{ x: parallax2.x, y: parallax2.y }}
            aria-hidden="true"
          >
            {PARTICLES.filter(p => p.depth <= 0.5).map(p => (
              <motion.span
                key={p.id}
                className="intro-particle"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  background: `rgba(0, 157, 223, ${p.opacity * 0.6})`,
                }}
                animate={{ opacity: [p.opacity * 0.6, 0.02, p.opacity * 0.6] }}
                transition={{ duration: p.dur * 1.4, delay: p.delay + 1, repeat: Infinity }}
              />
            ))}
          </motion.div>

          {/* ── Horizontal scan line ── */}
          <motion.div
            className="intro-scanline"
            animate={{ y: ["-100vh", "200vh"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
            aria-hidden="true"
          />

          {/* ── Central content ── */}
          <div className="intro-center">
            {/* Eyebrow */}
            <motion.div
              className="intro-eyebrow"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: phase !== "particles" ? 1 : 0, letterSpacing: "0.38em" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Portfolio
            </motion.div>

            {/* ── NAME with shimmer ── */}
            <div className="intro-name-wrap" aria-label={NAME}>
              {NAME.split("").map((letter, i) => {
                const lit = i <= activeLetters;
                return (
                  <motion.span
                    key={i}
                    className="intro-letter"
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={lit ? {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    {letter}
                  </motion.span>
                );
              })}

              {/* Light sweep overlay */}
              {phase === "done" && (
                <div
                  className="intro-sweep"
                  style={{ left: `${sweepPos}%` }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Full name */}
            <motion.p
              className="intro-fullname"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: phase === "sub" || phase === "done" ? 1 : 0, y: phase === "sub" || phase === "done" ? 0 : 12 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              Nilambar Behera
            </motion.p>

            {/* Cycling role */}
            <div className="intro-role-wrap">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIdx}
                  className="intro-role"
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: phase === "done" ? 1 : 0, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ROLES[roleIdx]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* ── Enter button ── */}
            <motion.div
              className="intro-btn-wrap"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: phase === "done" ? 1 : 0, y: phase === "done" ? 0 : 24 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Attention ring pulses */}
              <motion.div
                className="intro-btn-pulse"
                animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="intro-btn-pulse"
                animate={{ scale: [1, 1.9, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.55 }}
              />

              <motion.button
                className="intro-enter-btn"
                onClick={handleEnter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,120,231,0.22)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,120,231,0.75)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,120,231,0.35), 0 0 80px rgba(0,120,231,0.15), inset 0 0 20px rgba(0,120,231,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,120,231,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,120,231,0.4)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,120,231,0.15)";
                }}
              >
                <span className="intro-btn-text">Enter Portfolio</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <ArrowRight size={16} color="#41b0ff" />
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Hint text */}
            <motion.p
              className="intro-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "done" ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              ↑ scroll after entering to explore
            </motion.p>
          </div>

          {/* ── Bottom edge decoration ── */}
          <div className="intro-bottom-bar" aria-hidden="true" />

          <style>{`
            .intro-root {
              position: fixed;
              inset: 0;
              z-index: 100;
              background: #030913;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              cursor: none;
            }

            /* Aurora glows */
            .intro-aurora-1 {
              position: absolute;
              top: -10%;
              left: 50%;
              transform: translateX(-50%);
              width: 80vw;
              height: 60vh;
              background: radial-gradient(ellipse at center, rgba(0,120,231,0.18) 0%, rgba(0,80,180,0.08) 40%, transparent 70%);
              pointer-events: none;
              border-radius: 50%;
              filter: blur(40px);
            }
            .intro-aurora-2 {
              position: absolute;
              bottom: 5%;
              left: 10%;
              width: 50vw;
              height: 45vh;
              background: radial-gradient(ellipse at center, rgba(0,157,223,0.12) 0%, transparent 65%);
              pointer-events: none;
              border-radius: 50%;
              filter: blur(50px);
            }
            .intro-aurora-3 {
              position: absolute;
              top: 20%;
              right: 5%;
              width: 35vw;
              height: 55vh;
              background: radial-gradient(ellipse at center, rgba(65,176,255,0.09) 0%, transparent 65%);
              pointer-events: none;
              border-radius: 50%;
              filter: blur(45px);
            }

            /* Grid */
            .intro-grid {
              position: absolute;
              inset: 0;
              pointer-events: none;
              background-image:
                linear-gradient(rgba(0,157,223,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,157,223,0.04) 1px, transparent 1px);
              background-size: 80px 80px;
              mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 80%);
            }

            /* Particles */
            .intro-particles {
              position: absolute;
              inset: 0;
              pointer-events: none;
              will-change: transform;
            }
            .intro-particle {
              position: absolute;
              border-radius: 50%;
              pointer-events: none;
            }

            /* Scan line */
            .intro-scanline {
              position: absolute;
              left: 0;
              right: 0;
              height: 1px;
              background: linear-gradient(90deg, transparent, rgba(0,157,223,0.15), rgba(0,157,223,0.08), transparent);
              pointer-events: none;
              will-change: transform;
            }

            /* Center content */
            .intro-center {
              position: relative;
              z-index: 10;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              padding: 0 1.5rem;
              gap: 0;
            }

            /* Eyebrow */
            .intro-eyebrow {
              font-family: system-ui, sans-serif;
              font-size: 0.62rem;
              font-weight: 400;
              color: rgba(0,157,223,0.55);
              margin-bottom: 1.4rem;
              text-transform: uppercase;
            }

            /* Name */
            .intro-name-wrap {
              position: relative;
              display: flex;
              gap: clamp(0.08rem, 0.5vw, 0.4rem);
              margin-bottom: 1.5rem;
              overflow: hidden;
            }
            .intro-letter {
              font-family: "Ancizar Serif", Georgia, serif;
              font-size: clamp(4rem, 10vw, 9rem);
              font-weight: 400;
              letter-spacing: 0.12em;
              line-height: 1;
              color: transparent;
              background: linear-gradient(
                180deg,
                rgba(200, 228, 255, 0.95) 0%,
                rgba(65, 176, 255, 0.85) 35%,
                rgba(0, 120, 231, 0.75) 70%,
                rgba(0, 80, 180, 0.6) 100%
              );
              -webkit-background-clip: text;
              background-clip: text;
              text-shadow: none;
              filter: drop-shadow(0 0 20px rgba(0,120,231,0.5)) drop-shadow(0 0 50px rgba(0,120,231,0.2));
              user-select: none;
              text-transform: uppercase;
            }

            /* Light sweep */
            .intro-sweep {
              position: absolute;
              top: 0;
              bottom: 0;
              width: 60px;
              background: linear-gradient(
                90deg,
                transparent 0%,
                rgba(255,255,255,0.04) 20%,
                rgba(200,235,255,0.18) 45%,
                rgba(255,255,255,0.28) 50%,
                rgba(200,235,255,0.18) 55%,
                rgba(255,255,255,0.04) 80%,
                transparent 100%
              );
              pointer-events: none;
              transform: skewX(-15deg);
            }

            /* Full name */
            .intro-fullname {
              font-family: system-ui, sans-serif;
              font-size: clamp(0.68rem, 1.2vw, 0.88rem);
              font-weight: 400;
              letter-spacing: 0.3em;
              text-transform: uppercase;
              color: rgba(255,255,255,0.5);
              margin: 0 0 0.5rem;
            }

            /* Role wrap */
            .intro-role-wrap {
              height: 1.6rem;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 2.8rem;
            }
            .intro-role {
              font-family: system-ui, sans-serif;
              font-size: clamp(0.7rem, 1.3vw, 0.95rem);
              font-weight: 300;
              letter-spacing: 0.05em;
              color: rgba(0,157,223,0.65);
              margin: 0;
              white-space: nowrap;
            }

            /* Button wrap */
            .intro-btn-wrap {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 1.4rem;
            }
            .intro-btn-pulse {
              position: absolute;
              inset: -2px;
              border-radius: 999px;
              border: 1px solid rgba(0,120,231,0.5);
              pointer-events: none;
            }
            .intro-enter-btn {
              position: relative;
              z-index: 1;
              display: inline-flex;
              align-items: center;
              gap: 0.65rem;
              padding: 0.85rem 2.2rem;
              border-radius: 999px;
              border: 1px solid rgba(0,120,231,0.4);
              background: rgba(0,120,231,0.1);
              box-shadow: 0 0 20px rgba(0,120,231,0.15);
              cursor: none;
              transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
            }
            .intro-btn-text {
              font-family: system-ui, sans-serif;
              font-size: 0.72rem;
              font-weight: 400;
              letter-spacing: 0.22em;
              text-transform: uppercase;
              color: rgba(255,255,255,0.88);
            }

            /* Hint */
            .intro-hint {
              font-family: system-ui, sans-serif;
              font-size: 0.6rem;
              letter-spacing: 0.2em;
              color: rgba(255,255,255,0.18);
              margin: 0;
            }

            /* Bottom bar */
            .intro-bottom-bar {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 1px;
              background: linear-gradient(90deg, transparent, rgba(0,120,231,0.25), transparent);
              pointer-events: none;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
