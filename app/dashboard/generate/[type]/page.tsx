"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function GeneratePage() {
  const params = useParams();
  const router = useRouter();
  const type = params.type as string;

  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getTypeInfo = () => {
    switch (type) {
      case 'social':
        return {
          title: 'สร้างโพสต์โซเชียล',
          description: 'สร้างโพสต์ที่น่าสนใจสำหรับ Facebook, Instagram, Twitter',
          icon: 'mdi:instagram',
          placeholder: 'ตัวอย่าง: สร้างโพสต์ Instagram สำหรับร้านกาแฟใหม่ โทนเป็นกันเอง กลุ่มเป้าหมายคือคนทำงาน วัยรุ่น',
          isImage: false,
        };
      case 'blog':
        return {
          title: 'สร้างบทความบล็อก',
          description: 'เขียนบทความคุณภาพสูงที่ช่วยสร้าง SEO',
          icon: 'mdi:post',
          placeholder: 'ตัวอย่าง: เขียนบทความเกี่ยวกับ "5 เคล็ดลับการทำ Content Marketing ที่มือใหม่ต้องรู้" ประมาณ 500 คำ',
          isImage: false,
        };
      case 'email':
        return {
          title: 'สร้างอีเมลการตลาด',
          description: 'สร้างอีเมลที่ดึงดูดความสนใจและเพิ่มอัตราการเปิดอ่าน',
          icon: 'mdi:email',
          placeholder: 'ตัวอย่าง: สร้างอีเมลการตลาดสำหรับโปรโมชั่นลด 50% ของร้านเสื้อผ้า เป้าหมายคือสตรีวัย 25-35 ปี',
          isImage: false,
        };
      case 'banner':
        return {
          title: 'สร้างภาพแบนเนอร์',
          description: 'สร้างภาพแบนเนอร์สวยงามด้วย AI (Flux Schnell)',
          icon: 'mdi:image-multiple',
          placeholder: 'ตัวอย่าง: A modern coffee shop banner with warm lighting, coffee beans, and latte art, professional photography style',
          isImage: true,
        };
      default:
        return {
          title: 'สร้างเนื้อหา',
          description: 'สร้างเนื้อหาการตลาดด้วย AI',
          icon: 'mdi:file-document',
          placeholder: 'บอก AI ว่าคุณต้องการเนื้อหาแบบไหน...',
          isImage: false,
        };
    }
  };

  const typeInfo = getTypeInfo();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('กรุณากรอกคำสั่งก่อน');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedContent('');
    setImageUrl('');

    try {
      const apiEndpoint = type === 'banner' ? '/api/generate/banner' : '/api/generate';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content_type: type,
          prompt: prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาด');
      }

      if (type === 'banner') {
        setImageUrl(data.image_url);
      } else {
        setGeneratedContent(data.content);
      }
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('คัดลอกเนื้อหาแล้ว!');
  };

  const handleRegenerate = () => {
    setGeneratedContent('');
    setImageUrl('');
    handleGenerate();
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `banner-${Date.now()}.webp`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('ไม่สามารถดาวน์โหลดภาพได้');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.push('/dashboard')}
      >
        <Icon icon="mdi:arrow-left" className="mr-2" />
        กลับ
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Icon icon={typeInfo.icon} className="text-4xl text-primary" />
            <div>
              <CardTitle>{typeInfo.title}</CardTitle>
              <CardDescription>{typeInfo.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm flex items-center gap-2">
              <Icon icon="mdi:alert-circle" className="text-lg" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="prompt">บอก AI ว่าคุณต้องการเนื้อหาแบบไหน</Label>
            <Textarea
              id="prompt"
              placeholder={typeInfo.placeholder}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              disabled={loading}
            />
            <p className="text-xs text-gray-400">
              💡 เคล็ดลับ: บอกรายละเอียดให้มากเพื่อผลลัพธ์ที่ดีที่สุด
            </p>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Icon icon="mdi:loading" className="mr-2 animate-spin" />
                {typeInfo.isImage ? 'กำลังสร้างภาพ...' : 'กำลังสร้าง...'}
              </>
            ) : (
              <>
                <Icon icon="mdi:sparkles" className="mr-2" />
                {typeInfo.isImage ? 'สร้างภาพ (ใช้ 20 Credits)' : 'สร้างเนื้อหา (ใช้ 10 Credits)'}
              </>
            )}
          </Button>

          {generatedContent && (
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label>ผลลัพธ์</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Icon icon="mdi:content-copy" className="mr-2" />
                    คัดลอก
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRegenerate}>
                    <Icon icon="mdi:refresh" className="mr-2" />
                    สร้างใหม่
                  </Button>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                {generatedContent}
              </div>
            </div>
          )}

          {imageUrl && (
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label>ภาพที่สร้าง</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Icon icon="mdi:download" className="mr-2" />
                    ดาวน์โหลด
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRegenerate}>
                    <Icon icon="mdi:refresh" className="mr-2" />
                    สร้างใหม่
                  </Button>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <img 
                  src={imageUrl} 
                  alt="Generated Banner" 
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
