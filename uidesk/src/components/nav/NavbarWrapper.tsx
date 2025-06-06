// src/components/nav/NavbarWrapper.tsx
import { createClient } from '@/lib/supabase/server';
import AuthNavbar from './AuthNavbar';
import NoAuthNavbar from './NoAuthNavbar'; // Optional

export default async function NavbarWrapper() {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return user ? <AuthNavbar /> : <NoAuthNavbar />;
}
