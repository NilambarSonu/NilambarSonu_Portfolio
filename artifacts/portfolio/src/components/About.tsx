import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const bodyParagraphs = [
  "I'm Nilambar Behera, a BCA student, AI engineer, full-stack developer, and founder of Mitti-AI (Saathi AI), an agri-tech startup focused on bringing intelligent technology to agriculture.",
  "My journey began with a simple belief: technology should solve real-world problems. That belief led me to build products across artificial intelligence, data science, IoT, and full-stack development while still pursuing my undergraduate degree. Today, I have shipped more than 10 production-ready projects, completed industry internships, and worked across web applications, AI systems, data analytics platforms, and smart agriculture solutions.",
  "One of the defining milestones of my journey was founding Mitti-AI, which went on to secure 1st place at College, University, and Odisha State-Level Innovation & Startup Competitions, earning ₹6,00,000 in total prize funding. The platform combines IoT, machine learning, and modern software engineering to help farmers make smarter decisions through real-time soil intelligence.",
  "Beyond building products, I enjoy transforming ideas into scalable solutions, whether through AI-powered applications, immersive web experiences, or data-driven systems. My goal is to build technology that creates measurable impact and contributes to solving meaningful challenges at scale.",
  "When I'm not building, I'm constantly learning, experimenting, and pushing my limits as a developer, founder, and problem solver.",
];

const stats = [
  { val: "10+", label: "Projects" },
  { val: "₹6L", label: "Won" },
  { val: "3", label: "Internships" },
  { val: "1st", label: "State Rank" },
];

const constellationLines = [
  "M28 48 L162 184 L148 352 L238 526",
  "M238 526 L410 742 L642 666 L812 736",
  "M422 300 L682 356 L882 168 L1052 226",
  "M1052 226 L1188 82 L1372 132 L1540 232",
  "M980 64 L1174 220 L1238 344 L1138 448",
] as const;

const constellationDots: [number, number, number][] = [
  [28, 48, 4], [162, 184, 7], [148, 352, 4], [238, 526, 10],
  [410, 742, 5], [642, 666, 4], [812, 736, 5], [422, 300, 3],
  [682, 356, 4], [882, 168, 5], [1052, 226, 4], [1188, 82, 4],
  [1372, 132, 4], [1540, 232, 4], [980, 64, 4], [1174, 220, 8],
  [1238, 344, 7], [1138, 448, 4],
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const portraitY = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <section ref={sectionRef} id="about" className="about-section">
      {/* Background */}
      <div className="about-bg" aria-hidden="true" />
      <div className="about-bg-overlay" aria-hidden="true" />

      {/* Constellation */}
      <svg className="about-constellation" viewBox="0 0 1600 900" aria-hidden="true">
        {constellationLines.map((d) => (
          <path key={d} d={d} />
        ))}
        {constellationDots.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} className={r > 6 ? "bright" : ""} />
        ))}
      </svg>

      {/* Two-column layout */}
      <div className="about-inner">

        {/* Left — portrait */}
        <div ref={imgRef} className="about-portrait-col">
          <motion.img
            src="/leftsidebar_standing_profile.png"
            alt="Nilambar Behera"
            draggable={false}
            className="about-portrait-img"
            style={{ y: portraitY }}
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Right — text */}
        <div className="about-text-col">
          <motion.span
            className="about-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            About me
          </motion.span>

          <motion.h2
            className="about-heading"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            The Founder
          </motion.h2>

          <div className="about-body">
            {bodyParagraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 + i * 0.09 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            className="about-stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          >
            {stats.map(({ val, label }) => (
              <div key={label} className="about-stat">
                <strong>{val}</strong>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .about-section {
          position: relative;
          z-index: 50;
          overflow: hidden;
          isolation: isolate;
          background: #030913;
          color: #f5f7fa;
        }

        /* ── Background ── */
        .about-bg {
          position: absolute;
          inset: 0;
          z-index: -3;
          pointer-events: none;
          background:
            radial-gradient(ellipse 55% 90% at 10% 50%, rgba(0,101,149,0.38) 0%, rgba(0,45,70,0.18) 38%, transparent 65%),
            radial-gradient(ellipse 40% 55% at 35% 65%, rgba(0,157,223,0.09) 0%, transparent 60%),
            linear-gradient(100deg, #06273a 0%, #041c2e 18%, #030d19 42%, #030913 70%, #030913 100%);
        }
        .about-bg-overlay {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(2,8,16,0.04) 0%, rgba(2,8,16,0.18) 30%, rgba(2,8,16,0.78) 62%, rgba(2,8,16,0.97) 100%),
            linear-gradient(0deg, rgba(1,4,9,0.82) 0%, rgba(1,4,9,0.08) 28%, transparent 52%);
        }

        /* ── Constellation ── */
        .about-constellation {
          position: absolute;
          inset: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          opacity: 0.5;
          pointer-events: none;
        }
        .about-constellation path {
          fill: none;
          stroke: rgba(0,157,223,0.09);
          stroke-width: 1.4;
        }
        .about-constellation circle { fill: rgba(92,135,163,0.28); }
        .about-constellation circle.bright {
          fill: rgba(0,157,223,0.65);
          filter: drop-shadow(0 0 5px rgba(0,157,223,0.3));
        }

        /* ── Inner grid ── */
        .about-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 46% 54%;
          min-height: 100vh;
          align-items: center;
        }

        /* ── Portrait column ── */
        .about-portrait-col {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          min-height: 100vh;
          overflow: hidden;
        }
        .about-portrait-img {
          display: block;
          width: clamp(26rem, 38vw, 50rem);
          max-width: none;
          height: auto;
          object-fit: contain;
          object-position: bottom center;
          margin-left: -8%;
          user-select: none;
          filter: saturate(1.04) contrast(1.02) drop-shadow(0 0 28px rgba(0,157,223,0.13));
          will-change: transform;
        }

        /* ── Text column ── */
        .about-text-col {
          padding: clamp(5rem, 10vh, 9rem) clamp(3rem, 5vw, 7rem) clamp(4rem, 8vh, 7rem) clamp(1.5rem, 2vw, 3rem);
        }

        .about-eyebrow {
          display: block;
          margin-bottom: 0.6rem;
          font-family: system-ui, sans-serif;
          font-size: 0.68rem;
          font-weight: 400;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(0, 157, 223, 0.65);
        }

        .about-heading {
          margin: 0 0 clamp(1.8rem, 3vw, 3rem) 0;
          font-family: "Amiko", "Inter", sans-serif;
          font-size: clamp(2.2rem, 3.2vw, 4rem);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          color: rgba(0, 157, 223, 0.12);
          -webkit-text-stroke: 1px rgba(0, 120, 231, 0.75);
          text-shadow: 0 0 24px rgba(0, 127, 255, 0.13);
        }

        .about-body {
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: clamp(0.95rem, 1.1vw, 1.28rem);
          font-weight: 400;
          line-height: 1.74;
          letter-spacing: 0.008em;
          color: rgba(220, 230, 245, 0.84);
        }
        .about-body p { margin: 0; }
        .about-body p + p { margin-top: clamp(0.9rem, 1.3vw, 1.5rem); }

        /* ── Stats ── */
        .about-stats {
          display: flex;
          gap: clamp(1.4rem, 3vw, 3.5rem);
          flex-wrap: wrap;
          margin-top: clamp(2.2rem, 4vw, 4rem);
          padding-top: clamp(1.2rem, 2vw, 2rem);
          border-top: 1px solid rgba(0, 120, 231, 0.14);
        }
        .about-stat {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .about-stat strong {
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: clamp(1.5rem, 2vw, 2.2rem);
          font-weight: 400;
          line-height: 1;
          color: #0078e7;
        }
        .about-stat span {
          font-family: system-ui, sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.36);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .about-inner { grid-template-columns: 42% 58%; }
          .about-portrait-img { width: clamp(22rem, 40vw, 36rem); }
        }

        @media (max-width: 768px) {
          .about-inner {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .about-portrait-col {
            min-height: auto;
            padding-top: 3rem;
          }
          .about-portrait-img {
            width: min(72vw, 22rem);
            margin-left: 0;
          }
          .about-text-col {
            padding: 2rem 1.5rem 4rem;
          }
          .about-body { font-size: clamp(1rem, 4.2vw, 1.18rem); line-height: 1.68; }
          .about-heading { font-size: clamp(2.2rem, 9vw, 3rem); }
        }

        @media (max-width: 480px) {
          .about-portrait-img { width: 86vw; }
          .about-text-col { padding-inline: 1rem; }
          .about-stats { gap: 1rem 2rem; }
        }
      `}</style>
    </section>
  );
}
