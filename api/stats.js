import { Router } from "express";
import { Pool } from "pg";

const router = Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

function setCORS(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ── GET /api/stats ─────────────────────────────────────────────────────────
// Returns { site_views, love_count, hasLoved } optionally checking fingerprint
router.get("/", async (req, res) => {
  setCORS(res);
  try {
    const { fingerprint } = req.query;

    // Ensure row exists
    await pool.query(
      "INSERT INTO site_stats (id, site_views, love_count) VALUES (1, 0, 0) ON CONFLICT (id) DO NOTHING"
    );

    const result = await pool.query(
      "SELECT id, site_views, love_count FROM site_stats WHERE id = 1"
    );

    const row = result.rows[0];

    let hasLoved = false;
    if (fingerprint && fingerprint.length >= 8) {
      const check = await pool.query(
        "SELECT 1 FROM portfolio_loves WHERE fingerprint = $1 LIMIT 1",
        [fingerprint]
      );
      hasLoved = check.rows.length > 0;
    }

    res.json({
      site_views: row.site_views,
      love_count: row.love_count,
      hasLoved
    });
  } catch (error) {
    console.error("[stats GET] Error:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// ── POST /api/stats/views ──────────────────────────────────────────────────
// Increments view count — deduplicated by session_id
// Body: { session_id: string }
router.post("/views", async (req, res) => {
  setCORS(res);
  try {
    const { session_id } = req.body;

    if (!session_id || typeof session_id !== "string" || session_id.length < 8) {
      return res.status(400).json({ error: "Valid session_id required" });
    }

    // Try to insert session (UNIQUE constraint prevents duplicates)
    const inserted = await pool.query(
      "INSERT INTO portfolio_views (session_id) VALUES ($1) ON CONFLICT (session_id) DO NOTHING",
      [session_id]
    );

    let newViewCount;

    if (inserted.rowCount > 0) {
      // New session — increment global counter
      await pool.query(
        "INSERT INTO site_stats (id, site_views, love_count) VALUES (1, 1, 0) ON CONFLICT (id) DO UPDATE SET site_views = site_stats.site_views + 1"
      );
    }

    const result = await pool.query(
      "SELECT site_views FROM site_stats WHERE id = 1"
    );
    newViewCount = result.rows[0]?.site_views ?? 0;

    res.json({ newViewCount, alreadyCounted: inserted.rowCount === 0 });
  } catch (error) {
    console.error("[stats views] Error:", error);
    res.status(500).json({ error: "Failed to increment views" });
  }
});

// ── POST /api/stats/loves ──────────────────────────────────────────────────
// Increments love count — deduplicated by fingerprint
// Body: { fingerprint: string }
router.post("/loves", async (req, res) => {
  setCORS(res);
  try {
    const { fingerprint } = req.body;

    if (!fingerprint || typeof fingerprint !== "string" || fingerprint.length < 8) {
      return res.status(400).json({ error: "Valid fingerprint required" });
    }

    // Try to insert fingerprint — UNIQUE constraint prevents duplicates
    let inserted;
    try {
      inserted = await pool.query(
        "INSERT INTO portfolio_loves (fingerprint) VALUES ($1)",
        [fingerprint]
      );
    } catch (insertErr) {
      if (insertErr.code === "23505") {
        // Already loved from this device
        const result = await pool.query(
          "SELECT love_count FROM site_stats WHERE id = 1"
        );
        return res.json({
          newLoveCount: result.rows[0]?.love_count ?? 0,
          success: false,
          alreadyLoved: true
        });
      }
      throw insertErr;
    }

    // New love — increment global counter
    const result = await pool.query(
      "INSERT INTO site_stats (id, site_views, love_count) VALUES (1, 0, 1) ON CONFLICT (id) DO UPDATE SET love_count = site_stats.love_count + 1 RETURNING love_count"
    );

    res.json({
      newLoveCount: result.rows[0].love_count,
      success: true,
      alreadyLoved: false
    });
  } catch (error) {
    console.error("[stats loves] Error:", error);
    res.status(500).json({ error: "Failed to increment loves" });
  }
});

// ── OPTIONS preflight ──────────────────────────────────────────────────────
router.options("*", (req, res) => {
  setCORS(res);
  res.status(200).end();
});

export default router;