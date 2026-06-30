import { useRef, useState } from "react";
import { Disc3, Pause, Play } from "lucide-react";

const SONG_NAME = "Running Up That Hill";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    audio.volume = 0.34;
    audio.play().catch(() => setIsPlaying(false));
  };

  return (
    <aside className={`audio-card${isPlaying ? " is-playing" : ""}`} aria-label="Music player">
      <button
        className="audio-disc-button"
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <span className="audio-disc" aria-hidden="true">
          <span className="audio-disc-groove" />
          <span className="audio-disc-label">
            <Disc3 size={15} />
          </span>
        </span>
        <span className="audio-action" aria-hidden="true">
          {isPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
        </span>
      </button>

      <div className="audio-meta">
        <span className="audio-kicker">{isPlaying ? "Now playing" : "Music"}</span>
        <span className="audio-title">{SONG_NAME}</span>
      </div>

      <audio
        ref={audioRef}
        src="/Running Up That Hill.mp3"
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <style>{`
        .audio-card {
          position: fixed;
          right: clamp(0.85rem, 2vw, 1.5rem);
          bottom: clamp(0.85rem, 2vw, 1.5rem);
          z-index: 70;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.34rem;
          width: 5.2rem;
          padding: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          color: #f5f7fa;
          user-select: none;
        }

        .audio-card::before {
          display: none;
        }

        .audio-disc-button {
          position: relative;
          display: grid;
          place-items: center;
          width: 3.9rem;
          height: 3.9rem;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: rgba(3, 9, 19, 0.2);
          color: #dff5ff;
          cursor: pointer;
          filter: drop-shadow(0 16px 26px rgba(0,0,0,0.42));
        }

        .audio-disc-button:focus-visible {
          outline: 2px solid rgba(65, 176, 255, 0.75);
          outline-offset: 4px;
        }

        .audio-disc {
          position: absolute;
          inset: 0.16rem;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background:
            radial-gradient(circle at 50% 50%, #06101d 0 12%, transparent 12.5%),
            repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0 1px, transparent 1px 6px),
            conic-gradient(from 120deg, #0a0f18, #152235, #04070c, #223552, #070b12, #0a0f18);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 22px rgba(0, 157, 223, 0.12);
        }

        .audio-card.is-playing .audio-disc {
          animation: audioSpin 3.8s linear infinite;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12), 0 0 26px rgba(0, 157, 223, 0.32);
        }

        .audio-disc-groove {
          position: absolute;
          inset: 0.62rem;
          border-radius: 50%;
          border: 1px solid rgba(210, 240, 255, 0.14);
        }

        .audio-disc-label {
          position: relative;
          display: grid;
          place-items: center;
          width: 1.54rem;
          height: 1.54rem;
          border-radius: 50%;
          color: #41b0ff;
          background: radial-gradient(circle, rgba(223, 245, 255, 0.96), rgba(100, 184, 255, 0.75));
          box-shadow: 0 0 16px rgba(65, 176, 255, 0.28);
        }

        .audio-action {
          position: absolute;
          right: -0.1rem;
          bottom: -0.05rem;
          display: grid;
          place-items: center;
          width: 1.45rem;
          height: 1.45rem;
          border-radius: 50%;
          border: 1px solid rgba(65, 176, 255, 0.34);
          background: rgba(3, 9, 19, 0.95);
          color: #41b0ff;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
        }

        .audio-meta {
          position: relative;
          z-index: 1;
          min-width: 0;
          display: grid;
          gap: 0.2rem;
          width: max-content;
          max-width: 9.8rem;
          padding: 0.34rem 0.46rem;
          border: 1px solid rgba(110, 180, 255, 0.16);
          border-radius: 0.52rem;
          background: rgba(3, 9, 19, 0.86);
          box-shadow: 0 12px 30px rgba(0,0,0,0.32);
          opacity: 0;
          max-height: 0;
          padding-top: 0;
          padding-bottom: 0;
          border-width: 0;
          overflow: hidden;
          transform: translateY(-0.18rem);
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s ease, max-height 0.22s ease, padding 0.22s ease;
        }

        .audio-card.is-playing .audio-meta {
          opacity: 1;
          max-height: 3.8rem;
          padding: 0.34rem 0.46rem;
          border-width: 1px;
          transform: translateY(0);
        }

        .audio-kicker {
          font-family: system-ui, sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(65, 176, 255, 0.7);
        }

        .audio-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 650;
          color: rgba(245, 247, 250, 0.9);
        }

        @keyframes audioSpin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 520px) {
          .audio-card {
            width: 4.4rem;
          }

          .audio-meta {
            max-width: calc(100vw - 2rem);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .audio-card.is-playing .audio-disc {
            animation: none;
          }
        }
      `}</style>
    </aside>
  );
}
