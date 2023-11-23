import { LatLng, LeafletMouseEvent } from "leaflet";
import { useEffect, useState } from "react";
import { markerIcon } from "@/lib/markerIcon";
import {
  useMap,
  useMapEvent,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import dynamic from "next/dynamic";

export default function DraggableMap({
  setCoords,
  mapCenter,
}: {
  setCoords: (lat: number, lon: number) => void;
  mapCenter: [number, number];
}) {
  const [center, setCenter] = useState(new LatLng(0, 0));

  useEffect(() => {
    setCenter(new LatLng(mapCenter[0], mapCenter[1]));
  }, [mapCenter]);
  const setMapCoords = (lat: number, lon: number) => {
    setCenter(new LatLng(lat, lon));
    setCoords(lat, lon);
  };

  return (
    <div className="flex justify-center h-56 ">
      <MapContainer
        className="z-0 h-full rounded-md w-full md:w-1/2"
        center={new LatLng(mapCenter[0], mapCenter[1])}
        dragging
        touchZoom
        doubleClickZoom
        zoomControl={false}
        zoom={17}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController
          coords={center}
          setCoords={(lat, lon) => setMapCoords(lat, lon)}
        />
        <Marker position={center} icon={markerIcon}></Marker>
      </MapContainer>
    </div>
  );
}

function MapController({
  coords,
  setCoords,
}: {
  coords: LatLng;
  setCoords: (lat: number, lon: number) => void;
}) {
  const map = useMap();
  useMapEvent("click", (e: LeafletMouseEvent) => {
    setCoords(e.latlng.lat, e.latlng.lng);
  });

  useEffect(() => {
    map.flyTo(coords);
  }, [coords, map]);

  return null;
}
