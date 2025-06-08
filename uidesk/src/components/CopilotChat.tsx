'use client'

import { useEffect, useState, useRef } from 'react'
import { PublicClientApplication, type AuthenticationResult } from '@azure/msal-browser'
import { msalConfig } from '@/lib/msalConfig'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface SuggestedAction {
  text: string
}

interface AssistantReply {
  type: string
  text: string
  suggestedActions?: {
    actions: SuggestedAction[]
  }
}

const msalInstance = new PublicClientApplication(msalConfig)

export default function CopilotChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [quickReplies, setQuickReplies] = useState<string[]>([])
  const loginInProgress = useRef(false)

  useEffect(() => {
    const loginAndStart = async () => {
      if (loginInProgress.current) return
      loginInProgress.current = true

      try {
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
      } catch (err) {
        console.error('Authentication failed', err)
      } finally {
        loginInProgress.current = false
      }
    }

    loginAndStart()
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (overrideInput?: string) => {
    const messageToSend = overrideInput ?? input.trim()
    if (!messageToSend || !conversationId || !token) return

    setMessages((prev) => [...prev, { role: 'user', content: messageToSend }])
    setInput('')
    setLoading(true)
    setQuickReplies([])

    try {
      const res = await fetch('/api/copilot/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: messageToSend, conversationId }),
      })

      const replies: AssistantReply[] = await res.json()

      const assistantReplies = Array.isArray(replies)
        ? replies
            .filter((r) => r.type === 'message')
            .map((r) => ({ role: 'assistant' as const, content: r.text }))
        : []

      setMessages((prev) => [...prev, ...assistantReplies])

      const newQuickReplies = Array.isArray(replies)
        ? replies.flatMap((r) => r.suggestedActions?.actions?.map((a) => a.text) || [])
        : []

      setQuickReplies(newQuickReplies)
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
    <div className="w-full h-full flex flex-col bg-white dark:bg-[#1e1f24] text-black dark:text-white">
      {/* Messages */}
<div className="flex-1 p-4 overflow-y-auto space-y-3">
  {messages.map((msg, i) => (
    <div
      key={i}
      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
          msg.role === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-[#333] text-gray-800 dark:text-white'
        }`}
      >
        {msg.role === 'assistant' ? (
          <ReactMarkdown
            components={{
              div: ({ children }) => (
                <div className="prose dark:prose-invert prose-sm max-w-none">
                  {children}
                </div>
              ),
            }}
          >
            {msg.content}
          </ReactMarkdown>
        ) : (
          msg.content
        )}
      </div>
    </div>
  ))}
  <div ref={scrollRef} />
</div>


      {/* Quick Replies */}
      {quickReplies.length > 0 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {quickReplies.map((text, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(text)}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-white px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition text-sm"
            >
              {text}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-white/10 flex gap-2">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded-md text-black dark:text-white dark:bg-[#2c2c2e] border-gray-300 dark:border-white/20"
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}
