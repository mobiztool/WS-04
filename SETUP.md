# คู่มือการติดตั้ง AI Marketing Platform

## ขั้นตอนการติดตั้งและรันโปรเจคบน Local

### 1. Clone Repository

```bash
git clone <repository-url>
cd ws-04
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. ตั้งค่า Supabase

#### 3.1 สร้าง Supabase Project

1. ไปที่ [supabase.com](https://supabase.com)
2. คลิก **"New Project"**
3. กรอกข้อมูล:
   - **Organization**: เลือกหรือสร้างใหม่
   - **Name**: ชื่อโปรเจค (เช่น `ai-marketing-platform`)
   - **Database Password**: รหัสผ่านที่แข็งแรง (เก็บไว้ให้ดี)
   - **Region**: เลือกที่ใกล้ที่สุด (แนะนำ Singapore สำหรับคนไทย)
4. คลิก **"Create new project"**
5. รอประมาณ 2-3 นาทีจนโปรเจคพร้อม

#### 3.2 รัน SQL Schema

1. ไปที่ **SQL Editor** ในเมนูด้านซ้าย
2. คลิก **"New Query"**
3. คัดลอกเนื้อหาทั้งหมดจากไฟล์ `supabase-schema.sql` วางในช่อง
4. คลิก **"Run"** หรือกด Ctrl+Enter
5. ตรวจสอบว่าไม่มี error

#### 3.3 ตั้งค่า Authentication

1. ไปที่ **Authentication** > **Providers** ในเมนูด้านซ้าย
2. คลิกที่ **Email**
3. ตรวจสอบว่า:
   - ✅ **Enable Email provider** เปิดอยู่
   - ❌ **Confirm email** ปิดอยู่ (สำคัญ!)
4. คลิก **"Save"**

#### 3.4 ตั้งค่า URL Configuration

1. ไปที่ **Authentication** > **URL Configuration**
2. ตั้งค่า:
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: เพิ่ม `http://localhost:3000/auth/callback`
3. คลิก **"Save"**

#### 3.5 คัดลอก API Credentials

1. ไปที่ **Project Settings** (ไอคอนเฟือง) > **API**
2. คัดลอกค่าเหล่านี้:
   - **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 4. ตั้งค่า OpenRouter

1. ไปที่ [openrouter.ai](https://openrouter.ai)
2. คลิก **"Sign Up"** หรือ **"Login"**
3. ไปที่ **Keys** ในเมนู
4. คลิก **"Create Key"**
5. ตั้งชื่อ key (เช่น `AI Marketing Platform`)
6. คัดลอก API key (`OPENROUTER_API_KEY`)
7. **หมายเหตุ**: คุณต้องเติมเงินใน OpenRouter เพื่อใช้ API (เริ่มต้นที่ $5)

### 5. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ในโฟลเดอร์โปรเจค:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx
```

### 6. รันโปรเจค

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

## เสร็จสิ้น!

หากทุกอย่างทำงานถูกต้อง คุณพร้อมที่จะพัฒนาและปรับแต่งโปรเจคต่อไปแล้ว! 🎉

สำหรับการ deploy ไป production ดูที่ `DEPLOYMENT.md`
