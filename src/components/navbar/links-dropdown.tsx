import { NavLinks } from "@/data/nav-links";
import { LoggedInLinks } from "@/data/nav-links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import SignOutLink from "./sign-out-link";
import UserIcon from "./user-icon";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function LinksDropdown() {
  const { userId } = await auth();
  const isAdmin = userId === process.env.ADMIN_USER_ID;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        {NavLinks.map((navLink, idx) => {
          return (
            <DropdownMenuItem key={idx}>
              <Link href={navLink.href} className="capitalize w-full">
                {navLink.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <SignedIn>
          <DropdownMenuSeparator />
          {LoggedInLinks.map((loggedInLink, idx) => {
            if (loggedInLink.label === "Dashboard" && !isAdmin) return null;
            return (
              <DropdownMenuItem key={idx}>
                <Link href={loggedInLink.href} className="capitalize w-full">
                  {loggedInLink.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
        <SignedOut>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/sign-in" className="capitalize w-full">
              Sign In
            </Link>
          </DropdownMenuItem>
        </SignedOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
