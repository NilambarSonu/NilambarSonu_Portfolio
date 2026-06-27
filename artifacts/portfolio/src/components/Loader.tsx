import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

// Christmas light colors inspired by the alphabet wall in Stranger Things
const LIGHT_COLORS = [
  "#e50914", // red
  "#ffd700", // golden yellow
  "#00cc44", // green
  "#3399ff", // blue
  "#e50914", // red
  "#ff6600", // orange
  "#cc44ff", // purple
  "#ffd700", // yellow
];

const NAME = "NILAMBAR";

export default function Loader({ onComplete }: LoaderProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [allLit, setAllLit] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Sequentially light up each letter
    const lightTimers: NodeJS.Timeout[] = [];
    
    NAME.split("").forEach((_, i) => {
      lightTimers.push(
        setTimeout(() => setActiveIndex(i), 300 + i * 250)
      );
    });

    // All letters lit
    const allLitTimer = setTimeout(() => {
      setAllLit(true);
    }, 300 + NAME.length * 250 + 400);

    // Start fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 300 + NAME.length * 250 + 1500);

    // Complete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 300 + NAME.length * 250 + 2200);

    return () => {
      lightTimers.forEach(clearTimeout);
      clearTimeout(allLitTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
        >
          {/* Wire across the top */}
          <div className="absolute top-[35%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50" />

          {/* Christmas lights string */}
          <div className="relative flex items-center justify-center gap-1 sm:gap-3 md:gap-5 mb-12 px-4">
            {/* Wire connecting bulbs */}
            <svg className="absolute top-2 left-0 right-0 w-full h-8 pointer-events-none" preserveAspectRatio="none">
              <path
                d={`M 0 15 ${NAME.split("").map((_, i) => {
                  const x = (i + 0.5) * (100 / NAME.length);
                  return `Q ${x - 3}% 5, ${x}% 20 Q ${x + 3}% 5, ${x + 5}% 15`;
                }).join(" ")}`}
                fill="none"
                stroke="#333"
                strokeWidth="2"
              />
            </svg>

            {NAME.split("").map((letter, i) => {
              const isLit = i <= activeIndex;
              const color = LIGHT_COLORS[i % LIGHT_COLORS.length];
              
              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center relative"
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: isLit ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  {/* Bulb */}
                  <div
                    className="w-4 h-5 sm:w-5 sm:h-6 rounded-b-full relative mb-2"
                    style={{
                      backgroundColor: isLit ? color : "#222",
                      boxShadow: isLit 
                        ? `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}80`
                        : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {/* Bulb cap */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-gray-600 rounded-t-sm" />
                  </div>

                  {/* Letter */}
                  <motion.span
                    className="text-3xl sm:text-5xl md:text-6xl font-display tracking-widest"
                    style={{
                      color: isLit ? color : "#222",
                      textShadow: isLit 
                        ? `0 0 10px ${color}, 0 0 30px ${color}, 0 0 60px ${color}60`
                        : "none",
                      fontWeight: 700,
                    }}
                    animate={allLit && isLit ? {
                      textShadow: [
                        `0 0 10px ${color}, 0 0 30px ${color}, 0 0 60px ${color}60`,
                        `0 0 20px ${color}, 0 0 50px ${color}, 0 0 100px ${color}80`,
                        `0 0 10px ${color}, 0 0 30px ${color}, 0 0 60px ${color}60`,
                      ]
                    } : {}}
                    transition={allLit ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
                  >
                    {letter}
                  </motion.span>
                </motion.div>
              );
            })}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: allLit ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="text-muted-foreground font-retro text-sm tracking-[0.3em] uppercase"
          >
            Entering The Upside Down...
          </motion.p>

          {/* Flickering ambient light */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: allLit 
                ? "radial-gradient(ellipse at center, rgba(229,9,20,0.05) 0%, transparent 70%)"
                : "none",
              transition: "background 1s ease",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
