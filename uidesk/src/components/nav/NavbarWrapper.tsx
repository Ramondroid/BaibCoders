// src/components/nav/NavbarWrapper.tsx
import { createClient } from '@/lib/supabase/server';
import NoAuthNavbar from './NoAuthNavbar';
import AuthNavbar from './AuthNavbar';
import AdminNavbar from './AdminNavbar';

export default async function NavbarWrapper() {
  const supabase = await createClient();

 const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return <NoAuthNavbar />;

  const { data: userRecord, error } = await supabase
    .from("Users")
    .select("role")
    .eq("email", user.email)
    .single();

  if (error || !userRecord?.role) return <AuthNavbar />;

  const role = userRecord.role;

  if (role === "Teacher") return <AdminNavbar />;
  if (role === "Student") return <AuthNavbar />;

  return <NoAuthNavbar />;
}
