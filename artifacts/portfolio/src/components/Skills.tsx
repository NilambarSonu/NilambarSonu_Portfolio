import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Planet {
  id: string;
  label: string;
  line2: string;
  fullLabel: string;
  orbitFrac: number;   // fraction of maxOrbitR
  baseAngle: number;
  speed: number;       // angular speed multiplier
  radius: number;      // base px radius at scale=1
  color: string;
  highlight: string;
  shadow: string;
  glowRgba: string;
  hasRing?: boolean;
  ringColor?: string;
  tech: string[];
  projects: string[];
  extra?: string;
}

interface PlanetPos { id: string; x: number; y: number; z: number; r: number; }

// ─── Data ────────────────────────────────────────────────────────────────────
const TAU = Math.PI * 2;
const TILT      = 0.34;   // y-foreshortening (≈ 20° tilt from top-down)
const Z_FACTOR  = 0.94;   // depth factor
const BASE_SPD  = 0.000032; // rad/ms base

const PLANETS: Planet[] = [
  {
    id: "design",
    label: "Product", line2: "Design",
    fullLabel: "Product Design",
    orbitFrac: 0.22, baseAngle: Math.PI * 0.15, speed: 1.9, radius: 12,
    color: "#C040E0", highlight: "#ECA0FF", shadow: "#480070", glowRgba: "rgba(180,40,220,0.50)",
    tech: ["Figma", "Wireframing", "Prototyping", "Responsive Design"],
    projects: ["NGO Platform Design", "Saathi AI", "Kalinga Trails"],
  },
  {
    id: "fullstack",
    label: "Full Stack", line2: "Dev",
    fullLabel: "Full Stack Development",
    orbitFrac: 0.36, baseAngle: Math.PI * 1.1, speed: 1.2, radius: 17,
    color: "#5A28CC", highlight: "#A078FF", shadow: "#14006A", glowRgba: "rgba(85,40,200,0.50)",
    tech: ["React", "TypeScript", "Vite", "Node.js", "Express", "PostgreSQL", "Supabase"],
    projects: ["Saathi AI", "SpendLens", "Task Manager", "Portfolio V2"],
  },
  {
    id: "iot",
    label: "IoT", line2: "Systems",
    fullLabel: "IoT Systems",
    orbitFrac: 0.50, baseAngle: Math.PI * 0.65, speed: 0.80, radius: 14,
    color: "#18A048", highlight: "#55E880", shadow: "#003818", glowRgba: "rgba(24,158,72,0.48)",
    tech: ["ESP32", "Arduino", "Sensor Integration", "Edge Computing"],
    projects: ["AGNI Scanner", "Mitti-AI Hardware"],
  },
  {
    id: "ai",
    label: "AI", line2: "Engineering",
    fullLabel: "AI Engineering",
    orbitFrac: 0.63, baseAngle: -Math.PI / 2, speed: 0.58, radius: 22,
    color: "#0090C8", highlight: "#55D8FF", shadow: "#00263A", glowRgba: "rgba(0,158,210,0.50)",
    tech: ["Machine Learning", "NLP", "TensorFlow", "PyTorch", "Neural Networks", "Model Optimization"],
    projects: ["Megha AI Engine", "AI Career Architect", "LectureSnap"],
  },
  {
    id: "data",
    label: "Data", line2: "Science",
    fullLabel: "Data Science",
    orbitFrac: 0.76, baseAngle: Math.PI * 0.30, speed: 0.42, radius: 18,
    color: "#D85000", highlight: "#FFA040", shadow: "#4A1000", glowRgba: "rgba(210,80,0,0.48)",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Data Visualization", "Statistical Analysis"],
    projects: ["Smart Data Analyst"],
    extra: "Experience: Bluestock Data Analyst Intern",
  },
  {
    id: "startup",
    label: "Startup", line2: "Building",
    fullLabel: "Startup Building",
    orbitFrac: 0.92, baseAngle: Math.PI * 0.82, speed: 0.27, radius: 23,
    color: "#C09000", highlight: "#FFD840", shadow: "#3A2A00", glowRgba: "rgba(190,140,0,0.50)",
    hasRing: true, ringColor: "#C09000",
    tech: [],
    projects: [],
    extra: "Founder of Mitti-AI · ₹6,00,000 Startup Competition Winner · 72+ Teams Defeated · State, University & College Champion.",
  },
];

// ─── Star data (seeded, stable) ───────────────────────────────────────────────
interface Star { x: number; y: number; r: number; phase: number; speed: number; }
function makeStars(count: number): Star[] {
  let s = 99991;
  const rn = () => { s = (s * 16807 + 7) % 2147483647; return (s - 1) / 2147483646; };
  return Array.from({ length: count }, () => ({
    x: rn(), y: rn(),
    r: rn() < 0.08 ? 2.4 : rn() < 0.28 ? 1.4 : 0.85,
    phase: rn() * TAU,
    speed: 0.6 + rn() * 2.2,
  }));
}
const STARS = makeStars(280);

// ─── Component ────────────────────────────────────────────────────────────────
export default function Skills() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef(0);
  const startRef     = useRef(performance.now());
  const posRef       = useRef<PlanetPos[]>([]);
  const hovIdRef     = useRef<string | null>(null);   // mirror of hovered for canvas

  const [hovered, setHovered] = useState<string | null>(null);
  const [panel,   setPanel]   = useState<{ id: string; x: number; y: number } | null>(null);
  const hoveredPlanet = PLANETS.find(p => p.id === hovered) ?? null;

  // Keep ref in sync
  useEffect(() => { hovIdRef.current = hovered; }, [hovered]);

  // ── Canvas loop ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, cx = 0, cy = 0, maxR = 0, sunR = 0;

    const resize = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width  = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      cx = w / 2; cy = h / 2;
      const mobile = w < 640;
      maxR  = Math.min(w, h) * (mobile ? 0.54 : 0.48);
      sunR  = Math.max(mobile ? 23 : 22, Math.min(mobile ? 52 : 50, Math.min(w, h) * (mobile ? 0.07 : 0.058)));
    };
    resize();
    const ro = new ResizeObserver(() => { ctx.setTransform(1,0,0,1,0,0); resize(); });
    ro.observe(canvas);

    // ── Background ──
    const drawBg = (t: number) => {
      // Deep space
      const bg = ctx.createRadialGradient(cx, cy * 0.7, 0, cx, cy, Math.max(w, h) * 0.9);
      bg.addColorStop(0,   "#0C1E36");
      bg.addColorStop(0.5, "#060E1A");
      bg.addColorStop(1,   "#020508");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);

      // Nebula wisps
      const n1 = ctx.createRadialGradient(w * 0.75, h * 0.3, 0, w * 0.75, h * 0.3, w * 0.38);
      n1.addColorStop(0, "rgba(55,0,110,0.10)"); n1.addColorStop(1, "transparent");
      ctx.fillStyle = n1; ctx.fillRect(0, 0, w, h);

      const n2 = ctx.createRadialGradient(w * 0.22, h * 0.72, 0, w * 0.22, h * 0.72, w * 0.32);
      n2.addColorStop(0, "rgba(0,40,100,0.12)"); n2.addColorStop(1, "transparent");
      ctx.fillStyle = n2; ctx.fillRect(0, 0, w, h);
    };

    // ── Stars ──
    const drawStars = (t: number) => {
      for (const s of STARS) {
        const twinkle = 0.65 + 0.35 * Math.sin(t * s.speed + s.phase);
        const alpha   = (0.30 + 0.55 * twinkle);
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r * twinkle, 0, TAU);
        ctx.fillStyle = `rgba(200,220,255,${alpha})`;
        ctx.fill();
      }
    };

    // ── Orbit ellipse ──
    const drawOrbit = (orbitR: number) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, orbitR, orbitR * TILT, 0, 0, TAU);
      ctx.setLineDash([4, 16]);
      ctx.strokeStyle = "rgba(100,160,255,0.07)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // ── Sun ──
    const drawSun = (t: number) => {
      // Rays
      const nRays = 14;
      for (let i = 0; i < nRays; i++) {
        const angle  = (i / nRays) * TAU + t * 0.25;
        const len    = sunR * (1.5 + 0.35 * Math.sin(t * 1.4 + i * 0.8));
        const thick  = sunR * (0.09 + 0.05 * Math.sin(t * 0.9 + i));
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        const rg = ctx.createLinearGradient(sunR * 0.85, 0, sunR + len, 0);
        rg.addColorStop(0, "rgba(255,200,55,0.28)");
        rg.addColorStop(1, "rgba(255,140,10,0)");
        ctx.beginPath();
        ctx.moveTo(sunR * 0.85, -thick);
        ctx.lineTo(sunR + len, 0);
        ctx.lineTo(sunR * 0.85,  thick);
        ctx.fillStyle = rg;
        ctx.fill();
        ctx.restore();
      }
      // Corona halos
      const halos: [number, string][] = [
        [sunR * 3.8, "rgba(255,130,0,0.055)"],
        [sunR * 2.6, "rgba(255,175,40,0.095)"],
        [sunR * 1.8, "rgba(255,220,80,0.13)"],
      ];
      for (const [r, col] of halos) {
        const pulse = 1 + 0.07 * Math.sin(t * 1.15);
        const gr = ctx.createRadialGradient(cx, cy, sunR * 0.7, cx, cy, r * pulse);
        gr.addColorStop(0, col); gr.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(cx, cy, r * pulse, 0, TAU);
        ctx.fillStyle = gr; ctx.fill();
      }
      // Sphere body — lit upper-left
      const sg = ctx.createRadialGradient(cx - sunR * 0.28, cy - sunR * 0.26, sunR * 0.04, cx, cy, sunR);
      sg.addColorStop(0,    "#FFFDE4");
      sg.addColorStop(0.18, "#FFE55A");
      sg.addColorStop(0.48, "#FFA800");
      sg.addColorStop(0.78, "#FF5000");
      sg.addColorStop(1,    "#CC1800");
      ctx.beginPath(); ctx.arc(cx, cy, sunR, 0, TAU);
      ctx.fillStyle = sg; ctx.fill();
      // Specular
      const sp = ctx.createRadialGradient(cx - sunR * 0.3, cy - sunR * 0.28, 0, cx - sunR * 0.3, cy - sunR * 0.28, sunR * 0.42);
      sp.addColorStop(0, "rgba(255,255,230,0.55)"); sp.addColorStop(1, "rgba(255,255,230,0)");
      ctx.beginPath(); ctx.arc(cx, cy, sunR, 0, TAU);
      ctx.fillStyle = sp; ctx.fill();
    };

    // ── Planet sphere ──
    const drawPlanet = (p: Planet, px: number, py: number, scale: number, isHov: boolean) => {
      const r = p.radius * scale * (isHov ? 1.18 : 1);

      // Atmosphere glow
      const gr = r * (isHov ? 3.4 : 2.7);
      const glow = ctx.createRadialGradient(px, py, r * 0.4, px, py, gr);
      glow.addColorStop(0, p.glowRgba); glow.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(px, py, gr, 0, TAU);
      ctx.fillStyle = glow; ctx.fill();

      // Ring — back half
      if (p.hasRing) {
        ctx.save();
        ctx.translate(px, py);
        ctx.scale(1, TILT * 0.52);
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 2.1, r * 2.1, 0, Math.PI, TAU);
        ctx.strokeStyle = (p.ringColor ?? "#C09000") + "66";
        ctx.lineWidth = r * 0.48;
        ctx.stroke();
        ctx.restore();
      }

      // Sphere
      const sg = ctx.createRadialGradient(px - r * 0.32, py - r * 0.28, r * 0.04, px, py, r);
      sg.addColorStop(0,    p.highlight);
      sg.addColorStop(0.30, p.color);
      sg.addColorStop(0.78, p.shadow);
      sg.addColorStop(1,    "#010306");
      ctx.beginPath(); ctx.arc(px, py, r, 0, TAU);
      ctx.fillStyle = sg; ctx.fill();

      // Specular highlight
      const sh = ctx.createRadialGradient(px - r * 0.3, py - r * 0.26, 0, px - r * 0.3, py - r * 0.26, r * 0.40);
      sh.addColorStop(0, "rgba(255,255,255,0.38)"); sh.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath(); ctx.arc(px, py, r, 0, TAU);
      ctx.fillStyle = sh; ctx.fill();

      // Ring — front half
      if (p.hasRing) {
        ctx.save();
        ctx.translate(px, py);
        ctx.scale(1, TILT * 0.52);
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 2.1, r * 2.1, 0, 0, Math.PI);
        ctx.strokeStyle = (p.ringColor ?? "#C09000") + "99";
        ctx.lineWidth = r * 0.48;
        ctx.stroke();
        ctx.restore();
      }

      // Label
      const fs  = Math.max(9, Math.round(11 * scale));
      const lx  = px;
      const ly  = py + r + (isHov ? 18 : 14) * scale;
      ctx.save();
      ctx.textAlign    = "center";
      ctx.textBaseline = "top";
      ctx.font = `${isHov ? 600 : 400} ${fs}px "Inter",sans-serif`;
      ctx.fillStyle = isHov ? p.color : `rgba(210,230,255,${0.72 + (isHov ? 0.28 : 0)})`;
      ctx.fillText(p.label, lx, ly);
      if (p.line2) ctx.fillText(p.line2, lx, ly + fs * 1.25);
      ctx.restore();
    };

    // ── Main frame ──
    const frame = () => {
      const elapsed = performance.now() - startRef.current;
      const t = elapsed * 0.001; // seconds

      ctx.clearRect(0, 0, w, h);
      drawBg(t);
      drawStars(t);

      // Compute positions
      const positions: PlanetPos[] = PLANETS.map(p => {
        const angle  = p.baseAngle + elapsed * BASE_SPD * p.speed;
        const orbitR = p.orbitFrac * maxR;
        const px = cx + orbitR * Math.cos(angle);
        const py = cy + orbitR * Math.sin(angle) * TILT;
        const z  = orbitR * Math.sin(angle) * Z_FACTOR;
        return { id: p.id, x: px, y: py, z, r: p.radius };
      });
      posRef.current = positions;

      // Orbit ellipses
      PLANETS.forEach(p => drawOrbit(p.orbitFrac * maxR));

      // Sort by z ascending (farthest first)
      const sorted = [...positions].sort((a, b) => a.z - b.z);
      const behind = sorted.filter(pos => pos.z < 0);
      const front  = sorted.filter(pos => pos.z >= 0);

      // Planets behind sun
      for (const pos of behind) {
        const p = PLANETS.find(pl => pl.id === pos.id)!;
        const scale = 0.82 + 0.36 * ((pos.z + maxR) / (2 * maxR));
        drawPlanet(p, pos.x, pos.y, scale, hovIdRef.current === pos.id);
      }

      // Sun
      drawSun(t);

      // Planets in front of sun
      for (const pos of front) {
        const p = PLANETS.find(pl => pl.id === pos.id)!;
        const scale = 0.82 + 0.36 * ((pos.z + maxR) / (2 * maxR));
        drawPlanet(p, pos.x, pos.y, scale, hovIdRef.current === pos.id);
      }

      rafRef.current = requestAnimationFrame(frame);
    };
    frame();

    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []); // empty deps — hovered accessed via ref

  // ── Mouse hover ─────────────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let best: PlanetPos | null = null;
    let bestDist = Infinity;
    for (const pos of posRef.current) {
      const dist = Math.hypot(mx - pos.x, my - pos.y);
      const threshold = pos.r * 2.2 + 12;
      if (dist < threshold && dist < bestDist) { best = pos; bestDist = dist; }
    }

    if (best) {
      setHovered(best.id);
      setPanel({ id: best.id, x: best.x, y: best.y });
    } else {
      setHovered(null);
      setPanel(null);
    }
  }, []);

  const handleMouseLeave = useCallback(() => { setHovered(null); setPanel(null); }, []);

  // Panel position: flip to left side if planet is on right half
  const panelStyle = (px: number): React.CSSProperties => {
    const cw = canvasRef.current?.offsetWidth ?? 800;
    return px > cw / 2
      ? { transform: "translateX(calc(-100% - 18px)) translateY(-50%)" }
      : { transform: "translateX(18px) translateY(-50%)" };
  };

  return (
    <section
      id="skills"
      style={{ position: "relative", width: "100%", minHeight: "100vh", background: "#020508", overflow: "hidden" }}
      aria-labelledby="skills-title"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", cursor: hovered ? "pointer" : "default" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-hidden="true"
      />

      {/* Section title */}
      <div style={{
        position: "absolute", top: "clamp(2.2rem,5vh,3.8rem)",
        left: 0, right: 0, textAlign: "center",
        zIndex: 10, pointerEvents: "none",
      }}>
        <h2
          id="skills-title"
          style={{
            margin: 0,
            fontFamily: "Amiko, Inter, sans-serif",
            fontSize: "clamp(2.2rem,4.2vw,5rem)",
            fontWeight: 400,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(0,157,223,0.13)",
            WebkitTextStroke: "1px rgba(0,127,255,0.78)",
            textShadow: "0 0 30px rgba(0,127,255,0.22)",
          }}
        >
          Skills
        </h2>
        <p style={{
          margin: "0.45rem 0 0",
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(0.7rem,1.1vw,0.9rem)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(150,195,255,0.40)",
        }}>
          Core systems I build with · Hover a planet
        </p>
      </div>

      {/* Hover panel */}
      <AnimatePresence mode="wait">
        {panel && hoveredPlanet && (
          <motion.div
            key={panel.id}
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: panel.y,
              left: panel.x,
              ...panelStyle(panel.x),
              zIndex: 60,
              minWidth: 255,
              maxWidth: 305,
              background: "rgba(5,10,22,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: `1px solid ${hoveredPlanet.color}32`,
              borderRadius: 16,
              padding: "18px 20px",
              boxShadow: `0 22px 60px rgba(0,0,0,0.65), 0 0 0 1px ${hoveredPlanet.color}0C, inset 0 1px 0 rgba(255,255,255,0.04)`,
              pointerEvents: "none",
            }}
          >
            {/* Accent bar */}
            <div style={{
              position: "absolute", top: 0, left: 20, right: 20, height: 2,
              borderRadius: "0 0 4px 4px",
              background: `linear-gradient(90deg, transparent, ${hoveredPlanet.color}, transparent)`,
              opacity: 0.6,
            }} />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 13 }}>
              <div style={{
                width: 9, height: 9, borderRadius: "50%",
                background: hoveredPlanet.color,
                boxShadow: `0 0 12px ${hoveredPlanet.color}`,
              }} />
              <h3 style={{
                margin: 0,
                fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14,
                color: hoveredPlanet.color, letterSpacing: "0.02em",
              }}>
                {hoveredPlanet.fullLabel}
              </h3>
            </div>

            {hoveredPlanet.tech.length > 0 && (
              <div style={{ marginBottom: 13 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,247,250,0.28)", marginBottom: 7 }}>
                  Technologies
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {hoveredPlanet.tech.map(t => (
                    <span key={t} style={{
                      background: `${hoveredPlanet.color}12`,
                      border: `1px solid ${hoveredPlanet.color}28`,
                      borderRadius: 4, padding: "2px 8px",
                      fontSize: 10, fontWeight: 500, color: "rgba(245,247,250,0.82)",
                      fontFamily: "Inter, sans-serif",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {hoveredPlanet.projects.length > 0 && (
              <div style={{ marginBottom: hoveredPlanet.extra ? 12 : 0 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,247,250,0.28)", marginBottom: 7 }}>
                  Projects
                </div>
                {hoveredPlanet.projects.map(proj => (
                  <div key={proj} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: hoveredPlanet.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "rgba(245,247,250,0.72)", fontFamily: "Inter, sans-serif" }}>{proj}</span>
                  </div>
                ))}
              </div>
            )}

            {hoveredPlanet.extra && (
              <div style={{
                borderTop: hoveredPlanet.projects.length > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                paddingTop: hoveredPlanet.projects.length > 0 ? 10 : 0,
                fontSize: 11, color: "rgba(245,247,250,0.52)", lineHeight: 1.65,
                fontFamily: "Inter, sans-serif",
              }}>
                {hoveredPlanet.extra}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile fallback pill list */}
      <div style={{
        position: "absolute", bottom: "1.5rem",
        left: 0, right: 0,
        display: "flex", flexWrap: "wrap",
        justifyContent: "center", gap: "0.5rem",
        padding: "0 1rem", zIndex: 10,
        pointerEvents: "none",
      }}>
        {PLANETS.map(p => (
          <span
            key={p.id}
            style={{
              padding: "3px 11px",
              borderRadius: 999,
              border: `1px solid ${p.color}38`,
              background: `${p.color}12`,
              color: "rgba(210,230,255,0.72)",
              fontSize: 11,
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            {p.fullLabel}
          </span>
        ))}
      </div>
    </section>
  );
}
