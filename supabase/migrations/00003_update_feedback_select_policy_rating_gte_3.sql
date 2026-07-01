
-- Drop the old is_approved-based SELECT policy
DROP POLICY "Allow public read approved feedback" ON public.feedback;

-- New auto-publish policy: rating >= 3 goes live immediately, no manual approval needed
CREATE POLICY "Allow public read qualified feedback"
  ON public.feedback
  FOR SELECT
  TO public
  USING (rating >= 3);
