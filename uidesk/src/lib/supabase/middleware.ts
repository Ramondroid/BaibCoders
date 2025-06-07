// lib/supabase/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  // Create initial NextResponse instance
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Update cookies in the request
          request.cookies.set({ name, value, ...options });
          // Update cookies in the response to send to the browser
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          // Clear cookie value for removal
          request.cookies.set({ name, value: '', ...options });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const publicPaths = ['/', '/about', '/public'];

  // Redirect unauthenticated users trying to access protected routes
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

  // If authenticated and accessing role-based protected pages, verify role
  if (user && (pathname.startsWith('/student') || pathname.startsWith('/teacher'))) {
    const { data: userRecord, error } = await supabase
      .from('Users')
      .select('role')
      .eq('email', user.email)
      .single();

    if (error || !userRecord) {
      // If user record not found or error, redirect unauthorized
      const url = request.nextUrl.clone();
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    const role = userRecord.role;

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

  // Return the response with cookies updated (if any)
  return response;
}
