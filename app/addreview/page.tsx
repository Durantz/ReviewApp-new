"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";

const formSchema = z.object({
  restaurant: z.string().min(1, "Inserire il nome"),
  address: z.string().min(1, "Inserire l'indirizzo"),
  rating: z.number().min(1, "Selezionare un punteggio"),
  approved: z.boolean().default(false).optional(),
});

export default function AddReview() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurant: "",
      address: "",
      rating: 0,
      approved: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="grid grid-flow-row gap-1 w-auto">
      <Avatar className="w-16 h-16 rounded-full bg-slate-600 animate-none hover:animate-wiggle-more hover:animate-infinite">
        <AvatarImage
          src="/smiley-face-transparent-pictures-backgrounds-19.png"
          className="object-contain scale-125"
        />
      </Avatar>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="restaurant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Ristorante</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Da Totò Trattoria Rustica"
                    {...field}
                    className={cn(
                      "bg-slate-300 border text-slate-700 placeholder-slate-100 border-slate-500 focus-visible:ring-offset-1 focus-visible:ring-0 focus-visible:border-2",
                      form.getFieldState(field.name).error
                        ? "border-destructive"
                        : "",
                    )}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit">Sottometti</Button>
        </form>
      </Form>
      <StarRating />
    </div>
  );
}
