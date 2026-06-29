import { useRef } from "react";
import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { Github, Star, GitFork, Users, ArrowUpRight } from "lucide-react";
import LiveStatsDashboard from "@/components/LiveStatsDashboard";

const GITHUB_USERNAME = "NilambarSonu";

const highlights = [
  { icon: <Star size={15} />, label: "Mitti-AI / Saathi AI", sub: "AgriTech · AI + IoT" },
  { icon: <GitFork size={15} />, label: "Full-Stack Projects", sub: "React, Node, Python" },
  { icon: <Users size={15} />, label: "State-Level Winner", sub: "₹6L prize funding" },
  { icon: <Github size={15} />, label: "Open Source Contributor", sub: "NilambarSonu" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export default function ContributionsAndMusic() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="contributions"
      className="github-section"
    >
      {/* Background */}
      <div className="github-bg" aria-hidden="true" />
      <div className="github-bg-grid" aria-hidden="true" />

      <div className="github-inner">
        {/* ── Section header ── */}
        <motion.div className="github-header" {...fadeUp(0)}>
          <span className="github-eyebrow">Open source</span>
          <h2 className="github-heading">
            <Github size={28} className="github-heading-icon" />
            GitHub Activity
          </h2>
          <p className="github-subtext">
            Contribution history for{" "}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="github-username-link"
            >
              @{GITHUB_USERNAME}
            </a>
          </p>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="github-grid">

          {/* LEFT: Calendar + stats */}
          <div className="github-left">
            {/* Contribution calendar */}
            <motion.div className="github-calendar-card" {...fadeUp(0.1)}>
              <GitHubCalendar
                username={GITHUB_USERNAME}
                colorScheme="dark"
                blockSize={13}
                blockMargin={4}
                fontSize={13}
                theme={{
                  dark: ["#0d1f30", "#003d6b", "#0057a8", "#0078e7", "#41b0ff"],
                }}
                style={{ width: "100%" }}
              />
            </motion.div>

            {/* Live stats */}
            <motion.div {...fadeUp(0.2)}>
              <LiveStatsDashboard compact={true} />
            </motion.div>
          </div>

          {/* RIGHT: Profile card */}
          <motion.div className="github-right" {...fadeUp(0.18)}>
            <div className="github-profile-card">
              {/* Avatar */}
              <div className="github-avatar-wrap">
                <img
                  src={`https://avatars.githubusercontent.com/${GITHUB_USERNAME}`}
                  alt={GITHUB_USERNAME}
                  className="github-avatar"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="github-avatar-ring" aria-hidden="true" />
              </div>

              {/* All text content grouped — required for mobile row layout */}
              <div className="github-profile-info">
                <h3 className="github-profile-name">Nilambar Behera</h3>
                <p className="github-profile-handle">@{GITHUB_USERNAME}</p>
                <p className="github-profile-bio">
                  AI engineer &amp; full-stack developer building intelligent,
                  impactful software — from agri-tech to web apps.
                </p>

                <ul className="github-highlights">
                  {highlights.map(({ icon, label, sub }) => (
                    <li key={label} className="github-highlight-item">
                      <span className="github-highlight-icon">{icon}</span>
                      <span className="github-highlight-text">
                        <strong>{label}</strong>
                        <span>{sub}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-cta"
                >
                  View GitHub Profile
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .github-section {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background: #030913;
          padding: clamp(5rem, 10vh, 8rem) 0 clamp(4rem, 8vh, 7rem);
        }

        /* ── Background ── */
        .github-bg {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,120,231,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 80% 60%, rgba(0,101,149,0.08) 0%, transparent 65%),
            #030913;
        }
        .github-bg-grid {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: 0.1;
          background-image:
            linear-gradient(90deg, rgba(0,157,223,0.08) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0,157,223,0.06) 1px, transparent 1px);
          background-size: 10rem 10rem;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 80%);
        }

        /* ── Inner wrapper ── */
        .github-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 5rem);
        }

        /* ── Header ── */
        .github-header {
          margin-bottom: clamp(2.5rem, 5vw, 4.5rem);
        }
        .github-eyebrow {
          display: block;
          margin-bottom: 0.5rem;
          font-family: system-ui, sans-serif;
          font-size: 0.68rem;
          font-weight: 400;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(0,157,223,0.6);
        }
        .github-heading {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0 0 0.6rem;
          font-family: "Amiko", "Inter", sans-serif;
          font-size: clamp(1.9rem, 3.2vw, 3rem);
          font-weight: 400;
          letter-spacing: -0.03em;
          color: #f5f7fa;
          line-height: 1;
        }
        .github-heading-icon {
          color: #0078e7;
          flex-shrink: 0;
        }
        .github-subtext {
          font-family: system-ui, sans-serif;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.38);
          margin: 0;
        }
        .github-username-link {
          color: rgba(0,157,223,0.75);
          text-decoration: none;
          transition: color 0.2s;
        }
        .github-username-link:hover { color: #0078e7; }

        /* ── Grid ── */
        .github-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: clamp(1.5rem, 3vw, 3rem);
          align-items: start;
        }

        /* ── Left ── */
        .github-left {
          display: flex;
          flex-direction: column;
          gap: clamp(1.2rem, 2vw, 2rem);
        }

        /* ── Calendar card ── */
        .github-calendar-card {
          background: rgba(0,120,231,0.04);
          border: 1px solid rgba(0,120,231,0.14);
          border-radius: 14px;
          padding: clamp(1.2rem, 2vw, 1.8rem);
          overflow-x: auto;
        }

        /* ── Right ── */
        .github-right {}

        /* ── Profile card ── */
        .github-profile-card {
          background: rgba(0,120,231,0.04);
          border: 1px solid rgba(0,120,231,0.14);
          border-radius: 14px;
          padding: clamp(1.5rem, 2.5vw, 2.2rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* Text wrapper — full width on desktop, flex-1 on mobile */
        .github-profile-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Avatar */
        .github-avatar-wrap {
          position: relative;
          width: 76px;
          height: 76px;
          margin-bottom: 1.1rem;
        }
        .github-avatar {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(0,120,231,0.25);
        }
        .github-avatar-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid rgba(0,157,223,0.2);
          box-shadow: 0 0 16px rgba(0,120,231,0.15);
        }

        .github-profile-name {
          margin: 0 0 0.2rem;
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: 1.15rem;
          font-weight: 400;
          color: #f5f7fa;
        }
        .github-profile-handle {
          margin: 0 0 0.9rem;
          font-family: system-ui, sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: rgba(0,157,223,0.55);
        }
        .github-profile-bio {
          margin: 0 0 1.4rem;
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: 0.9rem;
          line-height: 1.65;
          color: rgba(220,230,245,0.65);
        }

        /* Highlights */
        .github-highlights {
          list-style: none;
          margin: 0 0 1.6rem;
          padding: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          text-align: left;
          border-top: 1px solid rgba(0,120,231,0.1);
          padding-top: 1.2rem;
        }
        .github-highlight-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .github-highlight-icon {
          flex-shrink: 0;
          color: #0078e7;
        }
        .github-highlight-text {
          display: flex;
          flex-direction: column;
          gap: 0.05rem;
        }
        .github-highlight-text strong {
          font-family: system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(245,247,250,0.88);
        }
        .github-highlight-text span {
          font-family: system-ui, sans-serif;
          font-size: 0.66rem;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.35);
        }

        /* CTA */
        .github-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.3rem;
          border-radius: 999px;
          border: 1px solid rgba(0,120,231,0.3);
          background: rgba(0,120,231,0.07);
          color: rgba(255,255,255,0.8);
          font-family: system-ui, sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .github-cta:hover {
          background: rgba(0,120,231,0.16);
          border-color: rgba(0,120,231,0.6);
          color: #fff;
          box-shadow: 0 0 18px rgba(0,120,231,0.2);
        }

        /* ── Tablet: stack grid ── */
        @media (max-width: 900px) {
          .github-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .github-section {
            padding: 2.8rem 0 2.8rem;
          }

          .github-inner {
            padding: 0 0.9rem;
          }

          .github-header {
            margin-bottom: 1.4rem;
          }

          .github-heading {
            font-size: 1.45rem;
            gap: 0.45rem;
          }

          .github-heading-icon {
            width: 19px;
            height: 19px;
          }

          /* Calendar — horizontal scroll with proper containment */
          .github-calendar-card {
            padding: 0.8rem 0.7rem;
            border-radius: 10px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          /* Profile card — row: avatar left, info right */
          .github-profile-card {
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
            padding: 1rem;
            gap: 0.8rem;
            border-radius: 10px;
          }

          .github-avatar-wrap {
            width: 54px;
            height: 54px;
            flex-shrink: 0;
            margin-bottom: 0;
          }

          .github-avatar {
            width: 54px;
            height: 54px;
          }

          /* Text block — takes remaining width */
          .github-profile-info {
            flex: 1;
            min-width: 0;
            align-items: flex-start;
          }

          .github-profile-name {
            font-size: 0.92rem;
            margin-bottom: 0.1rem;
            text-align: left;
          }

          .github-profile-handle {
            font-size: 0.63rem;
            margin-bottom: 0.55rem;
            text-align: left;
          }

          .github-profile-bio {
            font-size: 0.76rem;
            line-height: 1.55;
            margin-bottom: 0.8rem;
            text-align: left;
          }

          .github-highlights {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.45rem 0.6rem;
            border-top: 1px solid rgba(0,120,231,0.1);
            padding-top: 0.65rem;
            margin-bottom: 0.85rem;
          }

          .github-highlight-item {
            gap: 0.35rem;
          }

          .github-highlight-text strong {
            font-size: 0.68rem;
          }

          .github-highlight-text span {
            font-size: 0.58rem;
          }

          .github-cta {
            font-size: 0.62rem;
            padding: 0.4rem 0.9rem;
            letter-spacing: 0.09em;
            align-self: flex-start;
          }
        }

        /* ── Very small phones ── */
        @media (max-width: 380px) {
          .github-profile-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .github-profile-info {
            width: 100%;
          }

          .github-highlights {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
