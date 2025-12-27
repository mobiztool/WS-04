# คู่มือการ Deploy AI Marketing Platform

## ขั้นตอนการ Deploy บน Vercel

### 1. เตรียม Supabase Project

1. ไปที่ [supabase.com](https://supabase.com) และสร้างโปรเจคใหม่
2. ไปที่ SQL Editor และรัน script ในไฟล์ `supabase-schema.sql`
3. ตั้งค่า Authentication:
   - ไปที่ **Authentication > Providers > Email**
   - เปิดใช้งาน **Email provider**
   - **ปิด "Confirm email"** เพื่อให้ไม่ต้องยืนยัน email
   - บันทึกการตั้งค่า

4. คัดลอก Supabase credentials:
   - ไปที่ **Project Settings > API**
   - คัดลอก **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - คัดลอก **anon public key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### 2. เตรียม OpenRouter API Key

1. ไปที่ [openrouter.ai](https://openrouter.ai)
2. สมัครสมาชิกและ Login
3. ไปที่ **API Keys** และสร้าง API key ใหม่
4. คัดลอก API key (OPENROUTER_API_KEY)

### 3. Deploy บน Vercel

#### วิธีที่ 1: ผ่าน Vercel Dashboard (แนะนำ)

1. ไปที่ [vercel.com](https://vercel.com)
2. Login ด้วย GitHub account
3. คลิก **"Add New Project"**
4. เลือก repository ของคุณ
5. ตั้งค่า Environment Variables:
   
   คลิก **"Environment Variables"** และเพิ่ม:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   OPENROUTER_API_KEY=your-openrouter-api-key
   ```

6. คลิก **"Deploy"**
7. รอจนกว่า deployment จะเสร็จ (ประมาณ 2-3 นาที)

### 4. อัพเดท Supabase URLs

หลังจาก deploy เสร็จแล้ว คุณจะได้ production URL (เช่น `https://your-app.vercel.app`)

1. กลับไปที่ Supabase Dashboard
2. ไปที่ **Authentication > URL Configuration**
3. ตั้งค่า:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: เพิ่ม
     - `https://your-app.vercel.app/auth/callback`
     - `http://localhost:3000/auth/callback` (สำหรับ development)

4. บันทึกการตั้งค่า

### 5. ทดสอบ Application

1. เปิด production URL ของคุณ
2. ทดสอบสมัครสมาชิก
3. ทดสอบ login
4. ทดสอบสร้างเนื้อหาด้วย AI
5. ตรวจสอบ credits ลดลงหลังจากสร้างเนื้อหา
6. ตรวจสอบประวัติการสร้างเนื้อหา

## การอัพเดท Application

หลังจากแก้ไขโค้ด เพียงแค่:

```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel จะ auto-deploy ให้อัตโนมัติ!

สำเร็จแล้ว! 🎉
