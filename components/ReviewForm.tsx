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
import AnimatedCheckbox from "./AnimatedCheckbox";
import { Textarea } from "./ui/textarea";
import StarRating from "./StarRating";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { Review, schemaType } from "@/types";

interface ReviewForm {
  form: UseFormReturn<schemaType>;
  onSubmit: (value: schemaType) => void;
  onBack: () => void;
  role: string | null;
}

const ReviewForm: React.FC<ReviewForm> = ({ form, onSubmit, onBack, role }) => {
  const latValue = form.watch("latitude", 0);
  const lonValue = form.watch("longitude", 0);

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
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
            <FormItem className="space-y-1">
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
                      form.setValue("latitude", 0, {
                        shouldDirty: false,
                        shouldTouch: false,
                      });
                      form.setValue("longitude", 0, {
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
        <div className="grid grid-cols-2  gap-1 justify-between">
          <FormField
            control={form.control}
            name="quality"
            render={({ field }) => (
              <FormItem className="space-y-1">
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
              <FormItem className="space-y-1">
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
              <FormItem className="space-y-1">
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
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="space-y-1">
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
        {role === "approver" ? (
          <FormField
            control={form.control}
            name="approved"
            render={({ field }) => (
              <FormItem className="space-y-1">
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
        <Button className="w-full" type="submit">
          Aggiungi
        </Button>
        <Button
          type="button"
          variant={"outline"}
          className="w-full"
          onClick={onBack}
        >
          Indietro
        </Button>
      </form>
    </Form>
  );
};

export default ReviewForm;
