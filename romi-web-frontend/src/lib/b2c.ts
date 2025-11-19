import { PublicClientApplication, LogLevel } from "@azure/msal-browser";

const tenant = process.env.NEXT_PUBLIC_B2C_TENANT_NAME!;
const policy = process.env.NEXT_PUBLIC_B2C_SIGNIN_POLICY!;
const clientId = process.env.NEXT_PUBLIC_B2C_CLIENT_ID!;
const redirectUri = process.env.NEXT_PUBLIC_B2C_REDIRECT_URI!;
const knownAuthority = process.env.NEXT_PUBLIC_B2C_KNOWN_AUTHORITY!;

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId,
    authority: `https://${knownAuthority}/${tenant}.onmicrosoft.com/${policy}`,
    knownAuthorities: [knownAuthority],
    redirectUri,
    postLogoutRedirectUri: redirectUri,
  },
  cache: { cacheLocation: "localStorage" },
  system: { loggerOptions: { loggerCallback: () => {}, logLevel: LogLevel.Error } },
});

// Evita inicializar MSAL más de una vez
let msalReady: Promise<void> | null = null;
export async function ensureMsal() {
  if (!msalReady) msalReady = msalInstance.initialize();
  await msalReady;
}

export async function handleRedirect() {
  await ensureMsal();
  return (await msalInstance.handleRedirectPromise()) ?? null;
}

export function getActiveAccount() {
  return msalInstance.getAllAccounts()[0] ?? null;
}

export async function loginRedirect() {
  await ensureMsal();
  return msalInstance.loginRedirect({ scopes: ["openid", "profile", "email"] });
}

export async function acquireIdToken(): Promise<string | null> {
  await ensureMsal();
  const acct = getActiveAccount();
  if (!acct) return null;
  const res = await msalInstance.acquireTokenSilent({ account: acct, scopes: ["openid", "profile", "email"] });
  return res.idToken ?? null;
}
