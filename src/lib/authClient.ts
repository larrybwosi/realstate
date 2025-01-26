import { createAuthClient } from "better-auth/react";
import {  usernameClient, adminClient, multiSessionClient } from "better-auth/client/plugins";

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
    multiSessionClient()
  ],
});
