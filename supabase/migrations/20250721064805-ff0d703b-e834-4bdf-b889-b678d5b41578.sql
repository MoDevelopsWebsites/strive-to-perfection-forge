-- Clear existing products and update with S2P specific merchandise
DELETE FROM public.products;

-- Insert S2P specific products with GBP pricing
INSERT INTO public.products (name, description, price, cost, image_url, category, in_stock) VALUES 
('S2P Jersey', 'Official S2P esports jersey featuring our signature design. Premium quality material perfect for gaming sessions and representing the squad.', 69.99, 59.99, '/lovable-uploads/1389390b-6946-4880-829e-6c7b433bc757.png', 'Apparel', true),
('S2P Hoodie', 'Comfortable and stylish S2P hoodie made from premium materials. Perfect for casual wear and showing your S2P pride.', 89.99, 79.99, '/lovable-uploads/d84d4bbd-8083-4b11-ad0b-42850856a57f.png', 'Apparel', true),
('S2P Hoodie & Jersey Bundle', 'Complete S2P apparel bundle featuring both our signature jersey and hoodie. Save money with this exclusive combo deal.', 139.99, 129.99, '/lovable-uploads/6c6abcc5-cdb4-419a-9113-483835517d96.png', 'Bundle', true);