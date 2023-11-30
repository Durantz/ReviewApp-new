"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useState } from "react";
import { types } from "@/defaults";
import { filterState, usersState, reviewsState } from "@/states";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { getAllData } from "@/lib/functions";

export default function SearchDialog() {
  const [openRestaurantTypes, setOpenRestaurantTypes] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [localFilter, setLocalFilter] = useState({
    types: [] as { label: string; value: string }[],
    users: [] as { name: string; email: string }[],
  });
  const [filter, setFilter] = useRecoilState(filterState);
  const resetFilter = useResetRecoilState(filterState);
  const users = useRecoilValue(usersState);
  const [reviews, setReviews] = useRecoilState(reviewsState);

  return (
    <div className="flex flex-row justify-start items-center mb-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w- px-2" size="icon" variant="secondary">
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
              <Button variant="secondary" onClick={() => resetFilter()}>
                Resetta
              </Button>
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
