import { createAuthClient } from "better-auth/react";
import { adminClient, customSessionClient } from "better-auth/client/plugins";
import { auth } from "./auth";

export const { signIn, signUp, useSession, signOut, admin } = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [customSessionClient<typeof auth>(), adminClient()],
});
