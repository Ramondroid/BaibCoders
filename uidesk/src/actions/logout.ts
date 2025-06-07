'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  // Clear Supabase auth cookies manually
  const cookieStore = await cookies();
  cookieStore.delete('sb-access-token');
  cookieStore.delete('sb-refresh-token');
  cookieStore.delete('sb-auth-token'); // sometimes used, just in case

  redirect('/');
}
