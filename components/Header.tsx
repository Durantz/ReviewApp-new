"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SwitchTheme from "./SwitchTheme";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div className="z-10 fixed w-full items-center">
      <div className="flex h-18 justify-between items-center left-0 top-0 border-b border-gray-300 px-4 pb-4 pt-4 backdrop-blur-xl lg:p-4">
        <div className="flex flex-row gap-1 items-center">
          {/* <Sheet open={open} onOpenChange={(open: boolean) => setOpen(open)}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <MenuIcon className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <nav className="flex flex-col gap-4">
                <Link
                  href={"/addreview"}
                  className="block px-2 py-1"
                  onClick={() => setOpen(false)}
                >
                  Aggiungi Recensione
                </Link>
              </nav>
            </SheetContent>
          </Sheet> */}
          <Link href="/" passHref>
            <h1 className="font-bold text-lg ">4 RECENSIONI</h1>
          </Link>
        </div>
        <div className="flex flex-row">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/addreview" passHref>
              <Plus />
            </Link>
          </Button>
          <SwitchTheme />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 flex h-16 p-4 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
        <div>
          By <span className="font-bold">Antonio D.</span>
        </div>
      </div>
    </div>
  );
}
