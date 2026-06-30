import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Users, Heart, Eye, Github } from "lucide-react";
// @ts-ignore
import confetti from "canvas-confetti";
import {
  fetchGitHubStats,
  fetchSiteStats,
  incrementViews,
  incrementLoves,
  getFingerprint,
} from "@/lib/api";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  loading?: boolean;
  isLovable?: boolean;
  onLoveClick?: () => void;
  loved?: boolean;
  compact?: boolean;
}

function StatCard({ icon, label, value, loading, isLovable, onLoveClick, loved, compact }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="stats-card"
      data-compact={compact ? "true" : "false"}
    >
      <div className="stats-card-icon">{icon}</div>

      <div className="stats-card-value">
        {loading ? (
          <div className="stats-card-skeleton" />
        ) : (
          typeof value === "number" ? value.toLocaleString() : value
        )}
      </div>

      <div className="stats-card-label">{label}</div>

      {isLovable && (
        <button
          className={`stats-love-btn${loved ? " loved" : ""}`}
          onClick={onLoveClick}
          disabled={loved}
          aria-label={loved ? "Already loved" : "Love this"}
        >
          <Heart size={compact ? 14 : 16} className={loved ? "filled" : ""} />
          {!compact && <span>{loved ? "Loved!" : "Love This"}</span>}
        </button>
      )}
    </motion.div>
  );
}

interface LiveStatsDashboardProps {
  compact?: boolean;
}

export default function LiveStatsDashboard({ compact = false }: LiveStatsDashboardProps) {
  const [githubStats, setGithubStats] = useState({ followers: 0, following: 0, loading: true });
  const [siteStats, setSiteStats] = useState({ views: 0, loves: 0, loading: true });
  const [loved, setLoved] = useState(false);
  const [lovePending, setLovePending] = useState(false);
  const [showLoveAnimation, setShowLoveAnimation] = useState(false);
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchGitHubStats().then(data => {
      if (!isMounted) return;
      if (data) {
        setGithubStats({ followers: data.followers, following: data.following, loading: false });
      } else {
        setGithubStats(prev => ({ ...prev, loading: false }));
      }
    });

    getFingerprint().then(async fp => {
      if (!isMounted) return;
      setFingerprint(fp);

      // Record view securely on backend
      let newViewCount: number | null = null;
      try {
        newViewCount = await incrementViews(fp);
      } catch (err) {
        console.error("Error recording view:", err);
      }

      // Fetch latest site stats
      const stats = await fetchSiteStats(fp);
      if (!isMounted) return;

      setSiteStats({
        views: newViewCount !== null ? newViewCount : stats.views,
        loves: stats.loves,
        loading: false
      });
      setLoved(stats.hasLoved);
    });

    return () => { isMounted = false; };
  }, []);

  const handleLoveClick = async () => {
    if (loved || lovePending || !fingerprint) return;
    setLovePending(true);
    const result = await incrementLoves(fingerprint);
    if (result?.success) {
      setLoved(true);
      setSiteStats(prev => ({ ...prev, loves: result.newLoveCount }));
      
      // Fire confetti explosion!
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#ff007f", "#ff4b91", "#0078e7", "#00d2ff"]
        });
      } catch (err) {
        console.error("Confetti trigger error:", err);
      }

      setShowLoveAnimation(true);
      setTimeout(() => setShowLoveAnimation(false), 1000);
    } else if (result?.alreadyLoved) {
      setLoved(true);
      setSiteStats(prev => ({ ...prev, loves: result.newLoveCount }));
    }
    setLovePending(false);
  };

  return (
    <>
      {compact ? (
        <div className="stats-compact-wrap">
          <div className="stats-grid" data-compact="true">
            <StatCard icon={<Github size={20} />} label="Followers" value={githubStats.followers} loading={githubStats.loading} compact />
            <StatCard icon={<Users size={20} />} label="Following" value={githubStats.following} loading={githubStats.loading} compact />
            <StatCard icon={<Eye size={20} />} label="Views" value={siteStats.views} loading={siteStats.loading} compact />
            <StatCard icon={<Heart size={20} />} label="Loves" value={siteStats.loves} loading={siteStats.loading} isLovable onLoveClick={handleLoveClick} loved={loved || lovePending} compact />
          </div>
        </div>
      ) : (
        <section id="stats" className="stats-section">
          <div className="stats-section-inner">
            <motion.h2
              className="stats-section-heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Live Stats
            </motion.h2>
            <motion.p
              className="stats-section-sub"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Real-time metrics from GitHub and this site
            </motion.p>
            <div className="stats-grid">
              <StatCard icon={<Github size={28} />} label="Followers" value={githubStats.followers} loading={githubStats.loading} />
              <StatCard icon={<Users size={28} />} label="Following" value={githubStats.following} loading={githubStats.loading} />
              <StatCard icon={<Eye size={28} />} label="Views" value={siteStats.views} loading={siteStats.loading} />
              <StatCard icon={<Heart size={28} />} label="Loves" value={siteStats.loves} loading={siteStats.loading} isLovable onLoveClick={handleLoveClick} loved={loved || lovePending} />
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {showLoveAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="love-overlay"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 4 }}
              exit={{ scale: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ fontSize: "4rem" }}
            >
              ❤️
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ── Compact wrap ── */
        .stats-compact-wrap {
          background: rgba(3, 9, 22, 0.4);
          border: 1px solid rgba(0, 120, 231, 0.15);
          border-radius: 16px;
          padding: 0.85rem;
          backdrop-filter: blur(16px);
          box-shadow: 
            0 4px 30px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        /* ── Stats grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }
        .stats-grid[data-compact="true"] {
          gap: 0.6rem;
        }

        /* ── Stat card ── */
        .stats-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.35rem;
          padding: 1.1rem 0.85rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }
        .stats-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(0, 120, 231, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 0;
        }
        .stats-card:hover {
          border-color: rgba(0, 120, 231, 0.35);
          transform: translateY(-2px);
          box-shadow: 
            0 8px 30px rgba(0, 120, 231, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .stats-card:hover::before {
          opacity: 1;
        }
        
        .stats-card[data-compact="true"] {
          padding: 0.85rem 0.6rem;
          border-radius: 10px;
          gap: 0.25rem;
        }

        .stats-card-icon {
          position: relative;
          z-index: 1;
          color: #0078e7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.4rem;
          background: rgba(0, 120, 231, 0.06);
          border: 1px solid rgba(0, 120, 231, 0.15);
          border-radius: 50%;
          margin-bottom: 0.1rem;
          transition: all 0.3s ease;
        }
        .stats-card:hover .stats-card-icon {
          background: rgba(0, 120, 231, 0.15);
          border-color: rgba(0, 120, 231, 0.4);
          transform: scale(1.05);
          color: #38bdf8;
          box-shadow: 0 0 12px rgba(0, 120, 231, 0.2);
        }
        [data-compact="true"] .stats-card-icon {
          padding: 0.3rem;
          margin-bottom: 0.05rem;
        }

        .stats-card-value {
          position: relative;
          z-index: 1;
          font-family: "Poppins", "Inter", system-ui, sans-serif;
          font-size: clamp(1.3rem, 2vw, 1.7rem);
          font-weight: 600;
          line-height: 1;
          color: #f8fafc;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          transition: color 0.3s ease;
        }
        .stats-card:hover .stats-card-value {
          color: #fff;
        }
        [data-compact="true"] .stats-card-value {
          font-size: 1.15rem;
        }

        .stats-card-label {
          position: relative;
          z-index: 1;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.3s ease;
        }
        .stats-card:hover .stats-card-label {
          color: rgba(255, 255, 255, 0.6);
        }
        [data-compact="true"] .stats-card-label {
          font-size: 0.52rem;
          letter-spacing: 0.12em;
        }

        .stats-card-skeleton {
          width: 3rem;
          height: 1.5rem;
          border-radius: 4px;
          background: rgba(0, 120, 231, 0.08);
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        /* ── Love button ── */
        .stats-love-btn {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          margin-top: 0.3rem;
          padding: 0.3rem 0.7rem;
          border-radius: 20px;
          border: 1px solid rgba(255, 75, 145, 0.25);
          background: rgba(255, 75, 145, 0.04);
          color: rgba(255, 255, 255, 0.6);
          font-family: "Inter", system-ui, sans-serif;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stats-love-btn:hover:not(:disabled) {
          border-color: rgba(255, 75, 145, 0.6);
          color: #fff;
          background: rgba(255, 75, 145, 0.15);
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(255, 75, 145, 0.15);
        }
        .stats-love-btn:active:not(:disabled) {
          transform: scale(0.95);
        }
        .stats-love-btn.loved {
          border-color: rgba(255, 75, 145, 0.45);
          color: #ff4b91;
          background: rgba(255, 75, 145, 0.08);
          cursor: default;
        }
        .stats-love-btn svg {
          transition: transform 0.3s ease;
        }
        .stats-love-btn:hover svg:not(.filled) {
          transform: scale(1.15);
        }
        .stats-love-btn svg.filled { 
          fill: #ff4b91; 
          color: #ff4b91;
          filter: drop-shadow(0 0 4px rgba(255, 75, 145, 0.5));
        }
        
        [data-compact="true"] .stats-love-btn {
          margin-top: 0.15rem;
          padding: 0.2rem 0.5rem;
        }

        /* ── Full-page section ── */
        .stats-section {
          background: #030913;
          padding: clamp(5rem, 10vh, 8rem) 0;
        }
        .stats-section-inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 5rem);
        }
        .stats-section-heading {
          font-family: "Amiko", "Inter", sans-serif;
          font-size: clamp(1.8rem, 3vw, 3rem);
          font-weight: 400;
          letter-spacing: -0.03em;
          color: #f5f7fa;
          margin: 0 0 0.4rem;
        }
        .stats-section-sub {
          font-family: system-ui, sans-serif;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.35);
          margin: 0 0 2.5rem;
        }

        /* ── Love overlay ── */
        .love-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(2px);
        }

        /* ── Responsive ── */
        @media (max-width: 620px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          
          .stats-compact-wrap {
            padding: 0.65rem;
            border-radius: 12px;
          }

          .stats-grid[data-compact="true"] {
            gap: 0.5rem;
          }

          .stats-card[data-compact="true"] {
            min-height: 4rem;
            padding: 0.65rem 0.45rem;
            border-radius: 8px;
          }

          [data-compact="true"] .stats-card-icon svg {
            width: 14px;
            height: 14px;
          }

          [data-compact="true"] .stats-card-value {
            font-size: 1rem;
          }

          [data-compact="true"] .stats-card-label {
            font-size: 0.48rem;
            letter-spacing: 0.1em;
          }

          [data-compact="true"] .stats-love-btn {
            margin-top: 0.1rem;
            padding: 0.15rem 0.4rem;
          }
        }
      `}</style>
    </>
  );
}
