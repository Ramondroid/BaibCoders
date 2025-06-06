import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Extract email and password from JSON body
  const { email, password } = await req.json()

  // Create the supabase client with request cookies (so it can manage auth cookies)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => {
          const cookies = req.headers.get('cookie')?.split(';').map(c => c.trim())
          const cookie = cookies?.find(c => c.startsWith(`${name}=`))
          return cookie?.split('=')[1]
        },
        set: (name, value, options) => {
          // This won't be used in this context since we handle cookie setting later
        },
        remove: (name, options) => {
          // This won't be used in this context since we handle cookie removal later
        },
      },
    }
  )

  // Perform sign-in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.session) {
    return NextResponse.json({ error: error?.message || 'Authentication failed' }, { status: 401 })
  }

  // Create a redirect response based on user role
  const redirectTo =
    data.user.user_metadata?.role === 'student'
      ? '/student/dashboard'
      : data.user.user_metadata?.role === 'teacher'
      ? '/teacher/dashboard'
      : '/dashboard'

  const response = NextResponse.redirect(new URL(redirectTo, req.url))

  // Now, IMPORTANT: update cookies in response to persist session
  // Use supabase.auth.setSession() to update cookies inside your response

  // Note: createServerClient doesn't expose a direct way to mutate response cookies,
  // so you must manually set cookies returned from supabase.auth.getSession()

  // Get the session cookie headers set by supabase client
  const { session } = data

  // Manually set the Supabase auth cookies on the response, based on session
  // The cookies to set are: supabase-auth-token and refresh-token, but Supabase's library doesn't expose them here,
  // so you must re-create cookies manually

  // Instead, call supabase.auth.getSession() to get cookies, but it's client-side only.

  // So the typical workaround is:
  // Set the access_token and refresh_token as httpOnly cookies yourself.

  const accessToken = session.access_token
  const refreshToken = session.refresh_token
  const expiresAt = new Date((session.expires_at ?? Math.floor(Date.now() / 1000) + 3600) * 1000) // session.expires_at is in seconds

  // Set cookies on the response (adjust domain/path/secure as needed)
  response.cookies.set('sb-access-token', accessToken, {
    httpOnly: true,
    path: '/',
    expires: expiresAt,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  response.cookies.set('sb-refresh-token', refreshToken, {
    httpOnly: true,
    path: '/',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days refresh token expiry
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
