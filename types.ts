import * as z from "zod";
// import { Schema, model } from "mongoose";

export const formSchema = z.object({
  restaurant: z.string().min(5, "Inserire il nome"),
  address: z.string().min(10, "Inserire l'indirizzo"),
  reviewer: z.string(),
  quality: z.number(),
  location: z.number(),
  plates: z.number(),
  ospitality: z.number(),
  rating: z.number(),
  approved: z.boolean(),
  notes: z.string().max(400),
  latitude: z.number(),
  longitude: z.number(),
});

export type schemaType = z.infer<typeof formSchema>;

export interface Review {
  _id: string;
  restaurant: string;
  rating: number;
  reviewer: string;
  quality: number;
  plates: number;
  ospitality: number;
  location: number;
  notes: string;
  longitude: number;
  latitude: number;
  address: string;
  approved: boolean;
}

export type DbUser = {
  _id: string;
  name: string;
  role: string;
  email: string;
};
// const ReviewSchema = new Schema<Review>({
//   restaurant: { type: String, required: true },
//   rating: { type: Number, required: false },
//   productQuality: { type: Number, required: false },
//   plates: { type: Number, required: false },
//   ospitality: { type: Number, required: false },
//   location: { type: Number, required: false },
//   reviewNotes: { type: String, required: false },
//   longitude: { type: Number, required: false, default: 0 },
//   latitude: { type: Number, required: false, default: 0 },
//   address: { type: String, required: true },
//   approved: { type: Boolean, required: false, default: false },
// });

// export const ReviewModel = model("Review", ReviewSchema);
