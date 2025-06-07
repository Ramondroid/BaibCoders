'use client';

import { useState } from 'react';

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

export default function TicketTable({
  tickets,
  onMarkResolved,
  onDelete,
  onStatusChange,
}: TicketTableProps) {
  return (
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
            {tickets.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center px-6 py-4 text-gray-400">
                  No tickets submitted.
                </td>
              </tr>
            )}
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
                  {(ticket.status === 'Open' || ticket.status === 'In Progress') ? (
                    <select
                      value={ticket.status}
                      onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                      className={`rounded-md px-2 py-1 text-xs font-semibold border border-gray-600 appearance-none cursor-pointer ${
                        statusColors[ticket.status]
                      }`}
                      style={{ minWidth: '90px' }}
                    >
                      <option className="bg-blue-600 text-white" value="Open">Open</option>
                      <option className="bg-yellow-500 text-black" value="In Progress">In Progress</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusColors.Resolved
                      }`}
                    >
                      Resolved
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{ticket.assignedTo}</td>
                <td className="px-6 py-4 space-x-3">
                  <button
                    onClick={() => onMarkResolved(ticket.id)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                      ticket.status === 'Resolved'
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-black' // Mark Unresolved style
                        : 'bg-green-600 hover:bg-green-700 text-white'   // Mark Resolved style
                    }`}
                  >
                    {ticket.status === 'Resolved' ? 'Mark Unresolved' : 'Mark Resolved'}
                  </button>
                  <button
                    onClick={() => onDelete(ticket.id)}
                    className="px-3 py-1 rounded-md text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
