// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      name,
    },
  });


  const res = NextResponse.json({ message: 'User created' });
  res.cookies.set('auth_token', user.id, {
    httpOnly: true,
    secure: true,
    path: '/',
  });


  return NextResponse.json({ message: 'User created', user });
}
