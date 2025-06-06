'use client';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4.25rem)] flex items-center justify-center bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white px-6">
      <form
        className="w-full max-w-xl p-6 bg-[#2f313c] rounded-2xl shadow-lg border border-[#3e3f47] space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          // TODO handle ticket form submission
          console.log('Ticket submitted');
        }}
      >
        <h2 className="text-2xl font-semibold text-white mb-2">📩 Submit a Support Ticket</h2>

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
          <label className="block text-sm text-gray-400 mb-1">Email Address</label>
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
          <label className="block text-sm text-gray-400 mb-1">Issue Description</label>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full p-2 rounded-md bg-[#1e1f24] border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Briefly describe the issue you are experiencing..."
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Optional Attachment (URL or File)</label>
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
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium"
          >
            Submit Ticket
          </button>
        </div>
      </form>
    </main>
  );
}
