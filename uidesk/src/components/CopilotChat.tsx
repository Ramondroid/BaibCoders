'use client'

import { useEffect, useState } from 'react'

type Message = {
  from: 'user' | 'copilot'
  text: string
  suggestions?: string[]
}

export default function CopilotChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // Start conversation on mount
  useEffect(() => {
    const startConversation = async () => {
      const res = await fetch('/api/copilot/start')
      const data = await res.json()

      if (data.message) {
        setMessages([
          { from: 'copilot', text: data.message, suggestions: data.suggestions },
        ])
      }
    }

    startConversation()
  }, [])

  const sendMessage = async (text: string) => {
    setLoading(true)
    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')

    const res = await fetch('/api/copilot/ask', {
      method: 'POST',
      body: JSON.stringify({ message: text }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    if (data.replies) {
      const replyMessages: Message[] = data.replies.map((r: any) => ({
        from: 'copilot',
        text: r.text,
        suggestions: r.suggestions,
      }))
      setMessages((prev) => [...prev, ...replyMessages])
    }

    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      await sendMessage(input.trim())
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-4 border rounded p-4 h-[500px] overflow-y-auto mb-4 bg-white shadow">
        {messages.map((msg, i) => (
          <div key={i} className={`text-sm ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
            <div
              className={`inline-block px-4 py-2 rounded-xl ${
                msg.from === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {msg.text}
            </div>
            {msg.from === 'copilot' && msg.suggestions && msg.suggestions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {msg.suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    className="text-xs px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => sendMessage(sug)}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && <p className="text-sm text-gray-500">Copilot is typing...</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  )
}
