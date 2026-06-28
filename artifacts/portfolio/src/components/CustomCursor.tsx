import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type HoverState = "default" | "link" | "project" | "text";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [hover, setHover] = useState<HoverState>("default");
  const [clicked, setClicked] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Dot — very fast, almost 1:1
  const dotX = useSpring(mx, { stiffness: 900, damping: 35, mass: 0.3 });
  const dotY = useSpring(my, { stiffness: 900, damping: 35, mass: 0.3 });

  // Ring — soft follow
  const ringX = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.6 });
  const ringY = useSpring(my, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], label, select")) {
        setHover("link");
      } else if (el.closest("[data-cursor='project'], .project-card")) {
        setHover("project");
      } else if (el.closest("p, h1, h2, h3, h4, span, li")) {
        setHover("text");
      } else {
        setHover("default");
      }
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
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
  const isProject = hover === "project";
  const isText = hover === "text";

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>

      {/* ── Outer ring ── soft, large, follows behind */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      >
        <motion.div
          animate={{
            width:  clicked ? 28 : isLink || isProject ? 38 : isText ? 24 : 32,
            height: clicked ? 28 : isLink || isProject ? 38 : isText ? 24 : 32,
            borderColor: isLink || isProject
              ? "rgba(65,176,255,0.75)"
              : isText
                ? "rgba(0,157,223,0.35)"
                : "rgba(0,157,223,0.45)",
            backgroundColor: isLink || isProject
              ? "rgba(0,120,231,0.08)"
              : "transparent",
            boxShadow: isLink || isProject
              ? "0 0 16px rgba(0,120,231,0.25)"
              : "none",
            scale: clicked ? 0.82 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.5 }}
          style={{
            borderRadius: "50%",
            border: "1px solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </motion.div>

      {/* ── Inner dot ── precise, fast */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        <motion.div
          animate={{
            width:  isText ? 3 : isLink || isProject ? 5 : 5,
            height: isText ? 3 : isLink || isProject ? 5 : 5,
            backgroundColor: isLink || isProject
              ? "#41b0ff"
              : "rgba(0,191,255,0.9)",
            boxShadow: isLink || isProject
              ? "0 0 8px rgba(65,176,255,0.8)"
              : "0 0 6px rgba(0,191,255,0.5)",
            scale: clicked ? 0.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 600, damping: 28 }}
          style={{ borderRadius: "50%" }}
        />
      </motion.div>
    </>
  );
}
