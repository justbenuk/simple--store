import { fetchFeaturedProducts } from "@/actions/products";
import EmptyList from "../global/empty-list";
import Sectiontitle from "../global/section-title";
import ProductsGrid from "../products/products-grid";

export default async function FeaturedProducts() {
  const products = await fetchFeaturedProducts();

  if (products.length < 1) {
    return <EmptyList />;
  }
  return (
    <section className="pt-24">
      <Sectiontitle text="Featured Products" />
      <ProductsGrid products={products} />
    </section>
  );
}
