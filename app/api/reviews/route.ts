"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session)
      throw new Error()

    const data = await fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/reviewapp-xwles/endpoint/getAll",
      {
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.MONGODB_API_KEY!,
        },
        cache: "no-store",
      },
    );
    const reviews = await data.json();
    return Response.json(reviews.data, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 400 });
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
    return Response.json(message, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    console.log("here");
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log(id);
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
    return Response.json(results, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
