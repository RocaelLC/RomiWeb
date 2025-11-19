"use client";

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import React from "react";

const pca = new PublicClientApplication({
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_B2C_CLIENT_ID!,
    authority: process.env.NEXT_PUBLIC_AZURE_B2C_AUTHORITY!,
    knownAuthorities: [process.env.NEXT_PUBLIC_AZURE_B2C_DOMAIN!],
    redirectUri: typeof window !== "undefined" ? window.location.origin : undefined,
  },
});

export default function MsalProviders({ children }: { children: React.ReactNode }) {
  return <MsalProvider instance={pca}>{children}</MsalProvider>;
}
