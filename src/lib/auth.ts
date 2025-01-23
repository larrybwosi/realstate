import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  oneTap,
  admin,
  bearer,
  multiSession,
  oidcProvider,
  username
} from "better-auth/plugins";
import { sso } from "better-auth/plugins/sso";
import { nextCookies } from "better-auth/next-js";

import { db } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    sso(),
    oneTap(),
    admin(),
    bearer(),
    multiSession({ maximumSessions: 8 }),
    nextCookies(),
    username(),
    oidcProvider({
      loginPage: "/login",
    }),
  ],
  secret: process.env.BETTER_AUTH_SECRET,
});
