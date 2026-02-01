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

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      // Create more varied color palette: cyan, blue, purple, magenta, green
      const colorOptions = [
        Math.random() * 30 + 180, // cyan-blue range
        Math.random() * 40 + 260, // purple-magenta range
        Math.random() * 30 + 100, // green range
        Math.random() * 20 + 300, // magenta-pink range
      ];
      const hue = colorOptions[Math.floor(Math.random() * colorOptions.length)];

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.2,
        hue: hue,
      });
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.fillStyle = "rgba(10, 8, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.opacity})`;
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(${p.hue}, 100%, 60%, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
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
    <section className="relative h-screen w-full overflow-hidden bg-background" id="home">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-[1]" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            className="relative mb-8 inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-green-400/30 blur-2xl animate-pulse" />
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-400/80 shadow-[0_0_40px_rgba(0,255,255,0.4),0_0_80px_rgba(168,85,247,0.2),0_0_120px_rgba(34,197,94,0.1)]">
              <img
                src={profilePlaceholder}
                alt="Nilambar Behera"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent animate-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Nilambar Behera
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-2 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            BCA Student | Founder of Mitti-AI | Building AI Systems for Real-World Impact
          </motion.p>

          <motion.p
            className="text-sm md:text-base text-muted-foreground/80 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Odisha, India
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl rounded-lg" />
            <Button
              size="lg"
              asChild
              className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] hover:scale-105 transition-all duration-300 border-0 text-lg px-8 py-4 h-14"
            >
              <a href="https://saathiai.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <span className="mr-3 text-2xl">🚀</span>
                <span className="font-bold">Saathi AI</span>
                <span className="mx-3 text-green-200">–</span>
                <span className="text-base opacity-95">AI for Agriculture</span>
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={handleViewProjects}
              data-testid="button-view-projects"
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:scale-105 transition-all duration-300 border-0"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleDownload}
              data-testid="button-download-resume"
              className="group relative overflow-hidden border-2 border-cyan-400/60 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="relative flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </span>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    </section>
  );
}