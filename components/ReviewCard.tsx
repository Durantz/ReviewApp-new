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

const googleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="25"
    height="25"
    viewBox="0 0 48 48"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
  </svg>
);
const appleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="30"
    height="30"
    viewBox="0 0 48 48"
  >
    <path
      fill="#42A5F5"
      d="M40.084,32.613c-0.848,1.835-1.254,2.655-2.342,4.274c-1.521,2.264-3.67,5.089-6.326,5.109c-2.361,0.018-2.971-1.507-6.176-1.482c-3.204,0.016-3.872,1.51-6.237,1.484c-2.654-0.022-4.688-2.568-6.21-4.826c-4.259-6.34-4.707-13.768-2.076-17.721c1.861-2.803,4.807-4.449,7.572-4.449c2.817,0,4.588,1.514,6.916,1.514c2.262,0,3.638-1.517,6.896-1.517c2.464,0,5.07,1.313,6.931,3.575C32.942,21.836,33.931,30.337,40.084,32.613z"
    ></path>
    <path
      fill="#42A5F5"
      d="M30.046,12.072c1.269-1.577,2.232-3.804,1.882-6.072c-2.069,0.138-4.491,1.418-5.905,3.075c-1.282,1.51-2.345,3.752-1.931,5.922C26.351,15.066,28.689,13.764,30.046,12.072z"
    ></path>
    <path
      fill="#1E88E5"
      d="M36.736,20.421C28,30.001,20,21.001,9.228,27.842c0.375,3.027,1.53,6.303,3.565,9.331c1.521,2.258,3.556,4.804,6.21,4.826c2.365,0.025,3.033-1.469,6.237-1.484c3.205-0.024,3.814,1.5,6.176,1.482c2.656-0.021,4.805-2.846,6.326-5.109c1.088-1.619,1.494-2.439,2.342-4.274C34.878,30.688,33.389,24.314,36.736,20.421z"
    ></path>
  </svg>
);
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
                  <Popover>
                    <PopoverTrigger>
                      <span>{data.address}</span>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit">
                      <div className="flex flex-row gap-1 ">
                        <Link
                          href={`https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${data.latitude},${data.longitude}`}
                          target="_blank"
                          passHref
                        >
                          <Button variant="ghost" size="icon">
                            {googleIcon}
                          </Button>
                        </Link>
                        <Link
                          href={`https://maps.apple.com/?daddr=${data.address}&t=r&dirflg=d`}
                          target="_blank"
                          passHref
                        >
                          <Button variant="ghost" size="icon">
                            {appleIcon}
                          </Button>
                        </Link>
                      </div>
                    </PopoverContent>
                  </Popover>
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

// ? `https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${data.latitude},${data.longitude}`: `https://maps.apple.com/?daddr=${data.address}&t=r&dirflg=d`
