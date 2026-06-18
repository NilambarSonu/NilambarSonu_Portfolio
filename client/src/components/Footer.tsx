import { motion } from "framer-motion";

const footerLinks = [
  [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Academic", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
  ],
  [
    { label: "Achievements", href: "#achievements" },
    { label: "Resume", href: "#resume" },
    { label: "Activity", href: "#github" },
    { label: "Contact", href: "#contact" },
    { label: "Footer", href: "#footer" },
  ],
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="portfolio-footer" aria-label="Footer">
      <motion.div
        className="footer-shell"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <a
          className="footer-map-card"
          aria-label="Open map for Bhadrak Autonomous College"
          href="https://www.openstreetmap.org/?mlat=21.06635993659276&mlon=86.48831625099825#map=17/21.06635993659276/86.48831625099825"
          target="_blank"
          rel="noopener noreferrer"
        >
          <iframe
            title="OpenStreetMap showing Bhadrak Autonomous College, Bhadrak"
            src="https://www.openstreetmap.org/export/embed.html?bbox=86.48031625099825%2C21.06035993659276%2C86.49631625099825%2C21.07235993659276&layer=mapnik"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="footer-map-pin" aria-hidden="true">
              <span className="pin-dot" />
              <span className="pin-label">Bhadrak Auto. Clg<br />Bhadrak, Odisha, India</span>
            </div>
        </a>

        <nav className="footer-nav" aria-label="Footer navigation">
          {footerLinks.map((group, groupIndex) => (
            <div className="footer-link-column" key={groupIndex}>
              {group.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="footer-video-card" aria-label="Typing video">
          <video
            src="/footer/typing.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        <p className="footer-credit">© {currentYear} Nilambar Behera · Built in Odisha, India</p>
      </motion.div>

      <style>{`
        .portfolio-footer {
          position: relative;
          z-index: 40;
          padding: clamp(1.6rem, 3vw, 2.8rem);
          background: #030913;
          color: #f5f7fa;
          overflow: hidden;
        }

        .portfolio-footer::before {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
          background:
            radial-gradient(ellipse 36% 80% at 16% 40%, rgba(0, 157, 223, 0.12), transparent 72%),
            radial-gradient(ellipse 34% 70% at 88% 62%, rgba(43, 91, 174, 0.14), transparent 74%),
            linear-gradient(180deg, rgba(3, 9, 19, 0.92), #030913);
        }

        .footer-shell {
          position: relative;
          display: grid;
          grid-template-columns: minmax(28rem, 44vw) minmax(21rem, 25vw) minmax(18rem, 22vw);
          gap: clamp(2.4rem, 4vw, 5.2rem);
          align-items: center;
          min-height: clamp(19rem, 28vw, 27rem);
          padding: clamp(1rem, 1.8vw, 1.4rem) clamp(1.1rem, 2vw, 2rem);
          border-radius: clamp(2rem, 5vw, 5.4rem);
          border: 1px solid rgba(0, 127, 255, 0.14);
          background:
            radial-gradient(ellipse 45% 100% at 28% 42%, rgba(0, 157, 223, 0.08), transparent 72%),
            linear-gradient(110deg, rgba(7, 23, 49, 0.98) 0%, rgba(17, 45, 90, 0.98) 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 28px 90px rgba(0, 0, 0, 0.34);
          overflow: hidden;
        }

        .footer-map-card {
          position: relative;
          display: block;
          height: clamp(15.5rem, 22vw, 23.5rem);
          overflow: hidden;
          border-radius: 1.65rem;
          background: #e9e7df;
          box-shadow: 0 0 0 0.65rem rgba(255, 255, 255, 0.94), 0 18px 48px rgba(0, 0, 0, 0.28);
          cursor: pointer;
        }

        .footer-map-card iframe {
          width: 100%;
          height: 100%;
          border: 0;
          filter: saturate(0.82) contrast(0.96);
          pointer-events: none;
        }

        .footer-map-card::after {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(0, 38, 77, 0.05));
        }

        .footer-map-pin {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 3;
          width: 2.15rem;
          height: 2.15rem;
          transform: translate(-50%, -100%);
          display: grid;
          place-items: center;
          pointer-events: none;
        }

        .pin-dot {
          position: relative;
          display: block;
          width: 2.15rem;
          height: 2.15rem;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          background: linear-gradient(135deg, #001a4d 0%, #004bff 55%, #00bfff 100%);
          box-shadow: 0 0 18px rgba(0, 75, 255, 0.78), 0 10px 22px rgba(0, 0, 0, 0.24);
        }

        .pin-dot::before {
          position: absolute;
          inset: 0.58rem;
          content: "";
          border-radius: 50%;
          background: #d9f5ff;
          box-shadow: inset 0 0 6px rgba(0, 75, 255, 0.55);
        }

        .pin-label {
          position: absolute;
          left: 50%;
          bottom: calc(100% + 0.9rem);
          transform: translateX(-50%);
          min-width: 12.5rem;
          padding: 0.72rem 0.9rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(0, 127, 255, 0.32);
          background: rgba(3, 9, 19, 0.9);
          color: #f5f7fa;
          font-family: "Inter", sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          line-height: 1.25;
          text-align: center;
          box-shadow: 0 12px 34px rgba(0, 0, 0, 0.3), 0 0 22px rgba(0, 127, 255, 0.2);
        }

        .pin-label::after {
          position: absolute;
          left: 50%;
          top: 100%;
          content: "";
          transform: translateX(-50%);
          border: 0.42rem solid transparent;
          border-top-color: rgba(3, 9, 19, 0.9);
        }

        .footer-nav {
          display: grid;
          grid-template-columns: repeat(2, minmax(8rem, 1fr));
          gap: clamp(2rem, 3.2vw, 4rem);
          justify-self: center;
          width: 100%;
        }

        .footer-link-column {
          display: grid;
          gap: clamp(1.15rem, 2vw, 1.9rem);
        }

        .footer-link-column a {
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: clamp(1.3rem, 1.65vw, 2.05rem);
          font-weight: 700;
          line-height: 1;
          color: rgba(245, 247, 250, 0.9);
          text-decoration: none;
          transition: color 0.25s ease, transform 0.25s ease, text-shadow 0.25s ease;
        }

        .footer-link-column a:hover {
          color: #00bfff;
          transform: translateX(0.35rem);
          text-shadow: 0 0 18px rgba(0, 191, 255, 0.36);
        }

        .footer-video-card {
          position: relative;
          height: clamp(14.5rem, 20vw, 21.5rem);
          overflow: hidden;
          border-radius: 1.35rem;
          background: rgba(100, 117, 180, 0.5);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 20px 54px rgba(0, 0, 0, 0.22);
        }

        .footer-video-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0.96;
          filter: saturate(0.96) contrast(1.04);
        }

        .footer-video-card::after {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
          background:
            radial-gradient(circle at 76% 14%, rgba(0, 191, 255, 0.22), transparent 0.25rem),
            linear-gradient(180deg, rgba(7, 23, 49, 0.05), rgba(7, 23, 49, 0.22));
        }

        .footer-credit {
          position: absolute;
          left: 50%;
          bottom: 0.8rem;
          margin: 0;
          transform: translateX(-50%);
          font-family: "Inter", sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: rgba(245, 247, 250, 0.38);
          text-align: center;
          white-space: nowrap;
        }

        @media (max-width: 1180px) {
          .footer-shell {
            grid-template-columns: 1.1fr 0.9fr;
          }

          .footer-nav {
            grid-column: 1 / -1;
            grid-row: 2;
            max-width: 38rem;
          }

          .footer-video-card {
            height: 100%;
            min-height: 17rem;
          }
        }

        @media (max-width: 760px) {
          .portfolio-footer {
            padding: 1rem;
          }

          .footer-shell {
            grid-template-columns: 1fr;
            gap: 1.6rem;
            padding: 1rem 1rem 3.2rem;
            border-radius: 2rem;
          }

          .footer-map-card,
          .footer-video-card {
            height: 15rem;
          }

          .footer-nav {
            grid-column: auto;
            grid-row: auto;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.2rem;
          }

          .footer-link-column {
            gap: 1rem;
          }

          .footer-link-column a {
            font-size: 1.35rem;
          }

          .pin-label {
            min-width: 10.4rem;
            font-size: 0.72rem;
          }

          .footer-credit {
            width: calc(100% - 2rem);
            white-space: normal;
          }
        }
      `}</style>
    </footer>
  );
}
