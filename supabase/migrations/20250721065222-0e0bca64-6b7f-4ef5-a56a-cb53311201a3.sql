-- Update all product images with the new uploaded S2P merchandise photos
UPDATE public.products 
SET image_url = '/lovable-uploads/d8d3f933-8f76-4695-962f-113136204340.png'
WHERE name = 'S2P Jersey';

UPDATE public.products 
SET image_url = '/lovable-uploads/2e710db1-c7f0-4869-97ed-bdc75dbe95d4.png'
WHERE name = 'S2P Hoodie';

UPDATE public.products 
SET image_url = '/lovable-uploads/9bb55e24-658e-4d34-8bbd-c0604e30f6cd.png'
WHERE name = 'S2P Hoodie & Jersey Bundle';