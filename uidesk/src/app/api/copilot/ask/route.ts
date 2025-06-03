import { NextRequest, NextResponse } from 'next/server'
import { getClient } from '@/lib/copilotClient'
import { ActivityTypes } from '@microsoft/agents-activity'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { message } = body

  try {
    const { client, conversationId } = await getClient()
    if (!conversationId) throw new Error('Missing conversation ID')

    const replies = await client.askQuestionAsync(message, conversationId)

    const formatted = replies.map((r) => ({
      type: r.type,
      text: r.text,
      suggestions: r.suggestedActions?.actions.map((a) => a.value) || [],
    }))

    return NextResponse.json({ replies: formatted })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to ask question' }, { status: 500 })
  }
}
