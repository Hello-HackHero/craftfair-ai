-- CraftFair AI Database Schema for Supabase PostgreSQL
-- Department of IT, Guru Ghasidas Vishwavidyalaya, Bilaspur

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Artisans Table
CREATE TABLE IF NOT EXISTS public.artisans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone_number TEXT,
    cluster_region TEXT NOT NULL DEFAULT 'Bastar_CG',
    village_district TEXT DEFAULT 'Kondagaon, Bastar',
    state TEXT DEFAULT 'Chhattisgarh',
    gi_card_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Craft Items Table
CREATE TABLE IF NOT EXISTS public.craft_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artisan_id UUID REFERENCES public.artisans(id) ON DELETE SET NULL,
    category TEXT NOT NULL,
    primary_material TEXT NOT NULL,
    technique TEXT NOT NULL,
    complexity_score INTEGER CHECK (complexity_score >= 1 AND complexity_score <= 10),
    labour_days INTEGER NOT NULL CHECK (labour_days > 0),
    raw_material_cost NUMERIC(10, 2) NOT NULL CHECK (raw_material_cost >= 0),
    photo_url TEXT,
    visual_features JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Price Predictions (ML Audit Log)
CREATE TABLE IF NOT EXISTS public.price_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    craft_item_id UUID REFERENCES public.craft_items(id) ON DELETE CASCADE,
    fair_price NUMERIC(10, 2) NOT NULL,
    price_min_bound NUMERIC(10, 2) NOT NULL,
    price_max_bound NUMERIC(10, 2) NOT NULL,
    raw_material_with_wastage NUMERIC(10, 2) NOT NULL,
    labour_compensation NUMERIC(10, 2) NOT NULL,
    gi_heritage_premium NUMERIC(10, 2) NOT NULL,
    artisan_profit_margin NUMERIC(10, 2) NOT NULL,
    middleman_exploitation_price NUMERIC(10, 2) NOT NULL,
    urban_showroom_mrp NUMERIC(10, 2) NOT NULL,
    mape_percent NUMERIC(5, 2) DEFAULT 6.02,
    r2_score NUMERIC(5, 3) DEFAULT 0.964,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Digital Catalog (Published Listings)
CREATE TABLE IF NOT EXISTS public.digital_catalog (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    craft_item_id UUID REFERENCES public.craft_items(id) ON DELETE CASCADE,
    title_en TEXT NOT NULL,
    title_hi TEXT NOT NULL,
    story_narrative_en TEXT,
    story_narrative_hi TEXT,
    fair_price NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'sold')),
    technical_specs JSONB,
    fair_trade_badge JSONB,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Setup
ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.craft_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_catalog ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read and insert for the demo
CREATE POLICY "Public Read Catalog" ON public.digital_catalog FOR SELECT USING (true);
CREATE POLICY "Public Insert Catalog" ON public.digital_catalog FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Predictions" ON public.price_predictions FOR SELECT USING (true);
CREATE POLICY "Public Insert Predictions" ON public.price_predictions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Craft Items" ON public.craft_items FOR SELECT USING (true);
CREATE POLICY "Public Insert Craft Items" ON public.craft_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Artisans" ON public.artisans FOR SELECT USING (true);
CREATE POLICY "Public Insert Artisans" ON public.artisans FOR INSERT WITH CHECK (true);

-- Seed Sample Data
INSERT INTO public.artisans (id, full_name, phone_number, cluster_region, village_district, state, gi_card_number)
VALUES 
('a0000000-0000-0000-0000-000000000001', 'Gupta Ram Markam', '+91 98765 43210', 'Bastar_CG', 'Kondagaon Craft Nagar', 'Chhattisgarh', 'GI-CG-DHK-083'),
('a0000000-0000-0000-0000-000000000002', 'Laxmi Bai Kashyap', '+91 98765 43211', 'Bastar_CG', 'Tokapal Village', 'Chhattisgarh', 'GI-CG-TER-114')
ON CONFLICT (id) DO NOTHING;
