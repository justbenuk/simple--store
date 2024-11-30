import Link from "next/link";
import { VscCode } from "react-icons/vsc";
import { Button } from "../ui/button";

export default function Logo() {
  return (
    <>
      <Button size="icon" asChild>
        <Link href="/">
          <VscCode />
        </Link>
      </Button>
    </>
  );
}
