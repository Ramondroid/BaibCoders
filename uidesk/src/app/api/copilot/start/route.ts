import { NextRequest, NextResponse } from 'next/server'
import { CopilotStudioClient, ConnectionSettings } from '@microsoft/agents-copilotstudio-client'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 })
  }

  const settings: ConnectionSettings = {
    environmentId: process.env.NEXT_PUBLIC_ENVIRONMENT_ID!,
    agentIdentifier: process.env.NEXT_PUBLIC_AGENT_IDENTIFIER!,
    tenantId: process.env.NEXT_PUBLIC_TENANT_ID!,
    appClientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID!,
    cloud: '',
  }

  const client = new CopilotStudioClient(settings, token)
  const act = await client.startConversationAsync(true)

  return NextResponse.json({ text: act.text, conversation: act.conversation })
}
