
-- Helper function: allow anon to read approved feedback only
CREATE OR REPLACE FUNCTION can_select_feedback()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT true; -- controlled by the policy's USING clause
$$;

-- SELECT policy: anyone can read feedback that has been approved by admin
CREATE POLICY "Allow public read approved feedback"
  ON public.feedback
  FOR SELECT
  TO public
  USING (is_approved = true);

-- Verify both policies now exist
-- (INSERT + SELECT)
