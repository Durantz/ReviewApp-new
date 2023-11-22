"use server";

export async function POST(req: Request) {
  const body = await req.json();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const data = await fetch(
      `https://eu-central-1.aws.data.mongodb-api.com/app/reviewapp-xwles/endpoint/editReview?id=${id}`,
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
