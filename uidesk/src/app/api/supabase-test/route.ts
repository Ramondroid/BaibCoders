// app/api/supabase-test/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.from('User').select('*').limit(1);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ connected: false, error: error.message });
  }

  return NextResponse.json({ connected: true, sampleUser: data });
}
