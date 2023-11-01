"use client";

import * as z from "zod";
import Image from "next/image";
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
import StarRating from "@/components/StarRating";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCheckbox from "@/components/AnimatedCheckbox";

const formSchema = z.object({
  restaurant: z.string().min(5, "Inserire il nome"),
  address: z.string().min(10, "Inserire l'indirizzo"),
  productQuality: z.number(),
  location: z.number(),
  rating: z.number(),
  approved: z.boolean().optional(),
});

export default function AddReview() {
  const [sad, setSad] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      restaurant: "",
      address: "",
      productQuality: 0,
      location: 0,
      rating: 0,
      approved: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    form.reset({});
  };

  return (
    <div className="grid grid-flow-row gap-1 w-auto">
      <AnimatedCheckbox checked={sad} onCheckedChange={() => setSad(!sad)} />
      
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="restaurant"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Da Totò Trattoria Rustica"
                    {...field}
                    className={cn(
                      "dark:bg-card bg-zinc-200 border text-black dark:text-white placeholder:text-zinc-400 border-zinc-400 focus-visible:ring-offset-1 focus-visible:ring-0 focus-visible:border-2",
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
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Indirizzo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Via degli Arbusti 10, Milano"
                    {...field}
                    className={cn(
                      "dark:bg-card bg-zinc-200 border text-black dark:text-white placeholder:text-zinc-400 border-zinc-400 focus-visible:ring-offset-1 focus-visible:ring-0 focus-visible:border-2",
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
          <div className="flex flex-row gap-6 justify-between">
            <FormField
              control={form.control}
              name="productQuality"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Qualità Prodotti</FormLabel>
                  <FormControl>
                    <StarRating
                      rating={field.value}
                      isError={Boolean(form.getFieldState(field.name).error)}
                      onChange={(value: number) => {
                        form.setValue(field.name, value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <StarRating
                      rating={field.value}
                      isError={Boolean(form.getFieldState(field.name).error)}
                      onChange={(value: number) => {
                        form.setValue(field.name, value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <Separator className="dark:bg-zinc-400" />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Punteggio Finale</FormLabel>
                <FormControl>
                  <StarRating
                    className="w-7 h-7"
                    rating={field.value}
                    isError={Boolean(form.getFieldState(field.name).error)}
                    onChange={(value: number) => {
                      form.setValue(field.name, value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="approved"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    className="h-5 w-5 active:animate-jump"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Approvato da Spaccavacciuolo</FormLabel>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit">Sottometti</Button>
        </form>
      </Form>
    </div>
  );
}
