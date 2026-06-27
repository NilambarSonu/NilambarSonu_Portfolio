import { toast } from "@/hooks/use-toast";

// GitHub API Configuration
const GITHUB_USERNAME = "NilambarSonu";
const GITHUB_API_BASE = "https://api.github.com";

// ── GitHub API ──────────────────────────────────────────────────────────────
export async function fetchGitHubStats() {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const data = await response.json();
    return {
      followers: data.followers,
      following: data.following,
      username: data.login,
      avatar: data.avatar_url
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
}

// ── Fingerprint helpers ─────────────────────────────────────────────────────

/** Get or create a stable FingerprintJS visitor ID */
export async function getFingerprint(): Promise<string> {
  // Check cache first
  const cached = sessionStorage.getItem("_portfolio_fp");
  if (cached) return cached;

  try {
    // FingerprintJS v4 (loaded via CDN in index.html as window.FingerprintJS)
    const FP = (window as any).FingerprintJS;
    if (!FP) throw new Error("FingerprintJS not available");
    const fp = await FP.load();
    const result = await fp.get();
    const id = result.visitorId as string;
    sessionStorage.setItem("_portfolio_fp", id);
    return id;
  } catch {
    // Fallback: stable random UUID for this browser
    let fb = localStorage.getItem("_portfolio_fp_fb");
    if (!fb) {
      fb = crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("_portfolio_fp_fb", fb);
    }
    const id = "fb_" + fb;
    sessionStorage.setItem("_portfolio_fp", id);
    return id;
  }
}

/** Get or create a stable session ID (changes each browser session) */
function getSessionId(): string {
  let id = sessionStorage.getItem("_portfolio_session");
  if (!id) {
    id = crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString(36) + Math.random().toString(36).slice(2);
    sessionStorage.setItem("_portfolio_session", id);
  }
  return id;
}

// ── Site Stats API ──────────────────────────────────────────────────────────

/** Fetch current stats. Pass fingerprint to also get hasLoved from server. */
export async function fetchSiteStats(fingerprint?: string) {
  try {
    const url = fingerprint
      ? `/api/stats?fingerprint=${encodeURIComponent(fingerprint)}`
      : "/api/stats";

    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) throw new Error(`Stats error: ${response.status}`);

    const data = await response.json();
    return {
      views: data.site_views ?? 0,
      loves: data.love_count ?? 0,
      hasLoved: data.hasLoved ?? false
    };
  } catch (error) {
    console.error("Error fetching site stats:", error);
    return { views: 0, loves: 0, hasLoved: false };
  }
}

/** Increment view count — deduplicated by session_id on the server */
export async function incrementViews(): Promise<number | null> {
  try {
    const session_id = getSessionId();

    const response = await fetch("/api/stats/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id })
    });

    if (response.ok) {
      const data = await response.json();
      return data.newViewCount ?? null;
    }
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
  return null;
}

/** Increment love count — deduplicated by FingerprintJS fingerprint on the server */
export async function incrementLoves(fingerprint: string): Promise<{
  newLoveCount: number;
  success: boolean;
  alreadyLoved: boolean;
} | null> {
  try {
    const response = await fetch("/api/stats/loves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fingerprint })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        newLoveCount: data.newLoveCount ?? 0,
        success: data.success ?? false,
        alreadyLoved: data.alreadyLoved ?? false
      };
    }
  } catch (error) {
    console.error("Error incrementing loves:", error);
  }
  return null;
}

// ── Utility ─────────────────────────────────────────────────────────────────

/** @deprecated Use server truth (fetchSiteStats hasLoved) instead */
export const hasUserLiked = () => localStorage.getItem("has_liked") === "true";

/** @deprecated Not needed — server deduplicates by session_id */
export const hasUserViewed = () => sessionStorage.getItem("view_incremented") === "true";