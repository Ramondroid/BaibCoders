// app/api/signup/route.ts
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: existing } = await supabase
    .from('User')
    .select('id')
    .eq('email', email)
    .limit(1);

  if (existing && existing.length > 0) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase.from('User').insert([
    {
      email,
      name,
      hashedPassword, 
    },
  ]).select().single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Signup failed' }, { status: 500 });
  }

  // ✅ Set auth_token cookie
  (await cookies()).set('auth_token', data.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  // ✅ Redirect to dashboard
  return NextResponse.redirect(new URL('/dashboard', req.url));
}
