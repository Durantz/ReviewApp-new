import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";

const GeoapifyAutocomplete: React.FC<{}> = () => {
const onSelect = (value:GeoJSON.FeatureCollection) =>{
    console.log(value);
}
  return (
    <GeoapifyContext apiKey={process.env.GEOAPIFY_TOKEN}>
      <GeoapifyGeocoderAutocomplete addDetails limit={2} lang="it" />
    </GeoapifyContext>
  );
};

export default GeoapifyAutocomplete;
