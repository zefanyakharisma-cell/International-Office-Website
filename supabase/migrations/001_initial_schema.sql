-- ============================================================
-- PCU International Office — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

CREATE SCHEMA IF NOT EXISTS pcu_global;

-- Articles
CREATE TABLE IF NOT EXISTS pcu_global.articles (
  id            TEXT PRIMARY KEY,
  title         TEXT NOT NULL,
  excerpt       TEXT,
  tag           TEXT,
  color         TEXT,
  date          TEXT,
  image_url     TEXT,
  paragraphs    JSONB DEFAULT '[]',
  quote         TEXT,
  highlights    JSONB DEFAULT '[]',
  contact_name  TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  author        TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ,
  visits        INTEGER DEFAULT 0
);

-- Meeting requests
CREATE TABLE IF NOT EXISTS pcu_global.meeting_requests (
  id              BIGSERIAL PRIMARY KEY,
  submitted_at    TIMESTAMPTZ DEFAULT NOW(),
  institution     TEXT,
  address         TEXT,
  country         TEXT,
  website         TEXT,
  field           TEXT,
  date1           TEXT,
  time1           TEXT,
  duration1       TEXT,
  date2           TEXT,
  time2           TEXT,
  duration2       TEXT,
  objectives      JSONB DEFAULT '[]',
  departments     JSONB DEFAULT '[]',
  pic_title       TEXT,
  pic_given_name  TEXT,
  pic_family_name TEXT,
  pic_position    TEXT,
  pic_division    TEXT,
  pic_email       TEXT,
  pic_phone       TEXT,
  participants    JSONB DEFAULT '[]'
);

-- OSE programs
CREATE TABLE IF NOT EXISTS pcu_global.ose_programs (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  country      TEXT DEFAULT '',
  region       TEXT DEFAULT '',
  programs     JSONB DEFAULT '["Semester Exchange"]',
  description  TEXT DEFAULT '',
  requirements TEXT DEFAULT '',
  duration     TEXT DEFAULT '',
  deadline     TEXT DEFAULT '',
  website      TEXT DEFAULT '',
  notes        TEXT DEFAULT '',
  is_custom    BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ
);

-- Internship opportunities
CREATE TABLE IF NOT EXISTS pcu_global.internship_opportunities (
  id         TEXT PRIMARY KEY,
  position   TEXT NOT NULL,
  company    TEXT NOT NULL,
  link       TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- RPC: atomic visit increment callable by anonymous users
CREATE OR REPLACE FUNCTION pcu_global.increment_article_visits(article_id TEXT)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE pcu_global.articles SET visits = visits + 1 WHERE id = article_id;
$$;

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE pcu_global.articles               ENABLE ROW LEVEL SECURITY;
ALTER TABLE pcu_global.meeting_requests       ENABLE ROW LEVEL SECURITY;
ALTER TABLE pcu_global.ose_programs           ENABLE ROW LEVEL SECURITY;
ALTER TABLE pcu_global.internship_opportunities ENABLE ROW LEVEL SECURITY;

-- Articles: public read, authenticated write
CREATE POLICY "public read articles"
  ON pcu_global.articles FOR SELECT USING (true);
CREATE POLICY "auth write articles"
  ON pcu_global.articles FOR ALL USING (auth.role() = 'authenticated');

-- Meeting requests: public insert (form submission), authenticated read
CREATE POLICY "public submit meeting"
  ON pcu_global.meeting_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "auth read meetings"
  ON pcu_global.meeting_requests FOR SELECT USING (auth.role() = 'authenticated');

-- OSE programs: public read, authenticated write
CREATE POLICY "public read ose"
  ON pcu_global.ose_programs FOR SELECT USING (true);
CREATE POLICY "auth write ose"
  ON pcu_global.ose_programs FOR ALL USING (auth.role() = 'authenticated');

-- Internship opportunities: public read, authenticated write
CREATE POLICY "public read internships"
  ON pcu_global.internship_opportunities FOR SELECT USING (true);
CREATE POLICY "auth write internships"
  ON pcu_global.internship_opportunities FOR ALL USING (auth.role() = 'authenticated');
