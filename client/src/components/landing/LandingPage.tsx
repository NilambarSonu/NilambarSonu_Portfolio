const stars = [
  ["8%", "18%"],
  ["18%", "30%"],
  ["28%", "20%"],
  ["36%", "43%"],
  ["47%", "27%"],
  ["58%", "16%"],
  ["68%", "10%"],
  ["78%", "28%"],
  ["88%", "17%"],
  ["94%", "48%"],
  ["7%", "79%"],
  ["20%", "89%"],
  ["33%", "70%"],
  ["48%", "83%"],
  ["61%", "74%"],
  ["76%", "86%"],
] as const;

export default function LandingPage() {
  return (
    <section
      id="home"
      className="landing-hero relative z-50 min-h-screen w-full overflow-hidden"
      style={{ minHeight: "100svh" }}
      aria-label="Nilambar Behera portfolio landing section"
    >
      <div className="landing-bg" aria-hidden="true" />
      <div className="landing-rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="landing-stars" aria-hidden="true">
        {stars.map(([left, top], index) => (
          <span key={`${left}-${top}`} style={{ left, top, animationDelay: `${index * 0.23}s` }} />
        ))}
      </div>

      <img
        src="/profile_photo.png"
        alt=""
        draggable={false}
        className="landing-portrait"
        aria-hidden="true"
      />

      <div className="landing-copy">
        <p className="landing-eyebrow">Hey, I&apos;m</p>
        <h1>Nilambar Behera</h1>
        <div className="landing-role" aria-label="Founder and CEO of Mitti-AI">
          <p>Founder &amp; CEO</p>
          <p>Mitti-AI</p>
        </div>
        <p className="landing-tagline">Building AI Infrastructure For Agriculture</p>
      </div>

      <style>{`
        .landing-hero {
          isolation: isolate;
          background: #030913;
          color: #ffffff;
        }

        .landing-bg,
        .landing-bg::before,
        .landing-bg::after {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
        }

        .landing-bg {
          z-index: -5;
          background:
            radial-gradient(ellipse 62% 95% at 78% 48%, rgba(0, 120, 231, 0.95) 0%, rgba(0, 111, 212, 0.86) 18%, rgba(4, 73, 122, 0.6) 39%, rgba(3, 21, 36, 0.76) 58%, rgba(3, 9, 19, 0) 76%),
            radial-gradient(ellipse 46% 64% at 55% 47%, rgba(0, 126, 220, 0.18) 0%, rgba(0, 126, 220, 0.08) 38%, transparent 70%),
            linear-gradient(90deg, #030913 0%, #030913 31%, #041020 52%, #0a4777 78%, #126eb8 100%);
        }

        .landing-bg::before {
          background:
            linear-gradient(90deg, rgba(3, 9, 19, 0.98) 0%, rgba(3, 9, 19, 0.92) 23%, rgba(3, 9, 19, 0.42) 47%, rgba(3, 9, 19, 0.06) 74%),
            linear-gradient(0deg, rgba(1, 4, 9, 0.92) 0%, rgba(1, 4, 9, 0.3) 28%, rgba(1, 4, 9, 0) 58%);
        }

        .landing-bg::after {
          opacity: 0.32;
          background-image:
            radial-gradient(circle at 9% 5%, rgba(255,255,255,0.28) 0 1px, transparent 1.5px),
            radial-gradient(circle at 38% 24%, rgba(255,255,255,0.18) 0 1px, transparent 1.5px),
            radial-gradient(circle at 54% 53%, rgba(0,180,255,0.22) 0 1px, transparent 1.5px),
            radial-gradient(circle at 87% 36%, rgba(255,255,255,0.22) 0 1px, transparent 1.5px);
          background-size: 19rem 16rem, 27rem 21rem, 23rem 20rem, 31rem 22rem;
        }

        .landing-rings {
          position: absolute;
          inset: 0;
          z-index: -3;
          pointer-events: none;
          opacity: 0.62;
        }

        .landing-rings span {
          position: absolute;
          aspect-ratio: 1;
          border-radius: 9999px;
          border: 1px solid rgba(0, 120, 231, 0.095);
          box-shadow: inset 0 0 42px rgba(0, 120, 231, 0.018);
        }

        .landing-rings span:nth-child(1) {
          width: min(88vw, 92rem);
          left: -13%;
          top: -50%;
        }

        .landing-rings span:nth-child(2) {
          width: min(66vw, 70rem);
          left: 17%;
          top: -36%;
          opacity: 0.78;
        }

        .landing-rings span:nth-child(3) {
          width: min(58vw, 62rem);
          right: -10%;
          top: -35%;
          opacity: 0.5;
        }

        .landing-stars span {
          position: absolute;
          z-index: -2;
          width: 3px;
          height: 3px;
          border-radius: 9999px;
          background: rgba(65, 176, 255, 0.28);
          box-shadow: 0 0 12px rgba(0, 120, 231, 0.3);
          animation: landingStarPulse 4.6s ease-in-out infinite;
        }

        .landing-portrait {
          position: absolute;
          z-index: -1;
          right: clamp(-2.5rem, -1.1vw, -0.6rem);
          bottom: clamp(-1.5rem, -1vw, -0.2rem);
          width: clamp(34rem, 42vw, 54rem);
          max-width: none;
          height: auto;
          user-select: none;
          filter: saturate(1.04) contrast(1.04) drop-shadow(-22px 10px 38px rgba(0, 0, 0, 0.28));
        }

        .landing-copy {
          position: absolute;
          left: clamp(2.3rem, 3.1vw, 6rem);
          top: clamp(14rem, 40.8vh, 26.5rem);
          width: min(47vw, 54rem);
          user-select: none;
        }

        .landing-eyebrow {
          margin: 0 0 clamp(-0.35rem, -0.18vw, -0.08rem) 0.2rem;
          font-family: "Hurricane", cursive;
          font-size: clamp(2.2rem, 3.1vw, 3.25rem);
          line-height: 1;
          letter-spacing: 0;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 2px 18px rgba(255, 255, 255, 0.08);
        }

        .landing-copy h1 {
          display: inline-block;
          margin: 0;
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: clamp(4.15rem, 5.05vw, 6.45rem);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: 0.035em;
          text-transform: uppercase;
          color: #0078e7;
          text-shadow: 0 0 30px rgba(0, 120, 231, 0.12);
          transform: translateX(-0.55rem) scaleX(0.895);
          transform-origin: left center;
          white-space: nowrap;
        }

        .landing-role {
          width: min(34rem, 100%);
          margin-top: clamp(0.9rem, 1.35vw, 1.65rem);
          text-align: center;
          color: rgba(255, 255, 255, 0.94);
          font-family: "Crimson Text", Georgia, serif;
          font-weight: 400;
          text-shadow: 0 3px 22px rgba(0, 0, 0, 0.32);
        }

        .landing-role p {
          margin: 0;
          font-size: clamp(1.62rem, 2vw, 2.35rem);
          line-height: 1.13;
          letter-spacing: 0.01em;
        }

        .landing-role p + p {
          margin-top: clamp(0.25rem, 0.45vw, 0.58rem);
          font-size: clamp(1.45rem, 1.78vw, 2.1rem);
        }

        .landing-tagline {
          width: min(41rem, 100%);
          margin: clamp(0.95rem, 1.45vw, 1.85rem) 0 0 clamp(6.4rem, 7.7vw, 10rem);
          font-family: "Gaegu", cursive;
          font-size: clamp(1.35rem, 1.58vw, 2rem);
          line-height: 1.2;
          letter-spacing: 0.035em;
          color: rgba(255, 255, 255, 0.96);
          white-space: nowrap;
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.36);
        }

        @keyframes landingStarPulse {
          0%, 100% {
            opacity: 0.16;
            transform: scale(0.85);
          }
          45% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }

        @media (max-width: 1180px) {
          .landing-copy {
            width: min(54vw, 42rem);
          }

          .landing-copy h1 {
            font-size: clamp(3.45rem, 5.2vw, 4.35rem);
          }

          .landing-portrait {
            width: clamp(29rem, 44vw, 38rem);
            right: -3.8rem;
          }
        }

        @media (max-width: 820px) {
          .landing-hero {
            min-height: 100svh;
          }

          .landing-bg {
            background:
              radial-gradient(ellipse 90% 58% at 86% 28%, rgba(0, 120, 231, 0.86) 0%, rgba(0, 95, 180, 0.52) 34%, rgba(3, 9, 19, 0) 72%),
              radial-gradient(ellipse 72% 42% at 8% 92%, rgba(0, 157, 223, 0.18) 0%, rgba(3, 9, 19, 0) 70%),
              linear-gradient(180deg, #081b32 0%, #030913 54%, #02060d 100%);
          }

          .landing-bg::before {
            background:
              linear-gradient(180deg, rgba(3, 9, 19, 0.08) 0%, rgba(3, 9, 19, 0.18) 36%, rgba(3, 9, 19, 0.94) 81%),
              linear-gradient(90deg, rgba(3, 9, 19, 0.94) 0%, rgba(3, 9, 19, 0.38) 48%, rgba(3, 9, 19, 0.1) 100%);
          }

          .landing-rings span:nth-child(1) {
            width: 55rem;
            left: -26rem;
            top: -24rem;
          }

          .landing-rings span:nth-child(2) {
            width: 38rem;
            left: -6rem;
            top: -17rem;
          }

          .landing-rings span:nth-child(3) {
            width: 34rem;
            right: -18rem;
            top: -10rem;
          }

          .landing-portrait {
            width: min(92vw, 34rem);
            right: -7.4rem;
            bottom: clamp(2rem, 7vh, 4.4rem);
            opacity: 0.88;
            filter: saturate(1.04) contrast(1.05) drop-shadow(-18px 10px 34px rgba(0, 0, 0, 0.36));
          }

          .landing-copy {
            left: clamp(1.35rem, 6vw, 3rem);
            top: auto;
            bottom: clamp(2.2rem, 5.8vh, 4rem);
            width: min(84vw, 33rem);
          }

          .landing-eyebrow {
            font-size: clamp(1.8rem, 8vw, 2.75rem);
          }

          .landing-copy h1 {
            font-size: clamp(2.8rem, 11.4vw, 4.55rem);
            line-height: 0.98;
            white-space: normal;
          }

          .landing-role {
            width: min(19rem, 78vw);
            margin-top: 1.15rem;
            margin-left: auto;
            margin-right: auto;
          }

          .landing-role p {
            font-size: clamp(1.65rem, 7vw, 2.35rem);
          }

          .landing-role p + p {
            font-size: clamp(1.45rem, 6.2vw, 2.05rem);
          }

          .landing-tagline {
            margin-left: 0;
            width: min(21rem, 78vw);
            font-size: clamp(1.15rem, 5.35vw, 1.65rem);
            white-space: normal;
          }
        }

        @media (max-width: 480px) {
          .landing-portrait {
            width: 104vw;
            right: -11.2rem;
            bottom: 7.5rem;
            opacity: 0.78;
          }

          .landing-copy {
            bottom: 2.2rem;
          }

          .landing-copy h1 {
            font-size: clamp(2.55rem, 13.8vw, 3.65rem);
            max-width: 13.5rem;
          }

          .landing-role {
            transform: translateX(1.4rem);
          }

          .landing-tagline {
            max-width: 16.5rem;
          }
        }

        @media (max-width: 380px) {
          .landing-portrait {
            right: -10.7rem;
            bottom: 7.8rem;
          }

          .landing-copy h1 {
            font-size: clamp(2.38rem, 13vw, 3.3rem);
          }
        }
      `}</style>
    </section>
  );
}
