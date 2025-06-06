// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server'; // SSR-aware Supabase client

export async function GET() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  // Redirect to login (or home)
  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL));
}
