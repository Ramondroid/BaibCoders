  'use client';

  import React from 'react';

import CopilotChatWrapper from '@/components/CopilotChatWrapper';

  export default function DashboardPage() {
    return (
      <main className="min-h-[calc(100vh-4.25rem)] flex justify-center bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white px-6 py-20">
        <section className="w-full flex justify-center">
          <div className="w-full max-w-5xl rounded-xl">
            {/* Welcome Message */}
             <h1 className="text-3xl md:text-5xl font-extrabold text-white-800 mb-6">
                Welcome to Your Dashboard
            </h1>
            <p className="text-white-600 text-xl mb-10">
              This is your all-in-one platform to manage your academic activities efficiently.
            </p>
  
            {/* Cards */}
            <div className="flex gap-6">
            <div className="bg-gray-100 hover:bg-gray-200 transition rounded-xl p-6 shadow-md w-full max-w-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">📚 Today&apos;s Event</h2>
              <p className="text-gray-600">Need magreflect ng today&apos;s event here</p>
            </div>
  
            <div className="bg-gray-100 hover:bg-gray-200 transition rounded-xl p-6 shadow-md w-full max-w-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">🎫 Tickets</h2>
              <p className="text-gray-600">Navigate and review tickets.</p>
            </div>
  
            <div className="bg-gray-100 hover:bg-gray-200 transition rounded-xl p-6 shadow-md w-full max-w-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">🎯 Need help?</h2>
              <p className="text-gray-600">Use Uina&apos;s chatbot to ask courses and campus questions</p>
          </div>
        </div>
      </div>
        </section>
        <CopilotChatWrapper />
      </main>
    );
  }

  