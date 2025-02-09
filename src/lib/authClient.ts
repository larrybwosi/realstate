import { createAuthClient } from "better-auth/react";
import { adminClient, customSessionClient, passkeyClient } from "better-auth/client/plugins";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const { signIn, signUp, useSession, signOut, admin } = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [customSessionClient<typeof auth>(), adminClient(), passkeyClient()],
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After");
        console.log(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
        redirect("/too-fast");
      }
    },
  },
});
