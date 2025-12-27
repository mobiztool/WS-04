-- อัพเดท generated_content table ให้รองรับ 'banner' type
ALTER TABLE public.generated_content 
DROP CONSTRAINT IF EXISTS generated_content_content_type_check;

ALTER TABLE public.generated_content 
ADD CONSTRAINT generated_content_content_type_check 
CHECK (content_type IN ('social', 'blog', 'email', 'banner'));

-- สร้าง Storage bucket สำหรับเก็บภาพแบนเนอร์
-- Note: คำสั่งนี้ต้องรันใน Supabase Dashboard > Storage
-- 1. ไปที่ Storage
-- 2. สร้าง bucket ใหม่ชื่อ 'banners'
-- 3. ตั้งค่า Public bucket (เปิดให้ทุกคนดูได้)
-- 4. ตั้งค่า File size limit เป็น 10MB

-- หรือรันคำสั่ง SQL นี้ใน SQL Editor:
INSERT INTO storage.buckets (id, name, public)
VALUES ('banners', 'banners', true)
ON CONFLICT (id) DO NOTHING;

-- สร้าง Storage Policy เพื่อให้ user อัพโหลดได้
CREATE POLICY "Users can upload their own banners"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'banners' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Anyone can view banners"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'banners');

CREATE POLICY "Users can delete their own banners"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'banners' AND (storage.foldername(name))[1] = auth.uid()::text);
