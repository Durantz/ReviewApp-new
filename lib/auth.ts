import type { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLEAUTH_CLIENT as string,
      clientSecret: process.env.GOOGLEAUTH_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (profile?.email === "ryukonga@gmail.com") {
        return true;
      }
      return "/";
    },
    async jwt({ token, account, profile }) {
      token.role = "admin";
      return token;
    },
    async session({ session, token, user }) {
      session.user.role = token?.role;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
