import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export function renderError(error: unknown): { message: string } {
  return {
    message: error instanceof Error ? error.message : "An Error Occured",
  };
}

export async function getAuthUser() {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  return user;
}

export async function getAdminUser() {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
}
