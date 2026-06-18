import { Github, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function GithubActivity() {
  const { ref, revealed } = useScrollReveal(0.1);

  return (
    <section
      id="github"
      className="section-spacing"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container-main">
        {/* Header */}
        <div className={`section-header reveal${revealed ? " revealed" : ""}`}>
          <div className="section-header-eyebrow">
            <div className="section-header-eyebrow-line" />
            <span className="type-eyebrow">Open source</span>
          </div>
          <h2 className="type-section-heading">GitHub activity</h2>
        </div>

        {/* Content block */}
        <div
          className={`reveal${revealed ? " revealed" : ""}`}
          style={{
            maxWidth: 800,
            margin: "0 auto",
            textAlign: "center",
            transitionDelay: "100ms",
          }}
        >
          {/* Contribution heatmap */}
          <div
            style={{
              border: "1px solid var(--border-default)",
              borderRadius: 12,
              padding: "24px",
              marginBottom: "20px",
              background: "var(--bg-card)",
              overflow: "hidden",
            }}
          >
            <img
              src="https://ghchart.rshah.org/C8A96E/NilambarSonu"
              alt="NilambarSonu's GitHub contribution chart"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: 4,
              }}
              loading="lazy"
            />
          </div>

          {/* Contribution count */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "var(--text-muted)",
              marginBottom: "16px",
            }}
          >
            Contributions in the last year
          </p>

          {/* Stat pills */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            <span className="stat-pill">4 Followers</span>
            <span className="stat-pill">8 Following</span>
            <span className="stat-pill">GitHub: NilambarSonu</span>
          </div>

          {/* GitHub link button */}
          <a
            href="https://github.com/NilambarSonu"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--accent-blue)",
              textDecoration: "none",
              transition: "opacity 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <ExternalLink size={14} /> View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
