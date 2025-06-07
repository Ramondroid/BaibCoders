import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const data = body.data; // <-- Fix: Extract the `data` property

  const { name, email, hashedPassword, course } = data || {};

  if (!name || !email || !hashedPassword || !course) {
    return NextResponse.json({ error: '❌ All fields are required' }, { status: 400 });
  }

  try {
    const { error } = await supabase.from('Users').insert([
      { name, email, hashedPassword, course }
    ]);

    if (error) {
      return NextResponse.json({ error: `❌ ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ message: '✅ Student enrolled successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: '❌ Server error' }, { status: 500 });
  }
}
