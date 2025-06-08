import { NextRequest, NextResponse } from 'next/server'
import { CopilotStudioClient, ConnectionSettings } from '@microsoft/agents-copilotstudio-client'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return NextResponse.json({ error: 'Missing access token' }, { status: 401 })
  }

  const body = await req.json()
  const { text, conversationId } = body

  if (!text || !conversationId) {
    return NextResponse.json({ error: 'Missing text or conversationId' }, { status: 400 })
  }

  const settings: ConnectionSettings = {
    environmentId: process.env.NEXT_PUBLIC_ENVIRONMENT_ID!,
    agentIdentifier: process.env.NEXT_PUBLIC_AGENT_IDENTIFIER!,
    tenantId: process.env.NEXT_PUBLIC_TENANT_ID!,
    appClientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID!,
    cloud: '',
  }
  

  const client = new CopilotStudioClient(settings, token)
  const replies = await client.askQuestionAsync(text, conversationId)
  // console.log('[Copilot Replies]', JSON.stringify(replies, null, 2))

  return NextResponse.json(replies)
}
