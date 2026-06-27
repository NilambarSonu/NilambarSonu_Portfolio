import { Briefcase } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const EXPERIENCE = [
  {
    role: "Data Analyst Intern",
    company: "Bluestock Fintech",
    type: "Remote · Startup India Registered",
    period: "May 2026 – Jul 2026",
    badge: "ongoing" as const,
    bullets: [
      "Analyzing fintech data pipelines for structured insight reports",
      "Applying Python, Pandas, and data visualization for business intelligence",
      "Collaborating across data operations, product, and research teams",
    ],
    skills: "Python · Pandas · Data Visualization · SQL · Analytics",
  },
  {
    role: "AI Web Development Intern",
    company: "InAmigos Foundation (NGO)",
    type: "Remote · NITI Aayog Registered",
    period: "May 2026",
    badge: "completed" as const,
    bullets: [
      "Built portfolio website from scratch (HTML/CSS/JS, live deployment)",
      "Authored 15-issue security analysis report — found critical vulnerability",
      "Created Kalinga Trails tourism platform using AI tools",
      "Designed NGO feature diagram in Figma",
    ],
    skills: "HTML · CSS · JavaScript · Figma · Web Security · React",
  },
  {
    role: "Founder & Lead Developer",
    company: "Mitti-AI / Saathi AI",
    type: "Bhadrak, Odisha",
    period: "Oct 2024 – Present",
    badge: "active" as const,
    bullets: [
      "Won ₹6,00,000 across state, university, and college competitions",
      "Built end-to-end agri-tech: IoT hardware → AI → mobile app",
      "Managed full product lifecycle solo + small team",
    ],
    skills: "Python · React · IoT · ML · Flask · ESP32 · TypeScript",
  },
];

const BADGE_MAP = {
  ongoing: <span className="badge-ongoing"><span className="badge-dot" />Ongoing</span>,
  completed: <span className="badge-completed">Completed</span>,
  active: <span className="badge-active"><span className="badge-dot" />Active</span>,
};

export default function Experience() {
  const { ref, revealed } = useScrollReveal(0.1);

  return (
    <section
      id="experience"
      className="section-spacing"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container-main">
        {/* Header */}
        <div className={`section-header reveal${revealed ? " revealed" : ""}`}>
          <div className="section-header-eyebrow">
            <div className="section-header-eyebrow-line" />
            <span className="type-eyebrow">Work history</span>
          </div>
          <h2 className="type-section-heading">Experience</h2>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {EXPERIENCE.map((item, i) => (
            <div
              key={i}
              className={`timeline-item reveal${revealed ? " revealed" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="timeline-dot" />

              <div>
                {/* Role + date + badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <h3 className="type-card-title">{item.role}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="type-metadata">{item.period}</span>
                    {BADGE_MAP[item.badge]}
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    marginBottom: "16px",
                  }}
                >
                  {item.company} · {item.type}
                </p>

                {/* Bullets */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    marginBottom: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {item.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      style={{
                        display: "flex",
                        gap: 10,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>·</span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Skills */}
                <p className="type-tech-tag">{item.skills}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
