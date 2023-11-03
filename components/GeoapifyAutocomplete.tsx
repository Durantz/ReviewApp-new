import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import { useState } from "react";

const GeoapifyAutocomplete: React.FC<{}> = () => {
  const [coord, setCoord] = useState([0, 0]);

  const onSelect = (value: any) => {
    const props = value.properties as GeoJSON.GeoJsonProperties;
    setCoord([props?.lat, props?.lon]);
    console.log(value);
    return null;
  };

  return (
    <>
      <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_TOKEN}>
        <GeoapifyGeocoderAutocomplete
          placeholder="Cerca una località"
          limit={2}
          debounceDelay={250}
          lang="it"
          placeSelect={onSelect}
        />
      </GeoapifyContext>
      <p>{coord}</p>
    </>
  );
};

export default GeoapifyAutocomplete;
