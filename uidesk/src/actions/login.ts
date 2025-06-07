'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    console.error('Login failed:', authError?.message);
    redirect('/unauthorized');
    return; // stop execution
  }

  const { data: userRecord, error: userError } = await supabase
    .from('Users')
    .select('role')
    .eq('email', email)
    .single();

  if (userError || !userRecord) {
    console.error('Error fetching user role:', userError?.message);
    redirect('/unauthorized');
    return; // stop execution
  }

  const role = userRecord.role;

  revalidatePath('/', 'layout');

  if (role === 'Student') {
    redirect('/student/dashboard');
    return;
  } else if (role === 'Teacher') {
    redirect('/teacher/dashboard');
    return;
  } else {
    redirect('/');
    return;
  }
}
