"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import GeoapifyAutocomplete from "@/components/GeoapifyAutocomplete";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import ReviewForm from "@/components/ReviewForm";
import { schemaType, formSchema } from "@/types";
import { putData } from "@/lib/functions";
import { useSession } from "next-auth/react";

export default function AddReview() {
  // const [reviewList, setReview] = useRecoilState(reviews);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const zodForm = useForm<schemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      restaurant: "",
      address: "",
      quality: 0,
      location: 0,
      ospitality: 0,
      plates: 0,
      rating: 0,
      approved: false,
      notes: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const onSubmit = async (values: schemaType) => {
    // console.log({ ...values, id: reviewList.length + 1 });
    const res = await putData(values);
    console.log(res);
    if (res) {
      // setReview([...reviewList, { ...values, id: reviewList.length + 1 }]);
      toast({
        title: "Salvataggio eseguito",
        description: "La recensione è stata salvata correttamente",
      });
      router.push("/");
    }
  };

  const setFormFields = (
    lat: number,
    lon: number,
    restaurant: string,
    address: string,
  ) => {
    zodForm.setValue("restaurant", restaurant);
    zodForm.setValue("address", address);
    zodForm.setValue("latitude", lat);
    zodForm.setValue("longitude", lon);
  };

  // if (status === "unauthenticated") {
  //   toast({
  //     title: "Unauthorized",
  //     description: "Effettuare la login per poter aggiungere recensioni",
  //     variant: "destructive",
  //   });
  //   router.push("/");
  //   return null;
  // }

  return (
    <div className="grid grid-flow-row gap-1 w-auto">
      <GeoapifyAutocomplete
        onPlaceSelect={(
          lat: number,
          lon: number,
          restaurant: string,
          address: string,
        ) => setFormFields(lat, lon, restaurant, address)}
        key="autocomplete"
      />
      <div className="mt-1 grid grid-cols-3 w-full items-center">
        <Separator />
        <Label className="text-center">Nuova Recensione</Label>
        <Separator />
      </div>
      <ReviewForm
        form={zodForm}
        onSubmit={(values: schemaType) => onSubmit(values)}
        onBack={() => router.back()}
      />
    </div>
  );
}
