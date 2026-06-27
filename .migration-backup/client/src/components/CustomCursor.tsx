import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoverType, setHoverType] = useState<"default" | "link" | "project" | "skill" | "github" | "resume" | "contact">("default");
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs configuration
  const springConfig = { stiffness: 400, damping: 28, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trail springs configuration (different lag levels)
  const trail1X = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const trail1Y = useSpring(mouseY, { stiffness: 180, damping: 22 });

  const trail2X = useSpring(mouseX, { stiffness: 100, damping: 18 });
  const trail2Y = useSpring(mouseY, { stiffness: 100, damping: 18 });

  const trail3X = useSpring(mouseX, { stiffness: 50, damping: 14 });
  const trail3Y = useSpring(mouseY, { stiffness: 50, damping: 14 });

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const resetIdleTimer = () => {
    setIsIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 2500); // 2.5 seconds idle
  };

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      resetIdleTimer();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const githubLink = target.closest('a[href*="github.com"]');
      const resumeBtn = target.closest('[data-cursor="resume"], .resume-download, [data-testid*="download"]');
      const contactCta = target.closest('.contact-submit, .contact-floating-icon, .contact-floating-email, [data-cursor="contact"]');
      const skillNode = target.closest('[data-cursor="skill"]');
      const genericLink = target.closest('a, button, [role="button"]');
      const projectCard = target.closest('[data-cursor="project"], .project-card');

      if (githubLink) {
        setHoverType("github");
      } else if (resumeBtn) {
        setHoverType("resume");
      } else if (contactCta) {
        setHoverType("contact");
      } else if (skillNode) {
        setHoverType("skill");
      } else if (genericLink) {
        setHoverType("link");
      } else if (projectCard) {
        setHoverType("project");
      } else {
        setHoverType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    resetIdleTimer();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const isHovered = hoverType !== "default";
  const showTrail = hoverType === "default";

  const cursorSize = {
    default: 12,
    link: 80,
    project: 110,
    skill: 90,
    github: 90,
    resume: 90,
    contact: 100,
  }[hoverType];

  const hoverTextMap = {
    default: "",
    link: "OPEN",
    project: "VIEW PROJECT",
    skill: "EXPLORE",
    github: "GITHUB ↗",
    resume: "DOWNLOAD",
    contact: "LET'S TALK",
  };

  return (
    <>
      {/* Global Style Override to Hide Default Cursor */}
      <style>{`
        @media (pointer: fine) {
          body, a, button, input, textarea, select, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Trailing Dots */}
      <motion.div
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: showTrail ? 0.35 : 0,
          scale: showTrail ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="fixed pointer-events-none z-[9998] w-2 h-2 rounded-full bg-[#4F8CFF] shadow-[0_0_8px_rgba(79,140,255,0.4)]"
      />

      <motion.div
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: showTrail ? 0.22 : 0,
          scale: showTrail ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="fixed pointer-events-none z-[9998] w-1.5 h-1.5 rounded-full bg-[#00BFFF] shadow-[0_0_6px_rgba(0,191,255,0.4)]"
      />

      <motion.div
        style={{
          x: trail3X,
          y: trail3Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: showTrail ? 0.12 : 0,
          scale: showTrail ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="fixed pointer-events-none z-[9998] w-1 h-1 rounded-full bg-[#4F8CFF] shadow-[0_0_4px_rgba(79,140,255,0.3)]"
      />

      {/* Main Cursor Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed pointer-events-none z-[9999]"
      >
        <motion.div
          animate={{
            width: cursorSize,
            height: cursorSize,
            backgroundColor: isHovered ? "rgba(6, 11, 20, 0.55)" : "rgba(0, 191, 255, 0)",
            borderColor: hoverType === "skill" || hoverType === "project" ? "#4F8CFF" : "#00BFFF",
            boxShadow: isHovered
              ? "0 0 24px rgba(0, 191, 255, 0.3), inset 0 0 12px rgba(0, 191, 255, 0.15)"
              : "0 0 10px rgba(0, 191, 255, 0.45)",
          }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 24,
            mass: 0.55,
          }}
          className="flex items-center justify-center rounded-full border backdrop-blur-[1.5px] pointer-events-none relative"
        >
          {/* Idle Pulse Ring */}
          {isIdle && !isHovered && (
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-[#00BFFF] pointer-events-none"
              style={{
                boxShadow: "0 0 12px rgba(0, 191, 255, 0.4)",
              }}
            />
          )}

          {/* Hover Text */}
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.span
                key={hoverType}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="text-[9px] font-bold tracking-[0.18em] text-[#00BFFF] text-center font-mono whitespace-nowrap"
                style={{
                  textShadow: "0 0 8px rgba(0, 191, 255, 0.5)",
                }}
              >
                {hoverTextMap[hoverType]}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
