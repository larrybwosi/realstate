import { createAuthClient } from "better-auth/react";
import { oneTapClient } from "better-auth/client/plugins";

export const {
  signIn,
  signUp,
  useSession,
  signOut,
} = createAuthClient({
  baseURL: "http://localhost:3000", // the base url of your auth server
  plugins: [
    oneTapClient({
      clientId: process.env.ONE_TAP_CLIENT_ID!,
    }),
  ],
});
