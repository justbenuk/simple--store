import Breadcrumbs from "@/components/product/breedcrumbs";
import { fetchSingleProduct } from "@/actions/products";
import Image from "next/image";
import { formatCurrency } from "@/lib/format";
import FavoriteToggleButton from "@/components/products/favorite-toggle-button";
import AddToCart from "@/components/product/add-to-cart";
import ProductRating from "@/components/product/product-rating";
import ShareButton from "@/components/product/share-button";
import SubmitReview from "@/components/reviews/submit-review";
import ProductReviews from "@/components/reviews/product-reviews";
export default async function SingleProduct({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const id = (await params).productId;
  const product = await fetchSingleProduct(id);
  const { name, image, company, description, price } = product;
  const itemCost = formatCurrency(price);
  return (
    <section>
      <Breadcrumbs name={name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <div className="relative h-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <div className="flex items-center gap-x-2">
              <FavoriteToggleButton productId={id} />
              <ShareButton name={product.name} productId={product.id} />
            </div>
          </div>
          <ProductRating productId={id} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {itemCost}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart productId={id} />
        </div>
      </div>
      <ProductReviews productId={product.id} />
      <SubmitReview productId={product.id} />
    </section>
  );
}
