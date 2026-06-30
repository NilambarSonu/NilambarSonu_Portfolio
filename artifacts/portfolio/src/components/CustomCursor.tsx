import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "default" | "action" | "text";

export default function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [pressed, setPressed] = useState(false);
  const [bloom, setBloom] = useState(0);
  const mx = useMotionValue(-240);
  const my = useMotionValue(-240);
  const ringX = useSpring(mx, { stiffness: 520, damping: 34, mass: 0.24 });
  const ringY = useSpring(my, { stiffness: 520, damping: 34, mass: 0.24 });
  const lensX = useSpring(mx, { stiffness: 1050, damping: 38, mass: 0.16 });
  const lensY = useSpring(my, { stiffness: 1050, damping: 38, mass: 0.16 });
  const bloomId = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(pointer: fine)");
    setIsFinePointer(media.matches);

    const updatePointer = () => setIsFinePointer(media.matches);
    media.addEventListener?.("change", updatePointer);

    return () => media.removeEventListener?.("change", updatePointer);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const onMove = (event: MouseEvent) => {
      mx.set(event.clientX);
      my.set(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      if (element.closest("a, button, [role='button'], label, select, input, textarea, summary")) {
        setMode("action");
      } else if (element.closest("p, h1, h2, h3, h4, h5, h6, li, blockquote")) {
        setMode("text");
      } else {
        setMode("default");
      }
    };

    const onDown = () => {
      setPressed(true);
      bloomId.current += 1;
      setBloom(bloomId.current);
    };

    const onUp = () => setPressed(false);

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
  }, [isFinePointer, mx, my]);

  if (!isFinePointer) return null;

  const isAction = mode === "action";
  const isText = mode === "text";

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>

      <motion.div
        className="premium-cursor-ring"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isAction ? 58 : isText ? 44 : 48,
          height: isAction ? 58 : isText ? 44 : 48,
          opacity: isText ? 0.34 : 0.78,
          scale: pressed ? 0.84 : 1,
          borderColor: isAction ? "rgba(65,176,255,0.88)" : "rgba(190,225,255,0.38)",
          boxShadow: isAction
            ? "0 0 0 1px rgba(65,176,255,0.16), 0 0 30px rgba(0,120,231,0.32)"
            : "0 0 0 1px rgba(255,255,255,0.05), 0 0 22px rgba(0,120,231,0.13)",
        }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
      >
        <span className="premium-cursor-axis axis-x" />
        <span className="premium-cursor-axis axis-y" />
      </motion.div>

      <motion.div
        className="premium-cursor-lens"
        style={{ x: lensX, y: lensY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isAction ? 12 : 9,
          height: isAction ? 12 : 9,
          scale: pressed ? 1.42 : 1,
          background: isAction
            ? "radial-gradient(circle, #e8f7ff 0%, #41b0ff 46%, rgba(0,120,231,0.82) 100%)"
            : "radial-gradient(circle, #f7fbff 0%, #a8ddff 58%, rgba(65,176,255,0.62) 100%)",
        }}
        transition={{ type: "spring", stiffness: 620, damping: 25 }}
      />

      <AnimatePresence>
        {bloom > 0 && (
          <motion.div
            key={bloom}
            className="premium-cursor-bloom"
            style={{ x: lensX, y: lensY, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0.46, scale: 0.34 }}
            animate={{ opacity: 0, scale: 1.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.48, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <style>{`
        .premium-cursor-ring,
        .premium-cursor-lens,
        .premium-cursor-bloom {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          pointer-events: none;
        }

        .premium-cursor-ring {
          display: grid;
          place-items: center;
          border: 1px solid rgba(190,225,255,0.38);
          border-radius: 50%;
          background:
            radial-gradient(circle at 50% 50%, rgba(65,176,255,0.12), transparent 42%),
            conic-gradient(from 90deg, transparent 0 16%, rgba(65,176,255,0.34) 18% 22%, transparent 24% 100%);
          backdrop-filter: blur(1.5px);
          -webkit-backdrop-filter: blur(1.5px);
          mix-blend-mode: screen;
        }

        .premium-cursor-axis {
          position: absolute;
          background: rgba(190,225,255,0.32);
          border-radius: 999px;
        }

        .premium-cursor-axis.axis-x {
          width: 11px;
          height: 1px;
        }

        .premium-cursor-axis.axis-y {
          width: 1px;
          height: 11px;
        }

        .premium-cursor-lens {
          border-radius: 50%;
          box-shadow: 0 0 14px rgba(65,176,255,0.6), 0 0 34px rgba(0,120,231,0.22);
          mix-blend-mode: screen;
        }

        .premium-cursor-bloom {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid rgba(65,176,255,0.58);
          box-shadow: 0 0 28px rgba(0,120,231,0.26);
        }
      `}</style>
    </>
  );
}
