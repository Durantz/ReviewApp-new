import { UseFormReturn } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Command, CommandGroup, CommandItem } from "./ui/command";
import AnimatedCheckbox from "./AnimatedCheckbox";
import { Textarea } from "./ui/textarea";
import StarRating from "./StarRating";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { schemaType } from "@/types";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { types } from "@/defaults";

interface ReviewForm {
  form: UseFormReturn<schemaType>;
  onSubmit: (value: schemaType) => void;
  onBack: () => void;
  role: string | null;
}

const ReviewForm: React.FC<ReviewForm> = ({ form, onSubmit, onBack, role }) => {
  const latValue = form.watch("geospatial.coordinates.1", 0);
  const lonValue = form.watch("geospatial.coordinates.0", 0);
  const [typeOpen, setTypeOpen] = useState(false);

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="restaurant"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Da Totò Trattoria Rustica"
                  {...field}
                  className={cn(
                    "dark:bg-card bg-zinc-100 border text-black dark:text-white dark:placeholder:text-zinc-200/20 placeholder:text-zinc-300 border-primary focus-visible:ring-offset-1 focus-visible:ring-0 focus-visible:border-2",
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
            <FormItem className="flex flex-col space-y-1">
              <FormLabel>Indirizzo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Via degli Arbusti 10, Milano"
                  {...field}
                  className={cn(
                    "dark:bg-card bg-zinc-100 border text-black dark:text-white dark:placeholder:text-zinc-200/20 placeholder:text-zinc-300 border-primary focus-visible:ring-offset-1 focus-visible:ring-0 focus-visible:border-2",
                    form.getFieldState(field.name).error
                      ? "border-destructive"
                      : "",
                  )}
                />
              </FormControl>
              {latValue > 0 && (
                <div className="flex flex-row justify-between">
                  <FormDescription className="text-xs">
                    {"Lat: " + latValue + ", Lon: " + lonValue}
                  </FormDescription>
                  <Button
                    type="button"
                    variant={"destructive"}
                    className="h-4 text-xs w-auto"
                    onClick={() => {
                      form.setValue("geospatial.coordinates.0", 0, {
                        shouldDirty: false,
                        shouldTouch: false,
                      });
                      form.setValue("geospatial.coordinates.1", 0, {
                        shouldDirty: false,
                        shouldTouch: false,
                      });
                      form.resetField("address");
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
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col space-y-1">
                <FormLabel>Tipologia</FormLabel>
                <Popover open={typeOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        color="primary"
                        role="combobox"
                        onClick={() => setTypeOpen(true)}
                        className={cn(
                          "w-44 dark:bg-card bg-zinc-100 dark:text-white border-primary justify-between",
                          form.getFieldState(field.name).error &&
                            "border-destructive",
                          typeOpen && "border-2",
                        )}
                      >
                        <span
                          className={cn(
                            !field.value &&
                              "text-zinc-300 dark:text-zinc-200/20",
                          )}
                        >
                          {field.value
                            ? types.find((type) => type.value === field.value)!
                                .label
                            : "Seleziona un tipo"}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-44 p-0"
                    onInteractOutside={() => setTypeOpen(false)}
                  >
                    <Command>
                      <CommandGroup>
                        {types.map((type) => (
                          <CommandItem
                            value={type.label}
                            key={type.value}
                            onSelect={() => {
                              form.setValue(
                                field.name,
                                field.value === type.value ? "" : type.value,
                                {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                },
                              );
                              setTypeOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                type.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {type.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage className="text-xs mt-1" />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 justify-between gap-2">
          <FormField
            control={form.control}
            name="quality"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1">
                <FormLabel>Prodotti</FormLabel>
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
            name="plates"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1">
                <FormLabel>Piatti</FormLabel>
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
            name="ospitality"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1">
                <FormLabel>Ospitalità</FormLabel>
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
              <FormItem className="flex flex-col space-y-1">
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
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1">
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="dark:bg-card bg-zinc-100 border text-black dark:text-white dark:placeholder:text-zinc-200/20 placeholder:text-zinc-300 border-primary focus-visible:ring-offset-1 focus-visible:ring-0 focus-visible:border-2"
                  inputMode="text"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1">
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
        {role === "approver" ? (
          <FormField
            control={form.control}
            name="approved"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1">
                <FormLabel>Approvato da Spaccavacciuolo</FormLabel>
                <FormControl>
                  <AnimatedCheckbox
                    checked={field.value}
                    onCheckedChange={() =>
                      form.setValue(field.name, !field.value, {
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
        ) : null}
        <div className="flex  sm:flex-row flex-col sm:justify-evenly items-center gap-1">
          <Button
            className="w-full sm:w-60"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="flex flex-row justify-center items-center gap-1">
                <Loader2 className="w-5 h-5 animate-spin" />
                Attendi...
              </span>
            ) : (
              "Salva"
            )}
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type="button"
            variant={"outline"}
            className="w-full sm:w-52"
            onClick={onBack}
          >
            Indietro
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReviewForm;
