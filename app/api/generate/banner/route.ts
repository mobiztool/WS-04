import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export async function POST(request: Request) {
  try {
    const { prompt, width = 1024, height = 1024 } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'กรุณากรอกคำอธิบายภาพ' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'กรุณาเข้าสู่ระบบก่อน' },
        { status: 401 }
      );
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('credits')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'ไม่พบข้อมูลผู้ใช้' },
        { status: 404 }
      );
    }

    if (userData.credits < 20) {
      return NextResponse.json(
        { error: 'Credits ไม่เพียงพอ (ต้องการ 20 credits)' },
        { status: 403 }
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: prompt,
          go_fast: true,
          megapixels: "1",
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "webp",
          output_quality: 80
        }
      }
    );

    const tempImageUrl = Array.isArray(output) ? output[0] : output;

    if (!tempImageUrl) {
      return NextResponse.json(
        { error: 'ไม่สามารถสร้างภาพได้ กรุณาลองใหม่อีกครั้ง' },
        { status: 500 }
      );
    }

    const imageResponse = await fetch(tempImageUrl as string);
    if (!imageResponse.ok) {
      throw new Error('ไม่สามารถดาวน์โหลดภาพได้');
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const imageBlob = new Blob([imageBuffer], { type: 'image/webp' });

    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('banners')
      .upload(fileName, imageBlob, {
        contentType: 'image/webp',
        cacheControl: '3600',
      });

    if (uploadError) {
      console.error('Error uploading to storage:', uploadError);
      throw new Error('ไม่สามารถบันทึกภาพได้');
    }

    const { data: { publicUrl } } = supabase.storage
      .from('banners')
      .getPublicUrl(fileName);

    const { error: insertError } = await supabase
      .from('generated_content')
      .insert({
        user_id: user.id,
        content_type: 'banner',
        prompt,
        generated_content: publicUrl,
      });

    if (insertError) {
      console.error('Error inserting content:', insertError);
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ credits: userData.credits - 20 })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating credits:', updateError);
    }

    return NextResponse.json({
      image_url: publicUrl,
      credits_remaining: userData.credits - 20,
    });
  } catch (error: any) {
    console.error('Error generating banner:', error);
    return NextResponse.json(
      { error: error.message || 'เกิดข้อผิดพลาดในการสร้างภาพ' },
      { status: 500 }
    );
  }
}
