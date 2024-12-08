"use client";
import { usePathname } from "next/navigation";
import FormContainer from "../form/form-container";
import { ToggleFavoriteAction } from "@/actions/favorite-actions";
import { CardSubmitButton } from "../global/card-sign-in-button";
type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
};
export default function FavoriteToggleForm({
  productId,
  favoriteId,
}: FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = ToggleFavoriteAction.bind(null, {
    productId,
    favoriteId,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}
