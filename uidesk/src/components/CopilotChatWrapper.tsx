'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MessageCircle, X } from 'lucide-react';

const CopilotChat = dynamic(() => import('./CopilotChat'), {
  ssr: false,
});

export default function CopilotChatWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
  <>
    {/* Floating Chat Button */}
    <button
      onClick={() => setIsOpen(true)}
      className={`fixed bottom-6 right-6 h-[60px] w-[180px] flex items-center justify-center gap-2 px-6 py-3 
                  bg-purple-500/80 hover:bg-purple-600/90 backdrop-blur-md 
                  text-white rounded-full shadow-xl hover:shadow-2xl 
                  transition-all duration-300 ease-in-out border border-white/10
                  ${isOpen ? 'hidden' : 'block'} z-50`}
      aria-label="Open chat"
    >
      <MessageCircle size={28} className="text-white drop-shadow-sm" />
      <span className="text-xl font-semibold tracking-wide">Uina</span>
    </button>

    {/* Chat Panel */}
    <div
      className={`fixed bottom-6 right-6 w-[600px] h-[760px] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md 
                  bg-[#2a2b31]/90 border-white/10 transition-opacity duration-300
                  ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-50`}
    >
      {/* Header */}
      <div
        onClick={() => setIsOpen(false)}
        className="flex items-center justify-between px-6 py-4 h-[64px] cursor-pointer bg-purple-600/80 hover:bg-purple-700/80 transition-colors"
      >
        <div className="text-white font-semibold text-lg tracking-wide">
          Uina Assistant
        </div>
        <X className="text-white hover:text-gray-300" size={20} />
      </div>

      {/* Chat Body */}
      <div className="h-[696px] overflow-hidden">
        <CopilotChat />
      </div>
    </div>
  </>
)

}
