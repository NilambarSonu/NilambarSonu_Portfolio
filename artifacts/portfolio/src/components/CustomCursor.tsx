import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const TRAIL_COUNT = 6;
const TRAIL_STIFFNESS = [320, 200, 130, 80, 50, 30];
const TRAIL_DAMPING   = [28,  24,  20,  18, 16, 14];

type HoverState = "default" | "link" | "text";

export default function CustomCursor() {
  const [isMobile, setIsMobile]   = useState(false);
  const [hover, setHover]         = useState<HoverState>("default");
  const [clicked, setClicked]     = useState(false);
  const [burst, setBurst]         = useState(false);
  const [angle1, setAngle1]       = useState(0);
  const [angle2, setAngle2]       = useState(180);
  const rafRef                    = useRef<number>(0);
  const lastTime                  = useRef<number>(0);

  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);

  // Core — near instant
  const coreX = useSpring(mx, { stiffness: 1200, damping: 40, mass: 0.2 });
  const coreY = useSpring(my, { stiffness: 1200, damping: 40, mass: 0.2 });

  // Ring — medium lag
  const ringX = useSpring(mx, { stiffness: 200, damping: 24, mass: 0.5 });
  const ringY = useSpring(my, { stiffness: 200, damping: 24, mass: 0.5 });

  // Trail springs
  const trails = Array.from({ length: TRAIL_COUNT }, (_, i) => ({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    x: useSpring(mx, { stiffness: TRAIL_STIFFNESS[i], damping: TRAIL_DAMPING[i], mass: 0.4 }),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    y: useSpring(my, { stiffness: TRAIL_STIFFNESS[i], damping: TRAIL_DAMPING[i], mass: 0.4 }),
  }));

  // Orbit animation loop
  useEffect(() => {
    const loop = (time: number) => {
      const dt = time - lastTime.current;
      lastTime.current = time;
      const speed1 = hover === "link" ? 4.5 : 2.2;
      const speed2 = hover === "link" ? -3.0 : -1.4;
      setAngle1(a => (a + speed1 * dt * 0.001 * 360) % 360);
      setAngle2(a => (a + speed2 * dt * 0.001 * 360) % 360);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hover]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    const onMove = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], label, select, input, textarea")) {
        setHover("link");
      } else if (el.closest("p, h1, h2, h3, h4, h5, span, li")) {
        setHover("text");
      } else {
        setHover("default");
      }
    };

    const onDown = () => {
      setClicked(true);
      setBurst(true);
      setTimeout(() => setBurst(false), 500);
    };
    const onUp = () => setClicked(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (isMobile) return null;

  const isLink = hover === "link";

  // Orbit radii
  const r1 = isLink ? 10 : 16;
  const r2 = isLink ? 16 : 26;

  const sat1X = Math.cos((angle1 * Math.PI) / 180) * r1;
  const sat1Y = Math.sin((angle1 * Math.PI) / 180) * r1;
  const sat2X = Math.cos((angle2 * Math.PI) / 180) * r2;
  const sat2Y = Math.sin((angle2 * Math.PI) / 180) * r2;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>

      {/* ── Comet trail ── */}
      {trails.map((t, i) => (
        <motion.div
          key={i}
          style={{
            position: "fixed",
            top: 0, left: 0,
            x: t.x,
            y: t.y,
            translateX: "-50%",
            translateY: "-50%",
            pointerEvents: "none",
            zIndex: 9994,
          }}
        >
          <motion.div
            animate={{
              width:  isLink ? 2 : Math.max(1.5, 4 - i * 0.5),
              height: isLink ? 2 : Math.max(1.5, 4 - i * 0.5),
              opacity: isLink ? 0 : (0.3 - i * 0.04),
              scale: clicked ? 0.4 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={{
              borderRadius: "50%",
              background: `rgba(65, 176, 255, 1)`,
              boxShadow: `0 0 ${6 - i}px rgba(0,157,223,0.5)`,
            }}
          />
        </motion.div>
      ))}

      {/* ── Orbital satellites (attached to ring position) ── */}
      {/* Satellite 1 */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9997,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            x: sat1X,
            y: sat1Y,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            animate={{
              width: isLink ? 4 : 3.5,
              height: isLink ? 4 : 3.5,
              backgroundColor: isLink ? "#41b0ff" : "rgba(0,191,255,0.85)",
              boxShadow: isLink
                ? "0 0 10px rgba(65,176,255,0.9), 0 0 20px rgba(65,176,255,0.4)"
                : "0 0 6px rgba(0,191,255,0.6)",
              scale: clicked ? 1.6 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{ borderRadius: "50%" }}
          />
        </motion.div>
      </motion.div>

      {/* Satellite 2 */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9997,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            x: sat2X,
            y: sat2Y,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            animate={{
              width: isLink ? 3 : 2.5,
              height: isLink ? 3 : 2.5,
              backgroundColor: isLink ? "rgba(0,157,223,0.9)" : "rgba(0,120,231,0.7)",
              boxShadow: isLink
                ? "0 0 8px rgba(0,157,223,0.8)"
                : "0 0 4px rgba(0,120,231,0.5)",
              scale: clicked ? 1.4 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{ borderRadius: "50%" }}
          />
        </motion.div>
      </motion.div>

      {/* ── Thin orbit ring (visual guide) ── */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9996,
        }}
      >
        <motion.div
          animate={{
            width:  isLink ? 36 : 58,
            height: isLink ? 36 : 58,
            opacity: hover === "text" ? 0.08 : isLink ? 0.45 : 0.14,
            borderColor: isLink ? "rgba(65,176,255,0.8)" : "rgba(0,157,223,0.4)",
            boxShadow: isLink ? "0 0 14px rgba(0,120,231,0.2)" : "none",
            scale: clicked ? 0.75 : 1,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          style={{
            borderRadius: "50%",
            border: "1px solid",
            borderStyle: "dashed",
          }}
        />
      </motion.div>

      {/* ── Core dot ── */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          x: coreX,
          y: coreY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        <motion.div
          animate={{
            width:  isLink ? 6 : 4,
            height: isLink ? 6 : 4,
            backgroundColor: isLink ? "#41b0ff" : "rgba(200,235,255,0.95)",
            boxShadow: isLink
              ? "0 0 12px rgba(65,176,255,1), 0 0 24px rgba(0,120,231,0.5)"
              : "0 0 8px rgba(200,235,255,0.7)",
            scale: clicked ? 0.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 600, damping: 28 }}
          style={{ borderRadius: "50%" }}
        />
      </motion.div>

      {/* ── Click burst particles ── */}
      <AnimatePresence>
        {burst && (
          <motion.div
            style={{
              position: "fixed",
              top: 0, left: 0,
              x: coreX,
              y: coreY,
              translateX: "-50%",
              translateY: "-50%",
              pointerEvents: "none",
              zIndex: 9998,
            }}
          >
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i / 8) * 360;
              const rad = (angle * Math.PI) / 180;
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(rad) * 22,
                    y: Math.sin(rad) * 22,
                    opacity: 0,
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: "#41b0ff",
                    boxShadow: "0 0 6px rgba(65,176,255,0.8)",
                    top: "50%",
                    left: "50%",
                    marginTop: -1.5,
                    marginLeft: -1.5,
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
