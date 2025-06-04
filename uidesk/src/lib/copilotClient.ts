import { CopilotStudioClient, ConnectionSettings } from '@microsoft/agents-copilotstudio-client'

export async function createCopilotClient(accessToken: string): Promise<CopilotStudioClient> {
  const settings: ConnectionSettings = {
    environmentId: process.env.NEXT_PUBLIC_ENVIRONMENT_ID!,
    agentIdentifier: process.env.NEXT_PUBLIC_AGENT_IDENTIFIER!,
    tenantId: process.env.NEXT_PUBLIC_TENANT_ID!,
    appClientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID!,
    cloud: '',
  }

  return new CopilotStudioClient(settings, accessToken)
}
