// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookieStore.get(key)?.value,
        set: () => {},
        remove: () => {},
      },
    }
  );

  await supabase.auth.signOut();

  const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL));
  response.cookies.set('sb-access-token', '', { path: '/', maxAge: 0 });
  response.cookies.set('sb-refresh-token', '', { path: '/', maxAge: 0 });

  return response;
}
