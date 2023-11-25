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
import { useEffect, useState } from "react";

export default function AddReview() {
  const { data: session, status } = useSession();
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
    console.log(values);
    const res = await putData(values);
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
    zodForm.setValue("geospatial.coordinates", [lat, lon]);
    zodForm.setValue("latitude", lat);
    zodForm.setValue("longitude", lon);
    setMapCenter([lat, lon]);
  };

  const setCoords = (lat: number, lon: number) => {
    zodForm.setValue("geospatial.coordinates", [lat, lon]);
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
    zodForm.setValue("reviewer", session?.user.name!);
    zodForm.setValue("reviewerEmail", session?.user.email!);
  }, [session, toast, router, zodForm]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let coords = [position.coords.latitude, position.coords.longitude];
        setMapCenter(coords);
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
            position={[mapCenter[0], mapCenter[1]]}
            onCoordChange={setCoords}
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
            role={session?.user?.role}
          />
        </div>
      ) : null}
    </>
  );
}
