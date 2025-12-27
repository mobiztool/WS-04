"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface UserData {
  id: string;
  full_name: string;
  credits: number;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setUserData(data);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { href: "/dashboard", icon: "mdi:view-dashboard", label: "หน้าหลัก" },
    { href: "/dashboard/history", icon: "mdi:history", label: "ประวัติ" },
  ];

  return (
    <div className="min-h-screen bg-black">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-gray-900 border-gray-800">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Icon icon="mdi:robot-excited" className="text-3xl text-primary" />
            <span className="text-xl font-bold text-white">AI Marketing</span>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-2",
                      isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                  >
                    <Icon icon={item.icon} className="text-xl" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="border-t p-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Icon icon="mdi:coins" className="text-xl" />
                Credits คงเหลือ
              </div>
              <div className="mt-1 text-2xl font-bold">
                {loading ? "..." : userData?.credits || 0}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                ใช้ 10 credits ต่อการสร้าง
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-gray-900 border-gray-800 px-6">
          <div className="flex-1"></div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {userData?.full_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">
                  {userData?.full_name || "User"}
                </span>
                <Icon icon="mdi:chevron-down" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <Icon icon="mdi:logout" className="mr-2 text-lg" />
                ออกจากระบบ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
