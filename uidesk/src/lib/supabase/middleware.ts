// lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

const publicPaths = ['/', '/about', '/public'];

if (
  !user &&
  !publicPaths.some((path) => pathname.startsWith(path)) &&
  !pathname.startsWith('/login') &&
  !pathname.startsWith('/auth')
) {
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}


  // 🧠 If the route is protected, fetch the role
  if (user && (pathname.startsWith('/student') || pathname.startsWith('/teacher'))) {
    const { data: userRecord, error } = await supabase
      .from('Users')
      .select('role')
      .eq('email', user.email)
      .single();

    const role = userRecord?.role;

    // ❌ If role mismatch → redirect
    if (pathname.startsWith('/student') && role !== 'Student') {
      const url = request.nextUrl.clone();
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/teacher') && role !== 'Teacher') {
      const url = request.nextUrl.clone();
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
