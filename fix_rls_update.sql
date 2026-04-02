-- Run this in your Supabase SQL Editor to allow the frontend to update hotel availability.
-- This is required for room count to decrease on booking and increase on cancellation.

-- Allow public (anon) users to update the hotels table
-- In production, restrict this to authenticated users only.
CREATE POLICY "Allow public update to hotels" ON public.hotels FOR UPDATE USING (true) WITH CHECK (true);

-- If you want only authenticated users to update (more secure):
-- CREATE POLICY "Allow authenticated update to hotels" ON public.hotels FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
