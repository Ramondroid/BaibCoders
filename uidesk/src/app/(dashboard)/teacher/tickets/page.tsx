'use client';

export default function Home() {
  // Sample ticket data (replace with Supabase data fetch later)
  const tickets = [
    {
      id: 'TKT-2025-00091',
      student: 'Andrea Dela Cruz',
      category: 'IT Support',
      status: 'In Progress',
      assignedTo: 'IT Helpdesk',
      description: 'Unable to connect to dormitory Wi-Fi since last night.',
    },
    {
      id: 'TKT-2025-00092',
      student: 'Mark Reyes',
      category: 'Grades',
      status: 'Open',
      assignedTo: 'Registrar',
      description: 'My final exam score is missing in the portal.',
    },
    {
      id: 'TKT-2025-00093',
      student: 'Jessa Tan',
      category: 'Dormitory',
      status: 'Resolved',
      assignedTo: 'Facilities',
      description: 'Room heater not functioning properly.',
    },
  ];

  // TODO Query tickets from Supabase
  // const { data: tickets, error } = useQuery('tickets', fetchTickets);

  return (
    <main className="min-h-[calc(100vh-4.25rem)] flex items-start justify-center bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white px-6 py-12">
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6">📋 Submitted Tickets</h2>

        <div className="overflow-x-auto rounded-2xl border border-[#3e3f47] shadow-lg bg-[#2f313c]">
          <table className="min-w-full text-sm text-left text-white">
            <thead className="bg-[#1e1f24] text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Ticket ID</th>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Assigned To</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, idx) => (
                <tr
                  key={ticket.id}
                  className={`border-t border-[#3e3f47] ${
                    idx % 2 === 0 ? 'bg-[#2f313c]' : 'bg-[#2b2d36]'
                  }`}
                >
                  <td className="px-6 py-4 font-medium">{ticket.id}</td>
                  <td className="px-6 py-4">{ticket.student}</td>
                  <td className="px-6 py-4">{ticket.category}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === 'Open'
                          ? 'bg-blue-600'
                          : ticket.status === 'In Progress'
                          ? 'bg-yellow-500 text-black'
                          : 'bg-green-600'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{ticket.assignedTo}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-400 hover:underline text-xs">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
