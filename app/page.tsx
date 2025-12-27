import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:robot-excited" className="text-4xl text-primary" />
            <span className="text-2xl font-bold text-white">AI Marketing</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">เข้าสู่ระบบ</Button>
            </Link>
            <Link href="/signup">
              <Button>เริ่มใช้งานฟรี</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6 text-white">
            สร้างเนื้อหาการตลาด
            <span className="text-purple-400"> ด้วย AI</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            ให้ AI ช่วยคุณสร้างเนื้อหาการตลาดคุณภาพสูงภายในไม่กี่วินาที
            <br />
            ไม่ว่าจะเป็นโพสต์โซเชียล บทความบล็อก หรืออีเมลการตลาด
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="text-lg">
                <Icon icon="mdi:rocket-launch" className="mr-2 text-xl" />
                เริ่มใช้งานฟรี
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg">
              <Icon icon="mdi:play-circle" className="mr-2 text-xl" />
              ดูวิธีใช้งาน
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            🎁 สมาชิกใหม่รับ 100 Credits ฟรี!
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">สร้างเนื้อหาได้หลากหลาย</h2>
          <p className="text-gray-300">เลือกประเภทเนื้อหาที่คุณต้องการ AI จะช่วยสร้างให้</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Icon icon="mdi:instagram" className="text-3xl text-primary" />
              </div>
              <CardTitle>โพสต์โซเชียล</CardTitle>
              <CardDescription>
                สร้างโพสต์ที่น่าสนใจสำหรับ Facebook, Instagram, Twitter ที่ดึงดูดความสนใจ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  แคปชันที่น่าสนใจ
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  Hashtags ที่เหมาะสม
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  Call-to-Action ที่ชัดเจน
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Icon icon="mdi:post" className="text-3xl text-primary" />
              </div>
              <CardTitle>บทความบล็อก</CardTitle>
              <CardDescription>
                เขียนบทความคุณภาพสูงที่ช่วยสร้าง SEO และเพิ่ม Traffic ให้เว็บไซต์
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  เนื้อหาที่มีคุณภาพ
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  โครงสร้างที่ดี
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  SEO-Friendly
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Icon icon="mdi:email" className="text-3xl text-primary" />
              </div>
              <CardTitle>อีเมลการตลาด</CardTitle>
              <CardDescription>
                สร้างอีเมลที่ดึงดูดความสนใจและเพิ่มอัตราการเปิดอ่าน
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  Subject Line ที่ดึงดูด
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  เนื้อหาที่น่าสนใจ
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  Personalization
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30 rounded-3xl my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">ใช้งานง่ายเพียง 3 ขั้นตอน</h2>
          <p className="text-gray-300">เริ่มสร้างเนื้อหาการตลาดด้วย AI ได้ในไม่กี่นาที</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">สมัครสมาชิก</h3>
            <p className="text-gray-300">
              สมัครฟรีภายใน 1 นาที รับ 100 Credits ทันที ไม่ต้องยืนยัน email
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">บอก AI ว่าต้องการอะไร</h3>
            <p className="text-gray-300">
              เลือกประเภทเนื้อหาและบอก AI ว่าคุณต้องการเนื้อหาแบบไหน
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">รับผลลัพธ์ทันที</h3>
            <p className="text-gray-300">
              AI จะสร้างเนื้อหาคุณภาพสูงให้คุณภายในไม่กี่วินาที พร้อมใช้งานได้เลย
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">ราคาที่เป็นมิตร</h2>
          <p className="text-gray-300">เริ่มต้นฟรี พร้อมรับ 100 Credits</p>
        </div>
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">สมาชิกฟรี</CardTitle>
            <CardDescription>เหมาะสำหรับผู้เริ่มต้น</CardDescription>
            <div className="mt-4">
              <span className="text-5xl font-bold">100</span>
              <span className="text-gray-300 ml-2">Credits ฟรี</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Icon icon="mdi:check-circle" className="text-green-500 text-xl" />
                สร้างเนื้อหาได้สูงสุด 10 ครั้ง
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="mdi:check-circle" className="text-green-500 text-xl" />
                เข้าถึงฟีเจอร์ทั้งหมด
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="mdi:check-circle" className="text-green-500 text-xl" />
                บันทึกประวัติการสร้าง
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="mdi:check-circle" className="text-green-500 text-xl" />
                ไม่ต้องผูกบัตรเครดิต
              </li>
            </ul>
            <Link href="/signup" className="block mt-6">
              <Button className="w-full" size="lg">
                เริ่มใช้งานฟรี
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-primary text-primary-foreground rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">พร้อมเริ่มสร้างเนื้อหาแล้วหรือยัง?</h2>
          <p className="text-xl mb-8 opacity-90">
            เริ่มใช้งาน AI Marketing Platform วันนี้ ฟรี!
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="text-lg">
              <Icon icon="mdi:rocket-launch" className="mr-2 text-xl" />
              สมัครสมาชิกฟรี
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2024 AI Marketing Platform. สร้างด้วย ❤️ สำหรับคนไทย</p>
        </div>
      </footer>
    </div>
  );
}
