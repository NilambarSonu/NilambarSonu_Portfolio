import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; angle: number }>>([]);
  const [isMobile, setIsMobile] = useState(false);
  const particleIdRef = useRef(0);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Create burst particles in all directions
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        angle: (i / 8) * Math.PI * 2,
      }));
      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
      }, 800);
    };

    const checkHover = () => {
      const hoverable = document.querySelectorAll("button, a, input, textarea, [role='button']");
      let isOverHoverable = false;

      hoverable.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (
          position.x >= rect.left &&
          position.x <= rect.right &&
          position.y >= rect.top &&
          position.y <= rect.bottom
        ) {
          isOverHoverable = true;
        }
      });

      setIsHovering(isOverHoverable);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", checkHover);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", checkHover);
    };
  }, [isMobile, position.x, position.y]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor — red glowing orb (Eleven's powers) */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Outer glow */}
        <div
          className={`rounded-full transition-all duration-300 ${
            isHovering ? "w-16 h-16" : "w-8 h-8"
          }`}
          style={{
            background: isHovering
              ? "radial-gradient(circle, rgba(229,9,20,0.4) 0%, rgba(229,9,20,0.1) 50%, transparent 70%)"
              : "radial-gradient(circle, rgba(229,9,20,0.3) 0%, rgba(229,9,20,0.05) 50%, transparent 70%)",
          }}
        />
        {/* Inner dot */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-st-red transition-all duration-200 ${
            isHovering ? "w-3 h-3" : "w-1.5 h-1.5"
          }`}
          style={{
            boxShadow: "0 0 6px rgba(229,9,20,0.8), 0 0 12px rgba(229,9,20,0.4)",
          }}
        />
      </div>

      {/* Click burst particles — blood red */}
      {particles.map((particle) => {
        const distance = 40;
        const endX = Math.cos(particle.angle) * distance;
        const endY = Math.sin(particle.angle) * distance;

        return (
          <div
            key={particle.id}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              animation: `particleBurstST 0.8s ease-out forwards`,
              ["--burst-x" as any]: `${endX}px`,
              ["--burst-y" as any]: `${endY}px`,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full bg-st-red"
              style={{
                boxShadow: "0 0 6px rgba(229,9,20,0.8), 0 0 12px rgba(229,9,20,0.4)",
              }}
            />
          </div>
        );
      })}

      <style>{`
        @keyframes particleBurstST {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + var(--burst-x, 30px)),
              calc(-50% + var(--burst-y, -30px))
            ) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
