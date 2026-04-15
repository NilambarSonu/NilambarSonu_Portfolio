import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { Users, Heart, Eye, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  fetchGitHubStats,
  fetchSiteStats,
  incrementViews,
  incrementLoves,
  hasUserLiked
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
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Card className={`
        backdrop-blur border-st-red/15 hover:border-st-red/40 transition-all st-portal-hover flex flex-col items-center text-center group
        ${compact ? 'p-3 bg-transparent border-0' : 'p-6 bg-[#111]/40'}
      `}>
        <div className={`mb-2 text-st-red group-hover:drop-shadow-[0_0_10px_rgba(229,9,20,0.5)] transition-all ${compact ? 'scale-75' : ''}`}>
          {icon}
        </div>
        <div className={`font-bold text-foreground mb-1 font-mono ${compact ? 'text-xl' : 'text-3xl md:text-4xl'}`}>
          {loading ? (
            <div className="animate-pulse bg-st-red/10 rounded w-16 h-8"></div>
          ) : (
            typeof value === "number" ? value.toLocaleString() : value
          )}
        </div>
        <div className={`text-muted-foreground uppercase tracking-wider font-retro ${compact ? 'text-[10px]' : 'text-xs'}`}>
          {label}
        </div>

        {isLovable && !compact && (
          <div className="mt-4">
            <Button
              onClick={onLoveClick}
              disabled={loved}
              variant={loved ? "secondary" : "outline"}
              className={`transition-all duration-300 font-retro tracking-wider text-xs ${loved
                ? "bg-st-red/15 border-st-red/40 text-st-red hover:bg-st-red/20"
                : "border-st-red/20 text-st-red/60 hover:border-st-red hover:text-st-red"
              }`}
            >
              <Heart className={`w-4 h-4 mr-2 ${loved ? "fill-st-red" : ""}`} />
              {loved ? "Loved!" : "Love This"}
            </Button>
          </div>
        )}

        {isLovable && compact && (
          <button
            className="mt-2 hover:scale-110 transition-transform focus:outline-none"
            onClick={onLoveClick}
            disabled={loved}
            aria-label={loved ? "Already loved" : "Love this"}
          >
            <Heart className={`w-5 h-5 cursor-pointer transition-colors ${loved ? "fill-st-red text-st-red" : "text-muted-foreground hover:text-st-red"}`} />
          </button>
        )}
      </Card>
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
  const [showLoveAnimation, setShowLoveAnimation] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetchGitHubStats().then(data => {
      if (isMounted && data) {
        setGithubStats({ followers: data.followers, following: data.following, loading: false });
      } else if (isMounted) {
        setGithubStats(prev => ({ ...prev, loading: false }));
      }
    });

    fetchSiteStats().then(data => {
      if (isMounted) {
        setSiteStats(prev => ({ ...prev, loves: data.loves, loading: false }));
      }
    });

    const hasLiked = localStorage.getItem("has_liked") === "true";
    if (isMounted) setLoved(hasLiked);

    incrementViews().then(newViewCount => {
      if (isMounted && newViewCount) {
        setSiteStats(prev => ({ ...prev, views: newViewCount }));
        sessionStorage.setItem("view_incremented", "true");
      }
    });

    return () => { isMounted = false; };
  }, []);

  const handleLoveClick = async () => {
    if (localStorage.getItem("has_liked") === "true") return;
    setLoved(true);
    setSiteStats(prev => ({ ...prev, loves: prev.loves + 1 }));
    setShowLoveAnimation(true);
    setTimeout(() => setShowLoveAnimation(false), 1000);
    localStorage.setItem("has_liked", "true");
    try { await incrementLoves(); } catch (error) { console.error("Failed to sync love count", error); }
  };

  const containerClass = compact
    ? "p-4 bg-[#111]/30 backdrop-blur border border-st-red/10 rounded-lg w-full"
    : "py-20 md:py-32 px-4 bg-[#0a0a0a]";

  const Wrapper = compact ? 'div' : 'section';
  const wrapperProps = compact ? { className: containerClass } : { className: containerClass, id: "stats" };

  return (
    <Wrapper {...wrapperProps}>
      <div className={compact ? "w-full" : "max-w-6xl mx-auto"}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full">
          {!compact && (
            <>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center text-st-red tracking-[0.1em] uppercase"
                style={{ textShadow: "0 0 10px rgba(229,9,20,0.4), 0 0 30px rgba(229,9,20,0.15)" }}>
                Live Stats Dashboard
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto font-retro text-sm tracking-wider">
                Real-time metrics from the monitoring station
              </p>
            </>
          )}

          <div className={compact ? "grid grid-cols-2 md:grid-cols-4 gap-2" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"}>
            <StatCard icon={<Github className={compact ? "w-8 h-8" : "w-12 h-12"} />} label="Followers" value={githubStats.followers} loading={githubStats.loading} compact={compact} />
            <StatCard icon={<Users className={compact ? "w-8 h-8" : "w-12 h-12"} />} label="Following" value={githubStats.following} loading={githubStats.loading} compact={compact} />
            <StatCard icon={<Eye className={compact ? "w-8 h-8" : "w-12 h-12"} />} label="Views" value={siteStats.views} loading={siteStats.loading} compact={compact} />
            <StatCard icon={<Heart className={compact ? "w-8 h-8" : "w-12 h-12"} />} label="Loves" value={siteStats.loves} loading={siteStats.loading} isLovable={true} onLoveClick={handleLoveClick} loved={loved} compact={compact} />
          </div>

          <AnimatePresence>
            {showLoveAnimation && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 4 }} exit={{ scale: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="text-st-red text-9xl">
                  ❤️
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {!compact && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-8 text-center">
              <div className="flex justify-center gap-4 flex-wrap">
                <Badge variant="outline" className="text-xs text-muted-foreground border-st-red/15 font-retro tracking-wider">
                  GitHub stats updated in real-time
                </Badge>
                <Badge variant="outline" className="text-xs text-muted-foreground border-st-red/15 font-retro tracking-wider">
                  Views tracked per session only
                </Badge>
                <Badge variant="outline" className="text-xs text-muted-foreground border-st-red/15 font-retro tracking-wider">
                  One love per visitor
                </Badge>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Wrapper>
  );
}
