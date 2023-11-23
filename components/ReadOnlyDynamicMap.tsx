import {
  useMap,
  useMapEvent,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { LatLng, LeafletMouseEvent } from "leaflet";
import { markerIcon } from "@/lib/markerIcon";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// const MapContainer = dynamic(
//   () => import("react-leaflet").then((module) => module.MapContainer),
//   {
//     ssr: false, // Disable server-side rendering for this component
//   },
// );
// const TileLayer = dynamic(
//   () => import("react-leaflet").then((module) => module.TileLayer),
//   {
//     ssr: false,
//   },
// );
// const Marker = dynamic(
//   () => import("react-leaflet").then((module) => module.Marker),
//   {
//     ssr: false,
//   },
// );
// const Popup = dynamic(
//   () => import("react-leaflet").then((module) => module.Popup),
//   {
//     ssr: false,
//   },
// );

export default function ReadOnlyDynamicMap({
  center,
  popupText,
}: {
  center: [number, number];
  popupText: string;
}) {
  return (
    <MapContainer
      center={new LatLng(center[0], center[1])}
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
      <Suspense fallback={<></>}>
        <MapController />
        <Marker position={new LatLng(center[0], center[1])} icon={markerIcon}>
          <Popup>{popupText}</Popup>
        </Marker>
      </Suspense>
    </MapContainer>
  );
}

function MapController() {
  const map = useMap();

  useMapEvent("click", (e: LeafletMouseEvent) => {
    if (map.getZoom() == 17) {
      map.setZoom(14, { duration: 3 });
    } else {
      map.setZoom(17, { duration: 3 });
    }
  });
  return null;
}
