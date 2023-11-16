import { DefaultSession, DefaultUser, Profile } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role: string | null;
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    role: string;
  }
  interface Profile extends Profile {
    role: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends JWT {
    role: string | null;
  }
}
