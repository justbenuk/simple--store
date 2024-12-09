"use client";
import { useState } from "react";
import SelectProductAmount from "./select-product-amount";
import { Mode } from "./select-product-amount";
import FormContainer from "../form/form-container";
import FormButton from "../form/form-button";
import { addToCartAction } from "@/actions/cart-actions";
import { useAuth } from "@clerk/nextjs";
import ProductSigninButton from "../global/product-signin-button";

export default function AddToCart({ productId }: { productId: string }) {
  const [amount, setAmount] = useState(1);
  const { userId } = useAuth();

  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <FormButton text="add to cart" size="default" className="mt-8" />
        </FormContainer>
      ) : (
        <ProductSigninButton />
      )}
    </div>
  );
}
