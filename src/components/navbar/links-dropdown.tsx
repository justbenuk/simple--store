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

export default function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
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
        <DropdownMenuSeparator />
        {LoggedInLinks.map((loggedInLink, idx) => {
          return (
            <DropdownMenuItem key={idx}>
              <Link href={loggedInLink.href} className="capitalize w-full">
                {loggedInLink.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
