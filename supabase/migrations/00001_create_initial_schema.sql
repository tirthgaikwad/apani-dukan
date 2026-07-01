-- Create festivals table
CREATE TABLE festivals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  emoji TEXT NOT NULL,
  description TEXT NOT NULL,
  season TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL UNIQUE,
  festival_id UUID REFERENCES festivals(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL,
  emoji TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT NOT NULL,
  phone TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create testimonials table (approved feedback for display)
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  testimonial_text TEXT NOT NULL,
  location TEXT DEFAULT 'Akole',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create announcements table
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_en TEXT NOT NULL,
  message_mr TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Create indexes for better performance
CREATE INDEX idx_products_festival ON products(festival_id);
CREATE INDEX idx_products_available ON products(is_available);
CREATE INDEX idx_feedback_approved ON feedback(is_approved);
CREATE INDEX idx_testimonials_active ON testimonials(is_active, display_order);
CREATE INDEX idx_announcements_active ON announcements(is_active, priority);

-- Enable Row Level Security
ALTER TABLE festivals ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for festivals (public read)
CREATE POLICY "Allow public read access to festivals"
  ON festivals FOR SELECT
  TO public
  USING (true);

-- RLS Policies for products (public read)
CREATE POLICY "Allow public read access to products"
  ON products FOR SELECT
  TO public
  USING (is_available = true);

-- RLS Policies for feedback (public insert only, no read for privacy)
CREATE POLICY "Allow public insert feedback"
  ON feedback FOR INSERT
  TO public
  WITH CHECK (true);

-- RLS Policies for testimonials (public read active only)
CREATE POLICY "Allow public read active testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (is_active = true);

-- RLS Policies for announcements (public read active only)
CREATE POLICY "Allow public read active announcements"
  ON announcements FOR SELECT
  TO public
  USING (is_active = true AND (expires_at IS NULL OR expires_at > NOW()));
