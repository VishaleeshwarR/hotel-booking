-- Supabase Database Schema

-- 1. Hotels Table
CREATE TABLE public.hotels (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  price NUMERIC NOT NULL,
  "tatkalPrice" NUMERIC NOT NULL,
  availability INTEGER NOT NULL,
  "totalRooms" INTEGER NOT NULL,
  rating NUMERIC NOT NULL,
  image TEXT NOT NULL,
  amenities TEXT[] NOT NULL
);

-- 2. Rooms Table
CREATE TABLE public.rooms (
  id SERIAL PRIMARY KEY,
  hotel_id INTEGER REFERENCES public.hotels(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  capacity INTEGER NOT NULL
);

-- 3. Packages Table
CREATE TABLE public.packages (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  duration TEXT NOT NULL,
  includes TEXT[] NOT NULL,
  image TEXT NOT NULL
);

-- RLS Policies (Optional but good practice)
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to hotels" ON public.hotels FOR SELECT USING (true);
CREATE POLICY "Allow public read access to rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Allow public read access to packages" ON public.packages FOR SELECT USING (true);

-- Allow authenticated users to insert/update (or public for demo purposes if needed)
-- For now we only need read access for the frontend.
