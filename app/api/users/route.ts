"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const data = await fetch(
      `https://eu-central-1.aws.data.mongodb-api.com/app/reviewapp-xwles/endpoint/getUsers`,
      {
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.MONGODB_API_KEY!,
        },
      },
    );
    const users = await data.json();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
