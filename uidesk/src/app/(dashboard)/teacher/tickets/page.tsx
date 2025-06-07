'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/supabase';
import TicketTable from '@/components/TicketTable';

type Ticket = {
  ticket_id: string;
  student_name: string;
  category: string;
  status: string;
  assigned_to: string;
  description: string;
};

export default function TeacherHome() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      const { data, error } = await supabase.from('tickets').select('*');
      if (error) {
        console.error('Error fetching tickets:', error.message);
      } else {
        setTickets(data as Ticket[]);
      }
      setLoading(false);
    };

    fetchTickets();
  }, []);

  // Toggle ticket status between 'Resolved' and 'Open'
  const handleMarkResolved = async (id: string) => {
    const ticket = tickets.find((t) => t.ticket_id === id);
    if (!ticket) return;

    const newStatus = ticket.status === 'Resolved' ? 'Open' : 'Resolved';

    const { error } = await supabase
      .from('tickets')
      .update({ status: newStatus })
      .eq('ticket_id', id);

    if (error) {
      alert('Error updating ticket status: ' + error.message);
      console.error(error);
    } else {
      setTickets((prev) =>
        prev.map((t) => (t.ticket_id === id ? { ...t, status: newStatus } : t))
      );
    }
  };

  // Delete ticket
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;

    const { error } = await supabase.from('tickets').delete().eq('ticket_id', id);

    if (error) {
      alert('Error deleting ticket: ' + error.message);
      console.error(error);
    } else {
      setTickets((prev) => prev.filter((t) => t.ticket_id !== id));
    }
  };


  const handleStatusChange = async (id: string, newStatus: string) => {
  const { error } = await supabase
    .from('tickets')
    .update({ status: newStatus })
    .eq('ticket_id', id);

  if (error) {
    alert('Error updating status: ' + error.message);
    console.error(error);
  } else {
    setTickets((prev) =>
      prev.map((t) => (t.ticket_id === id ? { ...t, status: newStatus } : t))
    );
  }
};

  // Close details modal
  const closeModal = () => setSelectedTicket(null);

  return (
    <main className="min-h-[calc(100vh-4.25rem)] flex flex-col items-center justify-start bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white px-6 py-12">
      {loading ? (
        <p className="text-white">Loading tickets...</p>
      ) : (
        <>
          <TicketTable
            tickets={tickets.map((ticket) => ({
              id: ticket.ticket_id,
              student: ticket.student_name,
              category: ticket.category,
              status: ticket.status,
              assignedTo: ticket.assigned_to ?? 'Unassigned',
              description: ticket.description,
            }))}
  onMarkResolved={handleMarkResolved}
  onDelete={handleDelete}
  onStatusChange={handleStatusChange}
          />

          {/* Modal for viewing details */}
          {selectedTicket && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-[#2f313c] rounded-xl p-20 max-w-4xl w-full shadow-lg relative">
<button
  onClick={closeModal}
  className="absolute top-3 right-3 text-gray-400 hover:text-white text-4xl font-bold p-2"
  aria-label="Close details"
>
  &times;
</button>

                <h3 className="text-xl font-semibold mb-4">
                  Ticket Details — {selectedTicket.ticket_id}
                </h3>
                <p><strong>Student:</strong> {selectedTicket.student_name}</p>
                <p><strong>Category:</strong> {selectedTicket.category}</p>
                <p><strong>Status:</strong> {selectedTicket.status}</p>
                <p><strong>Assigned To:</strong> {selectedTicket.assigned_to ?? 'Unassigned'}</p>
                <p className="mt-4 whitespace-pre-wrap"><strong>Description:</strong><br />{selectedTicket.description || 'No description provided.'}</p>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
