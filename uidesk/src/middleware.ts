// import { NextRequest, NextResponse } from 'next/server'
// import { updateSession } from '@/lib/supabase/middleware'

// export async function middleware(request: NextRequest) {
//   const url = request.nextUrl

//   // Paths to exclude from middleware logic (public, auth pages, assets)
//   if (
//     url.pathname.startsWith('/_next') ||
//     url.pathname === '/favicon.ico'
//   ) {
//     return NextResponse.next()
//   }

//   // Validate session (redirects to /login if unauthenticated)
//   const response = await updateSession(request)

//   const userRole = request.cookies.get('user_role')?.value

//   // Redirect logged in users trying to access /login or root to their dashboard
//   if ((url.pathname === '/login' || url.pathname === '/') && userRole) {
//     const dashboardPath = userRole === 'student' ? '/student/dashboard' : userRole === 'teacher' ? '/teacher/dashboard' : '/dashboard'
//     return NextResponse.redirect(new URL(dashboardPath, request.url))
//   }

//   // Protect /student pages
//   if (url.pathname.startsWith('/student') && userRole !== 'student') {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   // Protect /teacher pages
//   if (url.pathname.startsWith('/teacher') && userRole !== 'teacher') {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   return response
// }

// export const config = {
//   matcher: [
//     '/',
//     '/login',
//     '/student/:path*',
//     '/teacher/:path*',
//   ],
// }
