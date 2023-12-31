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
import { getReview, updateData } from "@/lib/functions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function EditReview({ params }: { params: { review: string } }) {
  const { data: session, status } = useSession();
  const [dbReview, setDbReview] = useState(null);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const router = useRouter();
  const { toast } = useToast();
  const zodForm = useForm<schemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      restaurant: "",
      address: "",
      reviewer: "",
      type: "",
      reviewerEmail: "",
      quality: 0,
      location: 0,
      ospitality: 0,
      plates: 0,
      rating: 0,
      approved: false,
      notes: "",
      geospatial: {
        type: "Point",
        coordinates: [0, 0],
      },
      latitude: 0,
      longitude: 0,
    },
  });

  const onSubmit = async (values: schemaType) => {
    const res = await updateData(values, params.review);
    if (res) {
      router.push("/");
      toast({
        title: "Salvataggio eseguito",
        description: "La recensione è stata salvata correttamente",
      });
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
    zodForm.setValue("geospatial.coordinates", [lon, lat]);
    zodForm.setValue("latitude", lat);
    zodForm.setValue("longitude", lon);
    setMapCenter([lat, lon]);
  };

  const setCoords = (lat: number, lon: number) => {
    zodForm.setValue("geospatial.coordinates", [lon, lat]);
    zodForm.setValue("latitude", lat);
    zodForm.setValue("longitude", lon);
    setMapCenter([lat, lon]);
  };

  useEffect(() => {
    if (!session) {
      router.push("/");
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "Signin",
      });
    }
  }, [session, toast, router]);

  useEffect(() => {
    async function getReviewDb() {
      const review = await getReview(params.review);
      setDbReview(review);
      setMapCenter([review?.latitude, review?.longitude]);
      zodForm.reset(review);
    }
    getReviewDb();
  }, [params.review, zodForm]);

  return (
    <>
      {status === "authenticated" ? (
        <div className="grid grid-flow-row gap-1 w-auto">
          <GeoapifyAutocomplete
            onPlaceSelect={(
              lat: number,
              lon: number,
              restaurant: string,
              address: string,
            ) => setFormFields(lat, lon, restaurant, address)}
            position={[mapCenter[0], mapCenter[1]]}
            onCoordChange={setCoords}
            key="autocomplete"
          />
          <div className="mt-1 grid grid-cols-3 w-full items-center">
            <Separator />
            <Label className="text-center">Nuova Recensione</Label>
            <Separator />
          </div>
          {dbReview ? (
            <ReviewForm
              form={zodForm}
              onSubmit={(values: schemaType) => onSubmit(values)}
              onBack={() => router.back()}
              role={session?.user?.role}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
}
