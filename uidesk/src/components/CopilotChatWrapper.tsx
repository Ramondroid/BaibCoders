'use client'

import dynamic from 'next/dynamic'

const CopilotChat = dynamic(() => import('./CopilotChat'), {
  ssr: false,
})

export default function CopilotChatWrapper() {
  return <CopilotChat />
}
