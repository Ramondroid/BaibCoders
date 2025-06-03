'use client'

import { useState, useEffect } from 'react'

export default function CopilotChat() {
  const [messages, setMessages] = useState<string[]>([])
  const [suggested, setSuggested] = useState<string[]>([])

  useEffect(() => {
    const startConversation = async () => {
      const res = await fetch('/api/copilot/start')
      const data = await res.json()

      if (data.text) setMessages([data.text])
      if (data.suggestedActions) setSuggested(data.suggestedActions.map((a: any) => a.value))
    }

    startConversation()
  }, [])

  return (
    <div>
      <h2>Copilot Chat</h2>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
        {suggested.length > 0 && (
          <div>
            <h4>Suggested:</h4>
            {suggested.map((sug, i) => (
              <button key={i}>{sug}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
