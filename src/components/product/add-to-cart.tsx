import { Button } from "../ui/button";

export default function AddToCart({ productId }: { productId: string }) {
  return (
    <Button className="capitalize mt-8" size="lg">
      <p className="hidden">{productId}</p>
      add to cart
    </Button>
  );
}
