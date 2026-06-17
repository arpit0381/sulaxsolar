-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Team Members (About Page > Meet Our Expert Team)
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Services (Our Solar Services Page)
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  icon_name TEXT, -- e.g., 'Sun', 'Factory' mapped to Lucide icons
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Projects (Our Projects Page)
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  location TEXT,
  project_date TEXT, -- using TEXT since standard frontend uses 'December 2020' format
  capacity TEXT,
  homes TEXT,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Gallery (Gallery Page)
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  category TEXT NOT NULL, -- e.g., 'residential', 'commercial', 'installation'
  title TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Contact Messages (Contact Page)
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread', -- 'unread', 'read', 'archived'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Hero Carousel (Home Page Carousel)
CREATE TABLE public.hero_slides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  title TEXT,
  title_accent TEXT,
  subtitle TEXT,
  description TEXT,
  cta1_label TEXT,
  cta1_to TEXT,
  cta2_label TEXT,
  cta2_to TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Product Registrations (Home Page)
CREATE TABLE public.product_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  product_name TEXT NOT NULL,
  installation_date TEXT NOT NULL,
  capacity TEXT,
  images TEXT[] DEFAULT '{}',
  google_rated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) CONFIGURATION
-- ==========================================
-- NOTE: We are disabling RLS entirely so that all users 
-- on your local frontend can fully view, add, edit, and delete data
-- from the Admin Dashboard without needing to log in via Supabase Auth.
--
-- Warning: If you deploy this to a public URL in the future, you MUST 
-- re-enable RLS and configure policies, otherwise anyone can delete your data.

ALTER TABLE public.team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_registrations DISABLE ROW LEVEL SECURITY;
