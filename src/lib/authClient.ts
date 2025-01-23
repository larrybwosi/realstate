import { createAuthClient } from "better-auth/react";
import { oneTapClient, usernameClient, adminClient, multiSessionClient } from "better-auth/client/plugins";

export const {
  signIn,
  signUp,
  useSession,
  signOut,
} = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    usernameClient(),
    adminClient(),
    multiSessionClient(),
    oneTapClient({
      clientId: process.env.ONE_TAP_CLIENT_ID!,
    }),
  ],
});
