import * as z from "zod";
// import { Schema, model } from "mongoose";

export const formSchema = z.object({
  restaurant: z.string().min(5, "Inserire il nome"),
  address: z.string().min(10, "Inserire l'indirizzo"),
  reviewer: z.string(),
  reviewerEmail: z.string(),
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
  reviewerEmail: string;
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