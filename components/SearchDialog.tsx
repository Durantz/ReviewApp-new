"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem } from "./ui/command";
import { useEffect, useState } from "react";
import { types } from "@/defaults";
import { filterState, usersState } from "@/states";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import dynamic from "next/dynamic";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { AnimatePresence, motion } from "framer-motion";

const RangeMap = dynamic(() => import("./RangeMap"), { ssr: false });

const defaultFilter = {
  types: [] as { label: string; value: string }[],
  users: [] as { name: string; email: string }[],
  nearby: { lat: 0, lon: 0, radius: 10 } as {
    lat: number;
    lon: number;
    radius: number;
  },
};
export default function SearchDialog() {
  const [openRestaurantTypes, setOpenRestaurantTypes] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [localFilter, setLocalFilter] = useState(defaultFilter);
  const [filter, setFilter] = useRecoilState(filterState);
  const resetFilter = useResetRecoilState(filterState);
  const users = useRecoilValue(usersState);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocalFilter((localFilter) => ({
        ...localFilter,
        nearby: {
          ...localFilter.nearby,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
      }));
    });
  }, []);

  return (
    <div className="flex flex-row justify-start items-center mb-2 snap-start">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-fit px-2" size="icon" variant="secondary">
            <Search className="w-5 h-5 mr-2" />
            Cerca
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-[375px] rounded-md">
          <DialogHeader>
            <DialogTitle className="text-left">Cerca Recensioni</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col space-y-1">
              <Label className="font-semibold">Tipo Ristorante</Label>
              <Popover open={openRestaurantTypes}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    color="primary"
                    role="combobox"
                    onClick={() => setOpenRestaurantTypes(true)}
                    className={cn(
                      "w-full dark:bg-card bg-zinc-100 dark:text-white border-primary justify-between",
                      openRestaurantTypes && "border-2",
                    )}
                  >
                    <span>
                      {localFilter.types.length > 0
                        ? localFilter.types.length < 4
                          ? localFilter.types.map((t) => t.label).join(", ")
                          : `${localFilter.types.length} tipi selezionati`
                        : "Tutti"}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-44 p-0"
                  onInteractOutside={() => setOpenRestaurantTypes(false)}
                >
                  <Command>
                    <CommandGroup>
                      {types.map((type) => (
                        <CommandItem
                          value={type.label}
                          key={type.value}
                          onSelect={() => {
                            const exists = localFilter.types.find(
                              (t) => t.value === type.value,
                            );
                            if (exists) {
                              setLocalFilter((localFilter) => ({
                                ...localFilter,
                                types: localFilter.types.filter(
                                  (t) => t.value !== type.value,
                                ),
                              }));
                            } else {
                              setLocalFilter((localFilter) => ({
                                ...localFilter,
                                types: [...localFilter.types, type],
                              }));
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              localFilter.types.find(
                                (t) => t.value === type.value,
                              )
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {type.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-1">
              <Label className="font-semibold">Recensito da</Label>
              <Popover open={openUsers}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    color="primary"
                    role="combobox"
                    onClick={() => setOpenUsers(true)}
                    className={cn(
                      "w-full dark:bg-card bg-zinc-100 dark:text-white border-primary justify-between",
                      openUsers && "border-2",
                    )}
                  >
                    <span>
                      {localFilter.users.length > 0
                        ? localFilter.users.length < 3
                          ? localFilter.users.map((t) => t.name).join(", ")
                          : `${localFilter.users.length} utenti selezionati`
                        : "Tutti"}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-full p-0"
                  onInteractOutside={() => setOpenUsers(false)}
                >
                  <Command>
                    <CommandGroup>
                      {users.length > 0 &&
                        users.map((user) => (
                          <CommandItem
                            value={user.name}
                            key={user.email}
                            onSelect={() => {
                              const exists = localFilter.users.find(
                                (t) => t.email === user.email,
                              );
                              if (exists) {
                                setLocalFilter((localFilter) => ({
                                  ...localFilter,
                                  users: localFilter.users.filter(
                                    (t) => t.email !== user.email,
                                  ),
                                }));
                              } else {
                                setLocalFilter((localFilter) => ({
                                  ...localFilter,
                                  users: [...localFilter.users, user],
                                }));
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                localFilter.users.find(
                                  (t) => t.email === user.email,
                                )
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {user.name}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <div className="flex flex-row items-center gap-2">
                <Label htmlFor="location">Vicinanze</Label>
                <Switch
                  id="location"
                  checked={openLocation}
                  onCheckedChange={() => setOpenLocation(!openLocation)}
                />
              </div>
              <AnimatePresence mode="wait">
                {openLocation && (
                  <motion.div
                    className="flex flex-col space-y-2 w-full"
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: { opacity: { delay: 0.2 } },
                    }}
                    initial={{ height: 0, opacity: 0 }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: { height: { delay: 0.2 } },
                    }}
                  >
                    <Input
                      className="w-20"
                      type="number"
                      value={localFilter.nearby.radius}
                      onChange={(e) =>
                        setLocalFilter((localFilter) => ({
                          ...localFilter,
                          nearby: {
                            ...localFilter.nearby,
                            radius: Number(e.target.value),
                          },
                        }))
                      }
                    />
                    <RangeMap
                      mapCenter={[
                        localFilter.nearby.lat,
                        localFilter.nearby.lon,
                      ]}
                      range={localFilter.nearby.radius}
                      setCoords={(lat, lon) => {
                        setLocalFilter((localFilter) => ({
                          ...localFilter,
                          nearby: {
                            ...localFilter.nearby,
                            lat: lat,
                            lon: lon,
                          },
                        }));
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <DialogFooter>
            <div className="w-full flex flex-row justify-between">
              <DialogClose asChild>
                <Button
                  variant="default"
                  onClick={() => setFilter(localFilter)}
                >
                  Esegui
                </Button>
              </DialogClose>
              <DialogClose>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setLocalFilter(defaultFilter);
                    resetFilter();
                  }}
                >
                  Resetta
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <span className="text-sm">
        {`tipo='${restTypes.types.length > 0 ? restTypes.types.map((t) => t.label).join(",") : "Tutto"}' > utenti='${restTypes.users.length > 0 ? restTypes.users.map((t) => t.name).join(",") : "Tutti"}'`} 
        </span> */}
    </div>
  );
}
