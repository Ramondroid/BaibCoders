'use client'

import { useEffect, useState, useRef } from 'react'
import { PublicClientApplication, type AuthenticationResult } from '@azure/msal-browser'
import { msalConfig } from '@/lib/msalConfig' // You create this

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const msalInstance = new PublicClientApplication(msalConfig)

export default function CopilotChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loginAndStart = async () => {
      await msalInstance.initialize()

      const accounts = msalInstance.getAllAccounts()
      let result: AuthenticationResult

      if (accounts.length > 0) {
        result = await msalInstance.acquireTokenSilent({
          scopes: ['https://api.powerplatform.com/.default'],
          account: accounts[0],
        })
      } else {
        result = await msalInstance.loginPopup({
          scopes: ['https://api.powerplatform.com/.default'],
        })
      }

      setToken(result.accessToken)

      const res = await fetch('/api/copilot/start', {
        headers: { Authorization: `Bearer ${result.accessToken}` },
      })
      const data = await res.json()
      setConversationId(data.conversation.id)
      setMessages([{ role: 'assistant', content: data.text }])
    }

    loginAndStart().catch(console.error)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || !conversationId || !token) return

    const userMessage = input.trim()
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/copilot/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: userMessage, conversationId }),
      })
      const replies = await res.json()

      const assistantReplies = Array.isArray(replies)
        ? replies
            .filter((r: any) => r.type === 'message')
            .map((r: any) => ({ role: 'assistant', content: r.text }))
        : []

      setMessages((prev) => [...prev, ...assistantReplies])
    } catch (e) {
      console.error('Failed to send message', e)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col h-[90vh] border rounded shadow bg-white">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}
