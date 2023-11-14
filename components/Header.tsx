"use client";

import { Plus, UserCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SwitchTheme from "./SwitchTheme";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div className="z-10 fixed w-full items-center">
      <div className="flex h-14 justify-between items-center left-0 top-0 border-b px-4 pb-4 pt-4 backdrop-blur-xl lg:p-4">
        <div className="flex flex-row gap-1 items-center">
          <Link href="/" passHref>
            <h1 className="font-bold text-lg ">RECENSIONI FAZIOSE</h1>
          </Link>
        </div>
        <div className="flex flex-row">
          {status === "authenticated" ? (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/newreview" passHref>
                <Plus />
              </Link>
            </Button>
          ) : null}
          <SwitchTheme />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {status === "authenticated" ? (
                  <Avatar>
                    <AvatarImage alt="avatar" src={session?.user?.image} />
                  </Avatar>
                ) : (
                  <UserCircle />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {status === "authenticated" ? (
                <>
                  <DropdownMenuLabel>
                    Ciao, {session.user?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => signIn("google")}>
                  Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className=" -z-1 fixed -left-8 bottom-9 text-xs text-center rotate-90">
        By <span className=" font-bold">Antonio D.</span>
      </div>
      {/* <div className="fixed bottom-0 left-0 flex flex-row h-8 p-4 w-full items-center justify-end bg-white dark:bg-zinc-900 border-t">
        <div className=" text-xs text-right">
          By <span className=" font-bold">Antonio D.</span>
        </div>
      </div> */}
    </div>
  );
}
