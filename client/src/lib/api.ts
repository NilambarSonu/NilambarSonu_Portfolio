import { toast } from "@/hooks/use-toast";

// GitHub API Configuration
const GITHUB_USERNAME = "NilambarSonu";
const GITHUB_API_BASE = "https://api.github.com";

// Database API Configuration (Neon PostgreSQL)
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
const DATABASE_TABLE = "site_stats";

// GitHub API Functions
export async function fetchGitHubStats() {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      followers: data.followers,
      following: data.following,
      username: data.login,
      avatar: data.avatar_url
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    toast({
      title: "Error",
      description: "Failed to fetch GitHub stats. Please try again later.",
      variant: "destructive"
    });
    return null;
  }
}

// Database API Functions
export async function fetchSiteStats() {
  try {
    if (!DATABASE_URL) {
      console.warn("Database URL not configured");
      return { views: 0, loves: 0, id: null };
    }

    // For Neon PostgreSQL, we need to use a different approach
    // Since we can't make direct HTTP requests to PostgreSQL from frontend,
    // we'll need to create a backend API endpoint
    const response = await fetch(`/api/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Database error: ${response.status}`);
    }

    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      // Initialize stats if table is empty
      return await initializeStats();
    }

    return {
      views: data.site_views || 0,
      loves: data.love_count || 0,
      id: data.id
    };
  } catch (error) {
    console.error("Error fetching site stats:", error);
    return { views: 0, loves: 0, id: null };
  }
}

export async function incrementViews() {
  try {
    if (!DATABASE_URL) {
      console.warn("Database URL not configured");
      return;
    }

    const response = await fetch(`/api/stats/views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.newViewCount;
    }
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
}

export async function incrementLoves() {
  try {
    if (!DATABASE_URL) {
      console.warn("Database URL not configured");
      return null;
    }

    const response = await fetch(`/api/stats/loves`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.newLoveCount;
    }
  } catch (error) {
    console.error("Error incrementing loves:", error);
    return null;
  }
}

async function initializeStats(initialViews = 0, initialLoves = 0) {
  try {
    const response = await fetch(`/api/stats/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        site_views: initialViews,
        love_count: initialLoves
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        views: data.site_views,
        loves: data.love_count,
        id: data.id
      };
    }
  } catch (error) {
    console.error("Error initializing stats:", error);
  }
  return { views: initialViews, loves: initialLoves };
}

// Utility functions for local storage
export const hasUserLiked = () => {
  return localStorage.getItem("has_liked") === "true";
};

export const hasUserViewed = () => {
  return sessionStorage.getItem("view_incremented") === "true";
};