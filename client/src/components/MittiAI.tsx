import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TECH_STACK = "Python · Flask · React · TypeScript · ESP32 · Arduino · IoT · Machine Learning · Vite";

const WHAT_WE_BUILT = [
  { name: "Agni", desc: "ESP32 IoT soil sensor (hardware we designed)" },
  { name: "Megha", desc: "Python AI engine for crop recommendations" },
  { name: "Saathi App", desc: "React Native mobile interface for farmers" },
  { name: "Saathi AI Platform", desc: "Web dashboard with real-time data" },
];

const RECORD_NODES = [
  { icon: "🥇", label: "Bhadrak AC", sub: "College Winner" },
  { icon: "🥇", label: "FM Univ · ₹1L", sub: "Top of University" },
  { icon: "🥇", label: "State · ₹5L", sub: "#1 of 72+ teams" },
];

export default function MittiAI() {
  const { ref, revealed } = useScrollReveal(0.1);

  return (
    <section
      id="startup"
      className="section-spacing"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container-main">
        {/* Section header */}
        <div className={`section-header reveal${revealed ? " revealed" : ""}`}>
          <div className="section-header-eyebrow">
            <div className="section-header-eyebrow-line" />
            <span className="type-eyebrow">The startup</span>
          </div>
          <h2 className="type-section-heading">Mitti-AI — The startup</h2>
          <p
            className="type-sub-heading"
            style={{ marginTop: 12, maxWidth: 600 }}
          >
            How a BCA student from Bhadrak, Odisha built an agri-tech startup that won at state level
          </p>
        </div>

        {/* Main card */}
        <div
          className={`mitti-card reveal${revealed ? " revealed" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          {/* Top row: wordmark + Live button */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "32px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                  marginBottom: "4px",
                }}
              >
                Mitti-AI
              </h3>
              <p className="type-card-body">The Organic Intelligence Platform</p>
            </div>

            <a
              href="https://saathiai.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--accent-blue)",
                border: "1px solid var(--accent-blue)",
                borderRadius: 6,
                padding: "6px 14px",
                textDecoration: "none",
                transition: "background-color 150ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(62,139,255,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-green)",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              Live ↗
            </a>
          </div>

          <p
            className="type-body"
            style={{ marginBottom: "32px", maxWidth: 680 }}
          >
            AI-powered soil analysis &amp; crop advisory for Indian farmers
          </p>

          <div className="divider" style={{ marginBottom: "32px" }} />

          {/* Two columns: Problem + What We Built */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              marginBottom: "40px",
            }}
            className="mitti-two-col"
          >
            {/* Problem */}
            <div>
              <p
                className="type-metadata"
                style={{ color: "var(--accent-gold)", marginBottom: "16px" }}
              >
                The Problem
              </p>
              <p className="type-body" style={{ marginBottom: 8 }}>
                Indian farmers make crop decisions without data.
              </p>
              <p className="type-body" style={{ marginBottom: 8 }}>
                Soil health is unknown. Recommendations are generic.
              </p>
              <p className="type-body">Losses are preventable.</p>
            </div>

            {/* What we built */}
            <div>
              <p
                className="type-metadata"
                style={{ color: "var(--accent-gold)", marginBottom: "16px" }}
              >
                What We Built
              </p>
              {WHAT_WE_BUILT.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--accent-gold)",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    ·
                  </span>
                  <p className="type-body" style={{ lineHeight: 1.5 }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                      {item.name}
                    </span>{" "}
                    — {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" style={{ marginBottom: "40px" }} />

          {/* The Record — Timeline */}
          <div style={{ marginBottom: "32px" }}>
            <p
              className="type-metadata"
              style={{ color: "var(--accent-gold)", marginBottom: "28px" }}
            >
              The Record
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
              }}
              className="record-track"
            >
              {RECORD_NODES.map((node, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", flex: i < RECORD_NODES.length - 1 ? "1" : undefined }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div className="record-node-dot">
                      <span style={{ fontSize: 18 }}>{node.icon}</span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          marginBottom: 2,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {node.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          color: "var(--text-muted)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {node.sub}
                      </p>
                    </div>
                  </div>

                  {i < RECORD_NODES.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        height: 2,
                        background: "linear-gradient(90deg, var(--accent-gold-dim), var(--accent-gold))",
                        marginBottom: "36px",
                        margin: "0 16px 36px 16px",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Total prize money */}
          <div
            style={{
              padding: "20px 24px",
              background: "rgba(200, 169, 110, 0.06)",
              borderRadius: 8,
              border: "1px solid rgba(200, 169, 110, 0.15)",
              marginBottom: "32px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                color: "var(--accent-gold)",
                letterSpacing: "-0.02em",
              }}
            >
              ₹6,00,000
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "var(--text-secondary)",
              }}
            >
              Total prize money won across all competitions
            </span>
          </div>

          {/* Tech stack */}
          <div>
            <p
              className="type-metadata"
              style={{ marginBottom: "10px" }}
            >
              Tech Stack
            </p>
            <p className="skill-tags-text">{TECH_STACK}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .mitti-two-col {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .mitti-card {
            padding: 24px !important;
          }
          .record-track {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
