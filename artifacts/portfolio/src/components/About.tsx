import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const bodyParagraphs = [
  "I'm Nilambar Behera, a BCA student, AI engineer, full-stack developer, and founder of Mitti-AI (Saathi AI), an agri-tech startup focused on bringing intelligent technology to agriculture.",
  "My journey began with a simple belief: technology should solve real-world problems. That belief led me to build products across artificial intelligence, data science, IoT, and full-stack development while still pursuing my undergraduate degree. Today, I have shipped more than 10 production-ready projects, completed industry internships, and worked across web applications, AI systems, data analytics platforms, and smart agriculture solutions.",
  "One of the defining milestones of my journey was founding Mitti-AI, which went on to secure 1st place at College, University, and Odisha State-Level Innovation & Startup Competitions, earning ₹6,00,000 in total prize funding. The platform combines IoT, machine learning, and modern software engineering to help farmers make smarter decisions through real-time soil intelligence.",
  "Beyond building products, I enjoy transforming ideas into scalable solutions, whether through AI-powered applications, immersive web experiences, or data-driven systems. My goal is to build technology that creates measurable impact and contributes to solving meaningful challenges at scale.",
  "When I'm not building, I'm constantly learning, experimenting, and pushing my limits as a developer, founder, and problem solver.",
];

const constellationLines = [
  "M28 48 L162 184 L148 352 L238 526 L410 742 L642 666 L812 736",
  "M422 300 L682 356 L882 168 L1052 226 L1188 82 L1372 132 L1540 232",
  "M980 64 L1174 220 L1238 344 L1138 448 L1282 602 L1416 702",
  "M1030 362 L1192 312 L1368 420 L1526 342",
  "M708 666 L846 542 L1008 608 L1154 554",
] as const;

const constellationDots = [
  [28, 48, 4], [162, 184, 7], [148, 352, 4], [238, 526, 10],
  [410, 742, 5], [642, 666, 4], [812, 736, 5], [422, 300, 3],
  [682, 356, 4], [882, 168, 5], [1052, 226, 4], [1188, 82, 4],
  [1372, 132, 4], [1540, 232, 4], [980, 64, 4], [1174, 220, 8],
  [1238, 344, 7], [1138, 448, 4], [1282, 602, 4], [1416, 702, 5],
  [1030, 362, 5], [1192, 312, 6], [1368, 420, 4], [1526, 342, 4],
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.11 },
  }),
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawPortraitY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const portraitY = useSpring(rawPortraitY, { stiffness: 50, damping: 18 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-founder-section"
      aria-labelledby="about-founder-title"
    >
      <div className="about-founder-bg" aria-hidden="true" />

      <svg className="about-founder-network" viewBox="0 0 1600 900" aria-hidden="true">
        {constellationLines.map((d) => (
          <path key={d} d={d} />
        ))}
        {constellationDots.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} className={r > 6 ? "is-bright" : ""} />
        ))}
      </svg>

      {/* Portrait with parallax */}
      <motion.div className="about-portrait-wrap" style={{ y: portraitY }}>
        <motion.img
          src="/leftsidebar_standing_profile.png"
          alt="Nilambar Behera"
          draggable={false}
          className="about-founder-portrait"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Text content */}
      <div className="about-founder-copy">
        <motion.span
          className="about-eyebrow"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
        >
          About me
        </motion.span>

        <motion.h2
          id="about-founder-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          The Founder
        </motion.h2>

        <div className="about-founder-body">
          {bodyParagraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i + 0.5}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        >
          {[
            ["10+", "Projects"],
            ["₹6L", "Won"],
            ["3", "Internships"],
            ["1st", "State Rank"],
          ].map(([val, label]) => (
            <div className="about-stat" key={label}>
              <strong>{val}</strong>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .about-founder-section {
          position: relative;
          z-index: 50;
          min-height: 100vh;
          overflow: hidden;
          isolation: isolate;
          background: #030913;
          color: #f5f7fa;
          display: flex;
          align-items: stretch;
        }

        /* ─── Background ─── */
        .about-founder-bg,
        .about-founder-bg::before,
        .about-founder-bg::after {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
        }
        .about-founder-bg {
          z-index: -5;
          background:
            radial-gradient(ellipse 48% 92% at 18% 46%, rgba(0,101,149,0.38) 0%, rgba(0,62,88,0.2) 32%, rgba(1,16,29,0.1) 58%, transparent 78%),
            linear-gradient(90deg, #06273a 0%, #041827 20%, #030d19 45%, #030913 68%, #030913 100%);
        }
        .about-founder-bg::before {
          background:
            linear-gradient(90deg, rgba(2,8,16,0.06) 0%, rgba(2,8,16,0.22) 28%, rgba(2,8,16,0.82) 60%, rgba(2,8,16,0.98) 100%),
            linear-gradient(0deg, rgba(1,4,9,0.84) 0%, rgba(1,4,9,0.1) 26%, transparent 54%);
        }
        .about-founder-bg::after {
          opacity: 0.14;
          background-image:
            linear-gradient(90deg, rgba(0,157,223,0.08) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0,157,223,0.05) 1px, transparent 1px);
          background-size: 14rem 14rem;
          mask-image: radial-gradient(ellipse 72% 70% at 47% 48%, black 0%, transparent 72%);
        }

        /* ─── Constellation ─── */
        .about-founder-network {
          position: absolute;
          inset: 3% 6% 0 14%;
          z-index: -2;
          width: 88%;
          height: 88%;
          overflow: visible;
          opacity: 0.48;
        }
        .about-founder-network path {
          fill: none;
          stroke: rgba(0,157,223,0.09);
          stroke-width: 1.4;
        }
        .about-founder-network circle { fill: rgba(92,135,163,0.28); }
        .about-founder-network circle.is-bright {
          fill: rgba(0,157,223,0.65);
          filter: drop-shadow(0 0 5px rgba(0,157,223,0.3));
        }

        /* ─── Portrait ─── */
        .about-portrait-wrap {
          position: absolute;
          z-index: 0;
          left: clamp(-4rem, -2vw, -0.5rem);
          bottom: 0;
          width: clamp(34rem, 40vw, 52rem);
          will-change: transform;
        }
        .about-founder-portrait {
          display: block;
          width: 100%;
          height: auto;
          max-width: none;
          user-select: none;
          filter: saturate(1.04) contrast(1.02) drop-shadow(0 0 24px rgba(0,157,223,0.12));
        }

        /* ─── Copy ─── */
        .about-founder-copy {
          position: relative;
          z-index: 2;
          width: min(46vw, 58rem);
          margin-left: auto;
          padding: clamp(9rem, 20vh, 14rem) clamp(2.5rem, 4vw, 6rem) 6rem 0;
        }

        .about-eyebrow {
          display: block;
          margin-bottom: 0.55rem;
          font-family: system-ui, sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(0, 157, 223, 0.65);
        }

        .about-founder-copy h2 {
          margin: 0 0 clamp(1.8rem, 2.8vw, 3rem) 0;
          font-family: "Amiko", "Inter", sans-serif;
          font-size: clamp(2.4rem, 3vw, 3.8rem);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          color: rgba(0,157,223,0.15);
          -webkit-text-stroke: 1px rgba(0,120,231,0.8);
          text-shadow: 0 0 22px rgba(0,127,255,0.14);
        }

        .about-founder-body {
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: clamp(1rem, 1.15vw, 1.32rem);
          font-weight: 400;
          line-height: 1.72;
          letter-spacing: 0.008em;
          color: rgba(225, 232, 245, 0.82);
        }
        .about-founder-body p { margin: 0; }
        .about-founder-body p + p { margin-top: clamp(1rem, 1.4vw, 1.6rem); }

        /* ─── Stats ─── */
        .about-stats {
          display: flex;
          gap: clamp(1.5rem, 3vw, 3.5rem);
          margin-top: clamp(2.5rem, 4vw, 4.5rem);
          padding-top: clamp(1.2rem, 2vw, 2rem);
          border-top: 1px solid rgba(0,120,231,0.15);
        }
        .about-stat {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .about-stat strong {
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: clamp(1.5rem, 2vw, 2.1rem);
          font-weight: 400;
          color: #0078e7;
          line-height: 1;
        }
        .about-stat span {
          font-family: system-ui, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
        }

        /* ─── Responsive ─── */
        @media (max-width: 1180px) {
          .about-portrait-wrap { width: clamp(28rem, 42vw, 36rem); left: -4rem; }
          .about-founder-copy {
            width: min(52vw, 42rem);
            padding-right: clamp(1.5rem, 3vw, 3rem);
          }
        }

        @media (max-width: 820px) {
          .about-founder-section {
            flex-direction: column;
            min-height: auto;
            padding-bottom: 4rem;
          }
          .about-founder-bg {
            background:
              radial-gradient(ellipse 78% 46% at 34% 12%, rgba(0,101,149,0.42) 0%, rgba(0,45,70,0.18) 48%, transparent 76%),
              linear-gradient(180deg, #06273a 0%, #030913 44%, #030913 100%);
          }
          .about-founder-bg::before {
            background: linear-gradient(180deg, rgba(2,8,16,0.1) 0%, rgba(2,8,16,0.7) 48%, rgba(2,8,16,0.98) 100%);
          }
          .about-founder-network {
            inset: 0 -25% auto -10%;
            width: 130%;
            height: 52rem;
            opacity: 0.38;
          }
          .about-portrait-wrap {
            position: relative;
            left: auto; bottom: auto;
            width: min(82vw, 24rem);
            margin: 3rem auto -2rem;
          }
          .about-founder-copy {
            width: min(100%, 42rem);
            margin: 0 auto;
            padding: 1.5rem 1.5rem 0;
          }
          .about-founder-body { line-height: 1.68; font-size: clamp(1rem, 4.5vw, 1.18rem); }
          .about-stats { flex-wrap: wrap; gap: 1.2rem 2.4rem; }
        }

        @media (max-width: 480px) {
          .about-portrait-wrap { width: 92vw; margin-left: -5vw; }
          .about-founder-copy { padding-inline: 1rem; }
        }
      `}</style>
    </section>
  );
}
