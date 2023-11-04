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
import { motion, AnimatePresence, LayoutGroup, stagger } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Review } from "@/types";

const additionalData = {
  hidden: {
    y: -5,
    opacity: 0,
    transition: {
      staggerDirection: -1,
      when: "afterChildren",
      staggerChildren: 0.2,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
      staggerDirection: 1,
    },
  },
};

interface ReviewCard {
  data: Review;
}

const ReviewCard: React.FC<ReviewCard> = ({ data }) => {
  const center = [data.latitude, data.longitude];
  const [active, setActive] = useState(false);
  const markerIcon = new L.Icon({
    iconUrl: markerUrl.src,
    iconSize: [markerUrl.width * 0.5, markerUrl.height * 0.5],
  });

  return (
    <>
      <motion.div layout layoutId={"" + data.id} className="w-full md:w-1/2">
        <Card className="relative group">
          {data.approved ? (
            <motion.div layout="position" className="absolute top-2 right-3">
              <motion.img
                src="/happyGab.png"
                alt="approved by Spaccavacciuolo"
                className=" w-11 h-11 p-1 bg-primary rounded-full object-contain group-hover:animate-wiggle-more group-hover:animate-infinite"
              />
            </motion.div>
          ) : null}
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
                      transition: { delay: 0.3, staggerChildren: 0.2 },
                    }}
                    exit={{ width: 0 }}
                  >
                    <Separator />
                  </motion.div>
                  <motion.div
                    layout
                    key="additionaldata"
                    variants={additionalData}
                    initial={"hidden"}
                    animate={"visible"}
                    exit={"hidden"}
                    className="w-full h-auto grid grid-cols-2 gap-2 mt-2"
                  >
                    <motion.div
                      variants={additionalData}
                      className="flex flex-col gap-2"
                    >
                      <Label>Qualità</Label>
                      <StarRating
                        rating={data.product}
                        onChange={() => {}}
                        disabled
                        className="w-4 h-4"
                      />
                    </motion.div>
                    <motion.div
                      variants={additionalData}
                      className="flex flex-col gap-2"
                    >
                      <Label>Piatti</Label>
                      <StarRating
                        rating={data.plates}
                        onChange={() => {}}
                        disabled
                        className="w-4 h-4"
                      />
                    </motion.div>
                    <motion.div
                      variants={additionalData}
                      className="flex flex-col gap-2"
                    >
                      <Label>Location</Label>
                      <StarRating
                        rating={data.location}
                        onChange={() => {}}
                        disabled
                        className="w-4 h-4"
                      />
                    </motion.div>
                    <motion.div
                      layout
                      variants={additionalData}
                      className="flex flex-col gap-2 col-span-2"
                    >
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
