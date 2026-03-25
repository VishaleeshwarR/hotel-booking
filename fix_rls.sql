-- Run this in your Supabase SQL Editor to allow the seed script to insert data!

CREATE POLICY "Allow anon insert to hotels" ON public.hotels FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert to rooms" ON public.rooms FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert to packages" ON public.packages FOR INSERT WITH CHECK (true);
