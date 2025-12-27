"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContentHistory {
  id: string;
  content_type: string;
  prompt: string;
  generated_content: string;
  created_at: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ContentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        let query = supabase
          .from('generated_content')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (filter) {
          query = query.eq('content_type', filter);
        }

        const { data, error } = await query;

        if (!error && data) {
          setHistory(data);
        }
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('คัดลอกเนื้อหาแล้ว!');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'social':
        return 'mdi:instagram';
      case 'blog':
        return 'mdi:post';
      case 'email':
        return 'mdi:email';
      case 'banner':
        return 'mdi:image-multiple';
      default:
        return 'mdi:file-document';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'social':
        return 'โพสต์โซเชียล';
      case 'blog':
        return 'บทความบล็อก';
      case 'email':
        return 'อีเมลการตลาด';
      case 'banner':
        return 'ภาพแบนเนอร์';
      default:
        return type;
    }
  };

  const filters = [
    { value: null, label: 'ทั้งหมด' },
    { value: 'social', label: 'โพสต์โซเชียล' },
    { value: 'blog', label: 'บทความบล็อก' },
    { value: 'email', label: 'อีเมลการตลาด' },
    { value: 'banner', label: 'ภาพแบนเนอร์' },
  ];

  useEffect(() => {
    fetchHistory();
  }, [filter]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">ประวัติการสร้างเนื้อหา</h1>
        <p className="text-gray-300">
          ดูและจัดการเนื้อหาที่คุณสร้างไว้ทั้งหมด
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <Button
            key={f.value || 'all'}
            variant={filter === f.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Icon icon="mdi:loading" className="text-4xl animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-300">กำลังโหลด...</p>
        </div>
      ) : history.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Icon icon="mdi:file-document-outline" className="text-6xl mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-semibold mb-2 text-white">ยังไม่มีประวัติ</h3>
            <p className="text-gray-300 mb-4">
              เริ่มสร้างเนื้อหาเพื่อดูประวัติที่นี่
            </p>
            <Button onClick={() => window.location.href = '/dashboard'}>
              <Icon icon="mdi:plus" className="mr-2" />
              สร้างเนื้อหาใหม่
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon icon={getTypeIcon(item.content_type)} className="text-3xl text-primary" />
                    <div>
                      <CardTitle>{getTypeLabel(item.content_type)}</CardTitle>
                      <CardDescription>
                        {new Date(item.created_at).toLocaleString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </CardDescription>
                    </div>
                  </div>
                  {item.content_type !== 'banner' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(item.generated_content)}
                    >
                      <Icon icon="mdi:content-copy" className="mr-2" />
                      คัดลอก
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">คำสั่ง:</p>
                  <p className="text-sm bg-muted p-3 rounded-md">{item.prompt}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">ผลลัพธ์:</p>
                  {item.content_type === 'banner' ? (
                    <div className="bg-muted p-3 rounded-md">
                      <img src={item.generated_content} alt="Generated Banner" className="w-full h-auto rounded-md max-w-md" />
                    </div>
                  ) : (
                    <div className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">
                      {item.generated_content}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
