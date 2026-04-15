import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown } from "lucide-react";
import profilePlaceholder from "@assets/generated_images/Profile_photo_placeholder_dfc6967d.png";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Nilambar_Behera_Resume.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Upside Down particle canvas — embers, ash, spores
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    interface HeroParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      drift: number;
    }

    const particles: HeroParticle[] = [];

    for (let i = 0; i < 80; i++) {
      const colorPool = [
        `rgba(229, 9, 20,`,     // ST red
        `rgba(139, 0, 0,`,      // dark red
        `rgba(212, 160, 23,`,   // amber
        `rgba(200, 80, 40,`,    // ember
        `rgba(255, 100, 50,`,   // bright ember
      ];

      particles.push({
        x: Math.random() * (canvas?.width || 1920),
        y: Math.random() * (canvas?.height || 1080),
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: colorPool[Math.floor(Math.random() * colorPool.length)],
        drift: Math.random() * 0.02,
      });
    }

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time++;
      ctx.fillStyle = "rgba(10, 8, 8, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time * p.drift) * 0.3;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Main particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();

        // Glow
        if (p.size > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity * 0.1})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleViewProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]" id="home">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />

      {/* Red fog overlay */}
      <div className="absolute inset-0 z-[1] st-fog" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] z-[2]" />

      {/* Vignette */}
      <div 
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          {/* Profile photo with red glow portal effect */}
          <motion.div
            className="relative mb-8 inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-st-red/30 via-st-dark-red/20 to-st-amber/20 blur-3xl animate-pulse" />
            <div className="absolute inset-[-4px] rounded-full animate-st-glow" />
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-[3px] border-st-red/70 shadow-[0_0_30px_rgba(229,9,20,0.5),0_0_60px_rgba(229,9,20,0.2)]">
              <img
                src={profilePlaceholder}
                alt="Nilambar Behera"
                className="w-full h-full object-cover"
              />
              {/* Subtle red overlay on photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-st-red/10 to-transparent" />
            </div>
          </motion.div>

          {/* Stranger Things title animation */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4 text-st-red tracking-[0.1em] sm:tracking-[0.15em] uppercase"
            initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(10px)" }}
            animate={{ opacity: 1, letterSpacing: "0.15em", filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
            style={{
              textShadow: "0 0 10px rgba(229,9,20,0.6), 0 0 30px rgba(229,9,20,0.3), 0 0 60px rgba(229,9,20,0.15)",
            }}
          >
            Nilambar
          </motion.h1>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6 text-st-red/80 tracking-[0.2em] sm:tracking-[0.3em] uppercase"
            initial={{ opacity: 0, letterSpacing: "0.8em", filter: "blur(8px)" }}
            animate={{ opacity: 1, letterSpacing: "0.3em", filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
            style={{
              textShadow: "0 0 8px rgba(229,9,20,0.4), 0 0 20px rgba(229,9,20,0.2)",
            }}
          >
            Behera
          </motion.h2>

          {/* Tagline in retro font */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-st-amber/80 mb-2 font-retro tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            BCA Student · Founder of Mitti-AI · Building AI Systems for Real-World Impact
          </motion.p>

          <motion.p
            className="text-xs sm:text-sm text-muted-foreground/60 mb-8 font-retro tracking-[0.2em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            📍 Odisha, India — The Upside Down of Innovation
          </motion.p>

          {/* Saathi AI CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-st-red/20 to-st-dark-red/20 blur-xl rounded-lg" />
            <Button
              size="lg"
              asChild
              className="group relative overflow-hidden bg-gradient-to-r from-st-red to-st-dark-red text-white hover:shadow-[0_0_30px_rgba(229,9,20,0.7)] hover:scale-105 transition-all duration-300 border border-st-red/50 text-lg px-8 py-4 h-14"
            >
              <a href="https://saathiai.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <span className="mr-3 text-2xl">🚀</span>
                <span className="font-bold font-retro">Saathi AI</span>
                <span className="mx-3 text-st-amber/60">–</span>
                <span className="text-base opacity-90">AI for Agriculture</span>
              </a>
            </Button>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={handleViewProjects}
              data-testid="button-view-projects"
              className="group relative overflow-hidden bg-st-red/20 text-st-red border border-st-red/40 hover:bg-st-red hover:text-white hover:shadow-[0_0_25px_rgba(229,9,20,0.6)] hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 font-retro tracking-wide">View Projects</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleDownload}
              data-testid="button-download-resume"
              className="group relative overflow-hidden border-2 border-st-amber/40 text-st-amber/80 hover:bg-st-amber/10 hover:border-st-amber hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="relative flex items-center font-retro tracking-wide">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <ChevronDown className="w-8 h-8 text-st-red/60" />
        </motion.div>
      </div>
    </section>
  );
}