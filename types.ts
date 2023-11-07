import * as z from "zod";

export const formSchema = z.object({
  restaurant: z.string().min(5, "Inserire il nome"),
  address: z.string().min(10, "Inserire l'indirizzo"),
  productQuality: z.number(),
  location: z.number(),
  plates: z.number(),
  ospitality: z.number(),
  rating: z.number(),
  approved: z.boolean().optional(),
  reviewNotes: z.string().max(400),
  latitude: z.number(),
  longitude: z.number(),
});

export type schemaType = z.infer<typeof formSchema>;

export interface Review {
  id: number;
  restaurant: string;
  rating: number;
  productQuality: number;
  plates: number;
  ospitality: number;
  location: number;
  review: string;
  longitude: number;
  latitude: number;
  address: string;
  approved: boolean;
}
