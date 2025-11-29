-- Create tours table
CREATE TABLE public.tours (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration_hours INTEGER NOT NULL,
  max_participants INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  location TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  difficulty TEXT CHECK (difficulty IN ('easy', 'moderate', 'challenging')),
  category TEXT CHECK (category IN ('adventure', 'cultural', 'food', 'nature', 'city')),
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tour_id UUID NOT NULL REFERENCES public.tours(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tour_id UUID NOT NULL REFERENCES public.tours(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  booking_date DATE NOT NULL,
  participants INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  payment_intent_id TEXT,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tours (public read, admin write)
CREATE POLICY "Tours are viewable by everyone" 
  ON public.tours FOR SELECT USING (true);

CREATE POLICY "Tours are insertable by authenticated users" 
  ON public.tours FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Tours are updatable by authenticated users" 
  ON public.tours FOR UPDATE TO authenticated USING (true);

-- RLS Policies for reviews (public read, authenticated write)
CREATE POLICY "Reviews are viewable by everyone" 
  ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Users can create their own reviews" 
  ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own reviews" 
  ON public.reviews FOR UPDATE TO authenticated USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own reviews" 
  ON public.reviews FOR DELETE TO authenticated USING (auth.uid()::text = user_id::text);

-- RLS Policies for bookings (users can only see their own)
CREATE POLICY "Users can view their own bookings" 
  ON public.bookings FOR SELECT TO authenticated USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own bookings" 
  ON public.bookings FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own bookings" 
  ON public.bookings FOR UPDATE TO authenticated USING (auth.uid()::text = user_id::text);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_tours_updated_at
  BEFORE UPDATE ON public.tours
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample tours data
INSERT INTO public.tours (name, description, price, duration_hours, max_participants, image_url, location, features, difficulty, category) VALUES
('Mountain Adventure Trek', 'Experience breathtaking mountain views on this challenging hiking adventure. Perfect for outdoor enthusiasts seeking an adrenaline rush.', 120.00, 6, 8, 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop', 'Rocky Mountains', ARRAY['Professional Guide', 'Safety Equipment', 'Snacks & Water', 'Photos Included'], 'challenging', 'adventure'),
('Historic City Walking Tour', 'Discover the rich history and culture of our beautiful city with expert local guides who bring the past to life.', 45.00, 3, 15, 'https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=800&h=600&fit=crop', 'Old Town District', ARRAY['Expert Guide', 'Museum Entries', 'Audio Equipment', 'Map Included'], 'easy', 'cultural'),
('Gourmet Food & Wine Experience', 'Indulge in a culinary journey through local flavors, visiting the best restaurants and wineries in the region.', 95.00, 4, 10, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', 'Wine Country', ARRAY['Wine Tasting', 'Food Samples', 'Expert Sommelier', 'Transportation'], 'easy', 'food'),
('Coastal Kayaking Adventure', 'Paddle along stunning coastlines and explore hidden coves in this exciting water-based adventure.', 85.00, 4, 12, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop', 'Pacific Coast', ARRAY['Kayak & Gear', 'Safety Briefing', 'Waterproof Bag', 'Snacks'], 'moderate', 'adventure'),
('Sunset Photography Tour', 'Capture stunning landscapes during golden hour with guidance from professional photographers.', 75.00, 3, 8, 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&h=600&fit=crop', 'Scenic Valley', ARRAY['Photo Tips', 'Location Access', 'Equipment Advice', 'Hot Beverages'], 'easy', 'nature'),
('Urban Street Art Discovery', 'Explore vibrant street art and meet local artists in this colorful journey through the city''s creative heart.', 55.00, 2.5, 12, 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&h=600&fit=crop', 'Arts District', ARRAY['Local Artist Meetings', 'Gallery Visits', 'Photo Opportunities', 'Art History'], 'easy', 'cultural');