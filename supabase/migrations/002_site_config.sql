-- ============================================================
-- PCU International Office — Site Config (Home content)
-- Run this in: Supabase Dashboard → SQL Editor
-- Adds a single-row key/value store so the admin dashboard can
-- persist editable Home content (hero text, section headings,
-- brand colors, font) without the external element SDK.
-- ============================================================

CREATE TABLE IF NOT EXISTS pcu_global.site_config (
  id         INT PRIMARY KEY DEFAULT 1,
  config     JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT site_config_single_row CHECK (id = 1)
);

-- Seed the single row so updates always have a target.
INSERT INTO pcu_global.site_config (id, config)
VALUES (1, '{}')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Row Level Security: public read, authenticated write
-- ============================================================
ALTER TABLE pcu_global.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read site_config"
  ON pcu_global.site_config FOR SELECT USING (true);
CREATE POLICY "auth write site_config"
  ON pcu_global.site_config FOR ALL USING (auth.role() = 'authenticated');
