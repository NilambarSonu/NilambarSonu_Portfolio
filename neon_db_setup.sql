-- SQL commands to run in Neon DB SQL Editor

-- Create the site_stats table
CREATE TABLE IF NOT EXISTS site_stats (
    id INTEGER PRIMARY KEY DEFAULT 1,
    site_views INTEGER DEFAULT 0,
    love_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the trigger
DROP TRIGGER IF EXISTS update_site_stats_updated_at ON site_stats;
CREATE TRIGGER update_site_stats_updated_at
    BEFORE UPDATE ON site_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert initial record if table is empty
INSERT INTO site_stats (id, site_views, love_count) 
VALUES (1, 0, 0) 
ON CONFLICT (id) DO NOTHING;

-- Verify the table was created successfully
SELECT * FROM site_stats;