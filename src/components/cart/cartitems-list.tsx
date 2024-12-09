"use client";
import { Card } from "../ui/card";
import { FirstColumn, SecondColumn, FourthColumn } from "./cartitem-coluns";
import ThirdColumn from "./third-column";
import { CartItemWithProduct } from "@/lib/types";

export default function CartItemsList({
  cartItems,
}: {
  cartItems: CartItemWithProduct[];
}) {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, amount } = cartItem;
        const { id: productId, image, name, company, price } = cartItem.product;

        return (
          <Card
            key={id}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            <FirstColumn image={image} name={name} />
            <SecondColumn name={name} company={company} productId={productId} />
            <ThirdColumn id={id} quantity={amount} />
            <FourthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
}
