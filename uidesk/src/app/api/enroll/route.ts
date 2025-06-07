import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for admin operations!
);

export async function POST(req: Request) {
  const body = await req.json();
  const data = body.data;

  const { name, email, password, course } = data || {};

  if (!name || !email || !password || !course) {
    return NextResponse.json({ error: '❌ All fields are required' }, { status: 400 });
  }

  try {
    // 1. Create the user in Supabase Auth using the Admin API
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // optionally confirm the email immediately
    });

    if (authError) {
      return NextResponse.json({ error: `❌ Auth error: ${authError.message}` }, { status: 500 });
    }

    // 2. Insert user info in your custom Users table with the auth user's id
    const { error: dbError } = await supabase.from('Users').insert([
      {
        id: authUser.user.id, // use the auth user id as foreign key
        name,
        email,
        course,
      }
    ]);

    if (dbError) {
      return NextResponse.json({ error: `❌ Database error: ${dbError.message}` }, { status: 500 });
    }

    return NextResponse.json({ message: '✅ Student enrolled successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: '❌ Server error' }, { status: 500 });
  }
}
