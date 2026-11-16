import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { create, findByEmail } from "@/service/user";

const { callbacks, ...config } = authConfig;

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...config,
  callbacks: {
    ...callbacks,
    async jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
      }

      return token;
    },
    async signIn({ user }) {
      try {
        if (!user.email) {
          return false;
        }

        const { data: foundUser } = await findByEmail(user.email);

        if (!foundUser) {
          const { error } = await create({
            email: user.email,
            username: user.name ?? null,
            imageUrl: user.image ?? null,
          });

          if (error) {
            return false;
          }
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session, token }) {
      const { data: foundUser } = await findByEmail(session.user.email);

      if (!foundUser) {
        throw Error("User not found");
      }

      session.user.id = foundUser.id;
      session.user.role = foundUser.role;

      session.user.name = token.name ?? foundUser.name;
      session.user.email = session.user.email;
      session.user.image = session.user.image;

      return session;
    },
  },
});
