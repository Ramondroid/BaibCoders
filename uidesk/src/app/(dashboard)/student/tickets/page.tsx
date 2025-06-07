'use client';

import TicketForm from "@/components/TicketSubmit";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4.25rem)] flex items-center justify-center bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white px-6">

      <TicketForm />
    </main>
  );
}
