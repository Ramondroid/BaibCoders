import { PublicClientApplication, Configuration } from '@azure/msal-browser'

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_TENANT_ID}`,
    redirectUri: '/', // or '/chat' if hosted there
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
}

export const msalInstance = new PublicClientApplication(msalConfig)
