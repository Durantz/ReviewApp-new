import {
  DefaultSession,
  DefaultUser,
  DefaultProfile,
  NextAuth,
} from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends JWT {
    role: string | null;
  }
}
