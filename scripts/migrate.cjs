const pg = require('pg');
const fs = require('fs');
const path = require('path');

// Manual parser for .env to avoid external dependencies like dotenv
const envPath = path.resolve(process.cwd(), '.env');
let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/^DATABASE_URL\s*=\s*["']?([^"'\r\n]+)["']?/m);
  if (match) {
    databaseUrl = match[1];
  }
}

if (!databaseUrl) {
  console.error("Error: DATABASE_URL not found in environment or .env file.");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: databaseUrl.includes("localhost") ? false : { rejectUnauthorized: false }
});

const sql = `
DROP TABLE IF EXISTS portfolio_loves;
DROP TABLE IF EXISTS portfolio_views;
DROP TABLE IF EXISTS site_stats;

CREATE TABLE site_stats (
    id INTEGER PRIMARY KEY DEFAULT 1,
    site_views BIGINT NOT NULL DEFAULT 0,
    love_count BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO site_stats (id, site_views, love_count)
VALUES (1, 0, 0)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE portfolio_loves (
    id SERIAL PRIMARY KEY,
    fingerprint TEXT NOT NULL,
    ip_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_loves_fp_ip ON portfolio_loves(fingerprint, ip_address);
CREATE INDEX idx_loves_fp ON portfolio_loves(fingerprint);
CREATE INDEX idx_loves_ip ON portfolio_loves(ip_address);

CREATE TABLE portfolio_views (
    id SERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    fingerprint TEXT NOT NULL,
    ip_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_views_session ON portfolio_views(session_id);
CREATE INDEX idx_views_fp ON portfolio_views(fingerprint);
CREATE INDEX idx_views_ip ON portfolio_views(ip_address);
`;

async function run() {
  console.log("Connecting to database and running migration...");
  const client = await pool.connect();
  try {
    // Split statements to execute separately (gotcha in replit.md: "Multi-statement SQL in pg.query() causes errors")
    const statements = sql.split(';').map(s => s.trim()).filter(Boolean);
    for (const stmt of statements) {
      await client.query(stmt);
    }
    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
