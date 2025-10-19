-- Create storage bucket for content images
INSERT INTO storage.buckets (id, name, public)
VALUES ('content-images', 'content-images', true);

-- RLS policies for content-images bucket
CREATE POLICY "Admins can upload content images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'content-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update content images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'content-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete content images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'content-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Anyone can view content images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'content-images');