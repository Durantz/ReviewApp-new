"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { markerIcon } from "@/lib/markerIcon";
import StarRating from "@/components/StarRating";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

import { Review } from "@/types";
import { Edit } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { deleteReview } from "@/lib/functions";

const additionalData = {
  hidden: {
    heigth: 0,
    y: -5,
    opacity: 0,
    transition: {
      staggerDirection: -1,
      when: "afterChildren",
      staggerChildren: 0.2,
    },
  },
  visible: {
    height: "auto",
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
  canEditDelete: boolean;
}

const ReviewCard: React.FC<ReviewCard> = ({ data, canEditDelete }) => {
  const center = [data.latitude, data.longitude];
  const [active, setActive] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const deleteMe = async (id: string) => {
    console.log(id);
    const data = await deleteReview(id);
    console.log(data);
    setOpenPopover(false);
  };
  const isIos = () => Boolean(navigator.userAgent.match(/iPhone|iPad|iPod/i));

  return (
    <>
      <motion.div
        layout
        layoutId={"" + data._id}
        className="w-full md:w-[450px] snap-center"
      >
        <Card className="relative group backdrop-blur-xl">
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
              <CardTitle>
                <span className="flex flex-row items-center gap-2">
                  {data.restaurant}
                  {/* <Edit className="w-4 h-4 cursor-pointer" /> */}
                </span>
              </CardTitle>
              <CardDescription className="flex flex-col gap-0.5 justify-items-center">
                <div>
                  <a
                    target="_blank"
                    href={
                      !isIos()
                        ? `https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${data.latitude},${data.longitude}`
                        : `https://maps.apple.com/?daddr=${data.address}&t=r&dirflg=d`
                    }
                  >
                    {data.address}
                  </a>
                </div>
                <StarRating
                  rating={data.rating}
                  onChange={() => {}}
                  disabled
                  className="w-4 h-4"
                />
                <div className="text-xs">di {data.reviewer}</div>
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="h-auto">
            <motion.div layout="position" className="h-40">
              {data.latitude == 0 && data.longitude == 0 ? (
                <div className=" flex flex-row items-center justify-center h-full rounded-md bg-slate-100 dark:bg-zinc-700">
                  <p className="text-center text-sm">Nessuna posizione</p>
                </div>
              ) : (
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
                  <MapController />
                  <Marker position={center} icon={markerIcon}>
                    <Popup>{data.address}</Popup>
                  </Marker>
                </MapContainer>
              )}
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
                        rating={data.quality}
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
                      <Label>Ospitalità</Label>
                      <StarRating
                        rating={data.ospitality}
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
                      <motion.p className="break-words text-xs min-h-content">
                        {data.notes}
                      </motion.p>
                    </motion.div>
                    <motion.div
                      className="flex flex-row gap-1 mt-2 col-span-2"
                      initial={{ width: 0 }}
                      animate={{
                        width: "auto",
                        transition: { delay: 0.3, staggerChildren: 0.2 },
                      }}
                      exit={{ width: 0 }}
                    >
                      <Separator />
                    </motion.div>
                    {canEditDelete ? (
                      <motion.div
                        layout
                        variants={additionalData}
                        className="flex flex-row justify-between col-span-2"
                      >
                        <Popover open={openPopover}>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"destructive"}
                              className="h-8"
                              onClick={() => setOpenPopover(true)}
                            >
                              Elimina
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-60"
                            side="left"
                            onInteractOutside={() => setOpenPopover(false)}
                          >
                            <div className="w-full grid cols-1 gap-1 place-items-center">
                              <p className="text-sm text-center">
                                Vuoi eliminare la recensione?
                              </p>
                              <Button
                                variant={"default"}
                                className="h-6 text-xs w-1/2"
                                onClick={() => deleteMe(data._id)}
                              >
                                Conferma
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <Button variants="secondary" className="h-8">
                          <Link href={`/editreview/${data._id}`}>Modifica</Link>
                        </Button>
                      </motion.div>
                    ) : null}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter>
            <div className="flex flex-row w-full justify-between gap-2">
              <div
                className={cn(
                  active ? "justify-end" : "justify-start",
                  "w-full flex flex-row",
                )}
              >
                <motion.div layout>
                  {active ? (
                    <Button
                      className="h-8"
                      onClick={() => setActive(false)}
                      variant="ghost"
                    >
                      Chiudi
                    </Button>
                  ) : (
                    <Button className="h-8" onClick={() => setActive(true)}>
                      Espandi
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
};

function MapController() {
  const map = useMap();

  const mapEvent = useMapEvent("click", (e: MouseEvent) => {
    if (map.getZoom() == 17) {
      map.setZoom(14, { duration: 3 });
    } else {
      map.setZoom(17, { duration: 3 });
    }
  });

  return null;
}

export default ReviewCard;
