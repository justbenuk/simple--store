import { auth, currentUser } from "@clerk/nextjs/server";

export function renderError(error: unknown): { message: string } {
  console.log(error);
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
