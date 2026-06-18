import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
interface OrbitNode {
  id: string;
  label: string[];        // Multi-line for SVG text
  fullLabel: string;      // For panel heading
  baseAngle: number;      // Starting angle in radians
  color: string;
  tech: string[];
  projects: string[];
  extra?: string;
}

const TAU = Math.PI * 2;
const STEP = TAU / 6;

const NODES: OrbitNode[] = [
  {
    id: "ai",
    label: ["AI", "Engineering"],
    fullLabel: "AI Engineering",
    baseAngle: -Math.PI / 2,                  // top
    color: "#00BFFF",
    tech: ["Machine Learning", "NLP", "TensorFlow", "PyTorch", "Neural Networks", "Model Optimization"],
    projects: ["Megha AI Engine", "AI Career Architect", "LectureSnap"],
  },
  {
    id: "fullstack",
    label: ["Full Stack", "Development"],
    fullLabel: "Full Stack Development",
    baseAngle: -Math.PI / 2 + STEP,
    color: "#4F8CFF",
    tech: ["React", "TypeScript", "Vite", "Node.js", "Express", "REST APIs", "PostgreSQL", "Supabase"],
    projects: ["Saathi AI", "SpendLens", "Task Manager", "Portfolio V2"],
  },
  {
    id: "data",
    label: ["Data", "Science"],
    fullLabel: "Data Science",
    baseAngle: -Math.PI / 2 + STEP * 2,
    color: "#00BFFF",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Data Visualization", "Statistical Analysis"],
    projects: ["Smart Data Analyst"],
    extra: "Experience: Bluestock Data Analyst Intern",
  },
  {
    id: "iot",
    label: ["IoT", "Systems"],
    fullLabel: "IoT Systems",
    baseAngle: -Math.PI / 2 + STEP * 3,       // bottom
    color: "#4F8CFF",
    tech: ["ESP32", "Arduino", "Sensor Integration", "Edge Computing"],
    projects: ["AGNI Scanner", "Mitti-AI Hardware"],
  },
  {
    id: "design",
    label: ["Product", "Design"],
    fullLabel: "Product Design",
    baseAngle: -Math.PI / 2 + STEP * 4,
    color: "#00BFFF",
    tech: ["Figma", "Wireframing", "Prototyping", "Responsive Design"],
    projects: ["NGO Platform Design", "Saathi AI", "Kalinga Trails"],
  },
  {
    id: "startup",
    label: ["Startup", "Building"],
    fullLabel: "Startup Building",
    baseAngle: -Math.PI / 2 + STEP * 5,
    color: "#4F8CFF",
    tech: [],
    projects: [],
    extra: "Founder of Mitti-AI · ₹6,00,000 Startup Competition Winner · 72+ Teams Defeated · State, University & College Champion.",
  },
];

// ─────────────────────────────────────────────
// Background constellation canvas (preserved from before)
// ─────────────────────────────────────────────
interface BgDot {
  x: number; y: number; r: number; glow: number;
}
interface BgLine { from: number; to: number; }

function buildBackground(w: number, h: number): { dots: BgDot[]; lines: BgLine[] } {
  let seed = 42;
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const dots: BgDot[] = Array.from({ length: 50 }, () => ({
    x: rand() * w, y: rand() * h,
    r: rand() < 0.25 ? 3.2 : rand() < 0.5 ? 2.2 : 1.6,
    glow: rand(),
  }));
  const maxDist = Math.min(w, h) * 0.26;
  const lines: BgLine[] = [];
  for (let i = 0; i < dots.length; i++)
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
      if (Math.hypot(dx, dy) < maxDist) lines.push({ from: i, to: j });
    }
  return { dots, lines };
}

// ─────────────────────────────────────────────
// Hover panel position helper
// ─────────────────────────────────────────────
function panelStyle(nx: number, ny: number, cx: number, cy: number): React.CSSProperties {
  const isRight = nx > cx;
  const isBottom = ny > cy;
  return {
    position: "absolute",
    top: isBottom ? ny - 20 : ny + 20,
    left: isRight ? nx + 48 : nx - 48,
    transform: isRight
      ? (isBottom ? "translateY(-100%)" : "translateY(0%)")
      : (isBottom ? "translate(-100%, -100%)" : "translate(-100%, 0%)"),
    zIndex: 60,
    minWidth: 270,
    maxWidth: 310,
  };
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function Skills() {
  // Refs
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const svgRef        = useRef<SVGSVGElement>(null);
  const bgRaf         = useRef(0);
  const galaxyRaf     = useRef(0);
  const dimsRef       = useRef({ cx: 0, cy: 0, r: 0 });
  const nodeGrpRefs   = useRef<(SVGGElement | null)[]>(NODES.map(() => null));
  const lineRefs      = useRef<(SVGLineElement | null)[]>(NODES.map(() => null));
  const orbitRingRef  = useRef<SVGCircleElement>(null);
  const startTimeRef  = useRef(0);

  // State
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [panel, setPanel] = useState<{ id: string; x: number; y: number } | null>(null);

  // ── Background canvas ──────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    let bgData = buildBackground(0, 0);
    let t = 0;

    const resize = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w; canvas.height = h;
      bgData = buildBackground(w, h);
    };
    resize();

    const draw = () => {
      t += 0.007;
      ctx.clearRect(0, 0, w, h);

      // Radial BG
      const bg = ctx.createRadialGradient(w * 0.6, h * 0.45, 0, w * 0.6, h * 0.45, Math.max(w, h) * 0.85);
      bg.addColorStop(0, "#0D2040"); bg.addColorStop(0.45, "#071628"); bg.addColorStop(1, "#060B14");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);

      // Bottom-left vignette
      const vg = ctx.createRadialGradient(0, h, 0, 0, h, w * 0.55);
      vg.addColorStop(0, "rgba(4,8,18,0.5)"); vg.addColorStop(1, "transparent");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h);

      // Lines
      const maxD = Math.min(w, h) * 0.26;
      for (const ln of bgData.lines) {
        const a = bgData.dots[ln.from], b = bgData.dots[ln.to];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0,127,255,${(1 - dist / maxD) * 0.09})`; ctx.lineWidth = 0.5; ctx.stroke();
      }

      // Dots
      for (const d of bgData.dots) {
        const p = 0.7 + 0.3 * Math.sin(t + d.glow * Math.PI * 2);
        const gr = d.r * 6 * p;
        const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, gr);
        grd.addColorStop(0, `rgba(0,157,255,${0.25 * p})`); grd.addColorStop(1, "rgba(0,157,255,0)");
        ctx.beginPath(); ctx.arc(d.x, d.y, gr, 0, TAU); ctx.fillStyle = grd; ctx.fill();
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r * p, 0, TAU); ctx.fillStyle = `rgba(0,191,255,${0.8 * p})`; ctx.fill();
      }

      bgRaf.current = requestAnimationFrame(draw);
    };
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(bgRaf.current); ro.disconnect(); };
  }, []);

  // ── Galaxy orbit animation ──────────────────
  useEffect(() => {
    startTimeRef.current = performance.now();

    const updateDims = () => {
      const svg = svgRef.current; if (!svg) return;
      const w = svg.clientWidth, h = svg.clientHeight;
      const isMobile = w < 640;
      dimsRef.current = {
        cx: w / 2,
        cy: h / 2,
        r: Math.min(w, h) * (isMobile ? 0.33 : 0.28),
      };
    };
    updateDims();
    const ro = new ResizeObserver(updateDims);
    if (svgRef.current) ro.observe(svgRef.current);

    const SPEED = 0.000055; // radians/ms — one full orbit ≈ 19 minutes

    const animate = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const delta = elapsed * SPEED;
      const { cx, cy, r } = dimsRef.current;
      if (!cx) { galaxyRaf.current = requestAnimationFrame(animate); return; }

      // Update orbit ring
      const ring = orbitRingRef.current;
      if (ring) { ring.setAttribute("cx", String(cx)); ring.setAttribute("cy", String(cy)); ring.setAttribute("r", String(r)); }

      // Update each node
      NODES.forEach((node, i) => {
        const angle = node.baseAngle + delta;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);

        const grp = nodeGrpRefs.current[i];
        if (grp) grp.setAttribute("transform", `translate(${x.toFixed(2)},${y.toFixed(2)})`);

        const line = lineRefs.current[i];
        if (line) {
          line.setAttribute("x1", cx.toFixed(2)); line.setAttribute("y1", cy.toFixed(2));
          line.setAttribute("x2", x.toFixed(2));  line.setAttribute("y2", y.toFixed(2));
        }
      });

      galaxyRaf.current = requestAnimationFrame(animate);
    };
    animate();

    return () => { cancelAnimationFrame(galaxyRaf.current); ro.disconnect(); };
  }, []);

  // ── Hover handlers ─────────────────────────
  const handleEnter = useCallback((id: string, idx: number) => {
    setHoveredId(id);
    const { cx, cy, r } = dimsRef.current;
    const elapsed = (performance.now() - startTimeRef.current) * 0.000055;
    const angle = NODES[idx].baseAngle + elapsed;
    setPanel({ id, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredId(null);
    setPanel(null);
  }, []);

  const hoveredNode = NODES.find(n => n.id === hoveredId) ?? null;

  return (
    <section
      ref={containerRef}
      id="skills"
      className="skills-premium-section"
      style={{ position: "relative", width: "100%", minHeight: "100vh", backgroundColor: "#060B14", overflow: "hidden" }}
      aria-labelledby="skills-title"
    >
      {/* ── Background canvas ── */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        aria-hidden="true"
      />

      {/* ── Galaxy SVG ── */}
      <div className="skills-grid-layer" aria-hidden="true" />
      <div className="skills-frame-corner skills-frame-corner-left" aria-hidden="true" />
      <div className="skills-frame-corner skills-frame-corner-right" aria-hidden="true" />
      <div className="skills-title-wrap">
        <h2 id="skills-title" className="skills-heading">Skills</h2>
        <p className="skills-kicker">Core systems I build with</p>
      </div>

      <svg
        ref={svgRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 5, overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="sk-glow-sm">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="sk-glow-lg">
            <feGaussianBlur stdDeviation="10" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <radialGradient id="sk-ctr-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#00BFFF" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Orbit ring */}
        <circle ref={orbitRingRef} fill="none" stroke="rgba(0,191,255,0.06)" strokeWidth="1" strokeDasharray="3 9" />

        {/* Lines from center to nodes */}
        {NODES.map((node, i) => (
          <line
            key={`line-${node.id}`}
            ref={el => { lineRefs.current[i] = el; }}
            stroke={hoveredId === node.id ? node.color : "rgba(0,127,255,0.13)"}
            strokeWidth={hoveredId === node.id ? 1.4 : 0.7}
            filter={hoveredId === node.id ? "url(#sk-glow-sm)" : undefined}
            style={{ transition: "stroke 0.35s ease, stroke-width 0.35s ease" }}
          />
        ))}

        {/* Center pulse halo (static SVG, positioned separately via HTML) */}

        {/* Orbit nodes */}
        {NODES.map((node, i) => (
          <g
            key={node.id}
            ref={el => { nodeGrpRefs.current[i] = el; }}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => handleEnter(node.id, i)}
            onMouseLeave={handleLeave}
            role="button"
            aria-label={node.fullLabel}
            data-cursor="skill"
          >
            {/* Pulse ring — CSS animation */}
            <circle
              r={35}
              fill="none"
              stroke={node.color}
              strokeWidth="0.5"
              opacity="0.18"
              style={{
                animation: `sk-pulse 3s ease-in-out infinite`,
                animationDelay: `${i * 0.45}s`,
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            />
            {/* Outer ring */}
            <circle
              r={hoveredId === node.id ? 30 : 24}
              fill={`${node.color}0D`}
              stroke={node.color}
              strokeWidth={hoveredId === node.id ? 1.2 : 0.7}
              filter={hoveredId === node.id ? "url(#sk-glow-sm)" : undefined}
              style={{ transition: "r 0.3s ease, stroke-width 0.3s ease" }}
            />
            {/* Inner dot */}
            <circle
              r={hoveredId === node.id ? 7 : 5}
              fill={node.color}
              filter="url(#sk-glow-sm)"
              style={{ transition: "r 0.3s ease" }}
            />

            {/* Node label */}
            {node.label.map((line, j) => (
              <text
                key={j}
                x={0}
                y={40 + j * 14}
                textAnchor="middle"
                fill={hoveredId === node.id ? node.color : "rgba(245,247,250,0.84)"}
                fontSize={hoveredId === node.id ? "14" : "12.5"}
                fontFamily="Amiko, Inter, sans-serif"
                fontWeight={hoveredId === node.id ? "700" : "600"}
                letterSpacing="0"
                style={{ transition: "fill 0.3s ease, font-size 0.3s ease" }}
              >
                {line}
              </text>
            ))}
          </g>
        ))}
      </svg>

      {/* ── Center node (HTML) ── */}
      <div
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 30, textAlign: "center", pointerEvents: "none",
        }}
      >
        {/* Breathing outer glow */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", borderRadius: "50%",
            width: 280, height: 280,
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle, rgba(0,191,255,0.2) 0%, rgba(0,127,255,0.08) 38%, transparent 72%)",
            pointerEvents: "none",
          }}
        />

        {/* Main circle */}
        <motion.div
          animate={{ boxShadow: [
            "0 0 20px rgba(0,191,255,0.2), 0 0 60px rgba(0,191,255,0.06)",
            "0 0 35px rgba(0,191,255,0.35), 0 0 80px rgba(0,191,255,0.12)",
            "0 0 20px rgba(0,191,255,0.2), 0 0 60px rgba(0,191,255,0.06)",
          ]}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 172, height: 172, borderRadius: "50%",
            border: "1px solid rgba(0,191,255,0.38)",
            background: "radial-gradient(circle at 38% 28%, rgba(0,191,255,0.18) 0%, rgba(5,17,32,0.86) 48%, rgba(3,8,16,0.96) 100%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            position: "relative",
            outline: "1px solid rgba(255,255,255,0.04)",
            outlineOffset: "-12px",
          }}
        >
          {/* Inner ring */}
          <div style={{
            position: "absolute", inset: 10, borderRadius: "50%",
            border: "1px solid rgba(0,191,255,0.12)",
          }} />

          {/* Text */}
          <span style={{ fontFamily: "Amiko, Inter, sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", color: "#00BFFF", lineHeight: 1.35, textTransform: "uppercase" }}>
            Nilambar<br/>Behera
          </span>
          <div style={{ width: 28, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,191,255,0.4), transparent)", margin: "6px 0" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "9.5px", color: "rgba(245,247,250,0.58)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            10+ Projects
          </span>
        </motion.div>

        {/* Subtitle below circle */}
        <div style={{ marginTop: 14, pointerEvents: "none" }}>
          <span style={{ fontFamily: "Ancizar Serif, Georgia, serif", fontSize: "13px", color: "rgba(245,247,250,0.54)", fontWeight: 500, letterSpacing: "0.02em" }}>
            AI Engineer · Founder · Full Stack Builder
          </span>
        </div>
      </div>

      {/* ── Hover info panel ── */}
      <AnimatePresence mode="wait">
        {panel && hoveredNode && (
          <motion.div
            key={panel.id}
            initial={{ opacity: 0, scale: 0.91, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.91, y: 6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              ...panelStyle(panel.x, panel.y, dimsRef.current.cx, dimsRef.current.cy),
              background: "rgba(8, 14, 26, 0.94)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: `1px solid ${hoveredNode.color}28`,
              borderRadius: 16,
              padding: "20px 22px",
              boxShadow: `0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px ${hoveredNode.color}08, inset 0 1px 0 rgba(255,255,255,0.04)`,
            }}
            onMouseEnter={() => setHoveredId(panel.id)}
            onMouseLeave={handleLeave}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: hoveredNode.color, boxShadow: `0 0 8px ${hoveredNode.color}` }} />
              <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14, color: hoveredNode.color, letterSpacing: "0.02em", margin: 0 }}>
                {hoveredNode.fullLabel}
              </h3>
            </div>

            {/* Technologies */}
            {hoveredNode.tech.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,247,250,0.3)", marginBottom: 8 }}>
                  Technologies
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {hoveredNode.tech.map(t => (
                    <span key={t} style={{
                      background: `${hoveredNode.color}0F`,
                      border: `1px solid ${hoveredNode.color}22`,
                      borderRadius: 4, padding: "2px 7px",
                      fontFamily: "Inter, sans-serif", fontSize: 10,
                      fontWeight: 500, color: "rgba(245,247,250,0.82)",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {hoveredNode.projects.length > 0 && (
              <div style={{ marginBottom: hoveredNode.extra ? 12 : 0 }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,247,250,0.3)", marginBottom: 8 }}>
                  Projects
                </div>
                {hoveredNode.projects.map(p => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                    <div style={{ width: 3, height: 3, borderRadius: "50%", background: hoveredNode.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 400, color: "rgba(245,247,250,0.72)" }}>{p}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Extra info */}
            {hoveredNode.extra && (
              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: 10, marginTop: hoveredNode.projects.length > 0 ? 0 : 0,
                fontFamily: "Inter, sans-serif", fontSize: 11,
                color: "rgba(245,247,250,0.52)", lineHeight: "1.6",
              }}>
                {hoveredNode.extra}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse keyframe */}
      <style>{`
        .skills-premium-section {
          isolation: isolate;
        }

        .skills-premium-section::before,
        .skills-premium-section::after {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
        }

        .skills-premium-section::before {
          z-index: 2;
          background:
            radial-gradient(ellipse 28% 42% at 50% 50%, rgba(0, 157, 223, 0.16), transparent 68%),
            radial-gradient(ellipse 40% 58% at 15% 26%, rgba(0, 157, 223, 0.1), transparent 74%),
            linear-gradient(90deg, rgba(2, 7, 15, 0.38), transparent 34%, transparent 68%, rgba(2, 7, 15, 0.42));
        }

        .skills-premium-section::after {
          z-index: 20;
          background:
            linear-gradient(180deg, rgba(2, 6, 13, 0.86) 0%, transparent 13%, transparent 84%, rgba(2, 6, 13, 0.88) 100%),
            linear-gradient(90deg, rgba(2, 6, 13, 0.5) 0%, transparent 16%, transparent 86%, rgba(2, 6, 13, 0.52) 100%);
        }

        .skills-grid-layer {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          opacity: 0.22;
          background-image:
            linear-gradient(rgba(20, 70, 120, 0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 70, 120, 0.16) 1px, transparent 1px);
          background-size: 7.5rem 7.5rem;
          mask-image: radial-gradient(circle at 50% 50%, black 0%, black 54%, transparent 82%);
        }

        .skills-title-wrap {
          position: absolute;
          left: clamp(4rem, 7vw, 8rem);
          top: clamp(5rem, 10vh, 7rem);
          z-index: 35;
          pointer-events: none;
        }

        .skills-heading {
          margin: 0;
          font-family: "Amiko", "Inter", sans-serif;
          font-size: clamp(2.4rem, 4.2vw, 5.4rem);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: 0;
          text-transform: uppercase;
          color: rgba(0, 157, 223, 0.14);
          -webkit-text-stroke: 1px #007fff;
          text-shadow: 0 0 24px rgba(0, 127, 255, 0.24);
        }

        .skills-kicker {
          margin: 0.7rem 0 0;
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: clamp(1rem, 1.1vw, 1.25rem);
          color: rgba(245, 247, 250, 0.68);
          letter-spacing: 0.01em;
        }

        .skills-frame-corner {
          position: absolute;
          z-index: 32;
          width: clamp(6rem, 9vw, 9rem);
          height: clamp(5rem, 7vw, 7rem);
          pointer-events: none;
          opacity: 0.86;
        }

        .skills-frame-corner-left {
          left: clamp(2.4rem, 4vw, 4.6rem);
          top: clamp(4.5rem, 8vh, 6.2rem);
          border-left: 2px solid rgba(245, 247, 250, 0.88);
          border-top: 2px solid rgba(245, 247, 250, 0.88);
        }

        .skills-frame-corner-right {
          right: clamp(2.4rem, 4vw, 4.6rem);
          bottom: clamp(3rem, 6vh, 5rem);
          border-right: 2px solid rgba(245, 247, 250, 0.76);
          border-bottom: 2px solid rgba(245, 247, 250, 0.76);
        }

        @keyframes sk-pulse {
          0%, 100% { transform: scale(1); opacity: 0.18; }
          50% { transform: scale(1.9); opacity: 0; }
        }

        @media (max-width: 900px) {
          .skills-title-wrap {
            left: 1.5rem;
            top: 4.25rem;
          }

          .skills-kicker {
            max-width: 12rem;
          }

          .skills-frame-corner-left {
            left: 1rem;
            top: 3.7rem;
          }

          .skills-frame-corner-right {
            right: 1rem;
            bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
