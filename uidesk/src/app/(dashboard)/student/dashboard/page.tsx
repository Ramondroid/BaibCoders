  'use client';

  import React from 'react';
  import { FaUser, FaChartPie, FaCog } from 'react-icons/fa';
  import CopilotIframe from "@/components/CopilotIframe";
  import CopilotChat from '@/components/CopilotChat';
import CopilotChatWrapper from '@/components/CopilotChatWrapper';

  export default function DashboardPage() {
  return (
    <main className="min-h-[calc(100vh-4.25rem)] flex items-center justify-center bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white px-6">
      <section className="w-full flex justify-center">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">
          {/* Welcome Message */}
           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
              Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600 text-lg mb-10">
            This is your all-in-one platform to manage your academic activities efficiently.
          </p>

          {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 hover:bg-gray-200 transition rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📚 Courses</h2>
            <p className="text-gray-600">View and manage your enrolled courses and materials.</p>
        </div>
        <div className="bg-gray-100 hover:bg-gray-200 transition rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🎫 Tickets</h2>
          <p className="text-gray-600">Submit or review help desk tickets with ease.</p>
        </div>
      </div>
    </div>
      </section>
      <CopilotChatWrapper />
    </main>
  );
}

  