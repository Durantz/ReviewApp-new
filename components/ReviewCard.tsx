"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerUrl from "@/public/map_marker_2.png";
import StarRating from "@/components/StarRating";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Review } from "@/types";

interface ReviewCard {
  data: Review;
}

const ReviewCard: React.FC<ReviewCard> = ({ data }) => {
  const center = [data.latitude, data.longitude];
  const [active, setActive] = useState(null);
  const markerIcon = new L.Icon({
    iconUrl: markerUrl.src,
    iconSize: [markerUrl.width * 0.5, markerUrl.height * 0.5],
  });

  return (
    <>
      <motion.div layout layoutId={data.id} className="w-full md:w-1/2">
        <Card>
          <CardHeader>
            <motion.div layout="position">
              <CardTitle>{data.restaurant}</CardTitle>
              <CardDescription className="flex flex-col gap-1">
                <div>{data.address}</div>
                <StarRating
                  rating={data.rating}
                  onChange={() => {}}
                  disabled
                  className="w-4 h-4"
                />
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="h-auto">
            <motion.div layout="position" className="h-40">
              <MapContainer
                center={center}
                zoom={17}
                className="z-0 h-full rounded-md"
                dragging={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                touchZoom={false}
                zoomControl={false}
                attributionControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={center} icon={markerIcon}>
                  <Popup>{data.address}</Popup>
                </Marker>
              </MapContainer>
            </motion.div>
            <AnimatePresence mode="wait">
              {active && (
                <>
                  <motion.div
                    className="flex flex-row gap-1 mt-2"
                    initial={{ width: 0 }}
                    animate={{
                      width: "auto",
                      transition: { delay: 0.3 },
                    }}
                    exit={{ width: 0, transition: { delay: 0.6 } }}
                  >
                    <Separator />
                  </motion.div>
                  <motion.div
                    key="additionaldata"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
                    exit={{ opacity: 0, y: -5, transition: { delay: 0.3 } }}
                    className="w-full h-auto grid grid-cols-2 gap-2 mt-2"
                  >
                    <motion.div
                      layout="position"
                      className="flex flex-col gap-2"
                    >
                      <Label>Qualità</Label>
                      <StarRating
                        rating={data.product}
                        onClick={() => {}}
                        disabled
                        className="w-4 h-4"
                      />
                    </motion.div>
                    <motion.div className="flex flex-col gap-2">
                      <Label>Piatti</Label>
                      <StarRating
                        rating={data.plates}
                        onClick={() => {}}
                        disabled
                        className="w-4 h-4"
                      />
                    </motion.div>
                    <motion.div className="flex flex-col gap-2">
                      <Label>Location</Label>
                      <StarRating
                        rating={data.location}
                        onClick={() => {}}
                        disabled
                        className="w-4 h-4"
                      />
                    </motion.div>
                    <motion.div className="flex flex-col gap-2 col-span-2">
                      <Label>Recensione</Label>
                      <motion.p className="text-xs">
                        Questa è una recensione di prova per testare se funziona
                        tutto come si deve.
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter
            className={cn(
              active ? "justify-end" : "justify-start",
              "w-full flex flex-row",
            )}
          >
            <motion.div layout>
              {active ? (
                <Button onClick={() => setActive(false)} variant="ghost">
                  Chiudi
                </Button>
              ) : (
                <Button onClick={() => setActive(true)}>Espandi</Button>
              )}
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
};

export default ReviewCard;
