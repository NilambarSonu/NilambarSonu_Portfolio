import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Users, Heart, Eye, Github } from "lucide-react";
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
      const stats = await fetchSiteStats(fp);
      if (!isMounted) return;
      setSiteStats({ views: stats.views, loves: stats.loves, loading: false });
      setLoved(stats.hasLoved);
    });

    incrementViews().then(newViewCount => {
      if (!isMounted || !newViewCount) return;
      setSiteStats(prev => ({ ...prev, views: newViewCount }));
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
          background: rgba(0,120,231,0.04);
          border: 1px solid rgba(0,120,231,0.12);
          border-radius: 12px;
          padding: 1rem;
        }

        /* ── Stats grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }
        .stats-grid[data-compact="true"] {
          gap: 0.5rem;
        }

        /* ── Stat card ── */
        .stats-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.25rem;
          padding: 1.4rem 1rem;
          background: rgba(0,120,231,0.05);
          border: 1px solid rgba(0,120,231,0.13);
          border-radius: 12px;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .stats-card:hover {
          border-color: rgba(0,120,231,0.3);
          box-shadow: 0 0 18px rgba(0,120,231,0.08);
        }
        .stats-card[data-compact="true"] {
          padding: 0.75rem 0.5rem;
          border-radius: 8px;
          background: rgba(0,120,231,0.04);
          border-color: rgba(0,120,231,0.09);
        }

        .stats-card-icon {
          color: #0078e7;
          margin-bottom: 0.15rem;
          opacity: 0.85;
        }

        .stats-card-value {
          font-family: "Ancizar Serif", Georgia, serif;
          font-size: clamp(1.6rem, 2.5vw, 2.4rem);
          font-weight: 400;
          line-height: 1;
          color: #f5f7fa;
        }
        [data-compact="true"] .stats-card-value {
          font-size: 1.2rem;
        }

        .stats-card-label {
          font-family: system-ui, sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .stats-card-skeleton {
          width: 3.5rem;
          height: 1.8rem;
          border-radius: 4px;
          background: rgba(0,120,231,0.1);
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        /* ── Love button ── */
        .stats-love-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          margin-top: 0.5rem;
          padding: 0.35rem 0.8rem;
          border-radius: 999px;
          border: 1px solid rgba(0,120,231,0.25);
          background: transparent;
          color: rgba(255,255,255,0.5);
          font-family: system-ui, sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .stats-love-btn:hover:not(:disabled) {
          border-color: rgba(0,120,231,0.55);
          color: #fff;
          background: rgba(0,120,231,0.1);
        }
        .stats-love-btn.loved {
          border-color: rgba(0,120,231,0.35);
          color: #0078e7;
        }
        .stats-love-btn svg.filled { fill: #0078e7; color: #0078e7; }

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
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-card-value { font-size: 1.4rem; }
        }
      `}</style>
    </>
  );
}
