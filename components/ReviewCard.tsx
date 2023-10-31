"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerUrl from "@/public/map_marker_2.png";

import { Review } from "@/types";

const solidStar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 text-primary"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);
const star = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

interface ReviewCard {
  data: Review;
}

const ReviewCard: React.FC<ReviewCard> = ({ data }) => {
  const center = [data.latitude, data.longitude];
  const markerIcon = new L.Icon({
    iconUrl: markerUrl.src,
    iconSize: [markerUrl.width * 0.5, markerUrl.height * 0.5],
  });

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>
        <CardTitle>{data.restaurant}</CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <div>{data.address}</div>
          <div className="flex flex-row gap-1 items-center">
            {Array.from({ length: 5 }, (_, index) => {
              if (index + 1 <= data.rating) {
                return <div key={index}>{solidStar}</div>;
              } else {
                return <div key={index}>{star}</div>;
              }
            })}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="h-44">
        <MapContainer
          center={center}
          zoom={17}
          className="z-0 h-full"
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
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
