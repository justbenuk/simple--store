import { fetchUserFavorites } from "@/actions/favorite-actions";
import Sectiontitle from "@/components/global/section-title";
import ProductsGrid from "@/components/products/products-grid";

export default async function FavoritesPage() {
  const favorites = await fetchUserFavorites();

  if (favorites.length === 0)
    return <Sectiontitle text="You have no favorites yet" />;

  return (
    <div>
      <Sectiontitle text="Favorites" />
      <ProductsGrid products={favorites.map((favorite) => favorite.product)} />
    </div>
  );
}
