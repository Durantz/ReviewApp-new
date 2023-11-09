import dbConnect from "@/lib/dbConnect";
import { ReviewModel } from "@/types";

export default async function handler(req, res) {
  await dbConnect();
  try {
    const reviews = await ReviewModel.find({});
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
