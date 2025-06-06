// app/api/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set('auth_token', '', {
    path: '/',
    maxAge: 0, 
  });
  return response;
}
