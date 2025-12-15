-- Make user_id nullable for anonymous reviews
ALTER TABLE public.reviews ALTER COLUMN user_id DROP NOT NULL;

-- Drop existing insert policy
DROP POLICY IF EXISTS "Users can create their own reviews" ON public.reviews;

-- Create new policy allowing anyone to insert reviews
CREATE POLICY "Anyone can create reviews"
ON public.reviews
FOR INSERT
WITH CHECK (true);

-- Update the update/delete policies to only work for authenticated users with their own reviews
DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can delete their own reviews" ON public.reviews;

CREATE POLICY "Users can update their own reviews"
ON public.reviews
FOR UPDATE
USING (auth.uid() IS NOT NULL AND (auth.uid())::text = (user_id)::text);

CREATE POLICY "Users can delete their own reviews"
ON public.reviews
FOR DELETE
USING (auth.uid() IS NOT NULL AND (auth.uid())::text = (user_id)::text);