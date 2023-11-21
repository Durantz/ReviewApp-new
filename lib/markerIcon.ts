import L from "leaflet";
import markerUrl from "@/public/map_marker_2.png";

export const markerIcon = new L.Icon({
  iconUrl: markerUrl.src,
  iconSize: [markerUrl.width * 0.5, markerUrl.height * 0.5],
});
