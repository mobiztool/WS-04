import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY || '',
  });
  try {
    const { content_type, prompt } = await request.json();

    if (!content_type || !prompt) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
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

    if (userData.credits < 10) {
      return NextResponse.json(
        { error: 'Credits ไม่เพียงพอ (ต้องการ 10 credits)' },
        { status: 403 }
      );
    }

    let systemPrompt = '';
    switch (content_type) {
      case 'social':
        systemPrompt = 'คุณเป็น AI ที่เชี่ยวชาญในการสร้างโพสต์โซเชียลมีเดีย สร้างเนื้อหาที่น่าสนใจ มีแคปชันที่ดึงดูด และ hashtags ที่เหมาะสม เขียนเป็นภาษาไทย';
        break;
      case 'blog':
        systemPrompt = 'คุณเป็น AI ที่เชี่ยวชาญในการเขียนบทความบล็อก สร้างเนื้อหาที่มีคุณภาพสูง มีโครงสร้างที่ดี และ SEO-friendly เขียนเป็นภาษาไทย';
        break;
      case 'email':
        systemPrompt = 'คุณเป็น AI ที่เชี่ยวชาญในการเขียนอีเมลการตลาด สร้างอีเมลที่มี subject line ดึงดูด เนื้อหาน่าสนใจ และ call-to-action ที่ชัดเจน เขียนเป็นภาษาไทย';
        break;
      default:
        systemPrompt = 'คุณเป็น AI ที่เชี่ยวชาญในการสร้างเนื้อหาการตลาด เขียนเป็นภาษาไทย';
    }

    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const generatedContent = completion.choices[0]?.message?.content || '';

    if (!generatedContent) {
      return NextResponse.json(
        { error: 'ไม่สามารถสร้างเนื้อหาได้ กรุณาลองใหม่อีกครั้ง' },
        { status: 500 }
      );
    }

    const { error: insertError } = await supabase
      .from('generated_content')
      .insert({
        user_id: user.id,
        content_type,
        prompt,
        generated_content: generatedContent,
      });

    if (insertError) {
      console.error('Error inserting content:', insertError);
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ credits: userData.credits - 10 })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating credits:', updateError);
    }

    return NextResponse.json({
      content: generatedContent,
      credits_remaining: userData.credits - 10,
    });
  } catch (error: any) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: error.message || 'เกิดข้อผิดพลาดในการสร้างเนื้อหา' },
      { status: 500 }
    );
  }
}
