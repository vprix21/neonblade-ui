-- ==========================================================
-- NeonBlade UI Telemetry — Supabase Schema
-- Run this in the Supabase SQL Editor once for a new project.
-- ==========================================================

-- ── Events table ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS component_events (
  id           uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type   text        NOT NULL CHECK (event_type IN ('download', 'page_view', 'copy')),
  component    text        NOT NULL,
  session_id   text,
  tab          text        CHECK (tab IN ('usage', 'source', 'css') OR tab IS NULL),
  referrer     text,
  cli_version  text,
  created_at   timestamptz DEFAULT now() NOT NULL
);

-- ── Indexes ────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_events_component
  ON component_events (component);

CREATE INDEX IF NOT EXISTS idx_events_type
  ON component_events (event_type);

CREATE INDEX IF NOT EXISTS idx_events_created_at
  ON component_events (created_at DESC);

-- Composite for the most common dashboard query pattern
CREATE INDEX IF NOT EXISTS idx_events_composite
  ON component_events (event_type, component, created_at DESC);

-- ── Row Level Security ─────────────────────────────────────────
-- The API route uses the service role key which bypasses RLS.
-- Deny all public access (no anon reads/writes).
ALTER TABLE component_events ENABLE ROW LEVEL SECURITY;

-- No public policies = no access for anon/authenticated roles.
-- Only the service_role key (used server-side) can read/write.

-- ── Useful views for the dashboard ────────────────────────────

-- All-time downloads per component
CREATE OR REPLACE VIEW downloads_by_component AS
SELECT
  component,
  COUNT(*) AS total_downloads
FROM component_events
WHERE event_type = 'download'
GROUP BY component
ORDER BY total_downloads DESC;

-- All-time page views per component
CREATE OR REPLACE VIEW page_views_by_component AS
SELECT
  component,
  COUNT(*) AS total_views
FROM component_events
WHERE event_type = 'page_view'
GROUP BY component
ORDER BY total_views DESC;

-- All-time copy clicks per component
CREATE OR REPLACE VIEW copies_by_component AS
SELECT
  component,
  COUNT(*) AS total_copies,
  COUNT(*) FILTER (WHERE tab = 'usage')  AS usage_copies,
  COUNT(*) FILTER (WHERE tab = 'source') AS source_copies,
  COUNT(*) FILTER (WHERE tab = 'css')    AS css_copies
FROM component_events
WHERE event_type = 'copy'
GROUP BY component
ORDER BY total_copies DESC;

-- Daily event counts (last 90 days)
CREATE OR REPLACE VIEW daily_events AS
SELECT
  date_trunc('day', created_at) AS day,
  event_type,
  COUNT(*)                      AS count
FROM component_events
WHERE created_at > now() - interval '90 days'
GROUP BY day, event_type
ORDER BY day DESC;

-- ── Auto-delete old events (optional) ─────────────────────────
-- Uncomment to enable automatic cleanup of events older than 12 months.
-- Requires pg_cron extension (available on Supabase Pro).
--
-- SELECT cron.schedule(
--   'delete-old-telemetry-events',
--   '0 3 * * 0',  -- every Sunday at 3am
--   $$DELETE FROM component_events WHERE created_at < now() - interval '12 months'$$
-- );
