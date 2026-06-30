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
  
  await p.query(`
    CREATE TABLE IF NOT EXISTS site_stats (
      id INTEGER PRIMARY KEY DEFAULT 1,
      site_views BIGINT NOT NULL DEFAULT 0,
      love_count BIGINT NOT NULL DEFAULT 0,
      updated_at TIMESTAMP DEFAULT NOW(),
      CONSTRAINT single_row CHECK (id = 1)
    )
  `);
  
  await p.query(`
    CREATE TABLE IF NOT EXISTS portfolio_loves (
      id SERIAL PRIMARY KEY,
      fingerprint TEXT NOT NULL,
      ip_address TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  
  await p.query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_loves_fp_ip ON portfolio_loves(fingerprint, ip_address)`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_loves_fp ON portfolio_loves(fingerprint)`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_loves_ip ON portfolio_loves(ip_address)`);
  
  await p.query(`
    CREATE TABLE IF NOT EXISTS portfolio_views (
      id SERIAL PRIMARY KEY,
      session_id TEXT NOT NULL,
      fingerprint TEXT NOT NULL,
      ip_address TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  
  await p.query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_views_session ON portfolio_views(session_id)`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_views_fp ON portfolio_views(fingerprint)`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_views_ip ON portfolio_views(ip_address)`);
  
  await p.query(`INSERT INTO site_stats (id, site_views, love_count) VALUES (1, 0, 0) ON CONFLICT (id) DO NOTHING`);
  tablesEnsured = true;
}

function getClientIp(req: any): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    if (typeof forwarded === "string") {
      return forwarded.split(",")[0].trim();
    } else if (Array.isArray(forwarded)) {
      return forwarded[0].trim();
    }
  }
  return req.socket?.remoteAddress || req.ip || "unknown";
}

router.get("/stats", async (req, res) => {
  const p = getPool();
  if (!p) {
    res.status(503).json({ error: "Database not available" });
    return;
  }
  try {
    await ensureTables();
    const { fingerprint } = req.query;
    const clientIp = getClientIp(req);
    
    const result = await p.query("SELECT id, site_views, love_count FROM site_stats WHERE id = 1");
    const row = result.rows[0];
    
    let hasLoved = false;
    if (fingerprint && typeof fingerprint === "string" && fingerprint.length >= 8) {
      const check = await p.query(
        "SELECT 1 FROM portfolio_loves WHERE fingerprint = $1 OR ip_address = $2 LIMIT 1",
        [fingerprint, clientIp]
      );
      hasLoved = check.rows.length > 0;
    } else {
      const check = await p.query(
        "SELECT 1 FROM portfolio_loves WHERE ip_address = $1 LIMIT 1",
        [clientIp]
      );
      hasLoved = check.rows.length > 0;
    }
    
    res.json({
      site_views: Number(row?.site_views ?? 0),
      love_count: Number(row?.love_count ?? 0),
      hasLoved
    });
    return;
  } catch (err) {
    req.log.error(err, "stats GET error");
    res.status(500).json({ error: "Failed to fetch stats" });
    return;
  }
});

router.post("/stats/views", async (req, res) => {
  const p = getPool();
  if (!p) {
    res.status(503).json({ error: "Database not available" });
    return;
  }
  try {
    await ensureTables();
    const { session_id, fingerprint } = req.body;
    if (!session_id || typeof session_id !== "string" || session_id.length < 8) {
      res.status(400).json({ error: "Valid session_id required" });
      return;
    }
    if (!fingerprint || typeof fingerprint !== "string" || fingerprint.length < 8) {
      res.status(400).json({ error: "Valid fingerprint required" });
      return;
    }
    
    const clientIp = getClientIp(req);
    
    // Check if view has already been counted for this session, OR fingerprint in last 24h, OR IP address in last 24h
    const dupCheck = await p.query(
      `SELECT EXISTS(
        SELECT 1 FROM portfolio_views 
        WHERE session_id = $1 
           OR (fingerprint = $2 AND created_at > NOW() - INTERVAL '24 hours')
           OR (ip_address = $3 AND created_at > NOW() - INTERVAL '24 hours')
      )`,
      [session_id, fingerprint, clientIp]
    );
    const alreadyCounted = dupCheck.rows[0].exists;
    
    if (!alreadyCounted) {
      await p.query(
        "INSERT INTO portfolio_views (session_id, fingerprint, ip_address) VALUES ($1, $2, $3) ON CONFLICT (session_id) DO NOTHING",
        [session_id, fingerprint, clientIp]
      );
      
      await p.query(
        "UPDATE site_stats SET site_views = site_stats.site_views + 1 WHERE id = 1"
      );
    }
    
    const result = await p.query("SELECT site_views FROM site_stats WHERE id = 1");
    res.json({ newViewCount: Number(result.rows[0]?.site_views ?? 0), alreadyCounted });
    return;
  } catch (err) {
    req.log.error(err, "stats views error");
    res.status(500).json({ error: "Failed to increment views" });
    return;
  }
});

router.post("/stats/loves", async (req, res) => {
  const p = getPool();
  if (!p) {
    res.status(503).json({ error: "Database not available" });
    return;
  }
  try {
    await ensureTables();
    const { fingerprint } = req.body;
    if (!fingerprint || typeof fingerprint !== "string" || fingerprint.length < 8) {
      res.status(400).json({ error: "Valid fingerprint required" });
      return;
    }
    
    const clientIp = getClientIp(req);
    
    // Check if user has already loved (by fingerprint or IP address)
    const dupCheck = await p.query(
      "SELECT EXISTS(SELECT 1 FROM portfolio_loves WHERE fingerprint = $1 OR ip_address = $2)",
      [fingerprint, clientIp]
    );
    const alreadyLoved = dupCheck.rows[0].exists;
    
    if (alreadyLoved) {
      const result = await p.query("SELECT love_count FROM site_stats WHERE id = 1");
      res.json({ newLoveCount: Number(result.rows[0]?.love_count ?? 0), success: false, alreadyLoved: true });
      return;
    }
    
    await p.query(
      "INSERT INTO portfolio_loves (fingerprint, ip_address) VALUES ($1, $2)",
      [fingerprint, clientIp]
    );
    
    const result = await p.query(
      "UPDATE site_stats SET love_count = site_stats.love_count + 1 WHERE id = 1 RETURNING love_count"
    );
    res.json({ newLoveCount: Number(result.rows[0].love_count), success: true, alreadyLoved: false });
    return;
  } catch (err) {
    req.log.error(err, "stats loves error");
    res.status(500).json({ error: "Failed to increment loves" });
    return;
  }
});

export default router;
