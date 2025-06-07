'use client';


type Ticket = {
  id: string;
  student: string;
  category: string;
  status: string;
  assignedTo: string;
  description?: string;
};

type TicketTableProps = {
  tickets: Ticket[];
  onMarkResolved: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
};

const statusColors = {
  Open: 'bg-blue-600 text-white',
  'In Progress': 'bg-yellow-500 text-black',
  Resolved: 'bg-green-600 text-white',
};
function getStatusBgColor(status: string): string {
  switch (status) {
    case 'Open':
      return '#2563eb'; // blue-600
    case 'In Progress':
      return '#eab308'; // yellow-500
    case 'Resolved':
      return '#16a34a'; // green-600
    default:
      return '#374151'; // gray-700 fallback
  }
}
function getStatusTextColor(status: string): string {
  switch (status) {
    case 'Open':
      return '#fff'; // white
    case 'In Progress':
      return '#000'; // black
    case 'Resolved':
      return '#fff'; // white
    default:
      return '#fff';
  }
}
export default function TicketTable({
  tickets,
  onMarkResolved,
  onDelete,
  onStatusChange,
}: TicketTableProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-white">📋 Submitted Tickets</h2>

      <div className="overflow-x-auto rounded-2xl border border-gray-600 shadow-lg bg-[#2a2b31]">
        <table className="min-w-full text-sm text-left text-white font-sans">
          <thead className="bg-[#1e1f24] text-gray-400 uppercase text-xs tracking-wide">
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
            {tickets.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center px-6 py-4 text-gray-400 italic select-none"
                >
                  No tickets submitted.
                </td>
              </tr>
            )}
            {tickets.map((ticket, idx) => (
              <tr
                key={ticket.id}
                className={`border-t border-gray-700 hover:bg-[#3a3b44] transition-colors ${
                  idx % 2 === 0 ? 'bg-[#2f313c]' : 'bg-[#2b2d36]'
                }`}
              >
                <td className="px-6 py-4 font-medium">{ticket.id}</td>
                <td className="px-6 py-4">{ticket.student}</td>
                <td className="px-6 py-4">{ticket.category}</td>
<td className="px-6 py-4">
  {(ticket.status === 'Open' || ticket.status === 'In Progress') ? (
    <select
      value={ticket.status}
      onChange={(e) => onStatusChange(ticket.id, e.target.value)}
      className={`rounded-full px-3 py-1 text-xs font-semibold border border-gray-600 appearance-none cursor-pointer shadow-sm transition-colors`}
      style={{
        minWidth: '100px',
        backgroundColor: getStatusBgColor(ticket.status),
        color: getStatusTextColor(ticket.status),
      }}
      aria-label={`Change status for ticket ${ticket.id}`}
    >
      <option value="Open" className="text-white bg-blue-600">
        Open
      </option>
      <option value="In Progress" className="text-black bg-yellow-500">
        In Progress
      </option>
    </select>
  ) : (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-md`}
      style={{
        backgroundColor: statusColors['Resolved'].split(' ')[0].replace('bg-', ''),
        color: statusColors['Resolved'].split(' ')[1].replace('text-', ''),
      }}
      aria-label={`Ticket ${ticket.id} is resolved`}
    >
      Resolved
    </span>
  )}
</td>


                <td className="px-6 py-4">{ticket.assignedTo}</td>
<td className="px-6 py-4 space-x-3 whitespace-nowrap flex items-center">
  <button
    onClick={() => onMarkResolved(ticket.id)}
    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
      ticket.status === 'Resolved'
        ? 'bg-yellow-500 hover:bg-yellow-600 text-black focus:ring-yellow-400'
        : 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
    }`}
    aria-label={ticket.status === 'Resolved' ? 'Mark Unresolved' : 'Mark Resolved'}
  >
    {ticket.status === 'Resolved' ? '↩️ Unresolve' : '✅ Resolve'}
  </button>

  <button
    onClick={() => onDelete(ticket.id)}
    className="flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
    aria-label="Delete ticket"
  >
    🗑️ Delete
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        select option {
          background-color: #1e1f24 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}
