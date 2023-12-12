import { LatLng, LeafletMouseEvent } from "leaflet";
import { useEffect, useState } from "react";
import { markerIcon } from "@/lib/markerIcon";
import {
  useMap,
  useMapEvent,
  MapContainer,
  TileLayer,
  Marker,
  Circle,
} from "react-leaflet";

export default function RangeMap({
  setCoords,
  mapCenter,
  range,
}: {
  setCoords: (lat: number, lon: number) => void;
  mapCenter: [number, number];
  range: number;
}) {
  const [_mapCenter, _setMapCenter] = useState(new LatLng(0, 0));
  const [_range, _setRange] = useState(10);

  useEffect(() => {
    console.log(mapCenter);
    _setMapCenter(new LatLng(mapCenter[0], mapCenter[1]));
  }, [mapCenter]);

  useEffect(() => {
    console.log(range);
    _setRange(range);
  }, [range]);

  const _setCoords = (lat: number, lon: number) => {
    _setMapCenter(new LatLng(lat, lon));
    setCoords(lat, lon);
  };

  return (
    <div className="flex justify-center h-56 ">
      <MapContainer
        className="z-0 h-full rounded-md w-full"
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
          coords={_mapCenter}
          setCoords={(lat, lon) => _setCoords(lat, lon)}
        />
        <Marker position={_mapCenter} icon={markerIcon}></Marker>
        <Circle
          center={_mapCenter}
          radius={_range}
          color="green"
          interactive={false}
          bubblingMouseEvents={false}
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
  const map = useMap();
  useMapEvent("click", (e: LeafletMouseEvent) => {
    setCoords(e.latlng.lat, e.latlng.lng);
  });

  useEffect(() => {
    map.flyTo(coords);
  }, [coords, map]);

  return null;
}
