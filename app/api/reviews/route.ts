export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/reviewapp-xwles/endpoint/getAll",
      {
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.MONGODB_API_KEY!,
        },
      },
    );
    const reviews = await data.json();
    console.log(reviews);
    return Response.json(reviews.data, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  console.log(JSON.stringify(body));
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
    console.log(message);
    return Response.json(message, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
