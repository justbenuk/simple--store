"use server";
import { getAuthUser, renderError } from "./user-actions";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function fetchFavoriteId({ productId }: { productId: string }) {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
}

export async function ToggleFavoriteAction(prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) {
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;
  const message = "";
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
      revalidatePath(pathname);
      return {
        message: favoriteId ? "Removed from list" : "Added to list",
      };
    }
  } catch (error) {
    return renderError(error);
  }
}

export async function fetchUserFavorites() {
  const user = await getAuthUser();

  const favorites = db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });

  return favorites;
}
