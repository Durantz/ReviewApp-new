"use client";

import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const autocompleteAnimation = {
  initial: {
    height: 0,
    y: -5,
    opacity: 0,
  },
  animate: {
    height: "auto",
    y: 0,
    opacity: 1,
    transition: { opacity: { delay: 0.2 } },
  },
  exit: {
    height: 0,
    y: -5,
    opacity: 0,
    transition: { height: { delay: 0.2 } },
  },
};

const GeoapifyAutocomplete: React.FC<{
  onPlaceSelect: (
    lat: number,
    lon: number,
    restaurant: string,
    address: string,
  ) => void;
}> = ({ onPlaceSelect }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ lon: 0, lat: 0 });
  const onSelect = (value: any) => {
    const props = value.properties as GeoJSON.GeoJsonProperties;
    if (props.result_type === "amenity") {
      onPlaceSelect(
        props?.lat,
        props?.lon,
        props?.address_line1,
        props?.address_line2,
      );
    } else {
      onPlaceSelect(props?.lat, props?.lon, "", props?.formatted);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      () => {},
      { maximumAge: 10000 },
    );
  }, []);

  return (
    <div className="grid grid-flow-row gap-1">
      <div className="flex flex-row items-center gap-1">
        <Label>Ricerca locali</Label>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="p-1"
          onClick={() => setOpen(!open)}
        >
          <motion.span animate={open ? { rotate: 180 } : { rotate: 0 }}>
            <ChevronDown className="w-5 h-5" />
          </motion.span>
        </Button>
      </div>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="search"
            variants={autocompleteAnimation}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_TOKEN}>
              <GeoapifyGeocoderAutocomplete
                placeholder="Cerca una località"
                limit={2}
                debounceDelay={250}
                lang="it"
                type="amenity"
                placeSelect={onSelect}
                biasByProximity={position}
              />
            </GeoapifyContext>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GeoapifyAutocomplete;
