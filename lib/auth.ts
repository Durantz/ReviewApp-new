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
      const data = await fetch(
      `https://eu-central-1.aws.data.mongodb-api.com/app/reviewapp-xwles/endpoint/getUser?email=${profile?.email}`,
      {
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.MONGODB_API_KEY!,
        },
        cache: "no-store",
      },
    );
    const dbUser = await data.json();
      if (dbUser) {
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
