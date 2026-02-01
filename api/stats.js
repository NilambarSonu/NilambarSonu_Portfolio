import { Router } from "express";
import { Pool } from "pg";

const router = Router();

// Initialize PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// GET /api/stats - Fetch current stats
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, site_views, love_count FROM site_stats WHERE id = 1"
    );
    
    if (result.rows.length === 0) {
      // Initialize with default values if no record exists
      const initResult = await pool.query(
        "INSERT INTO site_stats (id, site_views, love_count) VALUES (1, 0, 0) RETURNING *"
      );
      return res.json(initResult.rows[0]);
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// POST /api/stats/views - Increment view count
router.post("/views", async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE site_stats SET site_views = site_views + 1 WHERE id = 1 RETURNING site_views"
    );
    
    if (result.rows.length === 0) {
      // Initialize if no record exists
      const initResult = await pool.query(
        "INSERT INTO site_stats (id, site_views, love_count) VALUES (1, 1, 0) RETURNING site_views"
      );
      return res.json({ newViewCount: initResult.rows[0].site_views });
    }
    
    res.json({ newViewCount: result.rows[0].site_views });
  } catch (error) {
    console.error("Error incrementing views:", error);
    res.status(500).json({ error: "Failed to increment views" });
  }
});

// POST /api/stats/loves - Increment love count
router.post("/loves", async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE site_stats SET love_count = love_count + 1 WHERE id = 1 RETURNING love_count"
    );
    
    if (result.rows.length === 0) {
      // Initialize if no record exists
      const initResult = await pool.query(
        "INSERT INTO site_stats (id, site_views, love_count) VALUES (1, 0, 1) RETURNING love_count"
      );
      return res.json({ newLoveCount: initResult.rows[0].love_count });
    }
    
    res.json({ newLoveCount: result.rows[0].love_count });
  } catch (error) {
    console.error("Error incrementing loves:", error);
    res.status(500).json({ error: "Failed to increment loves" });
  }
});

// POST /api/stats/init - Initialize stats (if needed)
router.post("/init", async (req, res) => {
  try {
    const { site_views = 0, love_count = 0 } = req.body;
    
    const result = await pool.query(
      "INSERT INTO site_stats (id, site_views, love_count) VALUES (1, $1, $2) ON CONFLICT (id) DO UPDATE SET site_views = $1, love_count = $2 RETURNING *",
      [site_views, love_count]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error initializing stats:", error);
    res.status(500).json({ error: "Failed to initialize stats" });
  }
});

export default router;