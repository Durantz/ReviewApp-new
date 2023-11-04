"use client";

import * as z from "zod";
import { cn } from "@/lib/utils";
import { useForm, useWatch } from "react-hook-form";
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AnimatedCheckbox from "@/components/AnimatedCheckbox";
import GeoapifyAutocomplete from "@/components/GeoapifyAutocomplete";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const formSchema = z.object({
  restaurant: z.string().min(5, "Inserire il nome"),
  address: z.string().min(10, "Inserire l'indirizzo"),
  productQuality: z.number(),
  location: z.number(),
  plates: z.number(),
  rating: z.number(),
  approved: z.boolean().optional(),
  reviewNotes: z.string().max(400),
  lat: z.number(),
  lon: z.number(),
});

const autocompleteAnimation = {
  initial: {
    height: 0,
    y: -5,
    opacity: 0,
  },
  animate: {
    height: "auto",
    y: 0,
    opacity: 1,
    transition: { opacity: { delay: 0.2 } },
  },
  exit: {
    height: 0,
    y: -5,
    opacity: 0,
    transition: { height: { delay: 0.2 } },
  },
};

export default function AddReview() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const zodForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      restaurant: "",
      address: "",
      productQuality: 0,
      location: 0,
      plates: 0,
      rating: 0,
      approved: false,
      reviewNotes: "",
      lat: 0,
      lon: 0,
    },
  });
  const lat = useWatch({ zodForm, name: "lat" });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    zodForm.reset({});
    toast({
      title: "Salvataggio eseguito",
      description: "La recensione è stata salvata correttamente",
    });
    router.push("/");
  };

  const setFormFields = (
    lat: number,
    lon: number,
    restaurant: string,
    address: string,
  ) => {
    zodForm.setValue("restaurant", restaurant);
    zodForm.setValue("address", address);
    zodForm.setValue("lat", lat);
    zodForm.setValue("lon", lon);
  };
  return (
    <div className="grid grid-flow-row gap-1 w-auto">
      <div className="grid grid-flow-row gap-1">
        <div className="flex flex-row items-center gap-1">
          <Label>Ricerca locali</Label>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="p-1"
            onClick={() => setOpen(!open)}
          >
            <motion.span animate={open ? { rotate: 180 } : { rotate: 0 }}>
              <ChevronDown className="w-5 h-5" />
            </motion.span>
          </Button>
        </div>
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key="search"
              variants={autocompleteAnimation}
              animate="animate"
              initial="initial"
              exit="exit"
            >
              <GeoapifyAutocomplete
                passInfo={(
                  lat: number,
                  lon: number,
                  restaurant: string,
                  address: string,
                ) => setFormFields(lat, lon, restaurant, address)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-1 grid grid-cols-3 w-full items-center">
        <Separator />
        <Label className="text-center">Nuova Recensione</Label>
        <Separator />
      </div>
      <Form {...zodForm}>
        <form className="space-y-2" onSubmit={zodForm.handleSubmit(onSubmit)}>
          <FormField
            control={zodForm.control}
            name="restaurant"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Da Totò Trattoria Rustica"
                    {...field}
                    className={cn(
                      "dark:bg-card bg-zinc-200 border text-black dark:text-white dark:placeholder:text-zinc-200/20 placeholder:text-zinc-400 border-zinc-400 focus-visible:ring-offset-1 focus-visible:ring-0 focus-visible:border-2",
                      zodForm.getFieldState(field.name).error
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
            control={zodForm.control}
            name="address"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Indirizzo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Via degli Arbusti 10, Milano"
                    {...field}
                    className={cn(
                      "dark:bg-card bg-zinc-200 border text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-200/20 border-zinc-400 focus-visible:ring-offset-1 focus-visible:ring-0 focus-visible:border-2",
                      zodForm.getFieldState(field.name).error
                        ? "border-destructive"
                        : "",
                    )}
                  />
                </FormControl>
                {lat && (
                  <div className="flex flex-row justify-between">
                    <FormDescription className="text-xs">
                      {"Lat: " + lat + ", Lon: " + zodForm.getValues("lon")}
                    </FormDescription>
                    <Button
                      type="button"
                      variant={"destructive"}
                      className="h-4 text-xs w-auto"
                      onClick={() => {
                        zodForm.resetField("lat");
                        zodForm.resetField("lon");
                        zodForm.resetField("address");
                      }}
                    >
                      Cancella
                    </Button>
                  </div>
                )}
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2  gap-1 justify-between">
            <FormField
              control={zodForm.control}
              name="productQuality"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Prodotti</FormLabel>
                  <FormControl>
                    <StarRating
                      rating={field.value}
                      isError={Boolean(zodForm.getFieldState(field.name).error)}
                      onChange={(value: number) => {
                        zodForm.setValue(field.name, value, {
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
              control={zodForm.control}
              name="plates"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Piatti</FormLabel>
                  <FormControl>
                    <StarRating
                      rating={field.value}
                      isError={Boolean(zodForm.getFieldState(field.name).error)}
                      onChange={(value: number) => {
                        zodForm.setValue(field.name, value, {
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
              control={zodForm.control}
              name="location"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <StarRating
                      rating={field.value}
                      isError={Boolean(zodForm.getFieldState(field.name).error)}
                      onChange={(value: number) => {
                        zodForm.setValue(field.name, value, {
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
            control={zodForm.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Punteggio Finale</FormLabel>
                <FormControl>
                  <StarRating
                    className="w-7 h-7"
                    rating={field.value}
                    isError={Boolean(zodForm.getFieldState(field.name).error)}
                    onChange={(value: number) => {
                      zodForm.setValue(field.name, value, {
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
            control={zodForm.control}
            name="approved"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Approvato da Spaccavacciuolo</FormLabel>
                <FormControl>
                  <AnimatedCheckbox
                    checked={field.value}
                    onCheckedChange={() =>
                      zodForm.setValue(field.name, !field.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                  />
                </FormControl>
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
