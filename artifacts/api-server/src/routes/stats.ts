import { Router } from "express";
import pkg from "pg";

const { Pool } = pkg;

const router = Router();

let pool: InstanceType<typeof Pool> | null = null;

function getPool() {
  if (!pool && process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

let tablesEnsured = false;

async function ensureTables() {
  if (tablesEnsured) return;
  const p = getPool();
  if (!p) return;
  await p.query(`CREATE TABLE IF NOT EXISTS site_stats (id INTEGER PRIMARY KEY, site_views INTEGER NOT NULL DEFAULT 0, love_count INTEGER NOT NULL DEFAULT 0)`);
  await p.query(`CREATE TABLE IF NOT EXISTS portfolio_views (session_id TEXT PRIMARY KEY, created_at TIMESTAMP DEFAULT NOW())`);
  await p.query(`CREATE TABLE IF NOT EXISTS portfolio_loves (fingerprint TEXT PRIMARY KEY, created_at TIMESTAMP DEFAULT NOW())`);
  await p.query(`INSERT INTO site_stats (id, site_views, love_count) VALUES (1, 0, 0) ON CONFLICT (id) DO NOTHING`);
  tablesEnsured = true;
}

router.get("/stats", async (req, res) => {
  const p = getPool();
  if (!p) return res.status(503).json({ error: "Database not available" });
  try {
    await ensureTables();
    const { fingerprint } = req.query;
    const result = await p.query("SELECT id, site_views, love_count FROM site_stats WHERE id = 1");
    const row = result.rows[0];
    let hasLoved = false;
    if (fingerprint && typeof fingerprint === "string" && fingerprint.length >= 8) {
      const check = await p.query("SELECT 1 FROM portfolio_loves WHERE fingerprint = $1 LIMIT 1", [fingerprint]);
      hasLoved = check.rows.length > 0;
    }
    res.json({ site_views: row?.site_views ?? 0, love_count: row?.love_count ?? 0, hasLoved });
  } catch (err) {
    req.log.error(err, "stats GET error");
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

router.post("/stats/views", async (req, res) => {
  const p = getPool();
  if (!p) return res.status(503).json({ error: "Database not available" });
  try {
    await ensureTables();
    const { session_id } = req.body;
    if (!session_id || typeof session_id !== "string" || session_id.length < 8) {
      return res.status(400).json({ error: "Valid session_id required" });
    }
    const inserted = await p.query(
      "INSERT INTO portfolio_views (session_id) VALUES ($1) ON CONFLICT (session_id) DO NOTHING",
      [session_id],
    );
    if (inserted.rowCount && inserted.rowCount > 0) {
      await p.query(
        "INSERT INTO site_stats (id, site_views, love_count) VALUES (1, 1, 0) ON CONFLICT (id) DO UPDATE SET site_views = site_stats.site_views + 1",
      );
    }
    const result = await p.query("SELECT site_views FROM site_stats WHERE id = 1");
    res.json({ newViewCount: result.rows[0]?.site_views ?? 0, alreadyCounted: !inserted.rowCount });
  } catch (err) {
    req.log.error(err, "stats views error");
    res.status(500).json({ error: "Failed to increment views" });
  }
});

router.post("/stats/loves", async (req, res) => {
  const p = getPool();
  if (!p) return res.status(503).json({ error: "Database not available" });
  try {
    await ensureTables();
    const { fingerprint } = req.body;
    if (!fingerprint || typeof fingerprint !== "string" || fingerprint.length < 8) {
      return res.status(400).json({ error: "Valid fingerprint required" });
    }
    try {
      await p.query("INSERT INTO portfolio_loves (fingerprint) VALUES ($1)", [fingerprint]);
    } catch (insertErr: any) {
      if (insertErr.code === "23505") {
        const result = await p.query("SELECT love_count FROM site_stats WHERE id = 1");
        return res.json({ newLoveCount: result.rows[0]?.love_count ?? 0, success: false, alreadyLoved: true });
      }
      throw insertErr;
    }
    const result = await p.query(
      "INSERT INTO site_stats (id, site_views, love_count) VALUES (1, 0, 1) ON CONFLICT (id) DO UPDATE SET love_count = site_stats.love_count + 1 RETURNING love_count",
    );
    res.json({ newLoveCount: result.rows[0].love_count, success: true, alreadyLoved: false });
  } catch (err) {
    req.log.error(err, "stats loves error");
    res.status(500).json({ error: "Failed to increment loves" });
  }
});

export default router;
