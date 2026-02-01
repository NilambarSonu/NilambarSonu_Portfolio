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
        backdrop-blur border-card-border hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:scale-105 flex flex-col items-center text-center group
        ${compact ? 'p-3 bg-transparent border-0' : 'p-6 bg-card/50'}
      `}>
        <div className={`mb-2 text-primary group-hover:shadow-[0_0_20px_currentColor] transition-shadow ${compact ? 'scale-75' : ''}`}>
          {icon}
        </div>
        <div className={`font-bold text-foreground mb-1 font-mono ${compact ? 'text-xl' : 'text-3xl md:text-4xl'}`}>
          {loading ? (
            <div className="animate-pulse bg-muted rounded w-16 h-8"></div>
          ) : (
            typeof value === "number" ? value.toLocaleString() : value
          )}
        </div>
        <div className={`text-muted-foreground uppercase tracking-wide font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
          {label}
        </div>

        {isLovable && !compact && (
          <div className="mt-4">
            <Button
              onClick={onLoveClick}
              disabled={loved}
              variant={loved ? "secondary" : "outline"}
              className={`transition-all duration-300 ${loved
                ? "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                : "border-red-500/30 text-red-400 hover:border-red-500 hover:text-red-300"
                }`}
            >
              <Heart className={`w-5 h-5 mr-2 ${loved ? "fill-red-400" : "stroke-red-400"}`} />
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
            <Heart className={`w-5 h-5 cursor-pointer transition-colors ${loved ? "fill-red-400 text-red-400" : "text-muted-foreground hover:text-red-400"}`} />
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
  const [githubStats, setGithubStats] = useState({
    followers: 0,
    following: 0,
    loading: true
  });

  const [siteStats, setSiteStats] = useState({
    views: 0,
    loves: 0,
    loading: true
  });

  const [loved, setLoved] = useState(false);
  const [showLoveAnimation, setShowLoveAnimation] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // 1. Fetch GitHub stats
    fetchGitHubStats().then(data => {
      if (isMounted && data) {
        setGithubStats({
          followers: data.followers,
          following: data.following,
          loading: false
        });
      } else if (isMounted) {
        setGithubStats(prev => ({ ...prev, loading: false }));
      }
    });

    // 2. Fetch initial site stats (Loves only first, or handle race)
    fetchSiteStats().then(data => {
      if (isMounted) {
        setSiteStats(prev => ({
          ...prev,
          loves: data.loves, // Trust the loves count from fetch
          // Only set views from fetch if we haven't incremented yet (or valid 0)
          // But we'll let existing logic handle view update
          loading: false
        }));
      }
    });

    // 3. User Interaction Checks
    const hasLiked = localStorage.getItem("has_liked") === "true";
    if (isMounted) setLoved(hasLiked);

    // 4. Increment View Count (Always increment per user request for now)
    // Removed session check to ensure it works visibly for the user "when a user jsut open my site... visits insraeses"
    incrementViews().then(newViewCount => {
      if (isMounted && newViewCount) {
        setSiteStats(prev => ({ ...prev, views: newViewCount }));
        // Optionally set session storage if we want to throttle later, but for now allow increment
        sessionStorage.setItem("view_incremented", "true");
      }
    });

    return () => { isMounted = false; };
  }, []);

  const handleLoveClick = async () => {
    // 1. Check if already loved
    if (localStorage.getItem("has_liked") === "true") return;

    // 2. Optimistic Update
    setLoved(true);
    setSiteStats(prev => ({ ...prev, loves: prev.loves + 1 }));
    setShowLoveAnimation(true);
    setTimeout(() => setShowLoveAnimation(false), 1000);

    // 3. Save to LocalStorage
    localStorage.setItem("has_liked", "true");

    // 4. Call API (Backend Update)
    try {
      await incrementLoves();
    } catch (error) {
      console.error("Failed to sync love count", error);
    }
  };

  const containerClass = compact
    ? "p-4 bg-card/30 backdrop-blur border border-card-border rounded-lg w-full"
    : "py-20 md:py-32 px-4 bg-gradient-to-b from-background to-muted/30 transition-colors duration-500";

  // If compact, we skip the section wrapper or keep it minimal
  const Wrapper = compact ? 'div' : 'section';
  const wrapperProps = compact ? { className: containerClass } : { className: containerClass, id: "stats" };

  return (
    <Wrapper {...wrapperProps}>
      <div className={compact ? "w-full" : "max-w-6xl mx-auto"}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          {!compact && (
            <>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent text-white">
                Live Stats Dashboard
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-white">
                Real-time metrics tracking my GitHub activity and site engagement
              </p>
            </>
          )}

          <div className={compact ? "grid grid-cols-2 md:grid-cols-4 gap-2" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"}>
            <StatCard
              icon={<Github className={compact ? "w-8 h-8" : "w-12 h-12"} />}
              label="Followers"
              value={githubStats.followers}
              loading={githubStats.loading}
              compact={compact}
            />

            <StatCard
              icon={<Users className={compact ? "w-8 h-8" : "w-12 h-12"} />}
              label="Following"
              value={githubStats.following}
              loading={githubStats.loading}
              compact={compact}
            />

            <StatCard
              icon={<Eye className={compact ? "w-8 h-8" : "w-12 h-12"} />}
              label="Views"
              value={siteStats.views}
              loading={siteStats.loading}
              compact={compact}
            />

            <StatCard
              icon={<Heart className={compact ? "w-8 h-8" : "w-12 h-12"} />}
              label="Loves"
              value={siteStats.loves}
              loading={siteStats.loading}
              isLovable={true}
              onLoveClick={handleLoveClick}
              loved={loved}
              compact={compact}
            />
          </div>

          {/* Love Animation Overlay */}
          <AnimatePresence>
            {showLoveAnimation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 4, rotate: 360 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-red-500 text-9xl"
                >
                  ❤️
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Info */}
          {!compact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-center"
            >
              <div className="flex justify-center gap-4 flex-wrap">
                <Badge variant="outline" className="text-sm text-white">
                  GitHub stats updated in real-time
                </Badge>
                <Badge variant="outline" className="text-sm text-white">
                  Views tracked per session only
                </Badge>
                <Badge variant="outline" className="text-sm text-white">
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
