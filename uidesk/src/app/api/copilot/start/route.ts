import { NextResponse } from 'next/server'
import { getClient } from '@/lib/copilotClient'

export async function GET() {
  try {
    const { activity } = await getClient()
    if (!activity) {
      return NextResponse.json({ error: 'Failed to start conversation' }, { status: 500 })
    }

    return NextResponse.json({
      message: activity.text,
      conversationId: activity.conversation?.id,
      suggestions: activity.suggestedActions?.actions.map((a) => a.value) || [],
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to start conversation' }, { status: 500 })
  }
}
