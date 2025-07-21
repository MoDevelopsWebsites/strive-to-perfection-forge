-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  paypal_payment_id TEXT,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (making tables public for now since no auth required for shopping)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT 
USING (true);

CREATE POLICY "Orders can be inserted by anyone" 
ON public.orders FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Order items can be inserted by anyone" 
ON public.order_items FOR INSERT 
WITH CHECK (true);

-- Insert sample products based on current merch items
INSERT INTO public.products (name, description, price, cost, image_url, category) VALUES 
('S2P Gaming Mousepad', 'High-quality gaming mousepad with S2P logo and smooth surface for optimal gaming performance', 29.99, 19.99, '/lovable-uploads/6af2116b-6281-4072-b96b-cec7ad59b43a.png', 'Gaming Accessories'),
('S2P Logo Stickers', 'Premium vinyl stickers featuring the iconic S2P logo. Perfect for laptops, water bottles, and more', 14.99, 4.99, '/lovable-uploads/dd9b3d57-c970-4261-8013-2f539e311295.png', 'Accessories'),
('S2P Team Jersey', 'Official S2P team jersey worn by our professional players. Comfortable and stylish gaming apparel', 49.99, 39.99, '/lovable-uploads/1389390b-6946-4880-829e-6c7b433bc757.png', 'Apparel'),
('S2P Energy Drink', 'Boost your gaming performance with our signature energy drink. Specially formulated for gamers', 19.99, 9.99, '/lovable-uploads/217da5cf-f539-4bd2-9e98-da82d4ae1c1e.png', 'Beverages');

-- Create trigger for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();