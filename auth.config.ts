
import type { NextAuthConfig } from "next-auth";

import Discord from "next-auth/providers/discord";

export default {
  providers: [
    Discord({
      issuer: "https://discord.com",
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;
