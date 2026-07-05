/*
# Create rsvps table (single-tenant, no auth)

1. New Tables
- `rsvps`
- `id` (uuid, primary key)
- `name` (text, not null) — attendee display name
- `email` (text, not null) — contact email
- `ticket_type` (text, not null) — GA, VIP, or BACKSTAGE
- `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `rsvps`.
- Allow anon + authenticated INSERT (public RSVP form) and SELECT (count display).
- No update/delete from the anon client.
*/

CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  ticket_type text NOT NULL DEFAULT 'GA',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_rsvps" ON rsvps;
CREATE POLICY "anon_insert_rsvps" ON rsvps FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_rsvps" ON rsvps;
CREATE POLICY "anon_select_rsvps" ON rsvps FOR SELECT
TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS rsvps_created_at_idx ON rsvps (created_at);
