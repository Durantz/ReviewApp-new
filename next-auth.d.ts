import { DefaultSession, DefaultUser, Profile, NextAuth } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role: string | null;
    } & DefaultSession["user"];
  }

  interface Profile {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends JWT {
    role: string | null;
  }
}
