import { LatLng, LeafletMouseEvent } from "leaflet";
import { useEffect, useState, useMemo } from "react";
import { markerIcon } from "@/lib/markerIcon";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap, useMapEvent } from "react-leaflet";

export default function DraggableMap({
  setCoords,
  mapCenter,
}: {
  setCoords: (lat: number, lon: number) => void;
  mapCenter: LatLng;
}) {
  const setMapCoords = (lat: number, lon: number) => {
    setCoords(lat, lon);
  };

  return (
    <div className="flex justify-center h-56 ">
      <MapContainer
        className="z-0 h-full rounded-md w-full md:w-1/2"
        center={mapCenter}
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
          coords={mapCenter}
          setCoords={(lat, lon) => setMapCoords(lat, lon)}
        />
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
  const [markerCenter, setMarkerCenter] = useState(() => coords);
  const map = useMap();
  const mapEvent = useMapEvent("click", (e: LeafletMouseEvent) => {
    setMarkerCenter(new LatLng(e.latlng.lat, e.latlng.lng));
    setCoords(e.latlng.lat, e.latlng.lng);
  });

  useEffect(() => {
    if (map.getBounds().contains(coords)) {
      console.log(map.getBounds());
    }
    map.flyTo(coords);
    setMarkerCenter(coords);
  }, [coords, map]);

  return <Marker position={markerCenter} icon={markerIcon}></Marker>;
}
