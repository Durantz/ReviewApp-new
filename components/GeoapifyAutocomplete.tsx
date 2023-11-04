"use client";

import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import { useState } from "react";

const GeoapifyAutocomplete: React.FC<{
  passInfo: (
    lat: number,
    lon: number,
    restaurant: string,
    address: string,
  ) => void;
}> = ({ passInfo }) => {
  const [coord, setCoord] = useState([0, 0]);

  const onSelect = (value: any) => {
    const props = value.properties as GeoJSON.GeoJsonProperties;
    setCoord([props?.lat, props?.lon]);
    passInfo(
      props?.lat,
      props?.lon,
      props?.address_line1,
      props?.address_line2,
    );
  };

  return (
    <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_TOKEN}>
      <GeoapifyGeocoderAutocomplete
        placeholder="Cerca una località"
        limit={2}
        debounceDelay={250}
        lang="it"
        placeSelect={onSelect}
      />
    </GeoapifyContext>
  );
};

export default GeoapifyAutocomplete;
