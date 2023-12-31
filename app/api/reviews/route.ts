"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const types = searchParams.get("t");
    const users = searchParams.get("u");
    let data = null;
    data = await fetch(
      `https://eu-central-1.aws.data.mongodb-api.com/app/reviewapp-xwles/endpoint/getFilteredReviews?t=${types}&u=${users}`,
      {
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.MONGODB_API_KEY!,
        },
        cache: "no-store",
      },
    );
    const reviews = await data.json();
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const data = await fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/reviewapp-xwles/endpoint/add",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.MONGODB_API_KEY!,
        },
      },
    );
    const message = await data.json();
    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const data = await fetch(
      `https://eu-central-1.aws.data.mongodb-api.com/app/reviewapp-xwles/endpoint/delete?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.MONGODB_API_KEY!,
        },
      },
    );
    const results = await data.json();
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
