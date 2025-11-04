import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
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
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
      }));
      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
      }, 1000);
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
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className={`rounded-full bg-primary transition-all duration-200 ${
            isHovering ? "w-12 h-12" : "w-6 h-6"
          }`}
          style={{
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.6)",
          }}
        />
      </div>

      {particles.map((particle, index) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            animation: `particleBurst 1s ease-out forwards`,
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <div
            className="w-2 h-2 rounded-full bg-primary"
            style={{
              boxShadow: "0 0 10px rgba(0, 255, 255, 0.8)",
            }}
          />
        </div>
      ))}

      <style>{`
        @keyframes particleBurst {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + ${Math.random() * 100 - 50}px),
              calc(-50% + ${Math.random() * 100 - 50}px)
            ) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
