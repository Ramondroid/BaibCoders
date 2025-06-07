'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { MessageCircle, X } from 'lucide-react'

const CopilotChat = dynamic(() => import('./CopilotChat'), { ssr: false })

export default function CopilotChatWrapper() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group fixed bottom-6 right-6 z-50 h-[60px] px-4 flex items-center rounded-full 
                     bg-purple-500/80 hover:bg-purple-600/90 text-white border border-white/10 
                     shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out"
        >
          {/* Always-visible icon */}
          <MessageCircle size={28} className="text-white drop-shadow-sm" />

          {/* Hidden label that fades in on hover */}
          <span
            className="ml-2 max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:opacity-100 
                       opacity-0 transition-all duration-300 text-lg font-semibold tracking-wide"
          >
            Uina
          </span>
        </button>
      )}

      {/* Chat Panel */}
      <div
        className={`fixed bottom-6 right-6 w-[600px] h-[760px] rounded-2xl shadow-2xl overflow-hidden 
                    backdrop-blur-md bg-[#2a2b31]/90 border border-white/10 transition-opacity duration-300 
                    z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-between px-6 py-4 h-[64px] cursor-pointer 
                     bg-purple-600/80 hover:bg-purple-700/80 transition-colors"
        >
          <div className="text-white font-semibold text-lg tracking-wide">Uina</div>
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
