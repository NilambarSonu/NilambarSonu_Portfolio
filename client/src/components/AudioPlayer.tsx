import { useState, useRef } from 'react';

/* ─────────────────────────────────────────────────────────
   Single pulsing-bars audio toggle.
   Click the circle → play / pause.
   Bars animate when playing, go flat when paused.
   Volume is fixed at 0.4 — no extra controls needed.
───────────────────────────────────────────────────────── */
export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.volume = 0.4;
      audio.play().catch(console.error);
    }
  };

  return (
    <div
      onClick={toggle}
      role="button"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? toggle() : undefined}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: '2px solid rgba(230,57,70,0.7)',
        background: 'rgba(5,0,0,0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        boxShadow: isPlaying
          ? '0 0 20px rgba(230,57,70,0.55), 0 0 40px rgba(230,57,70,0.2)'
          : '0 0 8px rgba(0,0,0,0.6)',
        transition: 'box-shadow 0.35s ease',
        userSelect: 'none',
      }}
    >
      {/* 4 animated bars */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            width: '3px',
            borderRadius: '2px',
            background: '#e63946',
            height: isPlaying ? `${8 + i * 3}px` : '4px',
            animation: isPlaying
              ? `bar-bounce-${i} ${0.55 + i * 0.1}s ease-in-out infinite alternate`
              : 'none',
            transition: 'height 0.3s ease',
          }}
        />
      ))}

      {/* Keyframes injected inline — no extra CSS file needed */}
      <style>{`
        @keyframes bar-bounce-1 { from { height: 4px  } to { height: 16px } }
        @keyframes bar-bounce-2 { from { height: 8px  } to { height: 22px } }
        @keyframes bar-bounce-3 { from { height: 12px } to { height: 18px } }
        @keyframes bar-bounce-4 { from { height: 6px  } to { height: 20px } }
      `}</style>

      <audio
        ref={audioRef}
        src="/Running Up That Hill.mp3"
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
