import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SIDE_IMAGES = [
  "/My_pic2.png",
  "/My_pic3.jpeg",
  "/My_pic4.jpeg",
  "/My_pic5.jpeg",
  "/My_pic6.jpeg",
  "/My_pic7.jpeg",
  "/My_pic8.jpeg",
  "/My_pic9.jpeg",
  "/My_pic10.jpeg",
  "/My_pic11.jpeg",
  "/My_pic12.jpeg",
  "/My_pic13.jpeg",
  "/My_pic14.jpeg",
  "/My_pic15.jpeg",
  "/My_pic16.jpeg",
  "/My_pic17.jpeg"
];


/* ════════════════════════════════════════════
   PERFORMANCE: Detect low-end device
   ════════════════════════════════════════════ */
function isLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mem = (navigator as any).deviceMemory ?? 8;
  return cores <= 4 || mem <= 4;
}

/* ════════════════════════════════════════════
   PERFORMANCE: Tab-visibility pause/resume
   ════════════════════════════════════════════ */
function useVideoPerformance() {
  useEffect(() => {
    const handleVisibility = () => {
      const allVideos = document.querySelectorAll<HTMLVideoElement>(".hero-panel-video");
      if (document.hidden) {
        allVideos.forEach((v) => v.pause());
      } else {
        allVideos.forEach((v) => v.play().catch(() => { }));
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);
}

/* ════════════════════════════════════════════
   Parallax mouse movement on the 3D scene
   ════════════════════════════════════════════ */
function useParallaxMouse() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      const left = document.querySelector<HTMLElement>(".hero-left");
      const right = document.querySelector<HTMLElement>(".hero-right");
      const top = document.querySelector<HTMLElement>(".hero-top");
      const bottom = document.querySelector<HTMLElement>(".hero-bottom");

      if (left) left.style.transform = `rotateY(${8 - x * 3}deg) translateZ(${-20 + x * 5}px)`;
      if (right) right.style.transform = `rotateY(${-8 - x * 3}deg) translateZ(${-20 - x * 5}px)`;
      if (top) top.style.transform = `rotateX(${-6 + y * 2}deg) translateZ(-15px)`;
      if (bottom) bottom.style.transform = `rotateX(${6 + y * 2}deg) translateZ(-15px)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
}

/* ════════════════════════════════════════════
   CUSTOM RED DOT CURSOR
   ════════════════════════════════════════════ */
function RedCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    let raf: number;
    let mx = -100, my = -100;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={dotRef} className="hero-cursor-dot" aria-hidden="true" />;
}

/* ════════════════════════════════════════════
   VIDEO PANEL
   ════════════════════════════════════════════ */
interface VideoPanelProps {
  src: string;
  className: string;
  overlayClass: string;
  blendClass: string;
  posClass: string;
  label?: string;
}

function VideoPanel({ src, className, overlayClass, blendClass, posClass, label }: VideoPanelProps) {
  return (
    <div className={`hero-panel ${className}`} aria-label={label}>
      <video
        className={`hero-panel-video ${posClass}`}
        src={src}
        preload="metadata"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        aria-hidden="true"
      />
      <div className={`hero-panel-overlay ${overlayClass}`} aria-hidden="true" />
      <div className={`hero-panel-blend ${blendClass}`} aria-hidden="true" />
    </div>
  );
}

/* ════════════════════════════════════════════
   SPINNING AVATAR RING
   ════════════════════════════════════════════ */
function AvatarRing() {
  return (
    <motion.div
      className="avatar-ring-wrap"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="avatar-ring" aria-hidden="true" />
      <img
        src="/My_pic.png"
        alt="Nilambar Behera"
        className="avatar-photo"
        draggable={false}
      />
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   ORBITING SIDE CIRCLES
   ════════════════════════════════════════════ */
function OrbitingCircles() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SIDE_IMAGES.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const leftImg = SIDE_IMAGES[index];
  const rightImg = SIDE_IMAGES[(index + 1) % SIDE_IMAGES.length];

  return (
    <div className="orbit-wrapper" aria-hidden="true">
      <AnimatePresence mode="wait">
        <motion.div
          key={`left-${index}`}
          className="orbit-side orbit-left"
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            y: [0, -10, 0] // Slow float
          }}
          exit={{ opacity: 0, x: 20, scale: 0.8 }}
          transition={{
            opacity: { duration: 0.8 },
            x: { duration: 0.8 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <img src={leftImg} alt="" />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`right-${index}`}
          className="orbit-side orbit-right"
          initial={{ opacity: 0, x: 20, scale: 0.8 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            y: [0, 10, 0] // Slow float (offset)
          }}
          exit={{ opacity: 0, x: -20, scale: 0.8 }}
          transition={{
            opacity: { duration: 0.8 },
            x: { duration: 0.8 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <img src={rightImg} alt="" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


/* ════════════════════════════════════════════
   HAWKINS NAME — upside-down flip reveal
   ════════════════════════════════════════════ */
function HawkinsName() {
  return (
    <div className="hawkins-name" aria-label="NilambarSonu">
      NilambarSonu
    </div>
  );
}

/* ════════════════════════════════════════════
   NAKED CENTER — no card, no box, pure float
   ════════════════════════════════════════════ */
function NakedCenter() {
  return (
    <div
      className="hero-center"
      aria-label="Name card"
    >
      {/* Soft atmospheric red glow behind the avatar */}
      <div className="name-atmo-glow" aria-hidden="true" />

      {/* NEW: Orbiting side circles */}
      <OrbitingCircles />

      {/* Spinning avatar ring */}
      <AvatarRing />


      {/* Name text */}
      <HawkinsName />

      {/* Subtitle */}
      <motion.p
        className="name-tagline"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.6 }}
      >
        BCA Student &amp; Aspiring Data Scientist
      </motion.p>

      {/* Red separator */}
      <motion.hr
        className="name-divider"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1, duration: 0.4 }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN LANDING PAGE
   ════════════════════════════════════════════ */
export default function LandingPage() {
  useVideoPerformance();
  useParallaxMouse();
  const lowEnd = isLowEndDevice();

  return (
    <section
      id="home"
      className="hero-section"
      aria-label="Nilambar Behera — Portfolio Homepage"
    >
      <RedCursor />

      {/* Subtle SVG noise grain */}
      <svg className="hero-noise" aria-hidden="true">
        <filter id="hero-noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise-filter)" />
      </svg>

      <div className="hero-grid">

        {/* TOP — fiery vortex */}
        <VideoPanel
          src="/Top.mp4"
          className="hero-top"
          overlayClass="overlay-neutral"
          blendClass="blend-top"
          posClass="video-pos-top"
          label="Top background video"
        />

        {/* LEFT */}
        {!lowEnd ? (
          <VideoPanel
            src="/Left.mp4"
            className="hero-left"
            overlayClass="overlay-left"
            blendClass="blend-left"
            posClass="video-pos-left"
            label="Left background video"
          />
        ) : (
          <div className="hero-left hero-panel" aria-hidden="true"
            style={{ background: "#0a0000" }} />
        )}

        {/* CENTER — FIX 2: fully naked, no card wrapper */}
        <NakedCenter />

        {/* RIGHT */}
        {!lowEnd ? (
          <VideoPanel
            src="/Right.mp4"
            className="hero-right"
            overlayClass="overlay-right"
            blendClass="blend-right"
            posClass="video-pos-right"
            label="Right background video"
          />
        ) : (
          <div className="hero-right hero-panel" aria-hidden="true"
            style={{ background: "#0a0000" }} />
        )}

        {/* BOTTOM — extreme top crop to show riders/faces */}
        <VideoPanel
          src="/Bottom.mp4"
          className="hero-bottom"
          overlayClass="overlay-neutral"
          blendClass="blend-bottom"
          posClass="video-pos-bottom"
          label="Bottom background video"
        />

      </div>

      {/* Atmospheric depth vignette */}
      <div className="hero-vignette" aria-hidden="true" />
    </section>
  );
}
