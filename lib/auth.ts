import "server-only";

import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

import { prisma } from "@/lib/prisma";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const hasGoogleCredentials =
  Boolean(googleClientId) &&
  Boolean(googleClientSecret) &&
  !googleClientId?.startsWith("replace-") &&
  !googleClientSecret?.startsWith("replace-");

const socialProviders =
  hasGoogleCredentials && googleClientId && googleClientSecret
    ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        },
      }
    : {};

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  onAPIError: {
    errorURL: "/auth/error",
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      disableImplicitLinking: true,
    },
  },
  socialProviders,
  plugins: [nextCookies()],
});
