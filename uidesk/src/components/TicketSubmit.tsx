"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabase"; // Adjust path as needed

export default function TicketForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setSuccess(false);

  const formElement = e.currentTarget; // ✅ cache before await
  const form = new FormData(formElement);

  const student_name = form.get("studentName")?.toString() || "";
  const student_id = form.get("studentID")?.toString() || "";
  const email = form.get("email")?.toString() || "";
  const category = form.get("category")?.toString() || "";
  const description = form.get("description")?.toString() || "";
  const attachment = form.get("attachment")?.toString().trim();
 const assignedToMap: Record<string, string> = {
  'IT Support': 'IT Helpdesk',
  'Grades': 'Registrar',
  'Dormitory': 'Facilities',
  'Registration': 'Registrar',
  'Others': 'Support Team',
};

const assigned_to = assignedToMap[category] || 'Support Team';

const ticketData = {
  student_name,
  student_id,
  email,
  category,
  description,
  attachments: attachment ? [attachment] : [],
  status: 'Open',
  assigned_to, // <- set dynamically here
  created_at: new Date().toISOString(),
  ticket_id: `TKT-${Date.now()}`,
};

 
  const { error } = await supabase.from("tickets").insert([ticketData]);

  setLoading(false);

  if (error) {
    console.error("Supabase insert error:", error);
    alert("❌ Error submitting ticket: " + error.message);
  } else {
    setSuccess(true);
    formElement.reset(); // ✅ this works
  }
};


  return (
    <form
      className="w-full max-w-xl p-6 bg-[#2f313c] rounded-2xl shadow-lg border border-[#3e3f47] space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-white mb-2">
        📩 Submit a Support Ticket
      </h2>

      {success && (
        <p className="text-green-400 text-sm">Ticket submitted successfully!</p>
      )}

      <div>
        <label className="block text-sm text-gray-400 mb-1">Full Name</label>
        <input
          type="text"
          name="studentName"
          required
          className="w-full p-2 rounded-md bg-[#1e1f24] border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Student ID</label>
        <input
          type="text"
          name="studentID"
          required
          className="w-full p-2 rounded-md bg-[#1e1f24] border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full p-2 rounded-md bg-[#1e1f24] border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Category</label>
        <select
          name="category"
          required
          className="w-full p-2 rounded-md bg-[#1e1f24] border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Category --</option>
          <option value="Grades">Grades</option>
          <option value="Registration">Registration</option>
          <option value="IT Support">IT Support</option>
          <option value="Dormitory">Dormitory</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Issue Description
        </label>
        <textarea
          name="description"
          required
          rows={4}
          className="w-full p-2 rounded-md bg-[#1e1f24] border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Briefly describe the issue you are experiencing..."
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Optional Attachment (URL or File)
        </label>
        <input
          type="url"
          name="attachment"
          className="w-full p-2 rounded-md bg-[#1e1f24] border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://..."
        />
      </div>

      <div className="pt-4 text-right">
        <button
          type="submit"
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl transition font-medium"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </div>
    </form>
  );
}
