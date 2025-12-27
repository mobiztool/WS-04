import Link from "next/link";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const contentTypes = [
    {
      type: "social",
      title: "โพสต์โซเชียล",
      description: "สร้างโพสต์ที่น่าสนใจสำหรับ Facebook, Instagram, Twitter",
      icon: "mdi:instagram",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      type: "blog",
      title: "บทความบล็อก",
      description: "เขียนบทความคุณภาพสูงที่ช่วยสร้าง SEO และเพิ่ม Traffic",
      icon: "mdi:post",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      type: "email",
      title: "อีเมลการตลาด",
      description: "สร้างอีเมลที่ดึงดูดความสนใจและเพิ่มอัตราการเปิดอ่าน",
      icon: "mdi:email",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      type: "banner",
      title: "ภาพแบนเนอร์",
      description: "สร้างภาพแบนเนอร์สวยงามด้วย AI (Flux Schnell)",
      icon: "mdi:image-multiple",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">ยินดีต้อนรับ</h1>
        <p className="text-gray-300">
          เลือกประเภทเนื้อหาที่คุณต้องการสร้างด้วย AI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentTypes.map((item) => (
          <Card key={item.type} className="hover:shadow-lg transition-all hover:scale-105">
            <CardHeader>
              <div className={cn("flex items-center justify-center w-16 h-16 rounded-xl mb-4", item.bgColor)}>
                <Icon icon={item.icon} className={cn("text-4xl", item.color)} />
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/dashboard/generate/${item.type}`}>
                <Button className="w-full gap-2">
                  <Icon icon="mdi:sparkles" className="text-lg" />
                  สร้างเนื้อหา
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-primary/40 !bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Icon icon="mdi:lightbulb" className="text-yellow-400" />
            เคล็ดลับการใช้งาน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-200">
            <li className="flex items-start gap-2">
              <Icon icon="mdi:check-circle" className="text-green-500 mt-0.5" />
              <span>บอก AI ให้ละเอียดเพื่อผลลัพธ์ที่ดีที่สุด เช่น "สร้างโพสต์ Instagram สำหรับร้านกาแฟ โทนเป็นกันเอง"</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="mdi:check-circle" className="text-green-500 mt-0.5" />
              <span>ระบุกลุ่มเป้าหมายและจุดประสงค์ของเนื้อหาเพื่อความตรงจุด</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="mdi:check-circle" className="text-green-500 mt-0.5" />
              <span>สามารถสร้างใหม่ได้หากผลลัพธ์ไม่ตรงใจ แต่จะใช้ credits เพิ่ม</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
