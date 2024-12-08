import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../global/card-sign-in-button";
import { fetchFavoriteId } from "@/actions/favorite-actions";
import FavoriteToggleForm from "./favorite-toggle-form";
export default async function FavoriteToggleButton({
  productId,
}: {
  productId: string;
}) {
  const { userId } = await auth();

  if (!userId) return <CardSignInButton />;

  const favoriteId = await fetchFavoriteId({ productId });

  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />;
}
