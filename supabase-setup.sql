-- =======================================================
-- SUPABASE DATABASE SCHEMA FOR SHISHA STORE ALBANIA
-- =======================================================

-- 1. CREATE PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public Policy: Anyone can read products
CREATE POLICY "Allow public read access on products"
ON public.products FOR SELECT
USING (true);

-- Admin Policy: Allow insert, update, delete on products
CREATE POLICY "Allow admin write access on products"
ON public.products FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow admin update access on products"
ON public.products FOR UPDATE
USING (true);

CREATE POLICY "Allow admin delete access on products"
ON public.products FOR DELETE
USING (true);

-- 3. CREATE STORAGE BUCKET FOR PRODUCT IMAGES
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read policy for storage
CREATE POLICY "Public Read Access on product-images bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Public upload policy for storage
CREATE POLICY "Public Upload Access on product-images bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');
