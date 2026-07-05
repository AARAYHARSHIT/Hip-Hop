/*
# Tighten rsvps INSERT policy

1. Security changes
- Drop the permissive `anon_insert_rsvps` policy that used `WITH CHECK (true)`.
- Replace with a policy that validates the submitted columns:
  - name must be non-empty (length > 0)
  - email must be non-empty (length > 0)
  - ticket_type must be one of the allowed values (GA, VIP, BACKSTAGE)
- SELECT policy unchanged (public read for count display).
*/

DROP POLICY IF EXISTS "anon_insert_rsvps" ON rsvps;

CREATE POLICY "anon_insert_rsvps" ON rsvps FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) > 0
  AND char_length(email) > 0
  AND ticket_type IN ('GA', 'VIP', 'BACKSTAGE')
);
