import { ExternalLink } from "lucide-react";

const academics = [
  {
    level: "BCA",
    status: "Expected 2027",
    school: "Bhadrak Autonomous College",
    meta: "FM University",
    featured: true,
  },
  {
    level: "12th",
    status: "Completed",
    school: "Nilgiri Higher Secondary School",
    meta: "CHSE - Science - 83.33%",
  },
  {
    level: "10th",
    status: "Completed",
    school: "Sanpatpur Nodal High School",
    meta: "CHSE - 88.66%",
  },
];

const metrics = [
  ["10+", "Projects"],
  ["₹6L", "Competition Wins"],
  ["3", "Internships"],
  ["1st", "State Rank"],
] as const;

const certificates = [
  {
    title: "Introduction to HTML",
    issuer: "Coursera Project Network",
    image: "/coursera/1.png",
    verifyUrl: "https://coursera.org/verify/JBCPHCEYZ364",
  },
  {
    title: "Introduction to Microsoft Excel",
    issuer: "Coursera Project Network",
    image: "/coursera/2.png",
    verifyUrl: "https://coursera.org/verify/6EQJORVGTE7D",
  },
  {
    title: "Business Analysis & Process Management",
    issuer: "Coursera Project Network",
    image: "/coursera/3.png",
    verifyUrl: "https://coursera.org/verify/FNF28YSOJIZZ",
  },
  {
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    image: "/coursera/4.png",
    verifyUrl: "https://coursera.org/verify/LZ5Z19YEHOFA",
  },
  {
    title: "Python Project for Data Science",
    issuer: "IBM",
    image: "/coursera/5.png",
    verifyUrl: "https://coursera.org/verify/HY8N561L7FP1",
  },
];

export default function Education() {
  return (
    <section id="education" className="education-foundation-section" aria-labelledby="education-title">
      <div className="education-bg" aria-hidden="true" />
      <div className="education-corner education-corner-top" aria-hidden="true" />
      <div className="education-corner education-corner-bottom" aria-hidden="true" />

      <div className="education-left">
        <h2 id="education-title">Academic Foundation</h2>

        <div className="academic-panel-frame" aria-hidden="true" />
        <div className="academic-stack" aria-label="Academic background">
          {academics.map((item) => (
            <article
              key={item.level}
              className={`academic-pill${item.featured ? " is-featured" : ""}`}
            >
              <div className="academic-pill-top">
                <span>{item.level}</span>
                <span>{item.status}</span>
              </div>
              <p>{item.school}</p>
              <p>{item.meta}</p>
            </article>
          ))}
        </div>

        <div className="education-metrics" aria-label="Academic and project highlights">
          {metrics.map(([value, label]) => (
            <div className="metric-tile" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="education-divider" aria-hidden="true" />

      <div className="education-right" aria-label="Coursera certificates">
        <div className="certificate-blueprint certificate-blueprint-top" aria-hidden="true" />
        <div className="certificate-blueprint certificate-blueprint-bottom" aria-hidden="true" />

        <div className="certificate-mobile-track">
          <div className="certificate-grid">
            {certificates.map((certificate, index) => (
              <a
                key={certificate.verifyUrl}
                href={certificate.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card"
                style={{ ["--card-index" as string]: index }}
                aria-label={`Verify ${certificate.title} certificate on Coursera`}
              >
                <span className="cert-image-shell">
                  <img src={certificate.image} alt={`${certificate.title} certificate`} draggable={false} />
                </span>
                <span className="cert-footer">
                  <span>
                    <strong>{certificate.title}</strong>
                    <small>{certificate.issuer}</small>
                  </span>
                  <ExternalLink aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>

          <div className="certificate-grid certificate-grid-duplicate" aria-hidden="true">
            {certificates.map((certificate, index) => (
              <a
                key={`${certificate.verifyUrl}-duplicate`}
                href={certificate.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card"
                style={{ ["--card-index" as string]: index }}
                tabIndex={-1}
              >
                <span className="cert-image-shell">
                  <img src={certificate.image} alt="" draggable={false} />
                </span>
                <span className="cert-footer">
                  <span>
                    <strong>{certificate.title}</strong>
                    <small>{certificate.issuer}</small>
                  </span>
                  <ExternalLink aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .education-foundation-section {
          position: relative;
          z-index: 50;
          min-height: 100vh;
          overflow: hidden;
          isolation: isolate;
          background: #030913;
          color: #f5f7fa;
          display: grid;
          grid-template-columns: minmax(30rem, 47.5vw) 0.42rem minmax(0, 1fr);
        }

        .education-bg,
        .education-bg::before,
        .education-bg::after {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
        }

        .education-bg {
          z-index: -5;
          background:
            radial-gradient(ellipse 46% 70% at 90% 2%, rgba(0, 121, 186, 0.16) 0%, rgba(0, 80, 130, 0.06) 42%, transparent 72%),
            radial-gradient(ellipse 38% 58% at 10% 96%, rgba(15, 64, 160, 0.2) 0%, rgba(7, 34, 83, 0.12) 42%, transparent 72%),
            linear-gradient(180deg, #030913 0%, #04101d 48%, #030913 100%);
        }

        .education-bg::before {
          opacity: 0.4;
          background-image:
            linear-gradient(rgba(29, 72, 125, 0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(29, 72, 125, 0.18) 1px, transparent 1px);
          background-size: 8rem 8rem;
        }

        .education-bg::after {
          background:
            linear-gradient(90deg, rgba(2, 8, 16, 0.12) 0%, rgba(2, 8, 16, 0.44) 51%, rgba(2, 8, 16, 0.12) 100%),
            linear-gradient(0deg, rgba(2, 8, 16, 0.65) 0%, transparent 22%, transparent 78%, rgba(2, 8, 16, 0.62) 100%);
        }

        .education-corner {
          position: absolute;
          width: 7rem;
          height: 4.4rem;
          pointer-events: none;
          border-color: rgba(0, 157, 223, 0.26);
        }

        .education-corner-top {
          top: clamp(2rem, 6.5vh, 4.7rem);
          left: clamp(2rem, 3.8vw, 4.8rem);
          border-top: 2px solid;
          border-left: 2px solid;
        }

        .education-corner-bottom {
          right: clamp(2rem, 3.8vw, 4.8rem);
          bottom: clamp(2rem, 4.2vh, 3.4rem);
          border-right: 2px solid;
          border-bottom: 2px solid;
        }

        .education-left {
          position: relative;
          padding: clamp(7.5rem, 15vh, 10.8rem) clamp(3rem, 4.4vw, 5.6rem) clamp(3.5rem, 6vh, 4.8rem);
        }

        .education-left h2 {
          margin: 0 0 clamp(3.8rem, 8.2vh, 6.2rem);
          font-family: "Amiko", "Inter", sans-serif;
          font-size: clamp(2rem, 2.6vw, 3.35rem);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: -0.06em;
          text-transform: uppercase;
          color: rgba(0, 157, 223, 0.12);
          -webkit-text-stroke: 1px #007fff;
          text-shadow: 0 0 22px rgba(0, 127, 255, 0.16);
          white-space: nowrap;
        }

        .academic-panel-frame {
          position: absolute;
          left: 13.8vw;
          top: 25.4vh;
          width: min(26.5vw, 33rem);
          height: min(37vh, 22rem);
          border: 1px dashed rgba(0, 157, 223, 0.11);
          pointer-events: none;
        }

        .academic-stack {
          position: relative;
          display: grid;
          gap: clamp(1.25rem, 3.6vh, 2.65rem);
          max-width: min(39.5rem, 41vw);
        }

        .academic-pill {
          min-height: clamp(4.35rem, 7.4vh, 5.45rem);
          border: 1px solid rgba(0, 127, 255, 0.1);
          border-radius: 1.55rem;
          background:
            linear-gradient(90deg, rgba(48, 58, 118, 0.72) 0%, rgba(16, 58, 151, 0.78) 100%);
          box-shadow:
            inset 0 0 26px rgba(31, 84, 220, 0.12),
            0 15px 35px rgba(0, 0, 0, 0.26);
          padding: 1rem 1.85rem;
          color: rgba(245, 247, 250, 0.58);
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }

        .academic-pill.is-featured {
          color: #f5f7fa;
          background:
            linear-gradient(90deg, rgba(57, 66, 128, 0.92) 0%, rgba(16, 71, 182, 0.92) 100%);
          border-color: rgba(0, 127, 255, 0.24);
          box-shadow:
            inset 0 0 28px rgba(31, 84, 220, 0.24),
            0 18px 40px rgba(0, 0, 0, 0.32),
            0 0 28px rgba(0, 127, 255, 0.08);
        }

        .academic-pill:hover {
          transform: translateX(0.35rem);
          border-color: rgba(0, 157, 223, 0.34);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.38), 0 0 28px rgba(0, 127, 255, 0.12);
        }

        .academic-pill-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          font-family: "Inter", sans-serif;
          font-size: clamp(1.15rem, 1.43vw, 1.75rem);
          line-height: 1;
        }

        .academic-pill p {
          margin: 0.45rem 0 0;
          text-align: center;
          font-family: "Inter", sans-serif;
          font-size: clamp(1rem, 1.38vw, 1.7rem);
          line-height: 1.05;
        }

        .academic-pill p + p {
          margin-top: 0.35rem;
        }

        .education-metrics {
          position: relative;
          width: min(35rem, calc(100% - 2rem));
          margin: clamp(1.65rem, 3.8vh, 2.85rem) auto 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(0.95rem, 2.4vw, 2.8rem);
        }

        .metric-tile {
          min-width: 4.4rem;
          aspect-ratio: 1 / 0.95;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 127, 255, 0.45);
          border-radius: 1rem;
          background:
            linear-gradient(180deg, rgba(7, 25, 61, 0.92) 0%, rgba(0, 121, 231, 0.76) 100%);
          box-shadow:
            inset 0 0 18px rgba(0, 127, 255, 0.18),
            0 0 28px rgba(0, 127, 255, 0.12);
          text-align: center;
        }

        .metric-tile strong {
          font-family: "Inter", sans-serif;
          font-size: clamp(1.08rem, 1.38vw, 1.65rem);
          line-height: 1;
          color: #ffffff;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.24);
        }

        .metric-tile span {
          margin-top: 0.45rem;
          max-width: 5.8rem;
          font-family: "Inter", sans-serif;
          font-size: clamp(0.66rem, 0.78vw, 0.92rem);
          font-weight: 700;
          line-height: 1.06;
          color: rgba(245, 247, 250, 0.9);
        }

        .education-divider {
          align-self: center;
          height: 86.5%;
          width: 0.42rem;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(42, 83, 195, 0.8) 0%, rgba(35, 80, 203, 0.97) 50%, rgba(42, 83, 195, 0.8) 100%);
          box-shadow: 0 0 18px rgba(0, 127, 255, 0.18);
        }

        .education-right {
          position: relative;
          min-height: 100vh;
          padding: clamp(6.8rem, 12vh, 8.3rem) clamp(3.3rem, 4.5vw, 5.8rem) clamp(3rem, 5.2vh, 4.6rem);
        }

        .certificate-blueprint {
          position: absolute;
          border: 1px dashed rgba(0, 157, 223, 0.1);
          pointer-events: none;
        }

        .certificate-blueprint-top {
          top: 13vh;
          left: 3.5vw;
          width: 17vw;
          height: 15vh;
        }

        .certificate-blueprint-bottom {
          right: 5vw;
          bottom: 10vh;
          width: 25vw;
          height: 24vh;
        }

        .certificate-grid {
          position: relative;
          z-index: 1;
          height: 100%;
          min-height: calc(100vh - clamp(6.8rem, 12vh, 8.3rem) - clamp(3rem, 5.2vh, 4.6rem));
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          grid-template-rows: repeat(2, minmax(0, 1fr));
          align-items: center;
          gap: clamp(1.25rem, 2.3vw, 2.8rem);
        }

        .certificate-mobile-track {
          display: contents;
        }

        .certificate-grid-duplicate {
          display: none;
        }

        .cert-card {
          position: relative;
          display: block;
          width: 100%;
          padding: clamp(0.5rem, 0.62vw, 0.75rem) clamp(0.5rem, 0.62vw, 0.75rem) 0;
          border-radius: 0.85rem;
          border: 1px solid rgba(0, 157, 223, 0.38);
          background: linear-gradient(135deg, rgba(68, 170, 228, 0.88) 0%, rgba(12, 114, 208, 0.9) 100%);
          box-shadow:
            0 18px 38px rgba(0, 0, 0, 0.34),
            0 0 26px rgba(0, 127, 255, 0.13);
          text-decoration: none;
          overflow: hidden;
          transition: transform 220ms ease, box-shadow 220ms ease, filter 220ms ease;
        }

        .cert-card:nth-child(1) {
          grid-column: 1 / span 2;
          grid-row: 1;
          align-self: start;
        }

        .cert-card:nth-child(2) {
          grid-column: 4 / span 2;
          grid-row: 1;
          align-self: start;
        }

        .cert-card:nth-child(3) {
          grid-column: 3 / span 2;
          grid-row: 1 / span 2;
          align-self: center;
          transform: translateY(1.2rem);
        }

        .cert-card:nth-child(4) {
          grid-column: 1 / span 2;
          grid-row: 2;
          align-self: end;
        }

        .cert-card:nth-child(5) {
          grid-column: 5 / span 2;
          grid-row: 2;
          align-self: end;
        }

        .cert-card::after {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 20%;
          content: "";
          background: linear-gradient(90deg, #0794ff 0%, #0500d8 100%);
          z-index: 0;
        }

        .cert-card:hover {
          transform: translateY(-0.45rem) scale(1.018);
          filter: saturate(1.08);
          box-shadow:
            0 26px 62px rgba(0, 0, 0, 0.44),
            0 0 40px rgba(0, 127, 255, 0.24);
        }

        .cert-card:nth-child(3):hover {
          transform: translateY(0.75rem) scale(1.018);
        }

        .cert-image-shell {
          position: relative;
          z-index: 1;
          display: block;
          aspect-ratio: 1.295 / 1;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.62);
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
        }

        .cert-image-shell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
        }

        .cert-footer {
          position: relative;
          z-index: 1;
          min-height: 3.55rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.8rem;
          padding: 0.58rem 0.15rem 0.78rem;
          color: #fff;
          opacity: 0;
          transform: translateY(0.35rem);
          transition: opacity 220ms ease, transform 220ms ease;
        }

        .cert-card:hover .cert-footer,
        .cert-card:focus-visible .cert-footer {
          opacity: 1;
          transform: translateY(0);
        }

        .cert-footer strong,
        .cert-footer small {
          display: block;
          font-family: "Inter", sans-serif;
          line-height: 1.05;
        }

        .cert-footer strong {
          font-size: 0.72rem;
          font-weight: 800;
        }

        .cert-footer small {
          margin-top: 0.16rem;
          font-size: 0.62rem;
          color: rgba(255, 255, 255, 0.76);
        }

        .cert-footer svg {
          width: 1rem;
          height: 1rem;
          flex: 0 0 auto;
        }

        @media (max-width: 1180px) {
          .education-foundation-section {
            grid-template-columns: minmax(24rem, 44vw) 0.34rem 1fr;
          }

          .education-left {
            padding-left: 2.3rem;
            padding-right: 2.3rem;
          }

          .education-left h2 {
            white-space: normal;
          }

          .academic-pill p {
            font-size: 1rem;
          }

          .cert-card {
            border-radius: 0.75rem;
          }

          .certificate-grid {
            gap: 1.05rem;
          }
        }

        @media (max-width: 900px) {
          .education-foundation-section {
            display: block;
            min-height: auto;
            padding: 4.5rem 1.2rem 5rem;
          }

          .education-left {
            padding: 0;
          }

          .education-left h2 {
            margin-bottom: 2.3rem;
            font-size: clamp(2.05rem, 9vw, 3.3rem);
          }

          .academic-panel-frame,
          .education-divider,
          .certificate-blueprint {
            display: none;
          }

          .academic-stack {
            max-width: none;
            gap: 1rem;
          }

          .academic-pill {
            border-radius: 1.1rem;
          }

          .education-metrics {
            position: relative;
            left: auto;
            right: auto;
            bottom: auto;
            margin: 2rem 0 2.8rem;
            gap: 0.85rem;
          }

          .education-right {
            min-height: auto;
            padding: 0;
            overflow: hidden;
            margin-inline: -1.2rem;
            padding-block: 0.7rem 1.2rem;
            mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
          }

          .certificate-mobile-track {
            display: flex;
            width: max-content;
            gap: 1rem;
            animation: education-cert-marquee 36s linear infinite;
            will-change: transform;
          }

          .certificate-grid,
          .certificate-grid-duplicate {
            min-height: 0;
            display: flex;
            flex: 0 0 auto;
            gap: 1rem;
          }

          .cert-card {
            position: relative;
            grid-column: auto !important;
            grid-row: auto !important;
            align-self: auto !important;
            transform: none !important;
            inset: auto;
            width: min(78vw, 21rem);
            flex: 0 0 min(78vw, 21rem);
            border-radius: 0.9rem;
          }

          .cert-footer {
            opacity: 1;
            transform: none;
          }
        }

        @media (max-width: 560px) {
          .education-foundation-section {
            padding-inline: 1rem;
          }

          .education-metrics {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .education-right {
            margin-inline: -1rem;
          }

          .academic-pill-top {
            font-size: 1rem;
          }

          .academic-pill p {
            font-size: 0.95rem;
          }
        }

        @keyframes education-cert-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.5rem));
          }
        }
      `}</style>
    </section>
  );
}
