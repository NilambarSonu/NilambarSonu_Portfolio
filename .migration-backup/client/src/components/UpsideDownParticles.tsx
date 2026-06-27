import { useEffect, useRef } from "react";

/**
 * UpsideDownParticles — Full-screen floating particles (ash, embers, spores)
 * inspired by the Upside Down atmosphere from Stranger Things.
 * Uses Canvas for performance.
 */
export default function UpsideDownParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();

    // Resize on scroll height changes
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(document.documentElement);
    window.addEventListener("resize", resize);

    // Particle configuration
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 60;

    const colors = [
      "rgba(229, 9, 20,",    // Red
      "rgba(212, 160, 23,",   // Amber
      "rgba(139, 0, 0,",      // Dark red
      "rgba(26, 107, 107,",   // Teal
      "rgba(200, 80, 40,",    // Ember orange
    ];

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1,
      size: Math.random() * 3 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 500 + 300,
    });

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife; // stagger
      particles.push(p);
    }

    let animationFrameId: number;
    let scrollY = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.01) * 0.2;
        p.y += p.vy;

        // Fade in and out
        const lifeRatio = p.life / p.maxLife;
        let alpha = p.opacity;
        if (lifeRatio < 0.1) alpha *= lifeRatio * 10;
        if (lifeRatio > 0.8) alpha *= (1 - lifeRatio) * 5;

        // Only draw particles near viewport for performance
        const viewTop = scrollY - 100;
        const viewBottom = scrollY + window.innerHeight + 100;
        if (p.y >= viewTop && p.y <= viewBottom) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${alpha})`;
          ctx.fill();

          // Subtle glow
          if (p.size > 1.5) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `${p.color}${alpha * 0.15})`;
            ctx.fill();
          }
        }

        // Reset dead particles
        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          const newP = createParticle();
          newP.y = scrollY + window.innerHeight + Math.random() * 100;
          particles[i] = newP;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}
