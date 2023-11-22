"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import GeoapifyAutocomplete from "@/components/GeoapifyAutocomplete";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import ReviewForm from "@/components/ReviewForm";
import { schemaType, formSchema, Review } from "@/types";
import { getReview, putData } from "@/lib/functions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";

export default function EditReview({ params }: { params: { review: string } }) {
  // const [reviewList, setReview] = useRecoilState(reviews);
  const { data: session, status } = useSession();
  const [dbReview, setDbReview] = useState(null);
  const [mapCenter, setMapCenter] = useState(new LatLng(0, 0));
  const router = useRouter();
  const { toast } = useToast();
  const zodForm = useForm<schemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: schemaType) => {
    // console.log({ ...values, id: reviewList.length + 1 });
    console.log(values);
    const res = await putData(values);
    console.log(res);
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
    zodForm.setValue("latitude", lat);
    zodForm.setValue("longitude", lon);
    setMapCenter(new LatLng(lat, lon));
  };

  const setCoords = (lat: number, lon: number) => {
    zodForm.setValue("latitude", lat);
    zodForm.setValue("longitude", lon);
    setMapCenter(new LatLng(lat, lon));
    console.log("setCoords triggered");
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
    async function getReviewDb() {
      const review = await getReview(params.review);
      setDbReview(review);
    }
    getReviewDb();
  }, [session, toast, router, params.review]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        navigator.geolocation.getCurrentPosition((position) => {
          let coords = new LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );
          setMapCenter(coords);
        });
      },
      null,
      { maximumAge: 600000 },
    );
  }, []);

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
            position={mapCenter}
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
              formDefaultValues={dbReview}
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
