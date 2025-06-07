import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const ALLOWED_ORIGINS = ['https://uina.vercel.app/', 'http://localhost:3000']; // add your allowed frontend domains here

export async function OPTIONS() {
  // Handle preflight CORS requests
  return NextResponse.json(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.join(','),
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // no cookies to set here
        },
      },
    }
  );

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      {
        status: 401,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGINS.join(','),
        },
      }
    );
  }

  const { data: userRecord, error: dbError } = await supabase
    .from('Users')
    .select('name')
    .eq('email', user.email)
    .single();

  if (dbError || !userRecord) {
    return NextResponse.json(
      { error: 'Username not found' },
      {
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGINS.join(','),
        },
      }
    );
  }

  return NextResponse.json(
    { username: userRecord.name },
    {
      headers: {
        'Access-Control-Allow-Origin': ALLOWED_ORIGINS.join(','),
      },
    }
  );
}
