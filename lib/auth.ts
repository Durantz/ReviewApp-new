import type { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DbUser } from "@/types";
import axios from "axios";

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
      const res = await axios({
        method: "get",
        url: `https://eu-central-1.aws.data.mongodb-api.com/app/reviewapp-xwles/endpoint/getUser?email=${profile?.email}`,
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.MONGODB_API_KEY!,
        },
      });
      // console.log(data);
      console.log(res.data);
      const dbUser = <DbUser>res.data;
      if (profile && dbUser) {
        profile.role = dbUser.role;
        return true;
      }
      return "/";
    },
    async jwt({ token, account, profile }) {
      if (profile) token.role = profile.role;
      return token;
    },
    async session({ session, token, user }) {
      session.user.role = token?.role;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
