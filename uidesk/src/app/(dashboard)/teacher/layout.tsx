// app/(dashboard)/layout.tsx (for student or teacher dashboards)
import CopilotChatWrapper from '@/components/CopilotChatWrapper';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/unauthorized');
  }

  return <>{children}
      <CopilotChatWrapper />
  </>;
}
