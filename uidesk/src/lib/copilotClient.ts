import { CopilotStudioClient, loadCopilotStudioConnectionSettingsFromEnv } from '@microsoft/agents-copilotstudio-client'
import { PublicClientApplication } from '@azure/msal-node'
import path from 'path'
import os from 'os'
import { MsalCachePlugin } from './msalCachePlugin'
import { ConfidentialClientApplication } from '@azure/msal-node';

const userTokenCachePath = path.join(os.homedir(), '.cache', 'msal-token-cache.json')

let client: CopilotStudioClient | null = null
let conversationId: string | null = null

export const getClient = async () => {
  if (client && conversationId) return { client, conversationId }

  const settings = loadCopilotStudioConnectionSettingsFromEnv()

const pca = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.appClientId!,
    clientSecret: process.env.clientSecret!,
    authority: `https://login.microsoftonline.com/${process.env.tenantId}`,
  },
});

const tokenResult = await pca.acquireTokenByClientCredential({
  scopes: ['https://api.powerplatform.com/.default'],
});


  if (!tokenResult) {
    throw new Error('Failed to acquire token')
  }

  const token = tokenResult.accessToken
  client = new CopilotStudioClient(settings, token)
  const activity = await client.startConversationAsync(true)
  conversationId = activity.conversation?.id ?? null

  return { client, conversationId, activity }
}
