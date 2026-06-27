import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Power, Activity, Zap, RefreshCw } from "lucide-react";

interface IntroProps {
  onEnter: () => void;
}

const NAME = "NILAMBAR";

const STATIC_COLORS = [
  "#e50914", // red
  "#ffd700", // golden yellow
  "#00cc44", // green
  "#3399ff", // blue
  "#ff6600", // orange
  "#cc44ff", // purple
  "#e50914", // red
  "#ffd700", // yellow
];

type EffectType = 'static' | 'breathing' | 'strobing' | 'colorCycle';

export default function Intro({ onEnter }: IntroProps) {
  const [rgbEffect, setRgbEffect] = useState<EffectType>('static');
  const [isExiting, setIsExiting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    // Sequentially light up each letter
    const lightTimers: NodeJS.Timeout[] = [];
    
    NAME.split("").forEach((_, i) => {
      lightTimers.push(
        setTimeout(() => setActiveIndex(i), 300 + i * 250)
      );
    });

    return () => {
      lightTimers.forEach(clearTimeout);
    };
  }, []);

  const handleEnter = () => {
    // CINEMATIC AUDIO â€” launched inside user-gesture so browser allows autoplay
    try {
      const audio = new Audio('/Running Up That Hill.mp3');
      audio.loop = false;
      audio.preload = 'auto';

      // Web Audio API gives us a compressor + gain for richer output
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx() as AudioContext;
      const source = ctx.createMediaElementSource(audio);

      // Dynamics compressor â€” evens out quiet/loud parts for fuller sound
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -18;
      compressor.knee.value = 10;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.25;

      // Gain: ramp 0 â†’ 1.0 over 2 seconds for a cinematic swell-in
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 2.0);

      source.connect(compressor);
      compressor.connect(gainNode);
      gainNode.connect(ctx.destination);

      audio.play().catch(() => {
        console.warn('[Intro] Audio play blocked by browser policy.');
      });

      // Persist on window â€” audio survives Intro unmount and keeps playing
      (window as any).__introAudio = audio;
      (window as any).__introAudioCtx = ctx;
      (window as any).__introGain = gainNode;
    } catch (err) {
      // Fallback: plain HTML Audio element if Web Audio API is unavailable
      console.warn('[Intro] Web Audio API error, using fallback:', err);
      try {
        const fallback = new Audio('/Running Up That Hill.mp3');
        fallback.volume = 0.9;
        fallback.play().catch(() => {});
        (window as any).__introAudio = fallback;
      } catch (_) {}
    }

    setIsExiting(true);
    // Give time for Intro to fade out before showing the portfolio
    setTimeout(() => {
      onEnter();
    }, 1000);
  };
  
  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient background glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center, rgba(20,0,0,0.5) 0%, transparent 70%)"
          }} />

          {/* Effect Selector Glassmorphism Panel */}
          <div className="absolute top-12 flex flex-wrap justify-center gap-2 sm:gap-4 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md z-10 shadow-xl pointer-events-auto">
            <button 
              onClick={() => setRgbEffect('static')}
              className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl transition-all duration-300 font-retro text-xs sm:text-sm ${rgbEffect === 'static' ? 'bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              <Power size={16} /> <span className="hidden sm:inline">Static</span>
            </button>
            <button 
              onClick={() => setRgbEffect('breathing')}
              className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl transition-all duration-300 font-retro text-xs sm:text-sm ${rgbEffect === 'breathing' ? 'bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              <Activity size={16} /> <span className="hidden sm:inline">Breathing</span>
            </button>
            <button 
              onClick={() => setRgbEffect('strobing')}
              className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl transition-all duration-300 font-retro text-xs sm:text-sm ${rgbEffect === 'strobing' ? 'bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              <Zap size={16} /> <span className="hidden sm:inline">Strobing</span>
            </button>
            <button 
              onClick={() => setRgbEffect('colorCycle')}
              className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl transition-all duration-300 font-retro text-xs sm:text-sm ${rgbEffect === 'colorCycle' ? 'bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              <RefreshCw size={16} /> <span className="hidden sm:inline">Color Cycle</span>
            </button>
          </div>

          {/* Title Text and Christmas Lights */}
          <div className="relative flex items-center justify-center gap-1 sm:gap-3 md:gap-5 mb-16 px-4 z-10 w-full overflow-hidden sm:overflow-visible">
            {/* Wire connecting bulbs */}
            <svg viewBox="0 0 100 20" className="absolute top-2 left-0 right-0 w-full h-8 pointer-events-none" preserveAspectRatio="none">
              <path
                d={`M 0 15 ${NAME.split("").map((_, i) => {
                  const x = (i + 0.5) * (100 / NAME.length);
                  return `Q ${x - 3} 5, ${x} 20 Q ${x + 3} 5, ${x + 5} 15`;
                }).join(" ")}`}
                fill="none"
                stroke="#333"
                strokeWidth="0.5"
              />
            </svg>

            {NAME.split("").map((letter, index) => {
              const isInitiallyLit = index <= activeIndex;
              let effectClassName = "transition-all duration-300 ";
              let style: React.CSSProperties = { fontWeight: 700 };
              let bulbStyle: React.CSSProperties = { transition: "all 0.2s ease" };
              
              const baseColor = STATIC_COLORS[index % STATIC_COLORS.length];
              
              if (!isInitiallyLit) {
                 style.color = "#222";
                 style.textShadow = "none";
                 bulbStyle.backgroundColor = "#222";
                 bulbStyle.boxShadow = "none";
              } else {
                 if (rgbEffect === 'static') {
                   style.color = baseColor;
                   style.textShadow = `0 0 10px ${baseColor}, 0 0 30px ${baseColor}, 0 0 60px ${baseColor}60`;
                   bulbStyle.backgroundColor = baseColor;
                   bulbStyle.boxShadow = `0 0 10px ${baseColor}, 0 0 20px ${baseColor}, 0 0 40px ${baseColor}80`;
                 } else if (rgbEffect === 'breathing') {
                   effectClassName += " animate-pulse-breathing";
                   style.color = baseColor;
                   style.textShadow = `0 0 10px ${baseColor}, 0 0 30px ${baseColor}, 0 0 60px ${baseColor}60`;
                   bulbStyle.backgroundColor = baseColor;
                   bulbStyle.boxShadow = `0 0 10px ${baseColor}, 0 0 20px ${baseColor}, 0 0 40px ${baseColor}80`;
                 } else if (rgbEffect === 'strobing') {
                   effectClassName += " animate-strobing";
                   style.color = baseColor;
                   style.textShadow = `0 0 10px ${baseColor}, 0 0 30px ${baseColor}, 0 0 60px ${baseColor}60`;
                   bulbStyle.backgroundColor = baseColor;
                   bulbStyle.boxShadow = `0 0 10px ${baseColor}, 0 0 20px ${baseColor}, 0 0 40px ${baseColor}80`;
                 } else if (rgbEffect === 'colorCycle') {
                   effectClassName += " animate-color-cycle";
                   style.color = '#ff0000'; // start with red to cycle through spectrum
                   style.textShadow = `0 0 10px #ff0000, 0 0 30px #ff0000, 0 0 60px rgba(255,0,0,0.6)`;
                   style.animationDelay = `${index * 0.15}s`;
                   bulbStyle.backgroundColor = '#ff0000';
                   bulbStyle.boxShadow = `0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px rgba(255,0,0,0.8)`;
                   bulbStyle.animationDelay = `${index * 0.15}s`;
                 }
              }
              
              return (
                <motion.div
                  key={index}
                  className={`flex flex-col items-center relative ${effectClassName}`}
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: isInitiallyLit ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  {/* Bulb */}
                  <div
                    className="w-4 h-5 sm:w-5 sm:h-6 rounded-b-full relative mb-2"
                    style={bulbStyle}
                  >
                    {/* Bulb cap */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-gray-600 rounded-t-sm" />
                  </div>

                  {/* Letter */}
                  <span className="text-3xl sm:text-5xl md:text-6xl font-display tracking-widest" style={style}>
                    {letter}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Entry Button */}
          <button 
            onClick={handleEnter}
            className="relative z-10 px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-[#e50914]/40 text-[#e50914] font-retro text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase rounded cursor-pointer transition-all duration-500 hover:border-[#e50914] hover:text-[#ff4d4d] hover:bg-[#e50914]/10 hover:shadow-[0_0_20px_rgba(229,9,20,0.5),inset_0_0_10px_rgba(229,9,20,0.2)] group overflow-hidden"
          >
            <span className="relative z-10">Ready to enter the Upside Down World...</span>
          </button>

          <style>{`
            @keyframes pulse-breathing {
              0%, 100% { opacity: 0.3; filter: brightness(0.6); text-shadow: 0 0 5px currentColor; }
              50% { opacity: 1; filter: brightness(1.2); }
            }
            .animate-pulse-breathing {
              animation: pulse-breathing 3s ease-in-out infinite;
            }

            @keyframes strobing {
              0%, 10% { opacity: 1; filter: brightness(1.2); }
              11%, 14% { opacity: 0.1; filter: brightness(0.2); }
              15%, 25% { opacity: 1; filter: brightness(1.2); }
              26%, 29% { opacity: 0.2; filter: brightness(0.3); }
              30%, 35% { opacity: 1; filter: brightness(1.2); }
              36%, 39% { opacity: 0; filter: brightness(0); }
              40%, 100% { opacity: 1; filter: brightness(1.2); }
            }
            .animate-strobing {
              animation: strobing 0.7s infinite;
            }

            @keyframes colorCycle {
              0% { filter: hue-rotate(0deg); }
              100% { filter: hue-rotate(360deg); }
            }
            .animate-color-cycle {
              animation: colorCycle 4s linear infinite;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
