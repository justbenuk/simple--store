"use client";
import { SignOutButton } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function SignOutLink() {
  const { toast } = useToast();

  function handleLogout() {
    toast({ description: "Logging Out..." });
  }
  return (
    <SignOutButton>
      <Link href="/" className="w-full text-left" onClick={handleLogout}>
        Logout
      </Link>
    </SignOutButton>
  );
}
