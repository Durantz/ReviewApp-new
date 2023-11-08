import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLEAUTH_CLIENT as string,
      clientSecret: process.env.GOOGLEAUTH_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
