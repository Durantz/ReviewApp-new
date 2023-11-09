import dbConnect from "@/lib/dbConnect";
import { ReviewModel } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  try {
    const reviews = await ReviewModel.find({});
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
