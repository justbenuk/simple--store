import { SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
export default function ProductSigninButton() {
  return (
    <SignInButton mode="modal">
      <Button type="button" size="default" className="mt-8">
        Please Sign In
      </Button>
    </SignInButton>
  );
}
