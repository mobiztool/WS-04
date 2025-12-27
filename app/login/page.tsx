import Link from "next/link";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Icon icon="mdi:robot-excited" className="text-4xl text-primary" />
          <span className="text-2xl font-bold text-white">AI Marketing</span>
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">เข้าสู่ระบบ</CardTitle>
            <CardDescription>
              เข้าสู่ระบบเพื่อเริ่มสร้างเนื้อหาการตลาดด้วย AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-400">ยังไม่มีบัญชี? </span>
              <Link href="/signup" className="text-primary hover:underline font-medium">
                สมัครสมาชิก
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-400 mt-8">
          © 2024 AI Marketing Platform
        </p>
      </div>
    </div>
  );
}
