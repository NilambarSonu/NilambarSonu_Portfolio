import type { CSSProperties } from "react";

const ACHIEVEMENT_FILES = [
  "achievement-01.jpeg",
  "achievement-02.jpeg",
  "achievement-03.jpg",
  "achievement-04.jpeg",
  "achievement-05.jpeg",
  "achievement-06.jpeg",
  "achievement-07.png",
  "achievement-08.jpg",
  "achievement-09.jpg",
  "achievement-10.jpg",
  "achievement-11.jpg",
  "achievement-12.jpg",
  "achievement-13.jpg",
  "achievement-14.jpg",
  "achievement-15.jpg",
  "achievement-16.jpg",
  "achievement-17.jpg",
  "achievement-18.jpg",
  "achievement-19.jpg",
  "achievement-20.jpg",
  "achievement-21.jpg",
  "achievement-22.jpg",
  "achievement-23.jpg",
  "achievement-24.jpg",
  "achievement-25.jpg",
  "achievement-26.jpg",
  "achievement-27.jpg",
  "achievement-28.jpg",
  "achievement-29.jpg",
  "achievement-30.jpg",
  "achievement-31.jpg",
  "achievement-32.jpg",
  "achievement-33.jpg",
  "achievement-34.jpg",
  "achievement-35.jpg",
  "achievement-36.jpg",
  "achievement-37.jpg",
  "achievement-38.jpg",
  "achievement-39.jpg",
  "achievement-40.jpg",
  "achievement-41.jpg",
  "achievement-42.jpg",
  "achievement-43.jpg",
  "achievement-44.jpg",
  "achievement-45.jpg",
  "achievement-46.jpg",
  "achievement-47.jpg",
];

const PORTRAIT_INDEXES = new Set([1, 2, 6, 7, 8, 11, 12, 13, 15, 17, 18, 20, 24, 28, 30, 31, 32, 33, 34, 35]);
const HERO_INDEXES = new Set([3, 9, 10, 21, 23, 26, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]);

const ACHIEVEMENT_IMAGES = ACHIEVEMENT_FILES.map((file, index) => {
  const itemNumber = index + 1;
  return {
    src: `/achievements/${file}`,
    alt: `Achievement gallery image ${itemNumber}`,
    tone: PORTRAIT_INDEXES.has(itemNumber) ? "portrait" : HERO_INDEXES.has(itemNumber) ? "hero" : "wide",
  };
});

function AchievementCard({
  src,
  alt,
  tone,
  featured = false,
  center = false,
  index = 0,
  total = 1,
}: {
  src: string;
  alt: string;
  tone: string;
  featured?: boolean;
  center?: boolean;
  index?: number;
  total?: number;
}) {
  const cardStyle = {
    backgroundImage: `linear-gradient(rgba(3, 9, 19, 0.3), rgba(3, 9, 19, 0.3)), url(${src})`,
    ...(center ? { "--grow-delay": `-${((index % total) / total) * 96}s` } : {}),
  } as CSSProperties;

  return (
    <figure
      className={`achievement-photo-card ${tone}${featured ? " is-featured" : ""}${center ? " is-center" : ""}`}
      style={cardStyle}
    >
      <img src={src} alt={alt} loading="lazy" />
    </figure>
  );
}

export default function Achievements() {
  const topLane = ACHIEVEMENT_IMAGES.filter((_, index) => index % 2 === 0);
  const centerLane = ACHIEVEMENT_IMAGES;
  const bottomLane = ACHIEVEMENT_IMAGES.filter((_, index) => index % 2 === 1);

  return (
    <section id="achievements" className="achievements-premium-section" aria-labelledby="achievements-title">
      <div className="achievements-bg" aria-hidden="true" />
      <svg className="achievements-network" viewBox="0 0 1600 900" aria-hidden="true">
        <path d="M250 790 L550 650 L840 720 L1110 550 L1390 610" />
        <circle cx="250" cy="790" r="10" />
        <circle cx="550" cy="650" r="10" />
        <circle cx="840" cy="720" r="10" className="is-bright" />
        <circle cx="1110" cy="550" r="10" />
        <circle cx="1390" cy="610" r="10" />
      </svg>

      <div className="achievements-heading-shell">
        <h2 id="achievements-title">Achievements</h2>
      </div>

      <div className="achievement-lanes" aria-label="Achievement gallery">
        <div className="achievement-lane achievement-lane-top" aria-hidden="true">
          <div className="achievement-track achievement-track-reverse">
            {[...topLane, ...topLane].map((item, index) => (
              <AchievementCard key={`top-${index}`} {...item} />
            ))}
          </div>
        </div>

        <div className="achievement-lane achievement-lane-center">
          <div className="achievement-track achievement-track-forward">
            {[...centerLane, ...centerLane].map((item, index) => (
              <AchievementCard
                key={`center-${index}`}
                {...item}
                center
                index={index}
                total={centerLane.length}
                featured={index % centerLane.length === 36}
              />
            ))}
          </div>
        </div>

        <div className="achievement-lane achievement-lane-bottom" aria-hidden="true">
          <div className="achievement-track achievement-track-reverse slow">
            {[...bottomLane, ...bottomLane].map((item, index) => (
              <AchievementCard key={`bottom-${index}`} {...item} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .achievements-premium-section {
          position: relative;
          z-index: 40;
          min-height: 100vh;
          overflow: hidden;
          isolation: isolate;
          background: #030913;
          color: #f5f7fa;
        }

        .achievements-bg,
        .achievements-bg::before,
        .achievements-bg::after {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
        }

        .achievements-bg {
          z-index: -5;
          background:
            radial-gradient(ellipse 38% 58% at 34% 15%, rgba(0, 112, 156, 0.22) 0%, rgba(0, 62, 88, 0.08) 45%, transparent 72%),
            radial-gradient(ellipse 42% 52% at 72% 75%, rgba(25, 75, 160, 0.2) 0%, rgba(11, 38, 88, 0.08) 48%, transparent 78%),
            linear-gradient(180deg, #030913 0%, #06111e 48%, #030913 100%);
        }

        .achievements-bg::before {
          opacity: 0.9;
          background:
            linear-gradient(150deg, transparent 0%, transparent 27%, rgba(132, 160, 188, 0.05) 30%, rgba(40, 78, 112, 0.18) 32%, rgba(0, 187, 255, 0.2) 35%, rgba(0, 187, 255, 0.08) 39%, transparent 47%),
            linear-gradient(162deg, transparent 0%, transparent 55%, rgba(45, 95, 190, 0.06) 58%, rgba(68, 124, 255, 0.18) 61%, rgba(68, 124, 255, 0.07) 66%, transparent 75%);
          filter: blur(0.5px);
        }

        .achievements-bg::after {
          background:
            linear-gradient(180deg, rgba(2, 6, 13, 0.82) 0%, transparent 15%, transparent 82%, rgba(2, 6, 13, 0.9) 100%),
            linear-gradient(90deg, rgba(2, 6, 13, 0.7) 0%, transparent 18%, transparent 82%, rgba(2, 6, 13, 0.74) 100%);
        }

        .achievements-network {
          position: absolute;
          right: -4vw;
          bottom: -1vh;
          width: min(72rem, 74vw);
          height: auto;
          z-index: -1;
          opacity: 0.42;
          pointer-events: none;
        }

        .achievements-network path {
          fill: none;
          stroke: rgba(43, 98, 160, 0.22);
          stroke-width: 1;
          stroke-dasharray: 8 16;
        }

        .achievements-network circle {
          fill: #00bfff;
          opacity: 0.82;
          filter: drop-shadow(0 0 12px rgba(0, 191, 255, 0.7));
        }

        .achievements-network circle.is-bright {
          fill: #4f8cff;
        }

        .achievements-heading-shell {
          position: absolute;
          left: 50%;
          top: clamp(4rem, 10vh, 7rem);
          z-index: 12;
          transform: translateX(-50%);
          padding: 0.35rem 1.45rem 0.2rem;
          border: 1px solid rgba(0, 127, 255, 0.88);
          background: rgba(0, 127, 255, 0.05);
          box-shadow: 0 0 26px rgba(0, 127, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(10px);
        }

        .achievements-heading-shell h2 {
          margin: 0;
          font-family: "Amiko", "Inter", sans-serif;
          font-size: clamp(1.8rem, 2.1vw, 2.65rem);
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0;
          text-transform: uppercase;
          color: rgba(0, 157, 223, 0.18);
          -webkit-text-stroke: 1px #007fff;
          text-shadow: 0 0 18px rgba(0, 127, 255, 0.2);
        }

        .achievement-lanes {
          position: absolute;
          inset: 0;
          z-index: 5;
          transform: rotate(-15deg) scale(1.08);
          transform-origin: 50% 50%;
        }

        .achievement-lane {
          position: absolute;
          left: -18vw;
          width: 136vw;
          overflow: visible;
        }

        .achievement-lane-top {
          top: 8vh;
          opacity: 0.5;
        }

        .achievement-lane-center {
          top: 38vh;
          z-index: 7;
        }

        .achievement-lane-bottom {
          top: 66vh;
          opacity: 0.5;
        }

        .achievement-track {
          display: flex;
          align-items: center;
          width: max-content;
          gap: clamp(1.4rem, 2vw, 2.6rem);
          will-change: transform;
        }

        .achievement-track-forward {
          animation: achievement-drift-forward 96s linear infinite;
        }

        .achievement-track-reverse {
          animation: achievement-drift-reverse 120s linear infinite;
        }

        .achievement-track-reverse.slow {
          animation-duration: 132s;
        }

        .achievement-photo-card {
          flex: 0 0 auto;
          width: clamp(12rem, 15vw, 19rem);
          height: clamp(12.5rem, 18vw, 22rem);
          margin: 0;
          overflow: hidden;
          border-radius: 1.6rem;
          position: relative;
          background-color: rgba(6, 14, 26, 0.72);
          background-position: center;
          background-size: cover;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 2.2rem 4.6rem rgba(0, 0, 0, 0.58), 0 0 0 1px rgba(0, 191, 255, 0.05);
          transform: rotate(15deg);
        }

        .achievement-photo-card::before {
          position: absolute;
          inset: 0;
          content: "";
          background: inherit;
          filter: blur(18px) saturate(1.1);
          transform: scale(1.12);
          opacity: 0;
        }

        .achievement-photo-card.wide {
          width: clamp(15.5rem, 22vw, 28rem);
          height: clamp(10rem, 13.5vw, 17rem);
        }

        .achievement-photo-card.portrait {
          width: clamp(11rem, 13vw, 16rem);
          height: clamp(17rem, 23vw, 29rem);
        }

        .achievement-photo-card.hero,
        .achievement-photo-card.is-featured {
          width: clamp(22rem, 33vw, 42rem);
          height: clamp(14rem, 22vw, 27rem);
          border-radius: 1.85rem;
          border-color: rgba(0, 191, 255, 0.16);
          box-shadow: 0 2.8rem 6rem rgba(0, 0, 0, 0.62), 0 0 32px rgba(0, 127, 255, 0.16);
        }

        .achievement-photo-card.is-center {
          animation: achievement-card-grow 96s linear infinite;
          animation-delay: var(--grow-delay);
        }

        .achievement-photo-card img {
          position: relative;
          z-index: 1;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          filter: saturate(0.96) contrast(1.04);
        }

        .achievement-photo-card.portrait img {
          object-fit: contain;
          object-position: center center;
          padding: clamp(0.28rem, 0.45vw, 0.55rem);
        }

        .achievement-photo-card.portrait::before {
          opacity: 0.72;
        }

        .achievement-photo-card.hero img {
          object-position: center 14%;
        }

        .achievements-premium-section::before {
          position: absolute;
          inset: 0;
          z-index: 10;
          content: "";
          pointer-events: none;
          background:
            radial-gradient(circle at 76% 67%, rgba(0, 191, 255, 0.18), transparent 1.1rem),
            radial-gradient(circle at 14% 18%, rgba(255, 32, 72, 0.28), transparent 0.75rem);
        }

        .achievements-premium-section::after {
          position: absolute;
          inset: 0;
          z-index: 11;
          content: "";
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(2, 6, 13, 0.65), transparent 15%, transparent 84%, rgba(2, 6, 13, 0.72)),
            linear-gradient(180deg, rgba(2, 6, 13, 0.68), transparent 16%, transparent 80%, rgba(2, 6, 13, 0.82));
        }

        @keyframes achievement-drift-forward {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0%, 0, 0); }
        }

        @keyframes achievement-drift-reverse {
          from { transform: translate3d(0%, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes achievement-card-grow {
          0% {
            transform: rotate(15deg) scale(0.58);
            opacity: 0.82;
          }
          18% {
            transform: rotate(15deg) scale(0.72);
            opacity: 0.9;
          }
          62% {
            transform: rotate(15deg) scale(0.96);
            opacity: 1;
          }
          88% {
            transform: rotate(15deg) scale(1.06);
            opacity: 1;
          }
          100% {
            transform: rotate(15deg) scale(1.08);
            opacity: 0.92;
          }
        }

        @media (max-width: 900px) {
          .achievements-premium-section {
            min-height: 41rem;
          }

          .achievement-lanes {
            transform: rotate(-10deg) scale(1.03);
            top: 2.5rem;
          }

          .achievement-lane {
            left: -46vw;
            width: 192vw;
          }

          .achievement-lane-top {
            top: 7rem;
          }

          .achievement-lane-center {
            top: 16.5rem;
          }

          .achievement-lane-bottom {
            top: 27rem;
          }

          .achievement-photo-card {
            width: 8.8rem;
            height: 10.4rem;
            border-radius: 0.9rem;
            transform: rotate(10deg);
          }

          .achievement-photo-card.wide {
            width: 11.6rem;
            height: 7.5rem;
          }

          .achievement-photo-card.hero,
          .achievement-photo-card.is-featured {
            width: 15.8rem;
            height: 10rem;
          }

          .achievements-heading-shell {
            top: 2.4rem;
          }

          @keyframes achievement-card-grow {
            0% {
              transform: rotate(10deg) scale(0.74);
              opacity: 0.84;
            }
            45% {
              transform: rotate(10deg) scale(0.9);
              opacity: 0.96;
            }
            100% {
              transform: rotate(10deg) scale(0.98);
              opacity: 1;
            }
          }
        }

        @media (max-width: 480px) {
          .achievements-premium-section {
            min-height: 36rem;
          }

          .achievement-lanes {
            transform: rotate(-8deg) scale(1);
          }

          .achievement-lane {
            left: -64vw;
            width: 230vw;
          }

          .achievement-lane-top {
            top: 6.4rem;
            opacity: 0.38;
          }

          .achievement-lane-center {
            top: 15.2rem;
          }

          .achievement-lane-bottom {
            top: 24.2rem;
            opacity: 0.38;
          }

          .achievement-track {
            gap: 1rem;
          }

          .achievement-photo-card {
            width: 7.5rem;
            height: 8.8rem;
            transform: rotate(8deg);
          }

          .achievement-photo-card.wide {
            width: 9.8rem;
            height: 6.3rem;
          }

          .achievement-photo-card.hero,
          .achievement-photo-card.is-featured {
            width: 13rem;
            height: 8.2rem;
          }

          .achievements-heading-shell h2 {
            font-size: 1.36rem;
          }
        }
      `}</style>
    </section>
  );
}
