# AI Marketing Platform

แพลตฟอร์มสร้างเนื้อหาการตลาดด้วย AI สำหรับคนไทย

## คุณสมบัติ

- 🤖 สร้างเนื้อหาการตลาดด้วย AI (โพสต์โซเชียล, บทความ, อีเมล)
- 👤 ระบบสมาชิกแบบไม่ต้องยืนยัน email
- 💳 ระบบ Credits (สมาชิกใหม่ได้ 100 credits ฟรี)
- 📊 Dashboard สวยงามด้วย Shadcn UI
- 🌐 รองรับภาษาไทย

## เทคโนโลยีที่ใช้

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Styling:** Tailwind CSS, Shadcn UI
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenRouter (Claude, GPT, etc.)
- **Deployment:** Vercel

## การติดตั้ง

### 1. Clone repository

```bash
git clone <repository-url>
cd ws-04
```

### 2. ติดตั้ง dependencies

```bash
npm install
```

### 3. ตั้งค่า Supabase

1. สร้างโปรเจคใหม่ที่ [supabase.com](https://supabase.com)
2. ไปที่ SQL Editor และรัน script ในไฟล์ `supabase-schema.sql`
3. ไปที่ Authentication > Providers > Email
   - เปิดใช้งาน Email provider
   - **ปิด "Confirm email"** (เพื่อให้ไม่ต้องยืนยัน email)
4. ไปที่ Authentication > URL Configuration
   - ตั้งค่า Site URL: `http://localhost:3000` (development)
   - เพิ่ม Redirect URLs: `http://localhost:3000/auth/callback`

### 4. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENROUTER_API_KEY=your-openrouter-key
```

ค้นหา Supabase credentials:
- ไปที่ Project Settings > API
- คัดลอก Project URL และ anon public key

สมัคร OpenRouter API key:
- ไปที่ [openrouter.ai](https://openrouter.ai)
- สมัครสมาชิกและสร้าง API key

### 5. รันโปรเจค

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

## โครงสร้างโปรเจค

```
├── app/
│   ├── api/
│   │   └── generate/          # API สำหรับสร้างเนื้อหาด้วย AI
│   ├── dashboard/             # หน้า Dashboard
│   │   ├── generate/[type]/   # หน้าสร้างเนื้อหา
│   │   └── history/           # ประวัติการสร้าง
│   ├── login/                 # หน้า Login
│   ├── signup/                # หน้าสมัครสมาชิก
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/
│   ├── auth/                  # Components สำหรับ authentication
│   └── ui/                    # Shadcn UI components
├── lib/
│   ├── supabase/              # Supabase clients
│   └── utils.ts               # Utility functions
└── middleware.ts              # Next.js middleware (route protection)
```

## การ Deploy

### Deploy ไป Vercel

1. Push code ไป GitHub
2. ไปที่ [vercel.com](https://vercel.com)
3. Import โปรเจคจาก GitHub
4. ตั้งค่า Environment Variables ใน Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENROUTER_API_KEY`
5. Deploy!

6. อย่าลืมอัพเดท Supabase URLs:
   - ไปที่ Supabase Project > Authentication > URL Configuration
   - เพิ่ม production URL เข้าไปใน Site URL และ Redirect URLs

## การใช้งาน

1. **สมัครสมาชิก:** ไปที่หน้า Signup และกรอก email, password, ชื่อ
2. **เข้าสู่ระบบ:** Login ด้วย email และ password
3. **สร้างเนื้อหา:** เลือกประเภทเนื้อหา (โพสต์โซเชียล, บทความ, อีเมล)
4. **กรอก Prompt:** บอก AI ว่าต้องการเนื้อหาแบบไหน
5. **รับผลลัพธ์:** AI จะสร้างเนื้อหาให้ (ใช้ 10 credits ต่อครั้ง)
6. **Copy และใช้งาน:** คัดลอกเนื้อหาที่ได้ไปใช้งานต่อ

## License

MIT
