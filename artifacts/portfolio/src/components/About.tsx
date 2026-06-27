import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  [28, 48, 4],
  [162, 184, 7],
  [148, 352, 4],
  [238, 526, 10],
  [410, 742, 5],
  [642, 666, 4],
  [812, 736, 5],
  [422, 300, 3],
  [682, 356, 4],
  [882, 168, 5],
  [1052, 226, 4],
  [1188, 82, 4],
  [1372, 132, 4],
  [1540, 232, 4],
  [980, 64, 4],
  [1174, 220, 8],
  [1238, 344, 7],
  [1138, 448, 4],
  [1282, 602, 4],
  [1416, 702, 5],
  [1030, 362, 5],
  [1192, 312, 6],
  [1368, 420, 4],
  [1526, 342, 4],
] as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <section ref={sectionRef} id="about" className="about-founder-section" aria-labelledby="about-founder-title">
      <div className="about-founder-bg" aria-hidden="true" />

      <svg className="about-founder-network" viewBox="0 0 1600 900" aria-hidden="true">
        {constellationLines.map((d) => (
          <path key={d} d={d} />
        ))}
        {constellationDots.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} className={r > 6 ? "is-bright" : ""} />
        ))}
      </svg>

      <motion.img
        src="/leftsidebar_standing_profile.png"
        alt="Nilambar Behera"
        draggable={false}
        className="about-founder-portrait"
        initial={{ opacity: 0, x: -60, scale: 0.96 }}
        animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />

      <div className="about-founder-copy">
        <motion.h2
          id="about-founder-title"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          The Founder
        </motion.h2>
        <div className="about-founder-body">
          {bodyParagraphs.map((paragraph, i) => (
            <motion.p
              key={paragraph}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.32 + i * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
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
        }

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
            radial-gradient(ellipse 48% 92% at 18% 46%, rgba(0, 101, 149, 0.42) 0%, rgba(0, 62, 88, 0.26) 32%, rgba(1, 16, 29, 0.12) 58%, rgba(3, 9, 19, 0) 78%),
            radial-gradient(ellipse 36% 48% at 38% 63%, rgba(0, 157, 223, 0.11) 0%, rgba(0, 106, 160, 0.05) 44%, transparent 76%),
            linear-gradient(90deg, #06273a 0%, #041827 20%, #030d19 45%, #030913 68%, #030913 100%);
        }

        .about-founder-bg::before {
          background:
            linear-gradient(90deg, rgba(2, 8, 16, 0.06) 0%, rgba(2, 8, 16, 0.22) 28%, rgba(2, 8, 16, 0.8) 58%, rgba(2, 8, 16, 0.98) 100%),
            linear-gradient(0deg, rgba(1, 4, 9, 0.84) 0%, rgba(1, 4, 9, 0.12) 22%, rgba(1, 4, 9, 0) 54%);
        }

        .about-founder-bg::after {
          opacity: 0.18;
          background-image:
            linear-gradient(90deg, rgba(0, 157, 223, 0.08) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0, 157, 223, 0.05) 1px, transparent 1px);
          background-size: 14rem 14rem;
          mask-image: radial-gradient(ellipse 72% 70% at 47% 48%, black 0%, transparent 72%);
        }

        .about-founder-network {
          position: absolute;
          inset: 3% 6% 0 14%;
          z-index: -2;
          width: 88%;
          height: 88%;
          overflow: visible;
          opacity: 0.56;
        }

        .about-founder-network path {
          fill: none;
          stroke: rgba(0, 157, 223, 0.09);
          stroke-width: 1.4;
        }

        .about-founder-network circle {
          fill: rgba(92, 135, 163, 0.34);
        }

        .about-founder-network circle.is-bright {
          fill: rgba(0, 157, 223, 0.72);
          filter: drop-shadow(0 0 5px rgba(0, 157, 223, 0.34));
        }

        .about-founder-portrait {
          position: absolute;
          z-index: -1;
          left: clamp(-3.6rem, -2.4vw, -0.8rem);
          bottom: -0.15rem;
          width: clamp(35rem, 41vw, 54rem);
          max-width: none;
          height: auto;
          user-select: none;
          filter: saturate(1.04) contrast(1.02) drop-shadow(0 0 18px rgba(0, 157, 223, 0.1));
        }

        .about-founder-copy {
          position: relative;
          z-index: 1;
          width: min(47vw, 59rem);
          margin-left: clamp(35rem, 45.2vw, 58rem);
          padding-top: clamp(10.8rem, 22vh, 16.5rem);
          padding-bottom: 5rem;
        }

        .about-founder-copy h2 {
          margin: 0 0 clamp(2.1rem, 3.1vw, 3.55rem) 0;
          font-family: "Amiko", "Inter", sans-serif;
          font-size: clamp(2rem, 2.45vw, 3.1rem);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.06em;
          text-transform: uppercase;
          color: rgba(0, 157, 223, 0.19);
          -webkit-text-stroke: 1px #007fff;
          text-shadow: 0 0 18px rgba(0, 127, 255, 0.18);
        }

        .about-founder-body {
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: clamp(0.98rem, 1.16vw, 1.38rem);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: 0.01em;
          color: rgba(245, 247, 250, 0.82);
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.42);
        }

        .about-founder-body p {
          margin: 0;
          max-width: 58rem;
        }

        .about-founder-body p + p {
          margin-top: clamp(1.05rem, 1.45vw, 1.8rem);
        }

        @media (max-width: 1180px) {
          .about-founder-portrait {
            width: clamp(29rem, 42vw, 36rem);
            left: -4.8rem;
          }

          .about-founder-copy {
            width: min(53vw, 43rem);
            margin-left: clamp(26rem, 41vw, 34rem);
            padding-top: clamp(8rem, 17vh, 10rem);
          }

          .about-founder-body {
            font-size: clamp(1rem, 1.45vw, 1.18rem);
            line-height: 1.18;
          }
        }

        @media (max-width: 820px) {
          .about-founder-section {
            min-height: auto;
            padding: 0 1.35rem 4rem;
          }

          .about-founder-bg {
            background:
              radial-gradient(ellipse 78% 46% at 34% 16%, rgba(0, 101, 149, 0.48) 0%, rgba(0, 45, 70, 0.2) 48%, transparent 76%),
              linear-gradient(180deg, #06273a 0%, #030913 44%, #030913 100%);
          }

          .about-founder-bg::before {
            background:
              linear-gradient(180deg, rgba(2, 8, 16, 0.12) 0%, rgba(2, 8, 16, 0.72) 46%, rgba(2, 8, 16, 0.98) 100%);
          }

          .about-founder-network {
            inset: 0 -25% auto -10%;
            width: 130%;
            height: 52rem;
            opacity: 0.48;
          }

          .about-founder-portrait {
            position: relative;
            display: block;
            z-index: 0;
            left: auto;
            bottom: auto;
            width: min(82vw, 26rem);
            margin: 0 auto -1.25rem;
          }

          .about-founder-copy {
            width: min(100%, 42rem);
            margin: 0 auto;
            padding: 0;
          }

          .about-founder-copy h2 {
            font-size: clamp(2.15rem, 9vw, 3rem);
            margin-bottom: 1.7rem;
            text-align: left;
          }

          .about-founder-body {
            font-size: clamp(1.05rem, 4.8vw, 1.25rem);
            line-height: 1.2;
          }

          .about-founder-body p + p {
            margin-top: 1.25rem;
          }
        }

        @media (max-width: 460px) {
          .about-founder-section {
            padding-inline: 1rem;
          }

          .about-founder-portrait {
            width: 96vw;
            margin-left: -11vw;
          }

          .about-founder-copy h2 {
            letter-spacing: -0.055em;
          }
        }
      `}</style>
    </section>
  );
}
