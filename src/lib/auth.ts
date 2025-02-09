import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, customSession, multiSession, openAPI, username } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { cache } from "react";

import { db } from "./db";
import redis from "./redis";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: true,
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
  secret: process.env.BETTER_AUTH_SECRET,
  appName: "Cheap City",
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
    additionalFields: {
      apartmentId: {
        type: "string",
      },
    },
  },
  plugins: [
    admin({
      adminRole: ["admin", "superAdmin"],
      defaultRole: "tenant",
    }),
    username(),
    openAPI(),
    passkey(),
    multiSession({
      maximumSessions: 8,
    }),
    customSession(async ({ user }) => {
      const getItem = cache(async () => {
        const userApartment = await db.apartment.findUnique({
          where: {
            ownerId: user.id,
          },
        });

        return {
          user: {
            ...user,
            apartmentId: userApartment?.id,
          },
        };
      });

      return await getItem();
    }),
  ],

  secondaryStorage: {
    get: async (key) => {
      const value = (await redis.get(key)) as string | null;
      return value ? value : null;
    },
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, { ex: ttl });
      else await redis.set(key, value);
    },
    delete: async (key) => {
      await redis.del(key);
    },
  },
  rateLimit: {
    window: 60, // time window in seconds
    max: 100, // max requests in the window
    storage: "secondary-storage",
  },
});
